---
slug: opening-why-cisco
type: challenge
title: Opening — Aaron, then Peter
teaser: Intros, Cisco-wide problem frame, Gartner time tax. Slides first.
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

# Opening & why this matters to Cisco

**Aaron Byers (0–5)** opens. **Peter Simkins (5–10)** frames the Cisco-wide problem. Do not start in Discover until Aaron hands to Peter.

<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=opening" width="100%" height="520" style="border:0;border-radius:12px" allow="fullscreen"></iframe>

## Aaron — what to say

- Four voices today: Aaron, Peter, **Kapil Jadhav**, **Ivan Silva**. This is not a Peter-only hour.
- Outcome: one Cisco story across **CRM Analytics (Anshul)**, **Lifecycle Platform (Balaji)**, and **Webex / Infra**.
- Lab: each of you has **Elastic Cloud Serverless Search**. Slides and click-demos live on Vercel (no keys in git).

## Peter — problem frame

Cisco teams already own search across **deal data, transaction data, system logs, and unstructured notes**.

| Today | Tomorrow |
| --- | --- |
| Keyword + manual correlation | Semantic search + AI insights |
| Great pipes (MuleSoft, Snowflake, OpenSearch, S3) | Understanding *on top* of those pipes |

**Stat:** reps spend **4–8 hours/week** finding similar deals; managers **4–7 hours/week** building forecast narratives. Source: [Gartner seller time spend](https://www.gartner.com/en/sales/research/seller-time-spend-assessment).

## Orient the lab (after the slides)

Open [button label="Elastic Serverless Search"](tab-0). Confirm index **`cisco-jina-corpus`** exists (Discover or Data views). Time picker: **Last 7 days** is fine — this corpus is not time-series heavy.

## Success

- Room has heard the Cisco-wide story and who speaks next (Kapil).
- Serverless Kibana loads. Index `cisco-jina-corpus` is present.
