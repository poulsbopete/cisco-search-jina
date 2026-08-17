# Cisco-wide semantic search

Interactive demos and slides for semantic search over deals, transactions, logs, and notes — Elastic Serverless Search with Jina relevance. Repo: [poulsbopete/cisco-search-jina](https://github.com/poulsbopete/cisco-search-jina).

**No API keys in git.** App URLs only. Instruqt creates per-learner Serverless projects via the `ESS_CLOUD_API_KEY` Instruqt secret (never committed).

Live app: https://cisco-search-jina.vercel.app  
Hands-on lab: https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq

## Labs (self-paced)

1. Keyword vs semantic
2. CRM Analytics — find deals like this
3. Lifecycle — federated Snowflake + S3 + OpenSearch
4. Webex / Infra — US Gov East + West, CCR + local search

## App

```bash
npm install
cp .env.example .env.local   # URLs only — no secrets
npm run dev
```

| Path | Use |
| --- | --- |
| `/slides` | Narrative deck |
| `/demo` | Keyword vs semantic |
| `/crm` | CRM Analytics |
| `/lifecycle` | Lifecycle Platform |
| `/webex` | East / West + CCR |
| `/bundle` | Elastic vs Jina vs together |

Interactive ranking uses a local synonym/concept replica so the repo stays key-free.

## Push the track

```bash
python3 scripts/generate_es3_setup.py
cd instruqt/cisco-search-jina
instruqt track push --force
```

Secrets on the track (Instruqt UI, not git): `ESS_CLOUD_API_KEY`, `LLM_PROXY_PROD`.
