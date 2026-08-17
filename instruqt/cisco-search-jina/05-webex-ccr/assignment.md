---
slug: webex-ccr
id: zmewr7hksnrp
type: challenge
title: Webex / Infra — East + West
teaser: Same relevance across US Gov regions. CCR replicates; search stays local.
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
timelimit: 480
enhanced_loading: null
---

# Webex / Infrastructure

**Ivan on the region toggle. Peter on CCR vs query-time cross-region (you do not want the latter in Gov).**

<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=webex" width="100%" height="480" style="border:0;border-radius:12px" allow="fullscreen"></iframe>

## Demo

[https://cisco-search-jina.vercel.app/webex](https://cisco-search-jina.vercel.app/webex)

1. Search US Gov East, then West, same query.
2. Ranking neighborhood should agree even when the local copy differs (deck in West, transcript in East).
3. Runbook doc: replicate with **CCR**, search **locally**, keep synonyms + model with the cluster.

## On Serverless

```esql
FROM cisco-jina-corpus
| WHERE region == "us-gov-east" OR region == "us-gov-west"
| STATS count = COUNT(*) BY region, source
```

## Success

- You can say “CCR + local search” without implying a single global query plane for US Gov.
