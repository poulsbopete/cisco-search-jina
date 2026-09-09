#!/usr/bin/env python3
"""Install Cisco + Jina workshop dashboards into Kibana (Serverless Search).

Mirrors the proven cisco-serverless-workshop seed plus dashboard-alert-migration
retries (?apiVersion=1). Validated patterns:
  - Prefer ApiKey, then Basic (password)
  - Ensure a data view for cisco-jina-corpus
  - PUT/POST /api/dashboards with Elastic-Api-Version 2023-10-31
  - Fallback: ?apiVersion=1 + Elastic-Api-Version: 1
"""
from __future__ import annotations

import base64
import gzip
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

INDEX = "cisco-jina-corpus"
API_VERSION_DATED = os.environ.get("KIBANA_DASHBOARDS_API_VERSION", "2023-10-31")

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


def auth_candidates() -> list[tuple[str, str]]:
    """Return (label, Authorization header) pairs — ApiKey first (working workshop)."""
    out: list[tuple[str, str]] = []
    api_key = (
        os.environ.get("ES_API_KEY")
        or os.environ.get("ELASTICSEARCH_API_KEY")
        or os.environ.get("KIBANA_API_KEY")
        or ""
    ).strip()
    if api_key and api_key not in ("null", "None", "empty"):
        out.append(("api_key", f"ApiKey {api_key}"))
    user = os.environ.get("ES_USERNAME", "admin")
    password = (
        os.environ.get("ES_PASSWORD") or os.environ.get("ELASTICSEARCH_PASSWORD") or ""
    ).strip()
    if password:
        token = base64.b64encode(f"{user}:{password}".encode()).decode()
        out.append(("basic", f"Basic {token}"))
    return out


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
        "x-elastic-internal-origin": "kibana",
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
            print(f"loading dashboard spec from {path}")
            return json.loads(path.read_text(encoding="utf-8"))
    raise FileNotFoundError(f"dashboard JSON not found: {filename}")


def ensure_data_view(base: str, header: str, view_id: str, title: str) -> None:
    body = {
        "data_view": {
            "id": view_id,
            "name": title,
            "title": title,
            "allowNoIndex": True,
        }
    }
    code, resp = request(
        "POST",
        f"{base}/api/data_views/data_view",
        header,
        json.dumps(body).encode(),
        api_version=API_VERSION_DATED,
    )
    if code in (200, 201):
        print(f"data view ok: {view_id}")
    elif code == 409 or "already exists" in resp.lower() or "duplicate" in resp.lower():
        print(f"data view exists: {view_id}")
    else:
        print(f"warn: data view {view_id} HTTP {code}: {resp[:240]}", file=sys.stderr)


def upsert_dashboard(base: str, header: str, dash_id: str, spec: dict) -> None:
    payload = dict(spec)
    payload.pop("time_from", None)
    payload.pop("time_to", None)
    payload.pop("id", None)
    # Match working Cisco workshop boards
    query = payload.get("query") or {}
    if isinstance(query, dict) and query.get("language") in (None, "kuery", "lucene"):
        query = dict(query)
        query["language"] = "kql"
        payload["query"] = query
    raw = json.dumps(payload).encode()

    attempts: list[tuple[str, str, str | None]] = [
        # (method, url, Elastic-Api-Version header)
        ("PUT", f"{base}/api/dashboards/{dash_id}", API_VERSION_DATED),
        ("POST", f"{base}/api/dashboards", API_VERSION_DATED),
        ("PUT", f"{base}/api/dashboards/{dash_id}?apiVersion=1", "1"),
        ("POST", f"{base}/api/dashboards?apiVersion=1", "1"),
        ("PUT", f"{base}/api/dashboards/{dash_id}?apiVersion=1", None),
        ("POST", f"{base}/api/dashboards?apiVersion=1", None),
    ]

    errors: list[str] = []
    for method, url, ver in attempts:
        code, resp = request(method, url, header, raw, api_version=ver)
        if code in (200, 201):
            print(f"dashboard upserted ({method} ver={ver}): {dash_id}")
            return
        errors.append(f"{method} ver={ver} → HTTP {code}: {resp[:220]}")

    raise RuntimeError(f"dashboard {dash_id} failed:\n  " + "\n  ".join(errors))


def probe_auth(base: str, header: str) -> bool:
    code, _ = request("GET", f"{base}/api/status", header, api_version=None)
    return code in (200, 201)


def main() -> int:
    base = kibana_base()
    candidates = auth_candidates()
    if not base or not candidates:
        print(
            "ERROR: KIBANA_URL and ES_API_KEY (or ES_PASSWORD) required for dashboards",
            file=sys.stderr,
        )
        print(
            f"  KIBANA_URL={base!r} auth_modes={[c[0] for c in candidates]}",
            file=sys.stderr,
        )
        return 1

    header = ""
    auth_mode = ""
    for label, h in candidates:
        if probe_auth(base, h):
            header = h
            auth_mode = label
            print(f"Kibana auth ok via {label} ({base})")
            break
        print(f"warn: Kibana auth via {label} failed status probe", file=sys.stderr)

    if not header:
        # Last resort: use first candidate anyway (some status endpoints differ)
        auth_mode, header = candidates[0]
        print(f"warn: using {auth_mode} without successful /api/status probe", file=sys.stderr)

    ensure_data_view(base, header, INDEX, INDEX)

    failed = 0
    for dash_id, filename in DASHBOARDS:
        try:
            upsert_dashboard(base, header, dash_id, load_spec(filename))
        except Exception as exc:  # noqa: BLE001
            print(f"ERROR installing {dash_id}: {exc}", file=sys.stderr)
            failed += 1
            # If ApiKey failed validation-ish, retry once with Basic
            if auth_mode == "api_key" and len(candidates) > 1:
                alt_mode, alt = candidates[1]
                print(f"retrying {dash_id} with {alt_mode}…")
                try:
                    ensure_data_view(base, alt, INDEX, INDEX)
                    upsert_dashboard(base, alt, dash_id, load_spec(filename))
                    print(f"dashboard upserted via {alt_mode} fallback: {dash_id}")
                    failed -= 1
                    header = alt
                    auth_mode = alt_mode
                except Exception as exc2:  # noqa: BLE001
                    print(f"ERROR fallback {dash_id}: {exc2}", file=sys.stderr)

    if failed:
        return 1
    print(
        "Cisco Jina dashboards ready: "
        + ", ".join(dash_id for dash_id, _ in DASHBOARDS)
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
