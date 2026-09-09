# Kibana assets (Search-AI + Instruqt)

## Shared Search-AI (facilitator)

Vega-Lite specs under `vega/` deploy to https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud (IDs in `manifest.json`). Facilitator tour: `workflows/cisco-jina-dashboard-tour.yaml`.

```bash
export KIBANA_URL="https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud"
export KIBANA_API_KEY="…"
python3 scripts/deploy_kibana_vega_dashboards.py
```

## Per-learner Instruqt labs

Dashboards are **seeded into each Serverless Search project** at track start (not copied from Search-AI). Specs live in `instruqt/cisco-search-jina/workshop-assets/dashboards/` and are installed by `seed_cisco_jina_dashboards.py` during `setup-es3-api`.

After editing dashboard JSON or seed scripts:

```bash
python3 scripts/generate_es3_setup.py
# then from instruqt/cisco-search-jina:
instruqt track push --force
```

Learners need a **new** lab invite to pick up seeded dashboards.
