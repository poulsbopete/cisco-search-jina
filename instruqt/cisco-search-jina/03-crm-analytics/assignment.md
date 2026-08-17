---
slug: crm-analytics
type: challenge
title: CRM Analytics — Anshul's team
teaser: Find deals like this one. Graph account → deal → competitor. Explain the match.
tabs:
- id: kibana
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
---

# CRM Analytics (Anshul's team)

**Ivan Silva drives the UI. Peter ties it to forecast hours.** Anshul's team is the named owner — speak to them, not past them.

<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=crm" width="100%" height="480" style="border:0;border-radius:12px" allow="fullscreen"></iframe>

## Demo

[https://cisco-search-jina.vercel.app/crm](https://cisco-search-jina.vercel.app/crm)

Walk:

1. **Deal intelligence** — seed = Acme Webex Calling renewal.
2. **Knowledge graph** — Account → Deal → Competitor (Teams / Zoom).
3. **Why this matched** — concepts, not a mystery score.

## On Serverless

Discover `cisco-jina-corpus`, filter `source: crm` (or KQL `source: crm`). Compare Acme vs Umbrella: both mention “legal”; only one is a **lock-in** motion.

```esql
FROM cisco-jina-corpus
| WHERE source == "crm"
| KEEP title, account, competitors, concepts, content
```

## Success

- You can tell the “find deals like this” story with explainability.
- You know why Umbrella (legal hold) is a keyword trap for Anshul's analysts.
