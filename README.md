# Cisco-wide semantic search workshop

90-minute Instruqt track on **Elastic Cloud Serverless Search**, plus a **Vercel** app for slides and click-demos. Repo: [poulsbopete/cisco-search-jina](https://github.com/poulsbopete/cisco-search-jina).

**No API keys in git.** Kibana for facilitator demos: `https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud/` (public URL only). Instruqt creates per-learner Serverless projects via the `ESS_CLOUD_API_KEY` *Instruqt secret* (never committed).

## Speakers (do not make this a Peter-only hour)

| Minutes | Owner | Block |
| --- | --- | --- |
| 0–5 | Aaron Byers (Elastic AE) | Opening & intros |
| 5–10 | Peter Simkins (Elastic SA) | Why this matters to Cisco |
| 10–25 | Kapil Jadhav (Guest) | Embeddings, multimodal, live keyword vs semantic |
| 20–30 | Peter + Ivan Silva (Elastic) | CRM Analytics, Lifecycle, Webex / Infra |
| 30–35 | Peter | Elastic + Jina bundle |
| 35–90 | All, in their lanes | Labs on Serverless + Vercel demos |

Cisco groups woven through the story: **Anshul / CRM Analytics**, **Balaji / Lifecycle Platform**, **Webex / Infrastructure**.

## Vercel app

```bash
npm install
cp .env.example .env.local   # URLs only — no secrets
npm run dev
```

| Path | Use |
| --- | --- |
| `/slides?embed=1&section=opening` | Instruqt iframe (also `cisco`, `tech`, `crm`, `lifecycle`, `webex`, `bundle`) |
| `/demo` | Kapil: keyword vs semantic |
| `/crm` | Anshul's team |
| `/lifecycle` | Balaji's team |
| `/webex` | East / West + CCR |
| `/bundle` | Elastic vs Jina vs together |

The Vercel UI ranks a **workshop replica** of Jina-style neighborhoods (synonyms + concepts) so the repo stays key-free. Live Elastic is the Serverless project in Instruqt and the shared Kibana URL.

## Instruqt

```bash
python3 scripts/generate_es3_setup.py
cd instruqt/cisco-search-jina
instruqt track push --force
```

Secrets on the track (Instruqt UI, not git): `ESS_CLOUD_API_KEY`, `LLM_PROXY_PROD`.

## Embed slides

```html
<iframe src="https://cisco-search-jina.vercel.app/slides?embed=1&section=tech"
  width="100%" height="520" style="border:0" allow="fullscreen"></iframe>
```
