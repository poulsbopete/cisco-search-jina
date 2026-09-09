# Instruqt workshop Kibana assets

Everything Elastic for this workshop is seeded into the **per-learner Serverless Search** project at track setup. There is no shared Search-AI dependency.

| Path | Purpose |
| --- | --- |
| `dashboards/*.json` | Five ES|QL dashboards (Dashboard API) |
| `workflows/cisco-jina-dashboard-tour.yaml` | Facilitator markdown tour (`waitForInput`) |

Installers: `track_scripts/seed_cisco_jina_dashboards.py`, `seed_cisco_jina_workflow.py` (embedded into `setup-es3-api` by `scripts/generate_es3_setup.py`).

```bash
python3 scripts/generate_es3_setup.py
cd instruqt/cisco-search-jina && instruqt track push --force
```

Learners need a **new** invite after push.
