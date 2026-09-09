## CIRCUIT LLM proxy (ECS)

_Refreshed by **Workflows → Cisco Jina Workshop — Dashboard notes** (every 10 minutes)._

**What you are looking at**
- Concept neighborhood: circuit, llm-proxy, prompt-injection, pii, token-budget, …
- Events by region

**Machine Learning (Serverless)**
- Left nav → **Machine Learning** → **Anomaly detection** → job `cisco-jina-circuit-tokens`
- Data: `cisco-jina-circuit-metrics` (hourly CIRCUIT proxy tokens + policy denies, with a planted token-budget spike)
- Open **Anomaly explorer** — same story as the CIRCUIT corpus docs, on time-series ML

**Talking point:** customers choose Elastic LLM, CIRCUIT, or both; Elastic searches the ECS stream either way — and ML flags unusual proxy spend without a second analytics stack.
