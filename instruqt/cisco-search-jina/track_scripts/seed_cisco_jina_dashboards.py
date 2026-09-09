#!/usr/bin/env python3
"""Install Cisco + Jina workshop dashboards into the learner Kibana (Serverless Search)."""
from __future__ import annotations

import gzip
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

API_VERSION = os.environ.get("KIBANA_DASHBOARDS_API_VERSION", "2023-10-31")

DASHBOARDS = (
    ("cisco-jina-keyword-vs-semantic", "cisco-jina-keyword-vs-semantic.json"),
    ("cisco-jina-crm", "cisco-jina-crm.json"),
    ("cisco-jina-lifecycle", "cisco-jina-lifecycle.json"),
    ("cisco-jina-webex-ccr", "cisco-jina-webex-ccr.json"),
    ("cisco-jina-circuit", "cisco-jina-circuit.json"),
)


def decode(raw: bytes) -> str:
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    return raw.decode("utf-8", errors="replace")


def auth_header() -> str:
    # Prefer password on Instruqt — API keys from project create can be narrow.
    user = os.environ.get("ES_USERNAME", "admin")
    password = (
        os.environ.get("ES_PASSWORD") or os.environ.get("ELASTICSEARCH_PASSWORD") or ""
    ).strip()
    if password:
        import base64

        return "Basic " + base64.b64encode(f"{user}:{password}".encode()).decode()
    api_key = (
        os.environ.get("ES_API_KEY")
        or os.environ.get("ELASTICSEARCH_API_KEY")
        or os.environ.get("KIBANA_API_KEY")
        or ""
    ).strip()
    if api_key and api_key not in ("null", "None"):
        return f"ApiKey {api_key}"
    return ""


def kibana_base() -> str:
    return (os.environ.get("KIBANA_URL") or os.environ.get("ES_KIBANA_URL") or "").rstrip("/")


def request(
    method: str,
    url: str,
    header: str,
    body: bytes | None = None,
    *,
    api_version: str | None = None,
) -> tuple[int, str]:
    headers = {
        "Authorization": header,
        "kbn-xsrf": "true",
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
    }
    if api_version:
        headers["Elastic-Api-Version"] = api_version
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, decode(resp.read())
    except urllib.error.HTTPError as e:
        return e.code, decode(e.read())


def dashboard_paths() -> list[Path]:
    here = Path(__file__).resolve().parent
    return [
        Path("/tmp/dashboards"),
        here.parent / "workshop-assets" / "dashboards",
        here / "workshop-assets" / "dashboards",
    ]


def load_spec(filename: str) -> dict:
    for root in dashboard_paths():
        path = root / filename
        if path.is_file():
            return json.loads(path.read_text(encoding="utf-8"))
    raise FileNotFoundError(f"dashboard JSON not found: {filename}")


def upsert_dashboard(base: str, header: str, dash_id: str, spec: dict) -> None:
    payload = dict(spec)
    payload.pop("time_from", None)
    payload.pop("time_to", None)
    payload.pop("id", None)
    raw = json.dumps(payload).encode()

    code, resp = request(
        "PUT",
        f"{base}/api/dashboards/{dash_id}",
        header,
        raw,
        api_version=API_VERSION,
    )
    if code in (200, 201):
        print(f"dashboard upserted: {dash_id}")
        return

    code2, resp2 = request(
        "POST",
        f"{base}/api/dashboards",
        header,
        raw,
        api_version=API_VERSION,
    )
    if code2 in (200, 201):
        print(f"dashboard created via POST: {dash_id} (title={payload.get('title')})")
        return
    raise RuntimeError(
        f"dashboard {dash_id} failed PUT {code}: {resp[:400]} | POST {code2}: {resp2[:400]}"
    )


def main() -> int:
    base = kibana_base()
    header = auth_header()
    if not base or not header:
        print("ERROR: KIBANA_URL and credentials required for dashboards", file=sys.stderr)
        return 1

    failed = 0
    for dash_id, filename in DASHBOARDS:
        try:
            upsert_dashboard(base, header, dash_id, load_spec(filename))
        except Exception as exc:  # noqa: BLE001
            print(f"ERROR installing {dash_id}: {exc}", file=sys.stderr)
            failed += 1

    if failed:
        return 1
    print(
        "Cisco Jina dashboards ready: "
        + ", ".join(dash_id for dash_id, _ in DASHBOARDS)
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
