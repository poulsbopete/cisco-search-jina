# Instruqt workshop Kibana assets

Everything Elastic for this workshop is seeded into the **per-learner Serverless Search** project at track setup. Facilitator deep links also use Search-AI with the same corpus + keep-alive workflow.

| Path | Purpose |
| --- | --- |
| `dashboards/*.json` | Five ES\|QL dashboards (Dashboard API); heroes use library markdown `ref_id` |
| `markdown/*.md` | Talking-point markdown saved objects (`cisco-jina-md-*`) |
| `workflows/cisco-jina-dashboard-notes.yaml` | Scheduled every **10m** (+ manual); refreshes markdown panels + touches corpus `@timestamp` |
| `workflows/cisco-jina-keep-alive.yaml` | Scheduled every **15m**; stamps `@timestamp=now` so dashboards stay in `now-7d` |

Installers: `track_scripts/seed_cisco_jina_dashboards.py`, `seed_cisco_jina_workflow.py`, `seed_cisco_jina_ml.py` (embedded into `setup-es3-api` by `scripts/generate_es3_setup.py`).

ML: setup also seeds index `cisco-jina-circuit-metrics` and anomaly job `cisco-jina-circuit-tokens` (Machine Learning → Anomaly detection).

```bash
python3 scripts/generate_es3_setup.py
cd instruqt/cisco-search-jina && instruqt track push --force
```

Learners need a **new** invite after push.
