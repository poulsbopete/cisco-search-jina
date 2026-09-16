"use client";

import { EchCostComparison } from "@/components/EchCostComparison";
import { COST_SCENARIOS } from "@/lib/ech-cost";

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
      "Search AI, Agent Builder, CCR, Enterprise security features, and a support path that matches Hosted or self-hosted Enterprise.",
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
      "Hosted: Elastic operates the cluster. Self-hosted Enterprise: often the lowest add-on if you already run OSS. Jina API is separate either way.",
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
    title: "Close on Search AI",
    detail:
      "Half-day: Discover ES|QL → dashboard → AI Agent / Search AI on the same corpus. Leave them with Hosted or Enterprise as the production path.",
  },
];

const PATHS = [
  {
    title: "Displace the OpenSearch Neural POC",
    detail:
      "Same use case, Elastic stack: vectors + hybrid + ES|QL. Marketplace if they need the AWS commit story.",
  },
  {
    title: "Enterprise self-hosted",
    detail:
      "Already on OSS Elasticsearch? Search-tier Enterprise for vectors, CCR, and support — keep the VPC.",
  },
  {
    title: "Elastic Cloud Hosted",
    detail:
      "Elastic operates Elasticsearch (commercial or FedRAMP Hosted). Not Observability or Security — search deployment only.",
  },
];

export function EchStory() {
  const scenario = COST_SCENARIOS[0];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        Commerce conversations often start with an{" "}
        <span className="text-white">OpenSearch Neural</span> POC — AWS-native, EDP-friendly,
        “we have embeddings.” Pricing is usually their only clean win. The arsenal is{" "}
        <span className="text-white">features</span>: hybrid relevance, ES|QL, Inference / ELSER /
        Jina, Search AI, and a production runway that is still{" "}
        <span className="text-white">Elasticsearch</span> (Enterprise or Hosted on Marketplace).
      </p>

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
                <th className="px-4 py-3 text-emerald-300/90">Elastic (Enterprise / Hosted)</th>
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
              Same Commerce questions on Elastic: meaning over tokens, explainable hits, ES|QL +
              Agent, then Hosted or Enterprise for production. Features first; Marketplace for the
              EDP parallel.
            </p>
          </div>
        </div>
      </section>

      <EchCostComparison scenario={scenario} />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PATHS.map((path) => (
          <section
            key={path.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-mono text-sm text-zinc-200">{path.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{path.detail}</p>
          </section>
        ))}
      </div>

      <p className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-zinc-300">
        <span className="text-white">Jina</span> (or Elastic models) for embeddings.{" "}
        <span className="text-white">Elasticsearch</span> for retrieval, hybrid rank, and Search AI.
        OpenSearch Neural is a feature on a fork — not the same as owning the Elastic search + AI
        platform Commerce will still need next.
      </p>

      <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs leading-relaxed text-amber-100/85">
        <span className="font-mono uppercase tracking-wide text-amber-200/90">Gov / FedRAMP</span>
        {" — "}
        Separate thread from Commerce Neural: Serverless is not in GovCloud;{" "}
        <span className="text-white">Elastic Cloud Hosted</span> is the managed FedRAMP path. IL5 in
        progress — not authorized yet. Self-hosted FIPS: <span className="text-zinc-300">FIPS</span>{" "}
        tab.
      </p>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Deploy Hosted with the <span className="text-zinc-400">Elasticsearch</span> solution only.
        References:{" "}
        <a
          className="text-primary-bright underline"
          href="https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/create-an-elastic-cloud-hosted-deployment"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create an Elastic Cloud Hosted deployment
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
          Elastic pricing
        </a>
        .
      </p>
    </div>
  );
}
