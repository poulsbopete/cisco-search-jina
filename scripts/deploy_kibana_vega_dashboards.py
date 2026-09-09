#!/usr/bin/env python3
"""Deploy Cisco Jina workshop Vega dashboards + facilitator workflow to Search-AI Kibana."""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VEGA_DIR = ROOT / "kibana" / "vega"
OUT = ROOT / "kibana" / "manifest.json"
WORKFLOW_YAML = ROOT / "kibana" / "workflows" / "cisco-jina-dashboard-tour.yaml"
VEGA_CLI = Path.home() / ".cursor" / "skills" / "kibana-vega" / "scripts" / "kibana-vega.js"

TRACKS = [
    {
        "id": "keyword-vs-semantic",
        "title": "Cisco Jina — Keyword vs semantic",
        "beat": "demo",
        "markdown": (
            "## Keyword vs semantic\n\n"
            "**Left:** ES|QL `MATCH(content, \"legal\")` — the OpenSearch-shaped ceiling. "
            "Umbrella’s e-discovery *legal hold* lands next to Acme counsel language.\n\n"
            "**Right:** concept `vendor-lock-in` — the Jina neighborhood. Acme stays; "
            "Umbrella drops.\n\n"
            "**Below:** top concepts across the 14-doc workshop corpus."
        ),
        "panels": [
            ("01-keyword-legal-hits.json", "Keyword MATCH(legal) by account", 0, 4, 24, 12),
            ("01-semantic-lockin-hits.json", "Concept vendor-lock-in by account", 24, 4, 24, 12),
            ("01-concept-neighborhood.json", "Top concepts across corpus", 0, 16, 48, 12),
        ],
    },
    {
        "id": "crm-analytics",
        "title": "Cisco Jina — CRM Analytics",
        "beat": "crm",
        "markdown": (
            "## CRM Analytics\n\n"
            "Pipeline dollars by stage and competitor graph edges from `source == \"crm\"`. "
            "Talking point: similar deals stay grounded in account / deal / competitor — "
            "not a guessed forecast narrative."
        ),
        "panels": [
            ("02-crm-pipeline-stage.json", "CRM pipeline $ by stage", 0, 4, 24, 14),
            ("02-crm-competitors.json", "CRM competitors on open deals", 24, 4, 24, 14),
        ],
    },
    {
        "id": "lifecycle-federated",
        "title": "Cisco Jina — Lifecycle federated search",
        "beat": "lifecycle",
        "markdown": (
            "## Lifecycle Platform\n\n"
            "Snowflake facts, S3 invoice payloads, and Elastic orchestration logs in one index. "
            "Large `bytes` docs stay searchable without standing up another warehouse."
        ),
        "panels": [
            ("03-lifecycle-systems.json", "Lifecycle systems donut", 0, 4, 24, 14),
            ("03-lifecycle-bytes.json", "Lifecycle payload bytes", 24, 4, 24, 14),
        ],
    },
    {
        "id": "webex-ccr",
        "title": "Cisco Jina — Webex CCR East / West",
        "beat": "webex",
        "markdown": (
            "## Webex / Infrastructure\n\n"
            "Heatmap of Gov East vs West × source, plus Webex/infra artifact counts. "
            "CCR replicates; search stays local so queries never cross the Gov boundary."
        ),
        "panels": [
            ("04-webex-region-source.json", "Gov region × source heatmap", 0, 4, 24, 14),
            ("04-webex-multimodal.json", "Webex + infra by region", 24, 4, 24, 14),
        ],
    },
    {
        "id": "circuit-ecs",
        "title": "Cisco Jina — CIRCUIT LLM proxy (ECS)",
        "beat": "circuit",
        "markdown": (
            "## CIRCUIT LLM proxy\n\n"
            "ECS concept neighborhood for policy deny, token budget, and PII leakage. "
            "Customers choose Elastic LLM, CIRCUIT, or both — Elastic searches the proxy stream either way."
        ),
        "panels": [
            ("05-circuit-concepts.json", "CIRCUIT concept neighborhood", 0, 4, 24, 14),
            ("05-circuit-regions.json", "CIRCUIT events by region", 24, 4, 24, 14),
        ],
    },
]


def require_env() -> tuple[str, str]:
    url = (os.environ.get("KIBANA_URL") or "").rstrip("/")
    key = os.environ.get("KIBANA_API_KEY") or os.environ.get("ES_API_KEY") or ""
    if not url or not key:
        sys.exit("Set KIBANA_URL and KIBANA_API_KEY (Search-AI).")
    return url, key


def kbn_request(method: str, path: str, body: dict | None = None) -> dict:
    url, key = require_env()
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        f"{url}{path}",
        data=data,
        method=method,
        headers={
            "Authorization": f"ApiKey {key}",
            "kbn-xsrf": "true",
            "Content-Type": "application/json",
            "elastic-api-version": "2023-10-31",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        raise RuntimeError(f"{method} {path} -> {e.code}: {err[:800]}") from e


def run_vega(*args: str, stdin: str | None = None) -> str:
    cmd = ["node", str(VEGA_CLI), *args]
    env = os.environ.copy()
    proc = subprocess.run(
        cmd,
        input=stdin,
        text=True,
        capture_output=True,
        env=env,
        check=False,
    )
    out = (proc.stdout or "") + (proc.stderr or "")
    if proc.returncode != 0:
        raise RuntimeError(f"vega cli failed ({proc.returncode}): {out}")
    return out


def parse_id(output: str) -> str:
    m = re.search(r"ID:\s*([0-9a-f-]{36})", output)
    if not m:
        raise RuntimeError(f"Could not parse ID from:\n{output}")
    return m.group(1)


def create_vis(title: str, spec_path: Path) -> str:
    out = run_vega("visualizations", "create", title, "-", stdin=spec_path.read_text())
    print(out.strip())
    return parse_id(out)


def create_dashboard(title: str) -> str:
    out = run_vega("dashboards", "create", title)
    print(out.strip())
    return parse_id(out)


def apply_layout(dash_id: str, panels: list[dict]) -> None:
    layout = {"title": "", "panels": panels}
    out = run_vega(
        "dashboards",
        "apply-layout",
        dash_id,
        "-",
        stdin=json.dumps(layout),
    )
    print(out.strip())


def inject_markdown(dash_id: str, content: str) -> None:
    """Attach a markdown panel at the top via serverless-compatible SO import."""
    url, key = require_env()
    export_body = {
        "objects": [{"type": "dashboard", "id": dash_id}],
        "includeReferencesDeep": True,
    }
    req = urllib.request.Request(
        f"{url}/api/saved_objects/_export",
        data=json.dumps(export_body).encode(),
        method="POST",
        headers={
            "Authorization": f"ApiKey {key}",
            "kbn-xsrf": "true",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req) as resp:
        ndjson = resp.read().decode().splitlines()
    dash = None
    for line in ndjson:
        obj = json.loads(line)
        if obj.get("type") == "dashboard" and obj.get("id") == dash_id:
            dash = obj
            break
    if not dash:
        raise RuntimeError(f"Dashboard {dash_id} not found in export")

    panels = json.loads(dash["attributes"].get("panelsJSON") or "[]")
    panels = [p for p in panels if p.get("type") != "markdown"]
    panels.insert(
        0,
        {
            "type": "markdown",
            "gridData": {"x": 0, "y": 0, "w": 48, "h": 4, "i": "md0"},
            "panelIndex": "md0",
            "embeddableConfig": {"content": content, "enhancements": {}},
        },
    )
    dash["attributes"]["panelsJSON"] = json.dumps(panels)

    boundary = "----BoundaryCiscoJinaVega"
    body = json.dumps(
        {
            "type": "dashboard",
            "id": dash_id,
            "attributes": dash["attributes"],
            "references": dash.get("references", []),
        }
    )
    payload = "\r\n".join(
        [
            f"--{boundary}",
            'Content-Disposition: form-data; name="file"; filename="import.ndjson"',
            "Content-Type: application/ndjson",
            "",
            body,
            f"--{boundary}--",
            "",
        ]
    ).encode()
    req = urllib.request.Request(
        f"{url}/api/saved_objects/_import?overwrite=true",
        data=payload,
        method="POST",
        headers={
            "Authorization": f"ApiKey {key}",
            "kbn-xsrf": "true",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
    )
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode())
    if not result.get("success"):
        raise RuntimeError(json.dumps(result)[:500])
    print(f"✓ Markdown panel on dashboard {dash_id}")


def upsert_workflow(yaml_text: str, workflow_id: str) -> dict:
    # Try create; on conflict update
    url, key = require_env()
    create_body = {"yaml": yaml_text, "id": workflow_id}
    req = urllib.request.Request(
        f"{url}/api/workflows/workflow",
        data=json.dumps(create_body).encode(),
        method="POST",
        headers={
            "Authorization": f"ApiKey {key}",
            "kbn-xsrf": "true",
            "Content-Type": "application/json",
            "elastic-api-version": "2023-10-31",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        if e.code in (409, 400) and ("already" in body.lower() or "exists" in body.lower() or "conflict" in body.lower()):
            req2 = urllib.request.Request(
                f"{url}/api/workflows/workflow/{workflow_id}",
                data=json.dumps({"yaml": yaml_text}).encode(),
                method="PUT",
                headers={
                    "Authorization": f"ApiKey {key}",
                    "kbn-xsrf": "true",
                    "Content-Type": "application/json",
                    "elastic-api-version": "2023-10-31",
                },
            )
            with urllib.request.urlopen(req2) as resp:
                return json.loads(resp.read().decode())
        # Also try bulk create overwrite
        if e.code == 400:
            bulk = {
                "overwrite": True,
                "workflows": [{"id": workflow_id, "yaml": yaml_text}],
            }
            req3 = urllib.request.Request(
                f"{url}/api/workflows",
                data=json.dumps(bulk).encode(),
                method="POST",
                headers={
                    "Authorization": f"ApiKey {key}",
                    "kbn-xsrf": "true",
                    "Content-Type": "application/json",
                    "elastic-api-version": "2023-10-31",
                },
            )
            with urllib.request.urlopen(req3) as resp:
                return json.loads(resp.read().decode())
        raise RuntimeError(f"workflow create failed {e.code}: {body[:800]}") from e


def render_workflow(dashboards: dict[str, str], kibana_url: str) -> str:
    def link(did: str) -> str:
        return f"{kibana_url.rstrip('/')}/app/dashboards#/view/{did}"

    # Fill template placeholders in YAML file
    text = WORKFLOW_YAML.read_text()
    for track in TRACKS:
        text = text.replace(f"__DASH_{track['id'].upper().replace('-', '_')}__", link(dashboards[track["id"]]))
    return text


def main() -> None:
    require_env()
    if not VEGA_CLI.exists():
        sys.exit(f"Missing kibana-vega CLI at {VEGA_CLI}")

    manifest: dict = {"visualizations": {}, "dashboards": {}, "workflow_id": "cisco-jina-dashboard-tour"}

    for track in TRACKS:
        print(f"\n=== {track['title']} ===")
        vis_panels = []
        for fname, title, x, y, w, h in track["panels"]:
            vid = create_vis(title, VEGA_DIR / fname)
            manifest["visualizations"][fname] = {"id": vid, "title": title}
            vis_panels.append({"visualization": vid, "x": x, "y": y, "w": w, "h": h})
        did = create_dashboard(track["title"])
        apply_layout(did, vis_panels)
        try:
            inject_markdown(did, track["markdown"])
        except Exception as exc:  # noqa: BLE001
            print(f"⚠ markdown inject failed (charts still ok): {exc}")
        manifest["dashboards"][track["id"]] = {
            "id": did,
            "title": track["title"],
            "beat": track["beat"],
            "url": f"{os.environ['KIBANA_URL'].rstrip('/')}/app/dashboards#/view/{did}",
        }

    yaml_text = render_workflow(
        {k: v["id"] for k, v in manifest["dashboards"].items()},
        os.environ["KIBANA_URL"],
    )
    WORKFLOW_YAML.write_text(yaml_text)
    print("\n=== Workflow ===")
    try:
        wf = upsert_workflow(yaml_text, manifest["workflow_id"])
        print(json.dumps(wf if isinstance(wf, dict) else {"result": wf}, indent=2)[:600])
        manifest["workflow"] = wf if isinstance(wf, dict) else {"raw": str(wf)}
    except Exception as exc:  # noqa: BLE001
        print(f"⚠ workflow upsert failed: {exc}")
        manifest["workflow_error"] = str(exc)

    OUT.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\nWrote {OUT}")


if __name__ == "__main__":
    main()
