# Cisco-wide semantic search workshop

Self-paced **Instruqt labs** on Elastic Cloud Serverless Search, plus a **Vercel** app for slides and click-demos. Repo: [poulsbopete/cisco-search-jina](https://github.com/poulsbopete/cisco-search-jina).

Talking points (Aaron / Peter / Kapil / Ivan) live on the Vercel deck — they are **not** Instruqt challenges.

**Ungated lab invite:** [https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq](https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq)

**No API keys in git.** Facilitator Kibana: `https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/` (URL only). Instruqt creates per-learner Serverless projects via the `ESS_CLOUD_API_KEY` *Instruqt secret* (never committed).

## Instruqt labs (self-paced)

1. Keyword vs semantic
2. CRM Analytics — find deals like this (Anshul's team)
3. Lifecycle — federated Snowflake + S3 + OpenSearch (Balaji's team)
4. Webex / Infra — US Gov East + West, CCR + local search

## Live session (slides only)

| Minutes | Owner | Deck |
| --- | --- | --- |
| 0–5 | Aaron Byers (Elastic AE) | `/slides?section=opening` |
| 5–10 | Peter Simkins (Elastic SA) | `/slides?section=cisco` |
| 10–25 | Kapil Jadhav | `/slides?section=tech` + `/demo` |
| 20–30 | Peter + Ivan Silva | `/crm` `/lifecycle` `/webex` |
| 30–35 | Peter | `/slides?section=bundle` |
| After | Learners | This Instruqt track |

## Vercel app

```bash
npm install
cp .env.example .env.local   # URLs only — no secrets
npm run dev
```

| Path | Use |
| --- | --- |
| `/slides?embed=1&section=opening` | Live talk / embed (`cisco`, `tech`, `crm`, `lifecycle`, `webex`, `bundle`) |
| `/demo` | Keyword vs semantic |
| `/crm` | Anshul's team |
| `/lifecycle` | Balaji's team |
| `/webex` | East / West + CCR |
| `/bundle` | Elastic vs Jina vs together |

The Vercel UI ranks a **workshop replica** of Jina-style neighborhoods (synonyms + concepts) so the repo stays key-free. Live Elastic is the Serverless project in Instruqt.

## Push the track

```bash
python3 scripts/generate_es3_setup.py
cd instruqt/cisco-search-jina
instruqt track push --force
```

Secrets on the track (Instruqt UI, not git): `ESS_CLOUD_API_KEY`, `LLM_PROXY_PROD`.
