"use client";

import { EchCostComparison } from "@/components/EchCostComparison";
import { COST_SCENARIOS } from "@/lib/ech-cost";

const DEPLOY_OPTIONS = [
  {
    id: "self-hosted",
    title: "Self-hosted Enterprise",
    where: "Your VPC · on-prem · air-gapped",
    detail:
      "Keep the cluster you already run. Search-tier Enterprise license for vectors, CCR, inference, and Elastic support. You operate patch, upgrade, and backup.",
    notes: ["Best when OSS is already in-house", "FIPS path on the FIPS tab", "Same Elasticsearch APIs as Hosted"],
  },
  {
    id: "cloud",
    title: "Elastic Cloud Hosted",
    where: "AWS · GCP · Azure (commercial)",
    detail:
      "Elastic operates the deployment — rolling upgrades, snapshots, autoscaling. Elasticsearch solution only (not Observability or Security). On AWS Marketplace for EDP.",
    notes: ["Elastic-operated platform", "Marketplace can count toward AWS commit", "Production search at scale"],
  },
  {
    id: "serverless",
    title: "Elastic Cloud Serverless",
    where: "Commercial regions only",
    detail:
      "Managed Search with no cluster sizing. This workshop’s Instruqt lab and Search-AI deep links run here. Fastest path to ES|QL, dashboards, and AI Agent demos.",
    notes: ["No capacity planning", "Commercial SaaS regions", "Not available in GovCloud today"],
  },
  {
    id: "govcloud",
    title: "GovCloud / FedRAMP",
    where: "AWS GovCloud · FedRAMP Moderate / High",
    detail:
      "Use Elastic Cloud Hosted in the authorization boundary — not Serverless. Platinum+ / Enterprise by FedRAMP level. IL5 is in progress (not authorized yet).",
    notes: ["Hosted yes · Serverless no", "Self-hosted Enterprise still an option", "IL5: roadmap only — do not sell as available"],
  },
];

/**
 * Arsenal for Commerce / OpenSearch Neural POCs.
 * Pricing is often OpenSearch’s only clean win (EDP); features favor Elastic.
 */
const PROS_CONS = [
  {
    topic: "Neural / semantic search",
    opensearch:
      "OpenSearch Neural + k-NN can run models — that is a real POC path. You still own model choice, pipelines, hybrid tuning, and staying on the AWS fork.",
    elastic:
      "Inference API, dense vectors, sparse retrieval (e.g. ELSER), and first-class hybrid (BM25 + vectors + RRF). Bring Jina or Elastic models — one product stack.",
  },
  {
    topic: "Explainability & query surface",
    opensearch:
      "Neural plugins + OpenSearch DSL. Harder to show “why this hit” next to keyword in the same ES|QL-style lab story.",
    elastic:
      "ES|QL, hybrid ranking, and the same APIs Cisco already knows from OSS Elasticsearch — keyword vs meaning in one engine (this workshop).",
  },
  {
    topic: "Platform beyond the POC",
    opensearch:
      "Neural demo can look good in isolation. Commerce still needs CCR-style stories, security features, Agent / Search AI runway, and Elastic support — not on the fork.",
    elastic:
      "Search AI, Agent Builder, CCR, Enterprise security features, and a support path across self-hosted, Hosted, or Serverless.",
  },
  {
    topic: "AWS EDP / Marketplace",
    opensearch:
      "Native AWS line item — easiest procurement story. Often the only durable OpenSearch advantage.",
    elastic:
      "Elastic Cloud Hosted on AWS Marketplace can count toward the same commit — keep EDP without locking the product to OpenSearch Neural.",
  },
  {
    topic: "Ops & total cost",
    opensearch:
      "Managed service fee looks clean until you add model hosting, pipeline engineering, and relevance tuning for neural.",
    elastic:
      "Self-hosted Enterprise, Hosted, or Serverless — pick who operates. Jina API is separate on every path.",
  },
  {
    topic: "Roadmap risk",
    opensearch:
      "Fork of an older Elasticsearch line — neural features exist, but you diverge from Elastic’s current search + AI stack.",
    elastic:
      "Current Elasticsearch: continuous relevance, inference, and AI features with one vendor accountable for search.",
  },
];

const ARSENAL = [
  {
    title: "Don’t lead with price",
    detail:
      "OpenSearch wins the EDP checkbox. Concede that, then move to neural quality, hybrid, ES|QL, and platform — where Elastic is stronger.",
  },
  {
    title: "Beat the Neural POC",
    detail:
      "Ask them to run the same business questions on Elastic (deals / notes / meaning). Show keyword MATCH vs semantic neighborhood — this lab’s aha.",
  },
  {
    title: "Close on how you run it",
    detail:
      "Half-day Search AI, then pick the deploy path: self-hosted, Hosted, Serverless (commercial), or GovCloud Hosted — not OpenSearch as the long-term engine.",
  },
];

export function DeployStory() {
  const scenario = COST_SCENARIOS[0];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        Same Elasticsearch product — four ways Cisco can run it.{" "}
        <span className="text-white">Self-hosted Enterprise</span>,{" "}
        <span className="text-white">Elastic Cloud Hosted</span>,{" "}
        <span className="text-white">Serverless</span> (commercial only), and{" "}
        <span className="text-white">GovCloud / FedRAMP</span> on Hosted (Serverless is not there
        today). When procurement pushes <span className="text-white">OpenSearch Neural</span>, win
        on features first, then pick the deploy path.
      </p>

      <section className="mt-10">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          How you run Elastic
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          One API surface. Choose who operates the platform and which region / authorization
          boundary you need.
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
            GovCloud rule
          </span>
          {" — "}
          <span className="text-white">Serverless is not in GovCloud</span>. For FedRAMP, use{" "}
          <span className="text-white">Elastic Cloud Hosted</span> (or self-hosted Enterprise inside
          the boundary). IL5 certification is in progress — not available to sell today.
        </p>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-3">
        {ARSENAL.map((item) => (
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
          OpenSearch vs Elastic — pros &amp; cons
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          For teams POCing OpenSearch Neural: acknowledge the plugin, then compare the full search
          + AI stack. Elastic should win on relevance, explainability, and platform — not on “we
          are cheaper on AWS.”
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3 text-orange-200/90">AWS OpenSearch</th>
                <th className="px-4 py-3 text-emerald-300/90">Elastic</th>
              </tr>
            </thead>
            <tbody>
              {PROS_CONS.map((row) => (
                <tr key={row.topic} className="border-t border-white/10 align-top">
                  <td className="px-4 py-3 font-medium text-zinc-200">{row.topic}</td>
                  <td className="px-4 py-3 text-orange-200/75">{row.opensearch}</td>
                  <td className="px-4 py-3 text-emerald-300/90">
                    <span className="mr-2 inline-block rounded-full bg-emerald-400/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-emerald-200">
                      Prefer
                    </span>
                    {row.elastic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-orange-400/25 bg-orange-400/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wide text-orange-200">
              Concede to OpenSearch
            </p>
            <p className="mt-2 text-sm leading-relaxed text-orange-100/85">
              Native AWS SKU and Neural plugins make a quick internal POC easy. Do not waste airtime
              denying that — ask what happens after the POC (hybrid quality, ops, Search AI, support).
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wide text-emerald-200">
              Win with Elastic
            </p>
            <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">
              Same Commerce questions on Elastic, then choose deploy: self-hosted, Hosted,
              Serverless (commercial), or GovCloud Hosted. Features first; Marketplace for the EDP
              parallel.
            </p>
          </div>
        </div>
      </section>

      <EchCostComparison scenario={scenario} />

      <p className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-zinc-300">
        <span className="text-white">Jina</span> (or Elastic models) for embeddings.{" "}
        <span className="text-white">Elasticsearch</span> for retrieval, hybrid rank, and Search AI —
        whether you self-host, use Hosted, or Serverless. OpenSearch Neural is a feature on a fork,
        not the long-term Elastic search + AI platform.
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
          href="https://docs.opensearch.org/latest/search-plugins/neural-search/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenSearch Neural Search
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

/** @deprecated Use DeployStory — kept for any lingering imports. */
export const EchStory = DeployStory;
