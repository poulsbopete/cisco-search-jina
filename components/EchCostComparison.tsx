"use client";

import { useMemo, useState } from "react";
import {
  COST_SCENARIOS,
  ECH_RATE_GB_HOUR,
  estimateCosts,
  formatUsd,
  OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY,
  type CostScenario,
} from "@/lib/ech-cost";

const LINE_ITEMS = [
  {
    line: "AWS contract / EDP",
    opensearch: "Native AWS line item — easy default when Cisco has large AWS commits.",
    oss: "DIY on EC2 — may not count cleanly toward EDP.",
    ech: "Elastic Cloud Hosted on AWS Marketplace — can count toward AWS commit.",
    highlight: true,
  },
  {
    line: "Semantic search (vectors + Jina)",
    opensearch: "Not offered — keyword ceiling. Bolt on Jina + custom pipeline (overlay cost).",
    oss: "Not in OSS. Add Enterprise subscription + build ingest yourself.",
    ech: "Enterprise Hosted: inference endpoints + pipelines; Jina API separate.",
    highlight: true,
  },
  {
    line: "Operations labor",
    opensearch: "AWS manages the service — you still tune ISM, access, and index design.",
    oss: "Full platform team: patch, upgrade, backup, on-call.",
    ech: "Elastic-operated rolling upgrades, monitoring, autoscaling.",
    highlight: true,
  },
  {
    line: "Enterprise search features",
    opensearch: "Lexical + filters. No ES|QL parity, CCR story, or Elastic support path.",
    oss: "$0 OSS — or + Enterprise license for vectors / CCR.",
    ech: "Included in Hosted Enterprise tier.",
    highlight: false,
  },
  {
    line: "Compute + storage",
    opensearch: "OpenSearch Service instance + EBS — sized per AZ.",
    oss: "You buy and operate EC2 or bare metal.",
    ech: "GB RAM per hour; CPU and disk scale with RAM.",
    highlight: false,
  },
];

function SavingsBar({
  label,
  amount,
  max,
  tone,
}: {
  label: string;
  amount: number;
  max: number;
  tone: "oss" | "ech" | "ops" | "enterprise" | "opensearch" | "overlay";
}) {
  const pct = max > 0 ? Math.min(100, Math.round((amount / max) * 100)) : 0;
  const bar =
    tone === "oss"
      ? "bg-zinc-500"
      : tone === "ops"
        ? "bg-amber-400"
        : tone === "enterprise"
          ? "bg-orange-400"
          : tone === "opensearch"
            ? "bg-orange-500"
            : tone === "overlay"
              ? "bg-red-400"
              : "bg-cyan-400";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span
          className={
            tone === "ops" || tone === "overlay"
              ? "font-medium text-amber-200"
              : "text-zinc-400"
          }
        >
          {label}
        </span>
        <span className="font-mono text-zinc-300">{formatUsd(amount)}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function EchCostComparison() {
  const [scenario, setScenario] = useState<CostScenario>(COST_SCENARIOS[1]);
  const est = useMemo(() => estimateCosts(scenario), [scenario]);
  const maxTotal = Math.max(
    est.opensearch.total,
    est.oss.totalWithEnterprise,
    est.ech.total,
  );
  const savesVsOs = est.savings.vsOpenSearch > 0;

  return (
    <section className="mt-10">
      <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
        Cost comparison — OpenSearch vs OSS vs Hosted
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
        Cisco teams get steered to <span className="text-zinc-200">AWS OpenSearch</span> because
        of existing AWS commits. Elastic Cloud Hosted is on{" "}
        <span className="text-zinc-200">AWS Marketplace</span> — it can count toward that same
        commit while shipping embeddings, ES|QL, and Enterprise search OpenSearch cannot. Numbers
        are illustrative.
      </p>

      <p className="mt-3 rounded-xl border border-orange-400/25 bg-orange-400/5 px-4 py-3 text-xs leading-relaxed text-orange-100/90">
        <span className="font-mono uppercase tracking-wide text-orange-200">OpenSearch trap</span>
        {" — "}
        The managed service fee looks EDP-friendly, but there are no native embeddings. To match
        this workshop&apos;s semantic story you still pay a{" "}
        <span className="text-white">Jina + pipeline overlay</span> (
        {formatUsd(OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY)}/mo est.) on top of keyword-only search.
      </p>

      {savesVsOs ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 via-emerald-400/5 to-transparent p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
            Estimated savings — Elastic Cloud Hosted vs AWS OpenSearch + semantic overlay
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-6">
            <div>
              <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {formatUsd(est.savings.vsOpenSearch)}
                <span className="text-lg font-normal text-emerald-200/80"> / mo</span>
              </p>
              <p className="mt-1 text-sm text-emerald-100/90">
                {est.savings.percentVsOpenSearch}% lower than OpenSearch at semantic parity
              </p>
            </div>
            <div className="space-y-1 border-l border-emerald-400/30 pl-6 text-sm">
              <p className="text-emerald-100">
                <span className="font-mono text-emerald-300">
                  {formatUsd(est.savings.annualVsOpenSearch)}
                </span>{" "}
                / year vs OpenSearch
              </p>
              <p className="text-emerald-100">
                <span className="font-mono text-emerald-300">
                  {formatUsd(est.savings.threeYearVsOpenSearch)}
                </span>{" "}
                over 3 years
              </p>
              <p className="text-emerald-200/80">
                Also{" "}
                <span className="font-mono text-white">
                  {formatUsd(est.savings.vsOssEnterprise)}/mo
                </span>{" "}
                vs OSS + Enterprise
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {COST_SCENARIOS.map((s) => {
          const preview = estimateCosts(s);
          const delta = preview.savings.vsOpenSearch;
          return (
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
              {delta > 0 ? (
                <span className="ml-2 text-emerald-400">−{formatUsd(delta)}/mo vs OS</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-[11px] text-zinc-500">
        {scenario.totalRamGb} GB RAM · {scenario.zones} AZ
        {scenario.zones > 1 ? "s" : ""} · {scenario.storageGb.toLocaleString()} GB storage
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-orange-400/30 bg-orange-400/5 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-orange-300/90">
            AWS OpenSearch
          </p>
          <p className="mt-2 text-3xl font-semibold text-orange-100">
            {formatUsd(est.opensearch.total)}
            <span className="text-base font-normal text-orange-200/60"> / mo</span>
          </p>
          <p className="mt-2 text-xs text-orange-200/80">
            Keyword-native · EDP-friendly · no embeddings
          </p>
          <div className="mt-4 space-y-3">
            <SavingsBar
              label="Semantic overlay (est.)"
              amount={est.opensearch.semanticOverlay}
              max={maxTotal}
              tone="overlay"
            />
            <SavingsBar
              label="OpenSearch Service + storage"
              amount={est.opensearch.infra}
              max={maxTotal}
              tone="opensearch"
            />
            <SavingsBar
              label="Ops / tuning"
              amount={est.opensearch.ops}
              max={maxTotal}
              tone="ops"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            OSS + Enterprise
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-300">
            {formatUsd(est.oss.totalWithEnterprise)}
            <span className="text-base font-normal text-zinc-500"> / mo</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">Self-managed upgrade path</p>
          <div className="mt-4 space-y-3">
            <SavingsBar
              label="Ops labor"
              amount={est.oss.ops}
              max={maxTotal}
              tone="ops"
            />
            <SavingsBar
              label="Enterprise license (est.)"
              amount={est.oss.enterprise}
              max={maxTotal}
              tone="enterprise"
            />
            <SavingsBar
              label="Compute + storage"
              amount={est.oss.infra}
              max={maxTotal}
              tone="oss"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-5 ring-1 ring-cyan-400/20">
          <p className="font-mono text-xs uppercase tracking-wide text-cyan-300">
            Elastic Cloud Hosted
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {formatUsd(est.ech.total)}
            <span className="text-base font-normal text-zinc-400"> / mo</span>
          </p>
          {savesVsOs ? (
            <p className="mt-2 inline-block rounded-full bg-emerald-400/20 px-3 py-1 font-mono text-xs text-emerald-200">
              −{formatUsd(est.savings.vsOpenSearch)}/mo vs OpenSearch + overlay
            </p>
          ) : null}
          <p className="mt-2 text-xs text-cyan-200/80">AWS Marketplace · semantic-ready</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>RAM hours: {formatUsd(est.ech.capacity)}</li>
            <li>Snapshots: {formatUsd(est.ech.snapshots)}</li>
            <li className="text-emerald-300/90">Embeddings + Enterprise included</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            title: "Skip the overlay tax",
            value: formatUsd(est.opensearch.semanticOverlay),
            detail:
              "OpenSearch cannot embed natively. Hosted + Jina avoids a parallel semantic stack.",
          },
          {
            title: "Keep AWS commit",
            value: "Marketplace",
            detail:
              "Bill Elastic Cloud Hosted through AWS Marketplace — EDP credit without the OpenSearch ceiling.",
          },
          {
            title: "3-year vs OpenSearch",
            value: savesVsOs ? formatUsd(est.savings.threeYearVsOpenSearch) : "—",
            detail: "Illustrative TCO at semantic parity for this sizing.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
              {card.title}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">{card.detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs leading-relaxed text-zinc-500">
        ECH rate: ${ECH_RATE_GB_HOUR}/GB RAM/hour. OpenSearch overlay:{" "}
        {formatUsd(OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY)}/mo illustrative. Size real quotes in{" "}
        <a
          className="text-cyan-300 underline"
          href="https://cloud.elastic.co/pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elastic&apos;s calculator
        </a>{" "}
        and{" "}
        <a
          className="text-cyan-300 underline"
          href="https://aws.amazon.com/opensearch-service/pricing/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS OpenSearch pricing
        </a>
        .
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Line item</th>
              <th className="px-4 py-3">AWS OpenSearch</th>
              <th className="px-4 py-3">OSS + Enterprise</th>
              <th className="px-4 py-3">Elastic Cloud Hosted</th>
            </tr>
          </thead>
          <tbody>
            {LINE_ITEMS.map((row) => (
              <tr
                key={row.line}
                className={`border-t border-white/10 ${row.highlight ? "bg-emerald-400/5" : ""}`}
              >
                <td className="px-4 py-3 text-zinc-200">{row.line}</td>
                <td className="px-4 py-3 text-orange-200/80">{row.opensearch}</td>
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
