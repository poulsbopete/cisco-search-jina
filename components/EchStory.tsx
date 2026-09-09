"use client";

import { useState } from "react";
import { EchCostComparison } from "@/components/EchCostComparison";
import { COST_SCENARIOS, type CostScenario } from "@/lib/ech-cost";

type Region = "commercial" | "govcloud";

const REGION_CONFIG: Record<
  Region,
  {
    label: string;
    headline: string;
    detail: string;
    scenario: CostScenario;
  }
> = {
  commercial: {
    label: "Commercial cloud",
    headline: "AWS · GCP · Azure — Elasticsearch only",
    detail:
      "Hosted deployments in commercial regions. Pick Elasticsearch as the solution (not Observability or Security). Autoscaling, snapshots, and upgrades are Elastic-operated.",
    scenario: COST_SCENARIOS[0],
  },
  govcloud: {
    label: "AWS GovCloud",
    headline: "FedRAMP Moderate / High — Elasticsearch on us-gov-east-1",
    detail:
      "Serverless Search is not in GovCloud today. Elastic Cloud Hosted is the managed path for CRM, Lifecycle, and Webex / Infra teams that must stay in the authorization boundary. Elastic is moving towards IL5 certification for Hosted gov offerings — not authorized today; plan with your account team.",
    scenario: COST_SCENARIOS[1],
  },
};

const OSS_ROWS = [
  {
    need: "Who patches, upgrades, and backs up the cluster",
    oss: "Your infra team — on your schedule, your risk.",
    ech: "Elastic Cloud Hosted — rolling upgrades, snapshots, autoscaling.",
  },
  {
    need: "Enterprise search (vectors, inference, ES|QL)",
    oss: "Add Enterprise — low license cost on the cluster you already operate.",
    ech: "Enterprise subscription on Hosted — native embeddings + pipelines.",
  },
  {
    need: "AWS GovCloud / FedRAMP",
    oss: "Self-managed in Gov — you own the boundary.",
    ech: "FedRAMP Moderate (Platinum+) or High (Enterprise, US gov) on ECH.",
  },
  {
    need: "FIPS-ready TLS in gov regions",
    oss: "DIY JVM + config (see FIPS tab for self-hosted).",
    ech: "FedRAMP deployments enforce FIPS 140-2 TLS v1.2 by default.",
  },
  {
    need: "Semantic / multimodal relevance",
    oss: "No embeddings product — keyword ceiling.",
    ech: "Elasticsearch stores and queries vectors; Jina supplies embeddings.",
  },
  {
    need: "Migration from today's OSS cluster",
    oss: "Already there — but no vendor runway.",
    ech: "Same Elasticsearch APIs — reindex or snapshot-restore into Hosted.",
  },
];

const PATHS = [
  {
    title: "Self-hosted Enterprise",
    detail:
      "Stay on-prem or in your VPC. Competitive Enterprise licensing for search — vectors, CCR, and Elastic support on the cluster you already run. Optional FIPS JVM; you operate the platform.",
  },
  {
    title: "Elastic Cloud Hosted (commercial)",
    detail:
      "Move search to Elastic-operated infrastructure in AWS, GCP, or Azure. Elasticsearch deployment only — not Observability or Security.",
  },
  {
    title: "Elastic Cloud Hosted (GovCloud)",
    detail:
      "Same search story inside FedRAMP. For teams that cannot use Serverless and cannot stay on unsupported OSS builds. Elastic is working toward IL5 — ask your account team for timeline and scope.",
  },
];

const JINA_ROW =
  "Jina is the embeddings API. Elasticsearch is the search engine. Ingest Jina vectors into Hosted indices — CRM deals, lifecycle payloads, Webex artifacts — without standing up a separate observability platform.";

function formatSizing(s: CostScenario): string {
  return `${s.totalRamGb} GB RAM · ${s.zones} AZ${s.zones > 1 ? "s" : ""} · ${s.storageGb.toLocaleString()} GB storage`;
}

export function EchStory() {
  const [region, setRegion] = useState<Region>("commercial");
  const config = REGION_CONFIG[region];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        Cisco groups already run <span className="text-white">Open Source Elasticsearch</span>{" "}
        self-hosted — or get pushed to <span className="text-white">AWS OpenSearch</span> for EDP.
        Elastic Cloud Hosted is on <span className="text-white">AWS Marketplace</span> (same commit,
        more search). For teams staying on-prem,{" "}
        <span className="text-white">Enterprise self-hosted licensing</span> is a low-cost path to
        vectors and support. Or move to{" "}
        <span className="text-white">Elasticsearch Enterprise</span> on Hosted,
        with <span className="text-white">Jina</span> for multimodal relevance. Serverless Search
        powers this workshop, but it does not run in GovCloud — Hosted does.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(REGION_CONFIG) as Region[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setRegion(key)}
            className={`rounded-full border px-4 py-2 font-mono text-xs ${
              region === key
                ? "border-primary bg-primary/15 text-primary-bright"
                : "border-white/15 text-zinc-400"
            }`}
          >
            {REGION_CONFIG[key].label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-primary-bright">
          {config.headline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{config.detail}</p>
        <p className="mt-3 font-mono text-[11px] text-zinc-500">
          TCO sizing: {formatSizing(config.scenario)} · {config.scenario.label}
        </p>
        {region === "govcloud" ? (
          <p className="mt-3 rounded-xl border border-amber-400/25 bg-amber-400/5 px-3 py-2 text-xs leading-relaxed text-amber-100/90">
            <span className="font-mono uppercase tracking-wide text-amber-200/90">Roadmap</span>
            {" — "}
            Elastic Cloud Hosted is FedRAMP authorized today. IL5 (DoD Impact Level 5) certification
            is in progress — not a current authorization. Do not represent IL5 as available until
            Elastic publishes it.
          </p>
        ) : null}
      </div>

      <EchCostComparison scenario={config.scenario} />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Need</th>
              <th className="px-4 py-3">Open Source (self-hosted)</th>
              <th className="px-4 py-3">Elastic Cloud Hosted</th>
            </tr>
          </thead>
          <tbody>
            {OSS_ROWS.map((r) => (
              <tr key={r.need} className="border-t border-white/10">
                <td className="px-4 py-3 text-zinc-200">{r.need}</td>
                <td className="px-4 py-3 text-zinc-500">{r.oss}</td>
                <td className="px-4 py-3 text-emerald-300/90">{r.ech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-zinc-300">
        {JINA_ROW}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
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

      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Deploy Hosted with the <span className="text-zinc-400">Elasticsearch</span> solution
        only. References:{" "}
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
          href="https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/fedramp"
          target="_blank"
          rel="noopener noreferrer"
        >
          FedRAMP authorized Cloud offerings
        </a>
        {" · "}
        <a
          className="text-primary-bright underline"
          href="https://www.elastic.co/docs/deploy-manage/cloud-organization/billing/cloud-hosted-deployment-billing-dimensions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hosted billing dimensions
        </a>
        . Self-hosted FIPS: use the <span className="text-zinc-400">FIPS</span> tab.
      </p>
    </div>
  );
}
