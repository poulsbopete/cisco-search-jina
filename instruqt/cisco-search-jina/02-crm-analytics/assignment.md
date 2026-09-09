---
slug: crm-analytics
id: 6eq0qbedvzi8
type: challenge
title: CRM Analytics — find deals like this
teaser: Similar CRM deals with explainable concepts. Acme vs Umbrella in ES|QL.
notes:
- type: text
  contents: |
    ## While you wait…

    Skim the storyboard (Search · Jina · deploy options). Use **Prev / Next** inside the frame.

    <p><a href="https://cisco-search-jina.vercel.app/slides?section=crm&v=3" target="_blank" rel="noopener noreferrer">Open full slides in a new tab</a></p>

    <iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=crm&v=3"
      width="100%" height="360" frameborder="0"
      style="border-radius:8px;display:block;width:100%;height:360px;max-height:40vh;border:0;background:#09090b">
    </iframe>

tabs:
- id: rlkxkwgckcyc
  title: Elastic Serverless Search
  type: service
  hostname: es3-api
  path: /app/discover#/?_g=(time:(from:now-24h,to:now))
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

# CRM Analytics — find deals like this

**CRM Analytics:** similar-deal search with a reason on every row. Stay in ES|QL. **Do not use KQL.**

Open [button label="Elastic Serverless Search"](tab-0). Stay in ES|QL. **Do not use KQL.**

If the query shows **0 documents processed**, the time picker is hiding the corpus. Click the time range (often **Last 15 minutes**) and choose **Last 24 hours**. Keep `AND` on the same `WHERE` line — do not start a new pipe with `| AND`.

## 1 — CRM rows + graph fields

```esql
FROM "cisco-jina-corpus"
| WHERE source == "crm"
| KEEP title, account, competitors, concepts, content
```

Seed deal: **Acme Corp — Webex Calling + Control Hub renewal**. Graph: Account → Deal → Competitor.

## 2 — Deals like Acme (explainable)

```esql
FROM "cisco-jina-corpus"
| WHERE source == "crm" AND MV_INTERSECTS(concepts, ["vendor-lock-in", "legal-review", "webex"])
| KEEP title, account, competitors, concepts
```

## 3 — Why Umbrella should lose

```esql
FROM "cisco-jina-corpus"
| WHERE source == "crm" AND MATCH(content, "legal")
| KEEP title, account, concepts, content
```

Acme is lock-in / counsel. Umbrella is **legal hold** on email archive — same token, different motion.

## Success

- You listed CRM deals with account / competitor / concepts in ES|QL.
- You can say why Umbrella is a keyword trap for “find deals like Acme.”
