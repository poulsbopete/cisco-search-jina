---
slug: keyword-vs-semantic
id: 5z1utyxhg6sp
type: challenge
title: Keyword vs semantic
teaser: Run the same query two ways. See what keyword misses and what semantic ranks.
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
timelimit: 900
enhanced_loading: null
---

# Keyword vs semantic

Your lab is a per-learner **Elastic Cloud Serverless Search** project. Seeded index: **`cisco-jina-corpus`** (deals, notes, transactions, Webex artifacts).

Optional background (slides live on Vercel — not part of this lab): [cisco-search-jina.vercel.app/slides](https://cisco-search-jina.vercel.app/slides)

## 1 — Split-pane demo

Open [https://cisco-search-jina.vercel.app/demo](https://cisco-search-jina.vercel.app/demo) and run these queries on **both** sides:

1. `legal concerns about vendor lock-in`
2. `switching costs on a collaboration stack` — keyword goes quiet; semantic still finds the deck and GC notes
3. `legal hold` — keyword lights up Umbrella e-discovery (a **false friend** for a lock-in search)

## 2 — Same corpus on Serverless

Open [button label="Elastic Serverless Search"](tab-0). In Discover, search **`cisco-jina-corpus`**.

KQL:

```text
legal
```

Then find documents whose **concepts** include `vendor-lock-in` but whose **text** never says “legal concerns” (deck + transcript).

## Success

- You can explain why keyword and semantic disagree on the same corpus.
- You ran the three queries on the Vercel demo.
