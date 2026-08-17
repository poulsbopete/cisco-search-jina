---
slug: webex-ccr
id: zmewr7hksnrp
type: challenge
title: Webex / Infra — East + West
teaser: Same ES|QL in us-gov-east and us-gov-west. CCR copies; search stays local.
notes:
- type: text
  contents: |
    ## While you wait…

    <iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=webex"
      width="100%" height="1400" frameborder="0"
      style="border-radius:8px;display:block;width:100%;min-height:900px;aspect-ratio:16/9;border:0">
    </iframe>
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
timelimit: 360
enhanced_loading: null
---

# Webex / Infra — East + West

This lab project is **one** region. The `region` field on each doc is how we practice **CCR + local search**: same query, slice East then West. Stay in ES|QL. **Do not use KQL.**

Open [button label="Elastic Serverless Search"](tab-0). If **0 documents processed**, set the time picker to **Last 24 hours**.

## 1 — Counts by region

```esql
FROM "cisco-jina-corpus"
| STATS docs = COUNT(*) BY region, source
| SORT region, source
```

## 2 — Same intent, East only

```esql
FROM "cisco-jina-corpus"
| WHERE region == "us-gov-east"
  AND concepts IN ("vendor-lock-in", "legal-review", "webex", "ccr")
| KEEP title, system, region, concepts
```

## 3 — Same intent, West only

```esql
FROM "cisco-jina-corpus"
| WHERE region == "us-gov-west"
  AND concepts IN ("vendor-lock-in", "legal-review", "webex", "ccr")
| KEEP title, system, region, concepts
```

Copies differ (transcript vs deck) but the **concepts** should still retrieve. That is the ranking-must-not-drift story: CCR replicates the index; you search locally; you do not query across the US-Gov boundary.

## 4 — CCR runbook

```esql
FROM "cisco-jina-corpus"
| WHERE source == "infra"
| KEEP title, region, content
```

## Success

- You ran the same ES|QL sliced by `region`.
- You can explain CCR + local search without a global Gov query plane.
