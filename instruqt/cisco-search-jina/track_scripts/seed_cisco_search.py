#!/usr/bin/env python3
"""Index the Cisco + Jina workshop corpus into Elastic Serverless Search."""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

INDEX = "cisco-jina-corpus"


def auth_header() -> tuple[str, str]:
    api_key = (os.environ.get("ES_API_KEY") or os.environ.get("ELASTICSEARCH_API_KEY") or "").strip()
    if api_key:
        return f"ApiKey {api_key}", "api_key"
    user = os.environ.get("ES_USERNAME", "admin")
    password = os.environ.get("ES_PASSWORD") or os.environ.get("ELASTICSEARCH_PASSWORD") or ""
    if password:
        import base64

        token = base64.b64encode(f"{user}:{password}".encode()).decode()
        return f"Basic {token}", "basic"
    return "", ""


def request(method: str, url: str, header: str, body: bytes | None = None) -> tuple[int, str]:
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Authorization", header)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")


def load_documents() -> list[dict]:
    # Instruqt setup always materializes the corpus here. Do not use parents[n] —
    # this file is copied to /tmp and pathlib.parents[2] raises IndexError.
    here = Path(__file__).resolve().parent
    candidates = [
        Path("/tmp/workshop-corpus.json"),
        here / "workshop-assets" / "data" / "workshop-corpus.json",
        here.parent / "workshop-assets" / "data" / "workshop-corpus.json",
        here.parent.parent / "data" / "workshop-corpus.json",
    ]
    for path in candidates:
        if path.is_file():
            print(f"Loading corpus from {path}")
            data = json.loads(path.read_text(encoding="utf-8"))
            docs = data.get("documents") or []
            if not docs:
                raise ValueError(f"{path} has no documents")
            return docs
    raise FileNotFoundError("workshop-corpus.json not found (expected /tmp/workshop-corpus.json)")


def main() -> int:
    es_url = (os.environ.get("ES_URL") or "").rstrip("/")
    header, mode = auth_header()
    if not es_url or not header:
        print("ERROR: ES_URL and credentials required", file=sys.stderr)
        return 1

    docs = load_documents()
    print(f"Loaded {len(docs)} documents (auth={mode})")

    mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "source": {"type": "keyword"},
                "system": {"type": "keyword"},
                "title": {"type": "text"},
                "account": {"type": "keyword"},
                "stage": {"type": "keyword"},
                "amount": {"type": "double"},
                "competitors": {"type": "keyword"},
                "region": {"type": "keyword"},
                "content": {"type": "text"},
                "concepts": {"type": "keyword"},
                "bytes": {"type": "long"},
                "@timestamp": {"type": "date"},
                "graph": {
                    "properties": {
                        "account": {"type": "keyword"},
                        "deal": {"type": "keyword"},
                        "competitor": {"type": "keyword"},
                    }
                },
            }
        }
    }
    code, body = request("PUT", f"{es_url}/{INDEX}", header, json.dumps(mapping).encode())
    if code not in (200, 201) and code != 400:
        print(f"Index create HTTP {code}: {body[:500]}", file=sys.stderr)
        return 1
    if code == 400:
        print(f"Index already exists or mapping warning: {body[:300]}")

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    lines: list[str] = []
    for doc in docs:
        doc = dict(doc)
        doc["@timestamp"] = now
        doc_id = doc.get("id") or doc.get("title")
        lines.append(json.dumps({"index": {"_index": INDEX, "_id": doc_id}}))
        lines.append(json.dumps(doc))
    payload = "\n".join(lines) + "\n"
    code, body = request("POST", f"{es_url}/_bulk?refresh=true", header, payload.encode())
    if code not in (200, 201):
        print(f"Bulk HTTP {code}: {body[:800]}", file=sys.stderr)
        return 1
    parsed = json.loads(body)
    if parsed.get("errors"):
        first = next((i for i in parsed.get("items", []) if "error" in i.get("index", {})), None)
        print(f"Bulk reported errors: {json.dumps(first)[:800]}", file=sys.stderr)
        return 1

    code, body = request("GET", f"{es_url}/{INDEX}/_count", header)
    if code != 200:
        print(f"Count HTTP {code}: {body[:500]}", file=sys.stderr)
        return 1
    count = int(json.loads(body).get("count") or 0)
    print(f"Indexed {len(docs)} documents into {INDEX}; _count={count} (auth={mode})")
    if count < 1:
        print("ERROR: index is empty after bulk", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
