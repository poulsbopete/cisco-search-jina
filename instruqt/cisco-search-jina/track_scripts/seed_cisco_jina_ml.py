#!/usr/bin/env python3
"""Seed CIRCUIT proxy metrics + an anomaly detection job (Serverless Search ML).

The text corpus is too small for ML. This creates a small time-series index that
matches the CIRCUIT talking point (token-budget spikes / policy denies), then
opens a single-metric-style anomaly detector so Machine Learning → Anomaly
detection is populated for the workshop.
"""
from __future__ import annotations

import base64
import gzip
import json
import os
import random
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

INDEX = "cisco-jina-circuit-metrics"
JOB_ID = "cisco-jina-circuit-tokens"
DATAFEED_ID = f"datafeed-{JOB_ID}"
DAYS = 14
BUCKET_HOURS = 1


def decode(raw: bytes) -> str:
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    return raw.decode("utf-8", errors="replace")


def auth_header() -> tuple[str, str]:
    api_key = (
        os.environ.get("ES_API_KEY")
        or os.environ.get("ELASTICSEARCH_API_KEY")
        or os.environ.get("KIBANA_API_KEY")
        or ""
    ).strip()
    if api_key and api_key not in ("null", "None", "empty"):
        return f"ApiKey {api_key}", "api_key"
    user = os.environ.get("ES_USERNAME", "admin")
    password = (
        os.environ.get("ES_PASSWORD") or os.environ.get("ELASTICSEARCH_PASSWORD") or ""
    ).strip()
    if password:
        token = base64.b64encode(f"{user}:{password}".encode()).decode()
        return f"Basic {token}", "basic"
    return "", ""


def es_base() -> str:
    return (os.environ.get("ES_URL") or "").rstrip("/")


def kibana_base() -> str:
    return (os.environ.get("KIBANA_URL") or os.environ.get("ES_KIBANA_URL") or "").rstrip("/")


def request(
    method: str,
    url: str,
    header: str,
    body: bytes | None = None,
    *,
    extra_headers: dict[str, str] | None = None,
) -> tuple[int, str]:
    headers = {
        "Authorization": header,
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
    }
    if extra_headers:
        headers.update(extra_headers)
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, decode(resp.read())
    except urllib.error.HTTPError as e:
        return e.code, decode(e.read())


def es(method: str, path: str, header: str, body: dict | None = None) -> tuple[int, str]:
    raw = None if body is None else json.dumps(body).encode()
    return request(method, f"{es_base()}{path}", header, raw)


def kbn(method: str, path: str, header: str, body: dict | None = None) -> tuple[int, str]:
    raw = None if body is None else json.dumps(body).encode()
    return request(
        method,
        f"{kibana_base()}{path}",
        header,
        raw,
        extra_headers={
            "kbn-xsrf": "true",
            "x-elastic-internal-origin": "kibana",
            "Elastic-Api-Version": "2023-10-31",
        },
    )


def generate_docs() -> list[dict]:
    """Hourly CIRCUIT proxy metrics with a clear spike window for ML."""
    rng = random.Random(42)
    now = datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    start = now - timedelta(days=DAYS)
    regions = ("us-east-1", "us-west-2")
    docs: list[dict] = []
    # Spike ~36h ago for a few hours so Anomaly Explorer has a recent finding
    spike_start = now - timedelta(hours=36)
    spike_end = spike_start + timedelta(hours=3)

    t = start
    while t <= now:
        for region in regions:
            in_spike = spike_start <= t < spike_end and region == "us-east-1"
            if in_spike:
                tokens = rng.randint(18000, 26000)
                denies = rng.randint(18, 35)
                event = "token_budget_spike"
            else:
                tokens = rng.randint(700, 1400)
                denies = rng.randint(0, 2)
                event = "baseline"
            docs.append(
                {
                    "@timestamp": t.strftime("%Y-%m-%dT%H:%M:%SZ"),
                    "source": "circuit",
                    "system": "CIRCUIT LLM proxy (ECS)",
                    "region": region,
                    "token_count": tokens,
                    "policy_denies": denies,
                    "event": event,
                    "account": "Cisco CIRCUIT",
                }
            )
        t += timedelta(hours=BUCKET_HOURS)
    return docs


def ensure_index(header: str) -> None:
    mapping = {
        "mappings": {
            "properties": {
                "@timestamp": {"type": "date"},
                "source": {"type": "keyword"},
                "system": {"type": "keyword"},
                "region": {"type": "keyword"},
                "token_count": {"type": "long"},
                "policy_denies": {"type": "long"},
                "event": {"type": "keyword"},
                "account": {"type": "keyword"},
            }
        }
    }
    code, body = es("PUT", f"/{INDEX}", header, mapping)
    if code not in (200, 201) and code != 400:
        raise RuntimeError(f"index create HTTP {code}: {body[:400]}")
    if code == 400:
        print(f"index exists or mapping warning: {body[:200]}")


def bulk_docs(header: str, docs: list[dict]) -> None:
    lines: list[str] = []
    for i, doc in enumerate(docs):
        lines.append(json.dumps({"index": {"_index": INDEX, "_id": f"m-{i}"}}))
        lines.append(json.dumps(doc))
    payload = ("\n".join(lines) + "\n").encode()
    code, body = request("POST", f"{es_base()}/_bulk?refresh=true", header, payload)
    if code not in (200, 201):
        raise RuntimeError(f"bulk HTTP {code}: {body[:500]}")
    parsed = json.loads(body)
    if parsed.get("errors"):
        first = next(
            (i for i in parsed.get("items", []) if "error" in i.get("index", {})),
            None,
        )
        raise RuntimeError(f"bulk errors: {json.dumps(first)[:500]}")
    print(f"indexed {len(docs)} docs into {INDEX}")


def ensure_data_view(header: str) -> None:
    if not kibana_base():
        print("warn: KIBANA_URL unset; skip data view", file=sys.stderr)
        return
    body = {
        "data_view": {
            "id": INDEX,
            "name": INDEX,
            "title": INDEX,
            "timeFieldName": "@timestamp",
            "allowNoIndex": True,
        }
    }
    code, resp = kbn("POST", "/api/data_views/data_view", header, body)
    if code in (200, 201):
        print(f"data view ok: {INDEX}")
    elif code == 409 or "already exists" in resp.lower() or "duplicate" in resp.lower():
        print(f"data view exists: {INDEX}")
    else:
        print(f"warn: data view HTTP {code}: {resp[:200]}", file=sys.stderr)


def delete_job_if_exists(header: str) -> None:
    es("POST", f"/_ml/datafeeds/{DATAFEED_ID}/_stop", header, {"force": True})
    es("DELETE", f"/_ml/datafeeds/{DATAFEED_ID}", header)
    es("POST", f"/_ml/anomaly_detectors/{JOB_ID}/_close", header, {"force": True})
    es("DELETE", f"/_ml/anomaly_detectors/{JOB_ID}", header)


def put_job(header: str) -> None:
    job = {
        "description": (
            "CIRCUIT LLM proxy — unusual token spend and policy denies "
            "(Cisco + Jina workshop demo on Serverless Search ML)."
        ),
        "analysis_config": {
            "bucket_span": "1h",
            "detectors": [
                {
                    "detector_description": "Sum of CIRCUIT proxy tokens",
                    "function": "sum",
                    "field_name": "token_count",
                },
                {
                    "detector_description": "Sum of policy denies",
                    "function": "sum",
                    "field_name": "policy_denies",
                },
            ],
            "influencers": ["region", "event"],
        },
        "data_description": {"time_field": "@timestamp"},
        "model_plot_config": {"enabled": True, "annotations_enabled": True},
        "groups": ["cisco", "jina", "circuit", "workshop"],
        "datafeed_config": {
            "indices": [INDEX],
            "query": {"match_all": {}},
        },
    }
    code, body = es("PUT", f"/_ml/anomaly_detectors/{JOB_ID}", header, job)
    if code not in (200, 201):
        raise RuntimeError(f"put job HTTP {code}: {body[:600]}")
    print(f"ML job created: {JOB_ID}")


def open_and_start(header: str) -> None:
    code, body = es("POST", f"/_ml/anomaly_detectors/{JOB_ID}/_open", header, {})
    if code not in (200, 201):
        raise RuntimeError(f"open job HTTP {code}: {body[:400]}")
    print(f"ML job opened: {JOB_ID}")

    # Historical lookback so Anomaly Explorer has results immediately
    start = {
        "start": f"now-{DAYS}d",
        "end": "now",
    }
    code, body = es("POST", f"/_ml/datafeeds/{DATAFEED_ID}/_start", header, start)
    if code not in (200, 201):
        raise RuntimeError(f"start datafeed HTTP {code}: {body[:400]}")
    print(f"datafeed started (historical {DAYS}d): {DATAFEED_ID}")


def wait_briefly() -> None:
    # Give ML a moment to process the small historical window
    time.sleep(5)


def main() -> int:
    header, mode = auth_header()
    if not es_base() or not header:
        print("ERROR: ES_URL and credentials required for ML seed", file=sys.stderr)
        return 1
    print(f"Seeding CIRCUIT metrics + ML job (auth={mode})")

    try:
        ensure_index(header)
        docs = generate_docs()
        bulk_docs(header, docs)
        ensure_data_view(header)
        delete_job_if_exists(header)
        put_job(header)
        open_and_start(header)
        wait_briefly()
    except Exception as exc:  # noqa: BLE001
        print(f"ERROR: ML seed failed: {exc}", file=sys.stderr)
        return 1

    print(
        f"ML ready: open Machine Learning → Anomaly detection → {JOB_ID} "
        f"(data: {INDEX}, ~{DAYS}d hourly CIRCUIT proxy metrics with a token spike)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
