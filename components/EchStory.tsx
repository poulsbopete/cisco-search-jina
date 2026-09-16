"use client";

import { EchCostComparison } from "@/components/EchCostComparison";
import { COST_SCENARIOS } from "@/lib/ech-cost";

/** OpenSearch vs Elastic — favor Elastic without inventing facts. */
const PROS_CONS = [
  {
    topic: "Semantic / vector search",
    opensearch:
      "Keyword-first. No native embeddings product — you bolt on Jina (or similar) and own the pipeline.",
    elastic:
      "Native vectors, inference endpoints, and ingest pipelines. Jina supplies embeddings; Elasticsearch stores and ranks them.",
  },
  {
    topic: "Query language & relevance",
    opensearch:
      "OpenSearch DSL + limited analytics. You leave the Elasticsearch roadmap (ES|QL, RRF, Elastic relevance features).",
    elastic:
      "ES|QL, hybrid ranking, and the same APIs Cisco already knows from OSS Elasticsearch — one engine from lab to production.",
  },
  {
    topic: "AWS EDP / Marketplace",
    opensearch:
      "Native AWS line item — looks like the easy EDP default.",
    elastic:
      "Elastic Cloud Hosted is also on AWS Marketplace and can count toward the same AWS commit — without the OpenSearch ceiling.",
  },
  {
    topic: "Operations",
    opensearch:
      "AWS runs the service; you still own ISM, index design, access, and any semantic overlay.",
    elastic:
      "Elastic-operated Hosted (upgrades, snapshots, autoscaling) or Enterprise self-hosted if you keep the cluster.",
  },
  {
    topic: "Product runway",
    opensearch:
      "Fork of an older Elasticsearch line — feature lag vs Elastic’s current stack.",
    elastic:
      "Current Elasticsearch: CCR, inference, security features, and a support path that matches Enterprise / Hosted.",
  },
  {
    topic: "Cost at semantic parity",
    opensearch:
      "Managed fee + separate Jina/pipeline overlay. Keyword-only looks cheap until you match this workshop’s story.",
    elastic:
      "Enterprise on Hosted includes the search stack; self-hosted Enterprise is often the lowest add-on if you already run OSS.",
  },
];

const PATHS = [
  {
    title: "Stay off OpenSearch",
    detail:
      "If procurement pushes OpenSearch for EDP, show the semantic gap and the Marketplace alternative — same commit, Elasticsearch product.",
  },
  {
    title: "Enterprise self-hosted",
    detail:
      "Already on OSS Elasticsearch? Add a search-tier Enterprise license for vectors, CCR, and support — keep your VPC.",
  },
  {
    title: "Elastic Cloud Hosted",
    detail:
      "Want Elastic to operate: commercial cloud or FedRAMP Hosted. Elasticsearch deployment only — not Observability or Security.",
  },
];

export function EchStory() {
  const scenario = COST_SCENARIOS[0];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        When Cisco teams need managed search on AWS, the default pitch is often{" "}
        <span className="text-white">OpenSearch</span> — it sits on EDP. The catch:{" "}
        <span className="text-white">no native embeddings</span>, so the semantic story from this
        workshop does not land.{" "}
        <span className="text-white">Elasticsearch</span> (Enterprise self-hosted or{" "}
        <span className="text-white">Elastic Cloud Hosted</span> on Marketplace) keeps the AWS
        commit <span className="text-white">and</span> the product runway.
      </p>

      <section className="mt-10">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          OpenSearch vs Elastic — pros &amp; cons
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Honest tradeoffs for a search / AI retrieval decision. Elastic wins on relevance,
          roadmap, and total cost once you need vectors — not just keyword search.
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
              When OpenSearch still shows up
            </p>
            <p className="mt-2 text-sm leading-relaxed text-orange-100/85">
              Pure keyword logs / metrics with no semantic requirement, and procurement will not
              consider Marketplace. Acknowledge EDP ease — then ask whether embeddings are on the
              roadmap.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wide text-emerald-200">
              When to choose Elastic
            </p>
            <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">
              Deals, notes, lifecycle payloads, Webex artifacts — anything that needs meaning over
              tokens. Same workshop story: MATCH ceiling vs concept / vector neighborhood.
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
        <span className="text-white">Jina</span> is the embeddings API.{" "}
        <span className="text-white">Elasticsearch</span> is the search engine. Ingest Jina vectors
        into Hosted or Enterprise indices — CRM deals, lifecycle payloads, Webex artifacts — without
        standing up a second analytics stack. OpenSearch still needs that bolt-on.
      </p>

      <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs leading-relaxed text-amber-100/85">
        <span className="font-mono uppercase tracking-wide text-amber-200/90">Gov / FedRAMP</span>
        {" — "}
        Separate from the OpenSearch debate: Serverless Search is not in GovCloud today;{" "}
        <span className="text-white">Elastic Cloud Hosted</span> is the managed FedRAMP path
        (Moderate / High by tier). IL5 is in progress — not authorized yet. FIPS for self-hosted is
        on the <span className="text-zinc-300">FIPS</span> tab.
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
          href="https://aws.amazon.com/opensearch-service/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS OpenSearch Service
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
