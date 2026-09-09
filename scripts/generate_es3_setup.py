#!/usr/bin/env python3
"""Build track_scripts/setup-es3-api from the nginx/project head + embedded seed."""
from __future__ import annotations

import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TRACK = ROOT / "instruqt" / "cisco-search-jina"
HEAD = ROOT / "scripts" / "setup-es3-api.head"
SEED = TRACK / "track_scripts" / "seed_cisco_search.py"
DASH_SEED = TRACK / "track_scripts" / "seed_cisco_jina_dashboards.py"
WF_SEED = TRACK / "track_scripts" / "seed_cisco_jina_workflow.py"
CORPUS = ROOT / "data" / "workshop-corpus.json"
DASH_DIR = TRACK / "workshop-assets" / "dashboards"
WF_DIR = TRACK / "workshop-assets" / "workflows"
OUT = TRACK / "track_scripts" / "setup-es3-api"

DASHBOARDS = (
    "cisco-jina-keyword-vs-semantic.json",
    "cisco-jina-crm.json",
    "cisco-jina-lifecycle.json",
    "cisco-jina-webex-ccr.json",
    "cisco-jina-circuit.json",
)
WORKFLOWS = ("cisco-jina-dashboard-tour.yaml",)


def b64(path: Path) -> str:
    return base64.b64encode(path.read_bytes()).decode("ascii")


def main() -> None:
    if not HEAD.is_file():
        raise SystemExit(f"missing {HEAD}")
    for path in (DASH_SEED, WF_SEED, SEED, CORPUS):
        if not path.is_file():
            raise SystemExit(f"missing {path}")

    blocks = ["mkdir -p /tmp/dashboards /tmp/workflows"]
    for name in DASHBOARDS:
        path = DASH_DIR / name
        if not path.is_file():
            raise SystemExit(f"missing dashboard {path}")
        tag = "CISCO_JINA_DASH_" + name.replace(".json", "").replace("-", "_").upper()
        blocks.append(f"base64 -d <<'{tag}' > /tmp/dashboards/{name}\n{b64(path)}\n{tag}")
    for name in WORKFLOWS:
        path = WF_DIR / name
        if not path.is_file():
            raise SystemExit(f"missing workflow {path}")
        tag = "CISCO_JINA_WF_" + name.replace(".yaml", "").replace("-", "_").upper()
        blocks.append(f"base64 -d <<'{tag}' > /tmp/workflows/{name}\n{b64(path)}\n{tag}")

    embed = "\n".join(blocks)

    fragment = f"""# Workshop seed — corpus + dashboards + workflow (Instruqt only)
set -euo pipefail

echo "Materializing Cisco + Jina seed assets under /tmp..."
{embed}
base64 -d <<'CISCO_JINA_CORPUS' > /tmp/workshop-corpus.json
{b64(CORPUS)}
CISCO_JINA_CORPUS
base64 -d <<'CISCO_JINA_SEED_PY' > /tmp/seed_cisco_search.py
{b64(SEED)}
CISCO_JINA_SEED_PY
base64 -d <<'CISCO_JINA_DASH_PY' > /tmp/seed_cisco_jina_dashboards.py
{b64(DASH_SEED)}
CISCO_JINA_DASH_PY
base64 -d <<'CISCO_JINA_WF_PY' > /tmp/seed_cisco_jina_workflow.py
{b64(WF_SEED)}
CISCO_JINA_WF_PY

export ES_URL="${{ES_URL:-$(jq -r --arg region "${{REGIONS:-aws-us-east-1}}" '.[$region].endpoints.elasticsearch // empty' /tmp/project_results.json)}}"
export KIBANA_URL="${{KIBANA_URL:-$(jq -r --arg region "${{REGIONS:-aws-us-east-1}}" '.[$region].endpoints.kibana // empty' /tmp/project_results.json)}}"
export ES_PASSWORD="${{ES_PASSWORD:-${{ELASTICSEARCH_PASSWORD:-$(jq -r --arg region "${{REGIONS:-aws-us-east-1}}" '.[$region].credentials.password // empty' /tmp/project_results.json)}}}}"
export ELASTICSEARCH_PASSWORD="${{ELASTICSEARCH_PASSWORD:-$ES_PASSWORD}}"
export ES_USERNAME="${{ES_USERNAME:-admin}}"
export ES_API_KEY="${{ES_API_KEY:-$(jq -r --arg region "${{REGIONS:-aws-us-east-1}}" '.[$region].credentials.api_key // empty' /tmp/project_results.json)}}"
export ELASTICSEARCH_API_KEY="${{ELASTICSEARCH_API_KEY:-$ES_API_KEY}}"
export KIBANA_API_KEY="${{KIBANA_API_KEY:-$ES_API_KEY}}"

if [ ! -f /tmp/seed_cisco_search.py ] || [ ! -f /tmp/workshop-corpus.json ]; then
  echo "ERROR: embedded seed files missing under /tmp"
  ls -la /tmp/seed_*.py /tmp/workshop-corpus.json 2>/dev/null || true
  exit 1
fi

echo "Running workshop seed against $ES_URL"
if python3 /tmp/seed_cisco_search.py > /tmp/workshop-seed.log 2>&1; then
  tail -30 /tmp/workshop-seed.log || true
else
  echo "ERROR: workshop seed failed — see /tmp/workshop-seed.log"
  tail -80 /tmp/workshop-seed.log || true
  exit 1
fi

echo "Installing workshop dashboards into $KIBANA_URL"
if python3 /tmp/seed_cisco_jina_dashboards.py > /tmp/workshop-dashboards.log 2>&1; then
  tail -40 /tmp/workshop-dashboards.log || true
else
  echo "WARN: dashboard seed failed — corpus is still usable; see /tmp/workshop-dashboards.log"
  tail -80 /tmp/workshop-dashboards.log || true
fi

echo "Installing dashboard-tour workflow into $KIBANA_URL"
if python3 /tmp/seed_cisco_jina_workflow.py > /tmp/workshop-workflow.log 2>&1; then
  tail -20 /tmp/workshop-workflow.log || true
else
  echo "WARN: workflow seed failed — dashboards may still be usable; see /tmp/workshop-workflow.log"
  tail -60 /tmp/workshop-workflow.log || true
fi

echo "done"
"""
    OUT.write_text(HEAD.read_text() + fragment)
    OUT.chmod(0o755)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
