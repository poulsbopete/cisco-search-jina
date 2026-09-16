"use client";

import { useMemo } from "react";
import {
  ECH_RATE_GB_HOUR,
  ENTERPRISE_LICENSE_MONTHLY,
  estimateCosts,
  formatUsd,
  OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY,
  SERVERLESS_SEARCH_VCU_HOUR,
  SERVERLESS_STORAGE_GB_MONTH,
  type CostScenario,
} from "@/lib/ech-cost";

const LINE_ITEMS = [
  {
    line: "AWS contract / EDP",
    opensearch: "Native AWS line item — easy default when Cisco has large AWS commits.",
    oss: "DIY on EC2 — may not count cleanly toward EDP.",
    ech: "Elastic Cloud Hosted on AWS Marketplace — can count toward AWS commit.",
    serverless: "Elastic Cloud Serverless — commercial SaaS; Marketplace / commit paths via Elastic Cloud.",
    highlight: true,
  },
  {
    line: "Semantic search (vectors + Jina)",
    opensearch: "Not offered — keyword ceiling. Bolt on Jina + custom pipeline (overlay cost).",
    oss: "Enterprise license on existing cluster — competitive search-tier pricing.",
    ech: "Enterprise Hosted: inference endpoints + pipelines; Jina API separate.",
    serverless: "Inference + vectors included in the Search project; Jina API separate. This workshop runs here.",
    highlight: true,
  },
  {
    line: "Operations labor",
    opensearch: "AWS manages the service — you still tune ISM, access, and index design.",
    oss: "Full platform team: patch, upgrade, backup, on-call.",
    ech: "Elastic-operated rolling upgrades, monitoring, autoscaling.",
    serverless: "No cluster sizing — Elastic scales VCUs; you own indices and relevance.",
    highlight: true,
  },
  {
    line: "Enterprise search features",
    opensearch: "Lexical + filters. No ES|QL parity, CCR story, or Elastic support path.",
    oss: "$0 OSS stack — add a low Enterprise license for vectors, CCR, and support.",
    ech: "Included in Hosted Enterprise tier.",
    serverless: "ES|QL, Search AI, Agent Builder — same product story as this lab.",
    highlight: false,
  },
  {
    line: "Compute + storage",
    opensearch: "OpenSearch Service instance + EBS — sized per AZ.",
    oss: "You buy and operate EC2 or bare metal.",
    ech: "GB RAM per hour; CPU and disk scale with RAM.",
    serverless: "Usage-based VCUs (search / ingest / ML) + Search AI Lake GB/month — not provisioned RAM.",
    highlight: false,
  },
  {
    line: "GovCloud / FedRAMP",
    opensearch: "AWS OpenSearch Gov offerings — separate SKU/pricing.",
    oss: "Self-hosted inside the boundary — you own the ATO story.",
    ech: "FedRAMP Hosted (Moderate / High by tier) — managed gov path.",
    serverless: "Not available in GovCloud today — use Hosted or self-hosted Enterprise.",
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
  tone: "oss" | "ech" | "ops" | "enterprise" | "opensearch" | "overlay" | "serverless";
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
              : tone === "serverless"
                ? "bg-sky-400"
                : "bg-primary";

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

export function EchCostComparison({ scenario }: { scenario: CostScenario }) {
  const est = useMemo(() => estimateCosts(scenario), [scenario]);
  const maxTotal = Math.max(
    est.opensearch.total,
    est.oss.totalWithEnterprise,
    est.ech.total,
    est.serverless.total,
  );
  const savesVsOs = est.savings.vsOpenSearch > 0;
  const savesLicenseOnly = est.savings.vsOpenSearchLicenseOnly > 0;
  const serverlessSavesVsOs = est.savings.serverlessVsOpenSearch > 0;

  return (
    <section className="mt-10">
      <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
        Cost comparison — OpenSearch vs OSS vs Hosted vs Serverless
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
        Illustrative monthly TCO for{" "}
        <span className="text-zinc-200">{scenario.label.toLowerCase()}</span> at{" "}
        {scenario.totalRamGb} GB RAM-equivalent, {scenario.zones} AZ
        {scenario.zones > 1 ? "s" : ""}, {scenario.storageGb.toLocaleString()} GB storage.
        Serverless is usage-based (VCUs), not provisioned RAM.
      </p>

      <p className="mt-3 rounded-xl border border-orange-400/25 bg-orange-400/5 px-4 py-3 text-xs leading-relaxed text-orange-100/90">
        <span className="font-mono uppercase tracking-wide text-orange-200">OpenSearch trap</span>
        {" — "}
        The managed service fee looks EDP-friendly, but there are no native embeddings. To match
        this workshop&apos;s semantic story you still pay a{" "}
        <span className="text-white">Jina + pipeline overlay</span> (
        {formatUsd(OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY)}/mo est.) on top of keyword-only search.
      </p>

      <p className="mt-3 rounded-xl border border-sky-400/25 bg-sky-400/5 px-4 py-3 text-xs leading-relaxed text-sky-100/90">
        <span className="font-mono uppercase tracking-wide text-sky-200">Serverless</span>
        {" — "}
        Same Elasticsearch product as this lab: no cluster sizing, pay for Search / Ingest / ML VCUs
        plus lake retention.{" "}
        <span className="text-white">Commercial regions only</span> — not in GovCloud (use Hosted
        there). Best for variable load, POCs, and Search AI demos.
      </p>

      <p className="mt-3 rounded-xl border border-violet-400/25 bg-violet-400/5 px-4 py-3 text-xs leading-relaxed text-violet-100/90">
        <span className="font-mono uppercase tracking-wide text-violet-200">
          Enterprise self-hosted
        </span>
        {" — "}
        Teams already running OSS often only need an{" "}
        <span className="text-white">Enterprise license</span> for vectors, ES|QL, CCR, and
        support. Illustrative{" "}
        <span className="font-mono text-white">
          {formatUsd(ENTERPRISE_LICENSE_MONTHLY)}/mo
        </span>{" "}
        — volume pricing is frequently lower. With existing infra that is{" "}
        <span className="font-mono text-white">
          {formatUsd(est.oss.licensePlusInfra)}/mo
        </span>{" "}
        total vs{" "}
        <span className="font-mono text-white">{formatUsd(est.opensearch.total)}/mo</span>{" "}
        for OpenSearch + semantic overlay
        {savesLicenseOnly ? (
          <>
            {" "}
            (<span className="text-emerald-300">
              −{formatUsd(est.savings.vsOpenSearchLicenseOnly)}/mo
            </span>
            ).
          </>
        ) : (
          "."
        )}
      </p>

      {savesVsOs || serverlessSavesVsOs ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 via-emerald-400/5 to-transparent p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
            Estimated savings vs AWS OpenSearch + semantic overlay
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {savesVsOs ? (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-emerald-200/80">
                  Cloud Hosted
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {formatUsd(est.savings.vsOpenSearch)}
                  <span className="text-base font-normal text-emerald-200/80"> / mo</span>
                </p>
                <p className="mt-1 text-sm text-emerald-100/90">
                  {est.savings.percentVsOpenSearch}% lower ·{" "}
                  {formatUsd(est.savings.threeYearVsOpenSearch)} / 3 yr
                </p>
              </div>
            ) : null}
            {serverlessSavesVsOs ? (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-sky-200/90">
                  Serverless (commercial)
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {formatUsd(est.savings.serverlessVsOpenSearch)}
                  <span className="text-base font-normal text-sky-200/80"> / mo</span>
                </p>
                <p className="mt-1 text-sm text-emerald-100/90">
                  Usage-based ·{" "}
                  {formatUsd(est.savings.serverlessVsOpenSearch * 36)} / 3 yr illus.
                </p>
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-sm text-emerald-200/80">
            Also{" "}
            <span className="font-mono text-white">
              {formatUsd(est.savings.vsOssEnterprise)}/mo
            </span>{" "}
            Hosted vs OSS + Enterprise (ops included). Serverless vs Hosted at this sizing:{" "}
            <span className="font-mono text-white">
              {formatUsd(Math.abs(est.savings.serverlessVsHosted))}/mo
            </span>{" "}
            {est.savings.serverlessVsHosted >= 0 ? "cheaper on Serverless" : "cheaper on Hosted"}{" "}
            (illustrative — real load drives VCUs).
          </p>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
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
          <p className="mt-2 text-xs text-zinc-500">
            Self-managed · license often the smallest line item
          </p>
          <p className="mt-2 inline-block rounded-full bg-violet-400/15 px-3 py-1 font-mono text-[10px] text-violet-200">
            License + infra only: {formatUsd(est.oss.licensePlusInfra)}/mo
          </p>
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

        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5 ring-1 ring-primary/20">
          <p className="font-mono text-xs uppercase tracking-wide text-primary-bright">
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
          <p className="mt-2 text-xs text-primary-bright/80">
            AWS Marketplace · semantic-ready · Gov Hosted path
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>RAM hours: {formatUsd(est.ech.capacity)}</li>
            <li>Snapshots: {formatUsd(est.ech.snapshots)}</li>
            <li className="text-emerald-300/90">Embeddings + Enterprise included</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-sky-400/40 bg-sky-400/10 p-5 ring-1 ring-sky-400/20">
          <p className="font-mono text-xs uppercase tracking-wide text-sky-200">
            Elastic Cloud Serverless
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {formatUsd(est.serverless.total)}
            <span className="text-base font-normal text-zinc-400"> / mo</span>
          </p>
          {serverlessSavesVsOs ? (
            <p className="mt-2 inline-block rounded-full bg-sky-400/20 px-3 py-1 font-mono text-xs text-sky-100">
              −{formatUsd(est.savings.serverlessVsOpenSearch)}/mo vs OpenSearch + overlay
            </p>
          ) : null}
          <p className="mt-2 text-xs text-sky-200/80">
            This workshop · commercial only · no GovCloud
          </p>
          <div className="mt-4 space-y-3">
            <SavingsBar
              label={`Search VCUs (~${est.serverless.searchVcus})`}
              amount={est.serverless.search}
              max={maxTotal}
              tone="serverless"
            />
            <SavingsBar
              label={`Ingest VCUs (~${est.serverless.ingestVcus}, partial)`}
              amount={est.serverless.ingest}
              max={maxTotal}
              tone="serverless"
            />
            <SavingsBar
              label="Lake retention"
              amount={est.serverless.storage}
              max={maxTotal}
              tone="oss"
            />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-sky-100/70">
            ML VCUs illus. {formatUsd(est.serverless.ml)}/mo. Real quotes depend on QPS and Search
            Power — use Elastic&apos;s Serverless calculator.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Enterprise license",
            value: formatUsd(ENTERPRISE_LICENSE_MONTHLY),
            detail:
              "Competitive self-hosted subscription — vectors, CCR, and Elastic support without changing where you run.",
          },
          {
            title: "Keep AWS commit",
            value: "Marketplace",
            detail:
              "Bill Elastic Cloud Hosted through AWS Marketplace — EDP credit without the OpenSearch ceiling.",
          },
          {
            title: "Serverless (this lab)",
            value: formatUsd(est.serverless.total),
            detail:
              "Usage-based VCUs + lake. Fastest path to ES|QL and Search AI demos — commercial regions only.",
          },
          {
            title: "3-year vs OpenSearch",
            value: savesVsOs ? formatUsd(est.savings.threeYearVsOpenSearch) : "—",
            detail: "Hosted illustrative TCO at semantic parity for this sizing.",
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
        Hosted rate: ${ECH_RATE_GB_HOUR}/GB RAM/hour. Serverless Search VCU: from $
        {SERVERLESS_SEARCH_VCU_HOUR}/hr · lake from ${SERVERLESS_STORAGE_GB_MONTH}/GB-mo. Enterprise
        license: {formatUsd(ENTERPRISE_LICENSE_MONTHLY)}/mo illustrative. OpenSearch overlay:{" "}
        {formatUsd(OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY)}/mo. Size real quotes in{" "}
        <a
          className="text-primary-bright underline"
          href="https://cloud.elastic.co/pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elastic&apos;s calculator
        </a>
        ,{" "}
        <a
          className="text-primary-bright underline"
          href="https://www.elastic.co/pricing/serverless-search"
          target="_blank"
          rel="noopener noreferrer"
        >
          Serverless Search pricing
        </a>
        , and{" "}
        <a
          className="text-primary-bright underline"
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
              <th className="px-4 py-3">Cloud Hosted</th>
              <th className="px-4 py-3 text-sky-200/90">Serverless</th>
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
                <td className="px-4 py-3 text-sky-200/85">{row.serverless}</td>
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
