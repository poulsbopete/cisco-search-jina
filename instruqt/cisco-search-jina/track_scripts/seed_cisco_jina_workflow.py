#!/usr/bin/env python3
"""Upsert the facilitator dashboard-tour workflow into the learner Kibana."""
from __future__ import annotations

import gzip
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

WORKFLOW_ID = "cisco-jina-dashboard-tour"
WORKFLOW_FILE = "cisco-jina-dashboard-tour.yaml"
API_VERSION = "2023-10-31"


def decode(raw: bytes) -> str:
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    return raw.decode("utf-8", errors="replace")


def auth_header() -> str:
    # Prefer ApiKey first — matches cisco-serverless-workshop Kibana seeding.
    api_key = (
        os.environ.get("ES_API_KEY")
        or os.environ.get("ELASTICSEARCH_API_KEY")
        or os.environ.get("KIBANA_API_KEY")
        or ""
    ).strip()
    if api_key and api_key not in ("null", "None"):
        return f"ApiKey {api_key}"
    user = os.environ.get("ES_USERNAME", "admin")
    password = (
        os.environ.get("ES_PASSWORD") or os.environ.get("ELASTICSEARCH_PASSWORD") or ""
    ).strip()
    if password:
        import base64

        return "Basic " + base64.b64encode(f"{user}:{password}".encode()).decode()
    return ""


def kibana_base() -> str:
    return (os.environ.get("KIBANA_URL") or os.environ.get("ES_KIBANA_URL") or "").rstrip("/")


def request(method: str, url: str, header: str, body: bytes | None = None) -> tuple[int, str]:
    headers = {
        "Authorization": header,
        "kbn-xsrf": "true",
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
        "Elastic-Api-Version": API_VERSION,
    }
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, decode(resp.read())
    except urllib.error.HTTPError as e:
        return e.code, decode(e.read())


def yaml_path() -> Path:
    here = Path(__file__).resolve().parent
    candidates = [
        Path("/tmp/workflows") / WORKFLOW_FILE,
        here.parent / "workshop-assets" / "workflows" / WORKFLOW_FILE,
    ]
    for p in candidates:
        if p.is_file():
            return p
    raise FileNotFoundError(WORKFLOW_FILE)


def main() -> int:
    base = kibana_base()
    header = auth_header()
    if not base or not header:
        print("ERROR: KIBANA_URL and credentials required for workflows", file=sys.stderr)
        return 1

    yaml_text = yaml_path().read_text(encoding="utf-8")
    body = json.dumps({"id": WORKFLOW_ID, "yaml": yaml_text}).encode()

    code, resp = request("GET", f"{base}/api/workflows/workflow/{WORKFLOW_ID}", header)
    if code == 404:
        code2, resp2 = request("POST", f"{base}/api/workflows/workflow", header, body)
        if code2 in (200, 201):
            print(f"workflow created: {WORKFLOW_ID}")
            return 0
        # Bulk overwrite fallback
        bulk = json.dumps(
            {"overwrite": True, "workflows": [{"id": WORKFLOW_ID, "yaml": yaml_text}]}
        ).encode()
        code3, resp3 = request("POST", f"{base}/api/workflows", header, bulk)
        if code3 in (200, 201):
            print(f"workflow upserted via bulk: {WORKFLOW_ID}")
            return 0
        print(f"WARN: workflow create HTTP {code2}: {resp2[:400]} | bulk {code3}: {resp3[:300]}", file=sys.stderr)
        return 1

    if code == 200:
        code2, resp2 = request(
            "PUT", f"{base}/api/workflows/workflow/{WORKFLOW_ID}", header, body
        )
        if code2 in (200, 201):
            print(f"workflow updated: {WORKFLOW_ID}")
            return 0
        print(f"WARN: workflow update HTTP {code2}: {resp2[:400]}", file=sys.stderr)
        return 1

    print(f"WARN: workflows API HTTP {code}: {resp[:300]}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
