"use client";

import { useMemo, useState } from "react";
import {
  COST_SCENARIOS,
  ECH_RATE_GB_HOUR,
  estimateCosts,
  formatUsd,
  OPS_FTE_MONTHLY,
  type CostScenario,
} from "@/lib/ech-cost";

const LINE_ITEMS = [
  {
    line: "Elasticsearch license",
    oss: "$0 (Open Source) — no Enterprise vectors, CCR, or official support.",
    ech: "Included in Hosted subscription tier (Gold / Platinum / Enterprise for search features).",
  },
  {
    line: "Compute / RAM",
    oss: "You buy EC2 or bare metal. You size, patch, and replace nodes.",
    ech: "GB RAM per hour across ES + Kibana nodes. CPU and disk scale with RAM.",
  },
  {
    line: "Storage",
    oss: "EBS / SAN + your backup product and retention policy.",
    ech: "Primary disk included in RAM price. Snapshot storage metered separately.",
  },
  {
    line: "Operations labor",
    oss: "Platform team: upgrades, TLS, snapshots, incidents, capacity planning.",
    ech: "Elastic operates rolling upgrades, health monitoring, and autoscaling hooks.",
  },
  {
    line: "Data transfer",
    oss: "AWS/Gov egress and cross-AZ — your networking budget.",
    ech: "Metered (ingress free; egress / inter-node after allowance).",
  },
  {
    line: "Semantic search (vectors + Jina)",
    oss: "Not in OSS. Add Enterprise self-managed license + build ingest yourself.",
    ech: "Enterprise Hosted: inference endpoints, ingest pipelines; Jina is separate API spend.",
  },
];

export function EchCostComparison() {
  const [scenario, setScenario] = useState<CostScenario>(COST_SCENARIOS[1]);
  const est = useMemo(() => estimateCosts(scenario), [scenario]);

  return (
    <section className="mt-10">
      <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
        Cost comparison — total cost of ownership
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
        Open Source looks free on the license line. Hosted bills transparently in{" "}
        <span className="text-zinc-200">GB RAM × hours</span>. The crossover is usually{" "}
        <span className="text-zinc-200">ops labor</span>, not hardware. Numbers below are{" "}
        <span className="text-zinc-200">illustrative</span> — run your sizing in Elastic&apos;s{" "}
        <a
          className="text-cyan-300 underline"
          href="https://cloud.elastic.co/pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          pricing calculator
        </a>
        .
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {COST_SCENARIOS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setScenario(s)}
            className={`rounded-full border px-4 py-2 font-mono text-xs ${
              scenario.label === s.label
                ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                : "border-white/15 text-zinc-400"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mt-3 font-mono text-[11px] text-zinc-500">
        {scenario.totalRamGb} GB total RAM · {scenario.zones} AZ
        {scenario.zones > 1 ? "s" : ""} · {scenario.storageGb.toLocaleString()} GB snapshot /
        disk budget · {scenario.opsFte} FTE ops @ {formatUsd(OPS_FTE_MONTHLY)}/FTE/mo loaded
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            Self-hosted Open Source
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-200">
            {formatUsd(est.oss.total)}
            <span className="text-base font-normal text-zinc-500"> / mo est.</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>Compute (AWS-shaped): {formatUsd(est.oss.compute)}</li>
            <li>Storage: {formatUsd(est.oss.storage)}</li>
            <li>Ops labor: {formatUsd(est.oss.ops)}</li>
            <li className="text-zinc-500">License: $0 · Enterprise not included</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-cyan-300/80">
            Elastic Cloud Hosted
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {formatUsd(est.ech.total)}
            <span className="text-base font-normal text-zinc-400"> / mo est.</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>Deployment capacity (RAM hours): {formatUsd(est.ech.capacity)}</li>
            <li>Snapshot storage: {formatUsd(est.ech.snapshots)}</li>
            <li>Data transfer: varies by query / ingest pattern</li>
            <li className="text-emerald-300/90">Enterprise search features included in tier</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs leading-relaxed text-zinc-500">
        Illustrative ECH rate: ${ECH_RATE_GB_HOUR}/GB RAM/hour (commercial). Formula: total RAM ×
        AZ count × 730 h × rate + snapshot GB. Hosted reference tiers (Standard from ~$99/mo) are
        for a small reference config — production CRM / Lifecycle / Webex search is sized in the
        calculator, not the entry sticker price.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Line item</th>
              <th className="px-4 py-3">Open Source (self-hosted)</th>
              <th className="px-4 py-3">Elastic Cloud Hosted</th>
            </tr>
          </thead>
          <tbody>
            {LINE_ITEMS.map((row) => (
              <tr key={row.line} className="border-t border-white/10">
                <td className="px-4 py-3 text-zinc-200">{row.line}</td>
                <td className="px-4 py-3 text-zinc-500">{row.oss}</td>
                <td className="px-4 py-3 text-emerald-300/90">{row.ech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 list-inside list-disc space-y-1 text-xs text-zinc-500">
        {est.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  );
}
