# Facilitator notes

**Instruqt is self-paced labs only.** Do not put talking points in challenges. Use the Vercel deck for the live hour; send learners to Instruqt afterward (or in parallel).

## Live talk (not Instruqt)

- **Aaron Byers** — `/slides?section=opening`
- **Peter Simkins** — `/slides?section=cisco` then later `/slides?section=bundle`
- **Kapil Jadhav** — `/slides?section=tech` and `/demo`
- **Ivan Silva** — `/crm`, `/lifecycle`, `/webex`

Deck: https://cisco-search-jina.vercel.app/slides

## Labs (Instruqt)

ES|QL only in the Kibana tab. No Vercel links. No KQL. First query:

`FROM "cisco-jina-corpus" | KEEP title, source, account, region, concepts, content | LIMIT 20`

If Discover shows `FROM *,-.*` and 0 docs, replace the query with the one above and set time to **Last 24 hours**.

Track (manage): https://play.instruqt.com/manage/elastic/tracks/cisco-search-jina  
Ungated invite (anyone can start): https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq

## Anti-patterns

- Challenges that say “Aaron opens” or “Peter covers”
- Skipping Umbrella “legal hold” (false-positive teaching moment)
- “We’ll follow up” with no named Cisco owner (Anshul / Balaji / Webex Infra)

## Three layers (do not mix them)

| Layer | URL | Job in the room |
| --- | --- | --- |
| Vercel storyboard | https://cisco-search-jina.vercel.app | Slides + visual aha. Does **not** query Elastic. |
| Shared Kibana | https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/app/agent_builder | Product proof. Paste the prompt from each Vercel pane. |
| Instruqt | https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq | Their own Serverless project. Leaves the shared cluster alone. |

On each demo page: **Copy Agent Builder prompt** → **Open in Elastic**.

The Webex East/West toggle is an **architecture visual**. The shared Kibana is a single us-east-1 project — say that out loud.
