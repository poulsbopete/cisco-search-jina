"use client";

import { EchCostComparison } from "@/components/EchCostComparison";
import { COST_SCENARIOS } from "@/lib/ech-cost";

const DEPLOY_OPTIONS = [
  {
    id: "self-hosted",
    title: "Self-hosted Enterprise",
    where: "Your VPC · on-prem · air-gapped",
    detail:
      "Keep search where your data already lives. Add Enterprise for vectors, CCR, and support on the clusters your teams operate today — without moving CRM, lifecycle, or Webex data out of your boundary.",
    notes: [
      "Vectors and ES|QL on infrastructure you already run",
      "FIPS path for gov-ready self-managed clusters",
      "Same APIs from proof to production",
    ],
  },
  {
    id: "cloud",
    title: "Elastic Cloud Hosted",
    where: "AWS · GCP · Azure (commercial)",
    detail:
      "Elastic runs the platform so your teams ship search features instead of patching clusters. On AWS Marketplace so search spend can align with your existing AWS commit — without settling for keyword-only OpenSearch.",
    notes: [
      "Elastic operates upgrades, snapshots, and autoscaling",
      "Marketplace path for AWS EDP alignment",
      "Production search for CRM, Lifecycle, and Webex workloads",
    ],
  },
  {
    id: "serverless",
    title: "Elastic Cloud Serverless",
    where: "Commercial regions",
    detail:
      "Stand up Search without sizing nodes. Your teams get ES|QL, dashboards, and AI Agent on day one while Elastic scales compute underneath.",
    notes: [
      "No capacity planning for search projects",
      "Fastest path from idea to working semantic search",
      "Commercial SaaS — not available in GovCloud today",
    ],
  },
  {
    id: "govcloud",
    title: "GovCloud / FedRAMP",
    where: "AWS GovCloud · FedRAMP Moderate / High",
    detail:
      "Keep Webex / Infra and other gov workloads inside the authorization boundary with Elastic Cloud Hosted (FedRAMP). Serverless is not in GovCloud yet — Hosted (or self-hosted Enterprise) is the managed path.",
    notes: [
      "Hosted FedRAMP for managed gov search",
      "Self-hosted Enterprise when you must own the stack",
      "IL5 is in progress — not available for Cisco workloads today",
    ],
  },
];

const VALUE_ROWS = [
  {
    topic: "Will CRM and Lifecycle find the right deals and notes?",
    opensearch:
      "OpenSearch Neural can demo embeddings, but our teams still own model choice, ingest pipelines, hybrid ranking, and relevance ops — on an AWS fork, not a finished product.",
    elastic:
      "Meaning-first search ships in Elasticsearch: Inference, dense vectors, ELSER, and hybrid ranking. Analysts search by intent without standing up a second ML platform team.",
  },
  {
    topic: "Can we defend why a hit ranked to leadership or audit?",
    opensearch:
      "Neural plugins + OpenSearch DSL make “why this deal / note?” hard to show next to keyword results in the same workflow.",
    elastic:
      "ES|QL and hybrid ranking give every hit a reason — so “legal concerns” surfaces Acme counsel, not Umbrella e-discovery noise that only shares a token.",
  },
  {
    topic: "Do we retrain off skills we already have?",
    opensearch:
      "New query surface, plugins, and ops model. Groups already on Elasticsearch lose velocity while they retool.",
    elastic:
      "We already run Elasticsearch across Cisco. Same APIs and ES|QL accelerate delivery for CRM, Lifecycle, Webex, and CIRCUIT instead of a migration tax.",
  },
  {
    topic: "What breaks after a Neural trial goes to production?",
    opensearch:
      "A POC can look fine in isolation. Production still needs gov-region replication (CCR-class), enterprise security, Search AI, and a named support path — not guaranteed on the fork.",
    elastic:
      "One engine covers Search AI, Agent Builder, CCR, Enterprise security, and support — self-hosted, Hosted, or Serverless — from proof indexes to production.",
  },
  {
    topic: "Do we give up our AWS EDP / Marketplace commit?",
    opensearch:
      "Native AWS SKU — simplest PO. That is usually the only durable reason to switch.",
    elastic:
      "Elastic Cloud Hosted on AWS Marketplace still applies to our AWS commit. We keep EDP economics without accepting keyword-first search as the product ceiling.",
  },
  {
    topic: "What is the real TCO once semantic search is required?",
    opensearch:
      "Managed fee looks clean until we add model hosting, pipeline engineering, and ongoing relevance tuning to match Elastic outcomes.",
    elastic:
      "We pick who operates (self-hosted Enterprise, Hosted, or Serverless) and pay for search outcomes — not a bolt-on overlay to reach parity.",
  },
  {
    topic: "What is the multi-year platform risk?",
    opensearch:
      "Fork of an older Elasticsearch line. Neural features exist, but we diverge from the search + AI roadmap other Cisco groups already standardize on.",
    elastic:
      "Current Elasticsearch with one vendor accountable for relevance, inference, and AI features across Cisco — continuous product, not a fork we have to staff forever.",
  },
];

const OUTCOMES = [
  {
    title: "For CRM Analytics",
    detail:
      "Find deals like Acme’s Webex renewal with a reason for every match — not e-discovery noise that only shares the word “legal.”",
  },
  {
    title: "For Lifecycle Platform",
    detail:
      "Search Snowflake, S3, and Elastic logs as peers so counsel language inside large payloads surfaces without a second warehouse.",
  },
  {
    title: "For Webex / Infrastructure",
    detail:
      "Replicate with CCR, search locally in US Gov East and West — no cross-boundary query plane for the same intent.",
  },
];

export function DeployStory() {
  const scenario = COST_SCENARIOS[0];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        When procurement asks “why not OpenSearch on the AWS bill?”, the answer is not preference —
        it is outcomes and total cost. Your groups need{" "}
        <span className="text-white">meaning-first search</span> over deals, notes, and Webex
        artifacts, run{" "}
        <span className="text-white">where Cisco already operates</span> (self-hosted, Hosted,
        Serverless, or GovCloud), without giving up EDP. OpenSearch wins the SKU; Elasticsearch wins
        relevance, explainability, and one platform your teams already know.
      </p>

      <section className="mt-10">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          Where your search runs
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          One product. Four operating models — pick the boundary and who operates the platform.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {DEPLOY_OPTIONS.map((opt) => (
            <section
              key={opt.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-wide text-primary-bright">
                {opt.where}
              </p>
              <h3 className="mt-2 font-mono text-sm text-zinc-100">{opt.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{opt.detail}</p>
              <ul className="mt-3 space-y-1">
                {opt.notes.map((n) => (
                  <li key={n} className="text-xs text-zinc-500">
                    · {n}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs leading-relaxed text-amber-100/85">
          <span className="font-mono uppercase tracking-wide text-amber-200/90">
            GovCloud note
          </span>
          {" — "}
          <span className="text-white">Serverless is not in GovCloud</span>. For FedRAMP workloads,
          use <span className="text-white">Elastic Cloud Hosted</span> or self-hosted Enterprise
          inside the boundary. IL5 is in progress — not available today.
        </p>
      </section>

      <section className="mt-10 grid gap-3 md:grid-cols-3">
        {OUTCOMES.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-wide text-emerald-200">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          Brief for your manager — why we stay on Elasticsearch
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Copy-ready answers when someone asks to standardize on OpenSearch because it is on the
          AWS invoice. Each row is a leadership question: what OpenSearch costs us, and the
          business case for Elastic.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-3">Leadership question</th>
                <th className="px-4 py-3 text-orange-200/90">If we take OpenSearch</th>
                <th className="px-4 py-3 text-emerald-300/90">Why we stay on Elastic</th>
              </tr>
            </thead>
            <tbody>
              {VALUE_ROWS.map((row) => (
                <tr key={row.topic} className="border-t border-white/10 align-top">
                  <td className="px-4 py-3 font-medium text-zinc-100">{row.topic}</td>
                  <td className="px-4 py-3 text-orange-200/80">{row.opensearch}</td>
                  <td className="px-4 py-3 text-emerald-200/95">{row.elastic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <EchCostComparison scenario={scenario} />

      <p className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-zinc-300">
        <span className="text-white">Jina</span> supplies embeddings when you need multimodal or
        domain-tuned vectors. <span className="text-white">Elasticsearch</span> stores, ranks, and
        explains results — self-hosted, Hosted, or Serverless. Your teams keep one search platform
        across CRM, Lifecycle, Webex, and CIRCUIT telemetry.
      </p>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        References:{" "}
        <a
          className="text-primary-bright underline"
          href="https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/create-an-elastic-cloud-hosted-deployment"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elastic Cloud Hosted
        </a>
        {" · "}
        <a
          className="text-primary-bright underline"
          href="https://www.elastic.co/elasticsearch/serverless"
          target="_blank"
          rel="noopener noreferrer"
        >
          Serverless
        </a>
        {" · "}
        <a
          className="text-primary-bright underline"
          href="https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/fedramp"
          target="_blank"
          rel="noopener noreferrer"
        >
          FedRAMP
        </a>
        {" · "}
        <a
          className="text-primary-bright underline"
          href="https://cloud.elastic.co/pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pricing
        </a>
        . Self-hosted FIPS: <span className="text-zinc-400">FIPS</span> tab.
      </p>
    </div>
  );
}

/** @deprecated Use DeployStory */
export const EchStory = DeployStory;
