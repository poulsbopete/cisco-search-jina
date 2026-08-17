---
slug: lifecycle-federated
id: yaojzusqumuc
type: challenge
title: Lifecycle Platform — Balaji's team
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
timelimit: 600
enhanced_loading: null
---

# Lifecycle Platform (Balaji's team)

**Ivan toggles sources. Peter keeps MuleSoft / Snowflake as the pipes, Elastic as understanding.**

<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=lifecycle" width="100%" height="480" style="border:0;border-radius:12px" allow="fullscreen"></iframe>

## Demo

[https://cisco-search-jina.vercel.app/lifecycle](https://cisco-search-jina.vercel.app/lifecycle)

Agent question: **Show me transactions from this account over 6 months.**

1. Leave Snowflake + S3 + OpenSearch on — facts, fat invoice XML, orchestration logs.
2. Turn OpenSearch off — provisioning noise drops; legal language in the S3 payload remains.
3. Call out **~10 MB** payload search: keyword on invoice ID misses counsel language inside XML.

## On Serverless

```esql
FROM cisco-jina-corpus
| WHERE source == "lifecycle"
| KEEP title, system, bytes, content
```

## Success

- You can describe federated search without “copy Snowflake into Elastic first.”
- You saw a fat payload document that semantic ranking can surface from a business question.
