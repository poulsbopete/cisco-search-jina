# Facilitator notes

**Three layers:** Vercel storyboard → shared Search-AI Kibana (your live talk) → Instruqt (learner hands-on). Do not point a room of learners at Search-AI for click-alongs — that is facilitator-only.

## Live talk (deck)

Name Cisco groups, not people: **CRM Analytics**, **Lifecycle Platform**, **Webex / Infrastructure**, **CIRCUIT** — and name the wider footprint when relevant: **Talos**, **ThousandEyes**, **SD-WAN / Viptela**, **Hypershield**, **ASIG**.

Short deck: offer → workshop teams → **across Cisco** (Talos, TE, Splunk O11Y, …) → AI-first + Jina → CIRCUIT LLM choice → deploy → lab.

- Opening / offer — `/slides?section=opening`
- Workshop teams — `/slides?section=cisco`
- Across Cisco — `/slides?section=footprint`
- CIRCUIT (LLM proxy · Elastic LLM and/or CIRCUIT) — `/slides?section=circuit` and `/circuit`
- Search + Jina — `/slides?section=tech` and `/demo`, `/bundle`
- Deploy — `/slides?section=deploy` and `/ech`, `/fips`
- Lab CTA — `/slides?section=lab`

**CIRCUIT attendees:** CIRCUIT is an **LLM proxy**. Customers choose **Elastic LLM**, **CIRCUIT**, or **both**. Elastic searches/alerts the ECS proxy stream either way; Jina for similar prompts/incidents. Production scale → Hosted or self-hosted; lab stays Serverless.

**Facilitator only (not on slides):** DCOS pipeline context — Talos is the largest security relationship; ThousandEyes GovCloud expansion is real but sensitive; Hypershield/ASIG are early. Customer-facing deck must not say “pipeline,” “white space,” “OEM,” or “POC.” **Splunk Observability** runs **OSS Elasticsearch** — frame as upgrade to supported Enterprise / Hosted.

Deck: https://cisco-search-jina.vercel.app/slides

## Labs (Instruqt)

Each invite creates a **per-learner Serverless Search** project. Setup seeds:

1. Index `cisco-jina-corpus` (14 docs)
2. Five dashboards under **Dashboards**
3. Workflow **Cisco Jina Workshop — Dashboard notes** (`cisco-jina-dashboard-notes`) — scheduled every **10 minutes** (no pauses); refreshes markdown talking-point strips on each dashboard
4. ML anomaly job **`cisco-jina-circuit-tokens`** on index `cisco-jina-circuit-metrics` (CIRCUIT proxy token / policy-deny time series) — open **Machine Learning → Anomaly detection**

ES|QL first in the Kibana tab, then an **AI Agent** step (Discover chat — not Agent Builder). No KQL. First query:

`FROM "cisco-jina-corpus" | KEEP title, source, account, region, concepts, content | LIMIT 20`

If Discover shows `FROM *,-.*` and 0 docs, replace the query with the one above. If status is **0 documents processed**, set time to **Last 24 hours**. An empty index from an old lab start cannot be repaired — Stop and start a new lab.

| Dashboard (seeded) | Id |
| --- | --- |
| Cisco Jina — Keyword vs semantic | `cisco-jina-keyword-vs-semantic` |
| Cisco Jina — CRM Analytics | `cisco-jina-crm` |
| Cisco Jina — Lifecycle federated search | `cisco-jina-lifecycle` |
| Cisco Jina — Webex CCR East / West | `cisco-jina-webex-ccr` |
| Cisco Jina — CIRCUIT LLM proxy (ECS) | `cisco-jina-circuit` |

Assets: `instruqt/cisco-search-jina/workshop-assets/`. After edits: `python3 scripts/generate_es3_setup.py` then `instruqt track push --force`.

Track (manage): https://play.instruqt.com/manage/elastic/tracks/cisco-search-jina  
Ungated invite: https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq

## Shared Search-AI (facilitator deep links)

Base: https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/

Corpus `cisco-jina-corpus` (14 docs) is already indexed. Each Vercel demo pane has **Open dashboard in Elastic** / **Open Discover (ES|QL)** / **Agent Builder**. Nav **Open Elastic** jumps to Discover with the first lab query.

| Beat | Dashboard | Discover |
| --- | --- | --- |
| Keyword vs semantic | [/app/dashboards#/view/cisco-jina-keyword-vs-semantic](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/dashboards#/view/cisco-jina-keyword-vs-semantic) | MATCH legal / vendor-lock-in from the pane |
| CRM | [/app/dashboards#/view/cisco-jina-crm](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/dashboards#/view/cisco-jina-crm) | `source == "crm"` |
| Lifecycle | [/app/dashboards#/view/cisco-jina-lifecycle](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/dashboards#/view/cisco-jina-lifecycle) | `source == "lifecycle"` |
| Webex CCR | [/app/dashboards#/view/cisco-jina-webex-ccr](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/dashboards#/view/cisco-jina-webex-ccr) | Gov East/West |
| CIRCUIT | [/app/dashboards#/view/cisco-jina-circuit](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/dashboards#/view/cisco-jina-circuit) | `source == "circuit"` |
| Agent Builder | [/app/agent_builder](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/agent_builder) | Paste the same natural-language question |
| Workflows | [/app/workflows](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/workflows) | Optional: show scheduled notes pattern |
| ML | [/app/ml/jobs](https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/ml/jobs) | CIRCUIT tokens job lives in Instruqt labs |

Override with `NEXT_PUBLIC_KIBANA_URL` if the project URL changes.

## Anti-patterns

- Challenges that name people instead of Cisco groups
- Skipping Umbrella “legal hold” (false-positive teaching moment)
- “We’ll follow up” with no Cisco group (CRM Analytics / Lifecycle / Webex Infra / CIRCUIT)
- Sending the whole room to Search-AI instead of Instruqt for hands-on

## Three layers

| Layer | URL | Job in the room |
| --- | --- | --- |
| Vercel storyboard | https://cisco-search-jina.vercel.app | Slides + visual aha. Does **not** query Elastic. |
| Shared Search-AI | https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/ | Facilitator product proof — dashboards, Discover, Agent Builder. |
| Instruqt | https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq | Per-learner Serverless Search — corpus, dashboards, ES|QL, AI Agent. |

The Webex East/West toggle on Vercel is an **architecture visual**. In Elastic / the lab, region filters on `cisco-jina-corpus` prove the same idea.

## ECH / Gov (sales guardrails)

- **FedRAMP Moderate / High** on Elastic Cloud Hosted is authorized today (see ECH tab).
- **IL5** — Elastic is **moving towards** IL5 certification for Hosted gov offerings. It is **not authorized yet**. Say “in progress” and point Cisco to their account team for timeline. Do not sell IL5 as available.

## ECH cost (TCO, not license line)

- Lead with **AWS OpenSearch + semantic overlay** vs **ECH on AWS Marketplace** — same EDP, embeddings included on Hosted.
- For teams already on OSS: **Enterprise self-hosted licensing** is often the lowest cash add-on (license + existing infra vs OpenSearch overlay). Use account team for search-tier quotes.
- OSS **license is $0**; OpenSearch looks EDP-friendly but has **no native embeddings** (overlay line on the ECH tab).
- Always send production quotes to [cloud.elastic.co/pricing](https://cloud.elastic.co/pricing) and AWS OpenSearch pricing.
- Jina API spend is **separate** on all paths.
