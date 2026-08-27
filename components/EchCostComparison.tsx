"use client";

import { useMemo, useState } from "react";
import {
  COST_SCENARIOS,
  ECH_RATE_GB_HOUR,
  ENTERPRISE_LICENSE_MONTHLY,
  estimateCosts,
  formatUsd,
  OPS_FTE_MONTHLY,
  type CostScenario,
} from "@/lib/ech-cost";

const LINE_ITEMS = [
  {
    line: "Elasticsearch license",
    oss: "$0 Open Source — or + Enterprise subscription for vectors / CCR / support.",
    ech: "Included in Hosted tier (Enterprise features in subscription).",
    highlight: true,
  },
  {
    line: "Operations labor",
    oss: "Platform team: upgrades, TLS, snapshots, incidents, capacity planning.",
    ech: "Elastic-operated — rolling upgrades, monitoring, autoscaling.",
    highlight: true,
  },
  {
    line: "Compute / RAM",
    oss: "You buy EC2 or bare metal. You size, patch, and replace nodes.",
    ech: "GB RAM per hour across ES + Kibana nodes. CPU and disk scale with RAM.",
    highlight: false,
  },
  {
    line: "Storage",
    oss: "EBS / SAN + your backup product and retention policy.",
    ech: "Primary disk included in RAM price. Snapshot storage metered separately.",
    highlight: false,
  },
  {
    line: "Semantic search (vectors + Jina)",
    oss: "Not in OSS. Build ingest + ops yourself even with Enterprise.",
    ech: "Inference endpoints + pipelines on Hosted; Jina API separate.",
    highlight: true,
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
  tone: "oss" | "ech" | "ops" | "enterprise";
}) {
  const pct = max > 0 ? Math.min(100, Math.round((amount / max) * 100)) : 0;
  const bar =
    tone === "oss"
      ? "bg-zinc-500"
      : tone === "ops"
        ? "bg-amber-400"
        : tone === "enterprise"
          ? "bg-orange-400"
          : "bg-cyan-400";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className={tone === "ops" ? "font-medium text-amber-200" : "text-zinc-400"}>
          {label}
        </span>
        <span className={tone === "ops" ? "font-mono text-amber-100" : "font-mono text-zinc-300"}>
          {formatUsd(amount)}
        </span>
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
  const saves = est.savings.vsOssEnterprise > 0;

  return (
    <section className="mt-10">
      <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
        Cost comparison — total cost of ownership
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
        The sticker shock is not the $0 OSS license — it is{" "}
        <span className="text-zinc-200">ops headcount</span> plus{" "}
        <span className="text-zinc-200">Enterprise</span> when Cisco teams need semantic search.
        Numbers are illustrative — size your cluster in Elastic&apos;s{" "}
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

      {saves ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 via-emerald-400/5 to-transparent p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
            Estimated savings vs self-hosted OSS + Enterprise
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-6">
            <div>
              <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {formatUsd(est.savings.vsOssEnterprise)}
                <span className="text-lg font-normal text-emerald-200/80"> / mo</span>
              </p>
              <p className="mt-1 text-sm text-emerald-100/90">
                {est.savings.percentVsEnterprise}% lower TCO in this scenario
              </p>
            </div>
            <div className="space-y-1 border-l border-emerald-400/30 pl-6 text-sm">
              <p className="text-emerald-100">
                <span className="font-mono text-emerald-300">{formatUsd(est.savings.annualVsEnterprise)}</span>{" "}
                / year
              </p>
              <p className="text-emerald-100">
                <span className="font-mono text-emerald-300">{formatUsd(est.savings.threeYearVsEnterprise)}</span>{" "}
                over 3 years
              </p>
              <p className="text-emerald-200/80">
                Reclaim{" "}
                <span className="font-mono text-white">{formatUsd(est.savings.opsReclaimed)}</span>/mo
                platform ops
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm text-amber-100/90">
          At this sizing, Hosted infra can exceed OSS compute — the savings story is still{" "}
          <span className="text-white">ops labor</span>, FedRAMP boundary, and not running
          unsupported OSS in gov regions. Adjust FTE or use the pricing calculator for your quote.
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {COST_SCENARIOS.map((s) => {
          const preview = estimateCosts(s);
          const delta = preview.savings.vsOssEnterprise;
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
                <span className="ml-2 text-emerald-400">−{formatUsd(delta)}/mo</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-[11px] text-zinc-500">
        {scenario.totalRamGb} GB total RAM · {scenario.zones} AZ
        {scenario.zones > 1 ? "s" : ""} · {scenario.storageGb.toLocaleString()} GB snapshot /
        disk · {scenario.opsFte} FTE ops @ {formatUsd(OPS_FTE_MONTHLY)}/FTE/mo · Enterprise est.{" "}
        {formatUsd(ENTERPRISE_LICENSE_MONTHLY)}/mo on self-managed
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <p className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            Where OSS TCO hides
          </p>
          <div className="mt-4 space-y-3">
            <SavingsBar
              label="Ops labor"
              amount={est.oss.ops}
              max={est.oss.totalWithEnterprise}
              tone="ops"
            />
            <SavingsBar
              label="Enterprise license (est.)"
              amount={est.oss.enterprise}
              max={est.oss.totalWithEnterprise}
              tone="enterprise"
            />
            <SavingsBar
              label="Compute + storage"
              amount={est.oss.infra}
              max={est.oss.totalWithEnterprise}
              tone="oss"
            />
          </div>
          <p className="mt-4 text-2xl font-semibold text-zinc-200">
            {formatUsd(est.oss.totalWithEnterprise)}
            <span className="text-sm font-normal text-zinc-500"> / mo</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">OSS + Enterprise — apples to apples</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-90">
            <p className="font-mono text-xs uppercase tracking-wide text-zinc-500">
              Self-hosted Open Source only
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-300">
              {formatUsd(est.oss.total)}
              <span className="text-base font-normal text-zinc-500"> / mo</span>
            </p>
            <p className="mt-2 text-xs text-amber-200/90">
              Looks cheap — but no vectors, CCR, or support. Not a semantic-search path.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-500">
              <li>Compute: {formatUsd(est.oss.compute)}</li>
              <li>Storage: {formatUsd(est.oss.storage)}</li>
              <li className="text-amber-200/80">Ops: {formatUsd(est.oss.ops)}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-5 ring-1 ring-cyan-400/20">
            <p className="font-mono text-xs uppercase tracking-wide text-cyan-300">
              Elastic Cloud Hosted
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {formatUsd(est.ech.total)}
              <span className="text-base font-normal text-zinc-400"> / mo</span>
            </p>
            {saves ? (
              <p className="mt-2 inline-block rounded-full bg-emerald-400/20 px-3 py-1 font-mono text-xs text-emerald-200">
                Save {formatUsd(est.savings.vsOssEnterprise)}/mo vs OSS + Enterprise
              </p>
            ) : null}
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>RAM hours: {formatUsd(est.ech.capacity)}</li>
              <li>Snapshots: {formatUsd(est.ech.snapshots)}</li>
              <li className="text-emerald-300/90">Ops + Enterprise: included in subscription</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            title: "Stop funding platform ops",
            value: formatUsd(est.savings.opsReclaimed),
            detail: "Patch Tuesday, rolling upgrades, backup drills, and pager duty come off your team.",
          },
          {
            title: "One invoice for search",
            value: formatUsd(est.ech.total),
            detail: "No separate Enterprise line item plus EC2 plus on-call rotation.",
          },
          {
            title: "3-year TCO delta",
            value: saves ? formatUsd(est.savings.threeYearVsEnterprise) : "—",
            detail: saves
              ? "Illustrative savings vs self-managed OSS + Enterprise at this sizing."
              : "Use the pricing calculator for gov-scale quotes.",
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
        Illustrative ECH rate: ${ECH_RATE_GB_HOUR}/GB RAM/hour (commercial). Enterprise license on
        self-managed shown at {formatUsd(ENTERPRISE_LICENSE_MONTHLY)}/mo — your quote will vary.
        Formula: total RAM × AZ count × 730 h × rate + snapshots.
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
              <tr
                key={row.line}
                className={`border-t border-white/10 ${row.highlight ? "bg-emerald-400/5" : ""}`}
              >
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
