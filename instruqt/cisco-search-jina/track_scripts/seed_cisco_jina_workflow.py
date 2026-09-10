#!/usr/bin/env python3
"""Upsert Cisco Jina workshop workflows into the learner Kibana."""
from __future__ import annotations

import gzip
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

WORKFLOWS = (
    ("cisco-jina-dashboard-notes", "cisco-jina-dashboard-notes.yaml"),
    ("cisco-jina-keep-alive", "cisco-jina-keep-alive.yaml"),
)
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


def yaml_path(filename: str) -> Path:
    here = Path(__file__).resolve().parent
    candidates = [
        Path("/tmp/workflows") / filename,
        here.parent / "workshop-assets" / "workflows" / filename,
    ]
    for p in candidates:
        if p.is_file():
            return p
    raise FileNotFoundError(filename)


def upsert_workflow(base: str, header: str, workflow_id: str, filename: str) -> int:
    yaml_text = yaml_path(filename).read_text(encoding="utf-8")
    body = json.dumps({"id": workflow_id, "yaml": yaml_text}).encode()

    code, resp = request("GET", f"{base}/api/workflows/workflow/{workflow_id}", header)
    if code == 404:
        code2, resp2 = request("POST", f"{base}/api/workflows/workflow", header, body)
        if code2 in (200, 201):
            print(f"workflow created: {workflow_id}")
            return 0
        bulk = json.dumps(
            {"overwrite": True, "workflows": [{"id": workflow_id, "yaml": yaml_text}]}
        ).encode()
        code3, resp3 = request("POST", f"{base}/api/workflows", header, bulk)
        if code3 in (200, 201):
            print(f"workflow upserted via bulk: {workflow_id}")
            return 0
        print(
            f"WARN: workflow create HTTP {code2}: {resp2[:400]} | bulk {code3}: {resp3[:300]}",
            file=sys.stderr,
        )
        return 1

    if code == 200:
        code2, resp2 = request(
            "PUT", f"{base}/api/workflows/workflow/{workflow_id}", header, body
        )
        if code2 in (200, 201):
            print(f"workflow updated: {workflow_id}")
            return 0
        print(f"WARN: workflow update HTTP {code2}: {resp2[:400]}", file=sys.stderr)
        return 1

    print(f"WARN: workflows API HTTP {code}: {resp[:300]}", file=sys.stderr)
    return 1


def main() -> int:
    base = kibana_base()
    header = auth_header()
    if not base or not header:
        print("ERROR: KIBANA_URL and credentials required for workflows", file=sys.stderr)
        return 1

    failed = 0
    for workflow_id, filename in WORKFLOWS:
        try:
            failed += upsert_workflow(base, header, workflow_id, filename)
        except Exception as exc:  # noqa: BLE001
            print(f"WARN: {workflow_id}: {exc}", file=sys.stderr)
            failed += 1
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
