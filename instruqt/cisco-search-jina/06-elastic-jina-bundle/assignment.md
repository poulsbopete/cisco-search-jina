---
slug: elastic-jina-bundle
type: challenge
title: Elastic + Jina — Peter close
teaser: Elastic runs search. Jina powers relevance. Asks for each Cisco team.
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
difficulty: beginner
timelimit: 600
---

# The bundle, then the ask

**Peter (30–35) owns the bundle. Aaron closes the room. Kapil and Ivan stay for Q&A in their lanes.**

<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=bundle" width="100%" height="480" style="border:0;border-radius:12px" allow="fullscreen"></iframe>

## Story

| | |
| --- | --- |
| **Elastic** | Storage, indexing, full-text, knowledge graphs, audit trails |
| **Jina** | State-of-the-art embeddings — multimodal, domain-specific, improving |
| **Together** | Elastic runs the search; Jina powers the relevance |

- **Why not just Jina:** embeddings API ≠ store, version, audit, explain.
- **Why not just Elasticsearch:** ES embeddings are good; Jina’s are better for multimodal enterprise content.

Real pattern: CRM in Elastic, embedded via Jina, queried with knowledge graphs. One-click answers.

Demo table: [https://cisco-search-jina.vercel.app/bundle](https://cisco-search-jina.vercel.app/bundle)

Shared Kibana (facilitators): [ai-assistants Kibana](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/)

## Asks (Aaron + Peter, named owners)

- **Anshul / CRM Analytics** — 2–3 “find deals like this” queries.
- **Balaji / Lifecycle** — one Snowflake fact + one fat S3 payload.
- **Webex / Infra** — East/West constraint + audit requirement.

## Success

- Room can repeat the bundle in one sentence.
- Each Cisco group has a named next artifact — not “Peter will follow up on everything.”
