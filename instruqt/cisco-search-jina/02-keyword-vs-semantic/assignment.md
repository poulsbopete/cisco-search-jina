---
slug: keyword-vs-semantic
type: challenge
title: The tech — Kapil live demo
teaser: Embeddings, multimodal Jina v5, keyword vs semantic on the same query.
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
timelimit: 900
---

# Embeddings, multimodal, live ranking

**Kapil Jadhav owns this block (10–25, including 5 min demo).** Peter stays off the main thread unless Kapil invites a Cisco example.

<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=tech" width="100%" height="520" style="border:0;border-radius:12px" allow="fullscreen"></iframe>

## What Kapil covers

- Embeddings turn **meaning** into numbers. “Legal concerns” and “vendor lock-in fears” can sit in one space.
- **Jina v5 multimodal:** text, images, audio, video. Call recordings, decks, and deal notes can retrieve each other.
- ROI: fewer false positives, more confident decisions.

## Live demo (5 min) — two panes

Open the Vercel app (same query both sides):

[https://cisco-search-jina.vercel.app/demo](https://cisco-search-jina.vercel.app/demo)

1. Query: `legal concerns about vendor lock-in`
2. Then: `switching costs on a collaboration stack` (keyword goes quiet; semantic still finds the deck + GC notes)
3. Then: `legal hold` (keyword lights up Umbrella e-discovery — a **false friend**)

## On Serverless

In [button label="Elastic Serverless Search"](tab-0) Discover, search `cisco-jina-corpus`:

```text
legal
```

Then compare documents whose **concepts** include `vendor-lock-in` but whose **text** never says “legal concerns” (deck + transcript).

## Success

- You can explain why keyword and semantic disagree on the same Cisco-shaped corpus.
- You ran the three demo queries (or equivalent) on the Vercel pane.
