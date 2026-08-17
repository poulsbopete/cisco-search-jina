---
slug: lifecycle-federated
id: yaojzusqumuc
type: challenge
title: Lifecycle — federated sources
teaser: Snowflake + S3 + Elastic logs in one ES|QL. Drop a source. See the fat payload.
notes:
- type: text
  contents: |
    ## While you wait…

    <iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=lifecycle"
      width="100%" height="1400" frameborder="0"
      style="border-radius:8px;display:block;width:100%;min-height:900px;aspect-ratio:16/9;border:0">
    </iframe>
tabs:
- id: bsonkefngbfp
  title: Elastic Serverless Search
  type: service
  hostname: es3-api
  path: '/app/discover#/?_g=(time:(from:now-24h,to:now))'
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
timelimit: 420
enhanced_loading: null
---

# Lifecycle — federated sources

One question across Snowflake facts, S3 payloads, and Elastic logs. MuleSoft is the pipe. Stay in ES|QL. **Do not use KQL.**

Open [button label="Elastic Serverless Search"](tab-0). If **0 documents processed**, set the time picker to **Last 24 hours**.

## 1 — All lifecycle sources for Acme

```esql
FROM "cisco-jina-corpus"
| WHERE source == "lifecycle" AND account == "Acme Corp"
| KEEP title, system, bytes, content
```

You should see Snowflake, S3 (~10 MB invoice pack), and Elastic orchestration logs.

## 2 — Drop Elastic logs (provisioning noise)

```esql
FROM "cisco-jina-corpus"
| WHERE source == "lifecycle" AND account == "Acme Corp" AND system != "Elastic"
| KEEP title, system, bytes, content
```

Counsel language stays in the **S3** payload. The log line is gone.

## 3 — Fat payload vs invoice-ID thinking

```esql
FROM "cisco-jina-corpus"
| WHERE system == "S3" AND MATCH(content, "termination counsel")
| KEEP title, bytes, content
```

A keyword search on invoice ID would miss this. MATCH on payload text finds it.

## Success

- You filtered federated `system` values in one ES|QL.
- You found the large S3 payload with counsel language inside.
