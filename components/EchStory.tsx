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
    topic: "Find meaning, not just keywords",
    opensearch:
      "OpenSearch Neural can run models in a trial, but you still assemble pipelines, hybrid ranking, and relevance tuning on an AWS fork.",
    elastic:
      "Your analysts search deals, notes, and logs by intent — Inference, dense vectors, sparse retrieval (ELSER), and hybrid ranking in one Elasticsearch product.",
  },
  {
    topic: "Explain every hit",
    opensearch:
      "Neural plugins plus OpenSearch DSL make it harder to show why a result matched next to keyword search.",
    elastic:
      "ES|QL and hybrid ranking let CRM and Lifecycle teams see why Acme matched and Umbrella’s “legal hold” did not — every hit has a reason.",
  },
  {
    topic: "One platform after the trial",
    opensearch:
      "A Neural trial can look good in isolation. Production still needs CCR-style region stories, security features, Search AI, and a support path.",
    elastic:
      "Search AI, Agent Builder, CCR, and Enterprise security features on the same engine — from proof indexes to production indices.",
  },
  {
    topic: "Keep your AWS economics",
    opensearch:
      "Native AWS SKU — easy for procurement, but locks you into keyword-first search unless you fund a separate semantic overlay.",
    elastic:
      "Elastic Cloud Hosted on AWS Marketplace can align with your AWS commit while delivering embeddings-ready search — no OpenSearch ceiling.",
  },
  {
    topic: "Lower total cost at semantic parity",
    opensearch:
      "Service fee looks clean until you add model hosting, pipeline engineering, and relevance ops for neural search.",
    elastic:
      "Self-hosted Enterprise, Hosted, or Serverless — pick who operates. You pay for search outcomes, not a bolt-on overlay to match Elastic relevance.",
  },
  {
    topic: "Stay on the current search roadmap",
    opensearch:
      "Fork of an older Elasticsearch line — neural features exist, but you diverge from Elastic’s search + AI stack.",
    elastic:
      "Current Elasticsearch: continuous relevance, inference, and AI features with one vendor accountable for search across Cisco groups.",
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
        Your teams need semantic search over deals, transactions, notes, and Webex artifacts — and
        they need to run it{" "}
        <span className="text-white">where Cisco already operates</span>: self-hosted, cloud,
        serverless, or GovCloud. Elasticsearch is that engine. OpenSearch may look simpler on an AWS
        invoice; it does not match the relevance and explainability story your groups need in
        production.
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
          OpenSearch vs Elasticsearch — what Cisco gets
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          If you are evaluating OpenSearch Neural, compare the full outcome for your teams — not
          only the AWS line item.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-3">What you need</th>
                <th className="px-4 py-3 text-orange-200/90">AWS OpenSearch</th>
                <th className="px-4 py-3 text-emerald-300/90">Elasticsearch</th>
              </tr>
            </thead>
            <tbody>
              {VALUE_ROWS.map((row) => (
                <tr key={row.topic} className="border-t border-white/10 align-top">
                  <td className="px-4 py-3 font-medium text-zinc-200">{row.topic}</td>
                  <td className="px-4 py-3 text-orange-200/75">{row.opensearch}</td>
                  <td className="px-4 py-3 text-emerald-300/90">{row.elastic}</td>
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
