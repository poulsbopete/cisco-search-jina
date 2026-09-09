# Kibana assets (Search-AI)

Versioned Vega-Lite specs and the facilitator workflow for the Cisco + Jina workshop.

## Dashboards

Deployed to https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud (IDs in `manifest.json`).

| Track | Specs |
| --- | --- |
| Keyword vs semantic | `vega/01-*.json` |
| CRM Analytics | `vega/02-*.json` |
| Lifecycle | `vega/03-*.json` |
| Webex CCR | `vega/04-*.json` |
| CIRCUIT ECS | `vega/05-*.json` |

Each live dashboard also has a **markdown** panel describing what the charts show.

## Workflow

`workflows/cisco-jina-dashboard-tour.yaml` — manual tour with `waitForInput` **markdown** messages linking each dashboard. Workflow id: `cisco-jina-dashboard-tour`.

## Redeploy

```bash
export KIBANA_URL="https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud"
export KIBANA_API_KEY="…"   # Search-AI key with dashboards + workflows privileges
# Optional: re-seed corpus first
export ES_URL="https://ai-assistants-ffcafb.es.us-east-1.aws.elastic.cloud"
export ES_API_KEY="$KIBANA_API_KEY"
python3 instruqt/cisco-search-jina/track_scripts/seed_cisco_search.py
python3 scripts/deploy_kibana_vega_dashboards.py
```

Requires the [kibana-vega](https://github.com/) Cursor skill CLI at `~/.cursor/skills/kibana-vega/scripts/kibana-vega.js`.
