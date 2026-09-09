"use client";

import { cn } from "@/lib/utils";

export type InfographicKind =
  | "cisco-hub"
  | "offer-pipeline"
  | "groups-fan"
  | "keyword-vs-semantic"
  | "elastic-jina"
  | "ecs-stream"
  | "deploy-three"
  | "path-chooser"
  | "lab-steps";

function Node({
  label,
  sub,
  accent,
  compact,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border text-center",
        accent
          ? "border-[#049FD9] bg-[#049FD9]/20 shadow-[0_0_24px_rgba(4,159,217,0.25)]"
          : "border-[#049FD9]/30 bg-[#061525]/80",
        compact ? "px-2 py-1.5" : "px-3 py-2.5",
      )}
    >
      <p
        className={cn(
          "font-mono font-semibold uppercase tracking-wide text-[#00BCEB]",
          compact ? "text-[9px]" : "text-[11px]",
        )}
      >
        {label}
      </p>
      {sub ? (
        <p className={cn("mt-0.5 text-[#B8D4E6]", compact ? "text-[9px]" : "text-xs")}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function Arrow({ compact }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "font-mono text-[#049FD9]",
        compact ? "text-sm" : "text-lg",
      )}
      aria-hidden
    >
      →
    </span>
  );
}

export function SlideInfographic({
  kind,
  compact,
}: {
  kind: InfographicKind;
  compact?: boolean;
}) {
  const shell = cn(
    "mx-auto w-full max-w-4xl",
    compact ? "mt-3" : "mt-8",
  );

  if (kind === "cisco-hub") {
    return (
      <div className={shell}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["CRM", "Lifecycle", "Webex", "CIRCUIT"].map((g) => (
            <Node key={g} label={g} compact={compact} />
          ))}
        </div>
        <div className="my-2 flex justify-center">
          <span className="font-mono text-[#049FD9]">{compact ? "↓" : "↓ ↓ ↓ ↓"}</span>
        </div>
        <div className="mx-auto max-w-md">
          <Node
            label="Elastic + Jina"
            sub="Search · embeddings · explainability"
            accent
            compact={compact}
          />
        </div>
      </div>
    );
  }

  if (kind === "offer-pipeline") {
    const steps = ["Connect", "Embed", "Search", "Support"];
    return (
      <div className={cn(shell, "flex flex-wrap items-center justify-center gap-2")}>
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Node label={s} accent={i === steps.length - 1} compact={compact} />
            {i < steps.length - 1 ? <Arrow compact={compact} /> : null}
          </div>
        ))}
      </div>
    );
  }

  if (kind === "groups-fan") {
    return (
      <div className={shell}>
        <div className="mx-auto mb-2 max-w-xs">
          <Node label="One platform" sub="Same APIs · same relevance" accent compact={compact} />
        </div>
        <div className="flex justify-center font-mono text-[#049FD9]">↓</div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { l: "CRM", s: "Similar deals · explainable" },
            { l: "Lifecycle", s: "Warehouses · objects · logs" },
            { l: "Webex", s: "Gov East / West · CCR" },
            { l: "CIRCUIT", s: "ECS LLM proxy · security" },
          ].map((g) => (
            <Node key={g.l} label={g.l} sub={g.s} compact={compact} />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "keyword-vs-semantic") {
    return (
      <div className={cn(shell, "grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center")}>
        <div className="rounded-xl border border-white/15 bg-black/30 p-3 text-left">
          <p className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
            Keyword
          </p>
          <p className={cn("mt-1 font-mono text-[#E8F4FA]", compact ? "text-xs" : "text-sm")}>
            “legal” → legal hold noise
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 rounded-full bg-zinc-500" />
          </div>
        </div>
        <p className="font-mono text-xs text-[#049FD9]">vs</p>
        <div className="rounded-xl border border-[#049FD9]/50 bg-[#049FD9]/10 p-3 text-left">
          <p className="font-mono text-[10px] uppercase tracking-wide text-[#00BCEB]">
            Semantic
          </p>
          <p className={cn("mt-1 font-mono text-white", compact ? "text-xs" : "text-sm")}>
            “legal concerns” → switching costs
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-5/6 rounded-full bg-[#049FD9]" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "elastic-jina") {
    return (
      <div className={cn(shell, "flex flex-wrap items-center justify-center gap-2")}>
        <Node label="Elastic" sub="Store · index · audit" compact={compact} />
        <span className="font-mono text-xl font-bold text-[#00BCEB]">+</span>
        <Node label="Jina" sub="Multimodal vectors" compact={compact} />
        <span className="font-mono text-xl font-bold text-[#00BCEB]">=</span>
        <Node label="Relevance" sub="Meaning, not tokens" accent compact={compact} />
      </div>
    );
  }

  if (kind === "ecs-stream") {
    return (
      <div className={cn(shell, "flex flex-wrap items-center justify-center gap-2")}>
        <Node label="CIRCUIT" sub="LLM proxy · security" compact={compact} />
        <Arrow compact={compact} />
        <Node label="ECS events" sub="Model · tokens · outcome" compact={compact} />
        <Arrow compact={compact} />
        <Node label="Elastic" sub="Search · alert · explain" accent compact={compact} />
      </div>
    );
  }

  if (kind === "deploy-three") {
    return (
      <div className={cn(shell, "grid gap-2 sm:grid-cols-3")}>
        {[
          { l: "Self-hosted", s: "Your VPC · Enterprise license · you operate" },
          { l: "Cloud Hosted", s: "Elastic operates · commercial or FedRAMP Gov" },
          { l: "Serverless", s: "SaaS Search · fastest commercial · this lab" },
        ].map((d) => (
          <Node key={d.l} label={d.l} sub={d.s} accent={d.l === "Cloud Hosted"} compact={compact} />
        ))}
      </div>
    );
  }

  if (kind === "path-chooser") {
    return (
      <div className={shell}>
        <div className="mx-auto mb-2 max-w-sm">
          <Node label="Where must it run?" compact={compact} accent />
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-[#049FD9]/25 bg-[#061525]/70 p-3 text-left">
            <p className="font-mono text-[10px] uppercase text-[#00BCEB]">Your VPC / OSS</p>
            <p className={cn("mt-1 text-[#E8F4FA]", compact ? "text-xs" : "text-sm")}>
              → Enterprise self-hosted
            </p>
          </div>
          <div className="rounded-xl border border-[#049FD9]/25 bg-[#061525]/70 p-3 text-left">
            <p className="font-mono text-[10px] uppercase text-[#00BCEB]">Managed / Gov</p>
            <p className={cn("mt-1 text-[#E8F4FA]", compact ? "text-xs" : "text-sm")}>
              → Cloud Hosted
            </p>
          </div>
          <div className="rounded-xl border border-[#049FD9]/25 bg-[#061525]/70 p-3 text-left">
            <p className="font-mono text-[10px] uppercase text-[#00BCEB]">Fast commercial</p>
            <p className={cn("mt-1 text-[#E8F4FA]", compact ? "text-xs" : "text-sm")}>
              → Serverless SaaS
            </p>
          </div>
        </div>
      </div>
    );
  }

  // lab-steps
  return (
    <div className={cn(shell, "flex flex-wrap items-center justify-center gap-2")}>
      {[
        { n: "1", l: "Open lab", s: "Serverless project" },
        { n: "2", l: "Run ES|QL", s: "Keyword vs semantic" },
        { n: "3", l: "Walk away", s: "Know your path" },
      ].map((step, i) => (
        <div key={step.n} className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border border-[#049FD9]/40 bg-[#049FD9]/10",
              compact ? "px-2 py-1.5" : "px-3 py-2",
            )}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-[#049FD9] font-mono text-xs font-bold text-white">
              {step.n}
            </span>
            <div className="text-left">
              <p className="font-mono text-[10px] uppercase text-[#00BCEB]">{step.l}</p>
              <p className="text-[11px] text-[#B8D4E6]">{step.s}</p>
            </div>
          </div>
          {i < 2 ? <Arrow compact={compact} /> : null}
        </div>
      ))}
    </div>
  );
}
