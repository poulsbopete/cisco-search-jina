# Facilitator notes

**Instruqt is self-paced labs only.** Do not put talking points in challenges. Use the Vercel deck for the live hour; send learners to Instruqt afterward (or in parallel).

## Live talk (not Instruqt)

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

ES|QL first in the Kibana tab, then an **AI Agent** step that asks the same question in plain language. No KQL. First query:

`FROM "cisco-jina-corpus" | KEEP title, source, account, region, concepts, content | LIMIT 20`

Expect **14** docs after seed (includes CIRCUIT proxy samples). If Discover shows `FROM *,-.*` and 0 docs, replace the query with the one above. If status is **0 documents processed**, set time to **Last 24 hours**. An empty index from an old lab start cannot be repaired — Stop and start a new lab.

Use Discover’s **AI Agent** panel (not Agent Builder / Cisco NextGen on the shared cluster).

Track (manage): https://play.instruqt.com/manage/elastic/tracks/cisco-search-jina  
Ungated invite (anyone can start): https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq

## Anti-patterns

- Challenges that name people instead of Cisco groups
- Skipping Umbrella “legal hold” (false-positive teaching moment)
- “We’ll follow up” with no Cisco group (CRM Analytics / Lifecycle / Webex Infra / CIRCUIT)

## Three layers (do not mix them)

| Layer | URL | Job in the room |
| --- | --- | --- |
| Vercel storyboard | https://cisco-search-jina.vercel.app | Slides + visual aha. Does **not** query Elastic. |
| Shared Kibana | https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/agent_builder | Product proof. Paste the prompt from each Vercel pane. |
| Instruqt | https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq | Their own Serverless project. Leaves the shared cluster alone. |

On each demo page: **Open Agent Builder** → pick **Cisco Jina Search**. Index: `cisco-jina-corpus` (14 docs on Vercel corpus; re-seed shared cluster if needed). Do not use **Cisco NextGen** — that tool searches Cisco/Webex product docs. Instruqt labs use the per-learner **AI Agent** in Discover for the final step.

The Webex East/West toggle is an **architecture visual**. The shared Kibana is a single us-east-1 project — say that out loud.

## ECH / Gov (sales guardrails)

- **FedRAMP Moderate / High** on Elastic Cloud Hosted is authorized today (see ECH tab).
- **IL5** — Elastic is **moving towards** IL5 certification for Hosted gov offerings. It is **not authorized yet**. Say “in progress” and point Cisco to their account team for timeline. Do not sell IL5 as available.

## ECH cost (TCO, not license line)

- Lead with **AWS OpenSearch + semantic overlay** vs **ECH on AWS Marketplace** — same EDP, embeddings included on Hosted.
- For teams already on OSS: **Enterprise self-hosted licensing** is often the lowest cash add-on (license + existing infra vs OpenSearch overlay). Use account team for search-tier quotes.
- OSS **license is $0**; OpenSearch looks EDP-friendly but has **no native embeddings** (overlay line on the ECH tab).
- Always send production quotes to [cloud.elastic.co/pricing](https://cloud.elastic.co/pricing) and AWS OpenSearch pricing.
- Jina API spend is **separate** on all paths.
