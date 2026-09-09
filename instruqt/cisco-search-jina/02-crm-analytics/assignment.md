---
slug: crm-analytics
id: 6eq0qbedvzi8
type: challenge
title: CRM Analytics — find deals like this
teaser: Similar CRM deals with explainable concepts. Acme vs Umbrella in ES|QL.
notes:
- type: text
  contents: |
    <div style="width:min(1120px,92vw);max-width:92vw;margin-left:50%;transform:translateX(-50%);box-sizing:border-box">
    <iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=crm&v=6"
      width="1120" height="620" frameborder="0" scrolling="no"
      style="border-radius:8px;display:block;width:100%;min-width:100%;height:620px;border:0;background:#061525">
    </iframe>
    </div>
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

## 4 — Same answers with AI Agent

Open **AI Agent** in this Kibana (chat next to Discover). Ask:

> Using `cisco-jina-corpus`, find CRM deals like Acme’s Webex renewal (vendor lock-in / legal review). Explain why Umbrella’s “legal” deal is not a good match.

Compare the Agent’s explanation to your ES|QL in steps 2–3. Same corpus, two ways to ask: precise ES|QL or natural language.

## Success

- You listed CRM deals with account / competitor / concepts in ES|QL.
- You can say why Umbrella is a keyword trap for “find deals like Acme.”
- You used **AI Agent** to reach the same conclusion in plain language.
