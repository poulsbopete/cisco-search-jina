---
slug: keyword-vs-semantic
id: 5z1utyxhg6sp
type: challenge
title: Keyword vs semantic
teaser: Same corpus, two ES|QL queries — MATCH tokens vs concept neighborhood.
notes:
- type: text
  contents: |
    ## While you wait…

    <iframe src="https://cisco-search-jina.vercel.app/slides?embed=1"
      width="100%" height="1400" frameborder="0"
      style="border-radius:8px;display:block;width:100%;min-height:900px;aspect-ratio:16/9;border:0">
    </iframe>
tabs:
- id: a8soimgdzqmm
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

# Keyword vs semantic — ES|QL only

Stay in this Kibana tab. Use **ES|QL** (Discover’s query editor). **Do not use KQL.** Do not run `FROM *,-.*` — that misses the lab index.

MATCH is the OpenSearch ceiling (keyword, no embeddings). `concepts IN (...)` is the Elastic + Jina motion — meaning, not just tokens.

Seeded index: **`"cisco-jina-corpus"`**. Set the time picker to **Last 24 hours** (not Last 15 minutes), then run:

Open [button label="Elastic Serverless Search"](tab-0).

## 1 — Confirm the corpus

```esql
FROM "cisco-jina-corpus"
| KEEP title, source, account, region, concepts, content
| LIMIT 20
```

You should see deals, notes, lifecycle payloads, and Webex artifacts.

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
| WHERE concepts IN ("vendor-lock-in", "legal-review", "switching-cost")
| KEEP title, account, concepts, content
```

Compare the two result sets. The deck / GC notes should appear here even when they never say “legal concerns”.

## 4 — False friend

```esql
FROM "cisco-jina-corpus"
| WHERE MATCH(content, "legal hold")
| KEEP title, concepts, content
```

## Success

- You queried **only** `cisco-jina-corpus` with ES|QL.
- You can explain why MATCH("legal") and `concepts IN (...)` disagree.
