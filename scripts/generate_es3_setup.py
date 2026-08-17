#!/usr/bin/env python3
"""Build track_scripts/setup-es3-api from the nginx/project head + embedded seed."""
from __future__ import annotations

import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TRACK = ROOT / "instruqt" / "cisco-search-jina"
HEAD = ROOT / "scripts" / "setup-es3-api.head"
SEED = TRACK / "track_scripts" / "seed_cisco_search.py"
CORPUS = ROOT / "data" / "workshop-corpus.json"
OUT = TRACK / "track_scripts" / "setup-es3-api"


def b64(path: Path) -> str:
    return base64.b64encode(path.read_bytes()).decode("ascii")


def main() -> None:
    if not HEAD.is_file():
        raise SystemExit(f"missing {HEAD}")
    fragment = f"""# Workshop seed — always index cisco-jina-corpus (do not gate on WORKSHOP_SEED)
set -euo pipefail

echo "Materializing Cisco + Jina seed assets under /tmp..."
base64 -d <<'CISCO_JINA_CORPUS' > /tmp/workshop-corpus.json
{b64(CORPUS)}
CISCO_JINA_CORPUS
base64 -d <<'CISCO_JINA_SEED_PY' > /tmp/seed_cisco_search.py
{b64(SEED)}
CISCO_JINA_SEED_PY

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

echo "done"
"""
    OUT.write_text(HEAD.read_text() + fragment)
    OUT.chmod(0o755)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
