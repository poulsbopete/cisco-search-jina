---
slug: crm-analytics
id: 6eq0qbedvzi8
type: challenge
title: CRM Analytics — find deals like this
teaser: Similar deals with explainability. Account → deal → competitor. Why it matched.
tabs:
- id: rlkxkwgckcyc
  title: Elastic Serverless Search
  type: service
  hostname: es3-api
  path: /app/discover
  port: 8080
  custom_request_headers:
  - key: Content-Security-Policy
    value: 'script-src ''self'' https://kibana.estccdn.com; worker-src blob: ''self'';
      style-src ''unsafe-inline'' ''self'' https://kibana.estccdn.com; style-src-elem
      ''unsafe-inline'' ''self'' https://kibana.estccdn.com'
  custom_response_headers:
  - key: Content-Security-Policy
    value: 'script-src ''self'' https://kibana.estccdn.com; worker-src blob: ''self'';
      style-src ''unsafe-inline'' ''self'' https://kibana.estccdn.com; style-src-elem
      ''unsafe-inline'' ''self'' https://kibana.estccdn.com'
difficulty: intermediate
timelimit: 720
enhanced_loading: null
---

# CRM Analytics — find deals like this

Cisco story for **CRM Analytics (Anshul's team):** similar-deal search with a reason for every hit — not a black-box score.

## 1 — Deal intelligence demo

Open [https://cisco-search-jina.vercel.app/crm](https://cisco-search-jina.vercel.app/crm)

1. Seed deal = **Acme Webex Calling renewal**
2. Graph: Account → Deal → Competitor (Teams / Zoom)
3. **Why these matched** — shared concepts, not a mystery rank

## 2 — CRM docs on Serverless

In [button label="Elastic Serverless Search"](tab-0), run:

```esql
FROM cisco-jina-corpus
| WHERE source == "crm"
| KEEP title, account, competitors, concepts, content
```

Compare **Acme** vs **Umbrella**: both mention “legal”; only one is a lock-in motion. Umbrella is e-discovery **legal hold** — a keyword trap.

## Success

- You can describe “find deals like this” with explainability.
- You can say why Umbrella should not win a vendor-lock-in query.
