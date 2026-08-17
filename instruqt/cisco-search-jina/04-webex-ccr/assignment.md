---
slug: webex-ccr
id: zmewr7hksnrp
type: challenge
title: Webex / Infra — East + West
teaser: Same relevance in US Gov East and West. CCR replicates; search stays local.
tabs:
- id: gs4xqwjgvkuz
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
timelimit: 600
enhanced_loading: null
---

# Webex / Infrastructure — multi-region

Cisco story for **Webex / Infra:** consistent relevance in **US Gov East** and **US Gov West**. Replicate with CCR. Query locally — do not send searches across the Gov boundary at query time.

Optional bundle recap (Elastic vs Jina): [cisco-search-jina.vercel.app/bundle](https://cisco-search-jina.vercel.app/bundle)

## 1 — Region toggle

Open [https://cisco-search-jina.vercel.app/webex](https://cisco-search-jina.vercel.app/webex)

1. Search **US Gov East**, then **West**, same query.
2. The ranking neighborhood should agree even when the local copy differs (deck in West, transcript in East).
3. Read the CCR runbook hit: replicate the index, search locally, keep synonyms + model with the cluster.

## 2 — Region breakdown on Serverless

In [button label="Elastic Serverless Search"](tab-0):

```esql
FROM cisco-jina-corpus
| WHERE region == "us-gov-east" OR region == "us-gov-west"
| STATS count = COUNT(*) BY region, source
```

## Success

- You can explain **CCR + local search** without a single global query plane for US Gov.
- You compared East vs West on the same query.
