---
slug: keyword-vs-semantic
id: 5z1utyxhg6sp
type: challenge
title: Keyword vs semantic
teaser: Same corpus, two ES|QL queries — MATCH tokens vs concept neighborhood.
notes:
- type: text
  contents: |
    <div style="width:min(1120px,92vw);max-width:92vw;margin-left:50%;transform:translateX(-50%);box-sizing:border-box">
    <iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&v=6"
      width="1120" height="620" frameborder="0" scrolling="no"
      style="border-radius:8px;display:block;width:100%;min-width:100%;height:620px;border:0;background:#061525">
    </iframe>
    </div>
tabs:
- id: a8soimgdzqmm
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
timelimit: 480
enhanced_loading: null
---

# Keyword vs semantic — ES|QL then AI Agent

Stay in this Kibana tab. Start in **Discover → ES|QL**. **Do not use KQL.** Do not run `FROM *,-.*`.

MATCH is the OpenSearch ceiling (keyword, no embeddings). `MV_INTERSECTS(concepts, [...])` is the Elastic + Jina motion — any overlapping concept, not just tokens. Do **not** use `concepts IN (...)`: `concepts` is multi-valued, so `IN` matches nothing.

Seeded index: **`"cisco-jina-corpus"`**. If you see **0 documents processed**, set the time picker to **Last 24 hours** (not Last 15 minutes), then run:

Open [button label="Elastic Serverless Search"](tab-0).

## 1 — Confirm the corpus

```esql
FROM "cisco-jina-corpus"
| STATS docs = COUNT(*)
```

You should see **14**. If you see **0**, this lab never seeded — **Stop** and start a new invite. Then:

```esql
FROM "cisco-jina-corpus"
| KEEP title, source, account, region, concepts, content
| LIMIT 20
```

You should see deals, notes, lifecycle payloads, Webex artifacts, and CIRCUIT proxy events.

## 2 — Lexical (token) search

This is the keyword-shaped question: MATCH the word **legal**.

```esql
FROM "cisco-jina-corpus"
| WHERE MATCH(content, "legal")
| KEEP title, account, concepts, content
```

Note **Umbrella** (e-discovery legal hold). That is a false friend for a lock-in search.

## 3 — Concept neighborhood (semantic-shaped)

Same business intent — vendor lock-in / counsel / switching costs — without requiring the tokens “legal concerns”:

```esql
FROM "cisco-jina-corpus"
| WHERE MV_INTERSECTS(concepts, ["vendor-lock-in", "legal-review", "switching-cost"])
| KEEP title, account, concepts, content
```

Compare the two result sets. The deck / GC notes should appear here even when they never say “legal concerns”.

## 4 — False friend

```esql
FROM "cisco-jina-corpus"
| WHERE MATCH(content, "legal hold")
| KEEP title, concepts, content
```

## 5 — Same answers with AI Agent

Open **AI Agent** in this Kibana (the chat panel next to Discover — not Agent Builder). Ask in plain language what you just proved in ES|QL:

> In `cisco-jina-corpus`, compare keyword matches for “legal” vs documents about vendor lock-in or switching costs. Why is Umbrella a false friend?

You should get the same story: keyword hits legal-hold noise; concept / semantic neighborhood finds counsel and lock-in deals. ES|QL is precise and auditable; AI Agent is a faster way to ask the same question.

## Success

- You queried **`cisco-jina-corpus`** with ES|QL.
- You can explain why MATCH("legal") and `MV_INTERSECTS(concepts, [...])` disagree.
- You asked **AI Agent** the same question and can compare the two approaches.
