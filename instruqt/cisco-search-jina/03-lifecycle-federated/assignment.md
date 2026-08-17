---
slug: lifecycle-federated
id: yaojzusqumuc
type: challenge
title: Lifecycle — federated sources
teaser: Snowflake + S3 + OpenSearch in one question. Semantic on ~10 MB payloads.
tabs:
- id: bsonkefngbfp
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

# Lifecycle Platform — federated search

Cisco story for **Lifecycle Platform (Balaji's team):** one question across Snowflake facts, S3 payloads, and OpenSearch logs. MuleSoft is the pipe; search is the understanding layer.

## 1 — Toggle sources

Open [https://cisco-search-jina.vercel.app/lifecycle](https://cisco-search-jina.vercel.app/lifecycle)

Question: **Show me transactions from this account over 6 months.**

1. Leave Snowflake + S3 + OpenSearch on.
2. Turn **OpenSearch** off — provisioning noise drops; counsel language in the S3 payload remains.
3. Note the **~10 MB** invoice pack: keyword on invoice ID misses legal language inside the payload.

## 2 — Lifecycle docs on Serverless

In [button label="Elastic Serverless Search"](tab-0):

```esql
FROM cisco-jina-corpus
| WHERE source == "lifecycle"
| KEEP title, system, bytes, content
```

## Success

- You can describe federated search without “copy Snowflake into Elastic first.”
- You found a fat payload document that semantic ranking can surface from a business question.
