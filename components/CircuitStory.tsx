"use client";

import { useState } from "react";
import { OpenInElastic } from "@/components/OpenInElastic";
import { DEMO_BEATS } from "@/lib/demo-playbook";
import { corpus, semanticSearch } from "@/lib/search";

type Lens = "proxy" | "security";

const LENSES: { id: Lens; label: string; query: string; blurb: string }[] = [
  {
    id: "proxy",
    label: "LLM proxy",
    query: "prompt injection blocked model route token budget",
    blurb:
      "CIRCUIT already emits ECS-shaped proxy telemetry — model, route, tokens, policy decision. Search and explain those events the same way you search deals.",
  },
  {
    id: "security",
    label: "Security",
    query: "data leakage PII exfiltration anomalous agent tool call",
    blurb:
      "Security sits on the same ECS stream: blocked prompts, sensitive-data hits, anomalous tool use. Elastic is built to store, query, and alert on ECS at scale.",
  },
];

const ECS_FIELDS = [
  { field: "event.dataset", example: "circuit.llm_proxy" },
  { field: "event.action", example: "policy_deny | chat.completion" },
  { field: "gen_ai.request.model", example: "gpt-4o / private-llm" },
  { field: "user.id / user.email", example: "cisco CIRCUIT caller" },
  { field: "event.outcome", example: "success | failure | blocked" },
  { field: "threat.tactic.name", example: "exfiltration · prompt injection" },
];

export function CircuitStory() {
  const [lens, setLens] = useState<Lens>("proxy");
  const active = LENSES.find((l) => l.id === lens) ?? LENSES[0];
  const circuitDocs = corpus.documents.filter((d) => d.source === "circuit");
  const pool = circuitDocs.length ? circuitDocs : corpus.documents;
  const hits = semanticSearch(active.query, pool);

  return (
    <div>
      <OpenInElastic beat={DEMO_BEATS.find((b) => b.id === "circuit") ?? DEMO_BEATS[0]} />

      <p className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 text-sm leading-relaxed text-zinc-200">
        <span className="text-white">CIRCUIT</span> is one of Cisco&apos;s fastest-growing internal
        solutions — the enterprise AI platform behind LLM proxy and AI security controls. You
        already run <span className="text-white">ECS at scale</span> for that traffic. Elastic is
        the search and security engine that speaks ECS natively: store proxy and security events,
        retrieve by meaning with{" "}
        <span className="text-white">Jina</span>, and keep auditability for every hit.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "ECS you already own",
            detail:
              "LLM proxy and security events land as Elastic Common Schema. No parallel log dialect — Discover, ES|QL, and alerts work on day one.",
          },
          {
            title: "Search the proxy",
            detail:
              "Find similar blocked prompts, token spikes, or model-route regressions — semantic neighborhood, not just string match on request IDs.",
          },
          {
            title: "Secure the AI path",
            detail:
              "Policy denials, PII leakage signals, and anomalous agent tool calls stay queryable and explainable alongside the rest of Cisco search.",
          },
        ].map((card) => (
          <section
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-mono text-sm text-zinc-200">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.detail}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {LENSES.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLens(l.id)}
            className={`rounded-full border px-4 py-2 font-mono text-xs ${
              lens === l.id
                ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                : "border-white/15 text-zinc-400"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{active.blurb}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            ECS fields (illustrative)
          </h2>
          <ul className="mt-3 space-y-2 font-mono text-xs text-zinc-300">
            {ECS_FIELDS.map((row) => (
              <li
                key={row.field}
                className="flex flex-col gap-0.5 border-b border-white/5 pb-2 sm:flex-row sm:justify-between sm:gap-4"
              >
                <span className="text-cyan-300">{row.field}</span>
                <span className="text-zinc-500">{row.example}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            Semantic hits · {active.label}
          </h2>
          <p className="mt-2 font-mono text-[11px] text-zinc-600">query: {active.query}</p>
          <ul className="mt-3 space-y-3 text-sm">
            {hits.slice(0, 5).map((h) => (
              <li key={h.doc.id}>
                <span className="text-white">{h.doc.title}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-zinc-500">
                  {h.doc.system}
                  {h.doc.concepts?.length
                    ? ` · ${h.doc.concepts.slice(0, 3).join(", ")}`
                    : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Same Elastic offer as the other Cisco groups:{" "}
        <span className="text-zinc-400">Enterprise search</span>,{" "}
        <span className="text-zinc-400">Jina embeddings</span>, AI-assisted retrieval with audit —
        on <span className="text-zinc-400">self-hosted</span>,{" "}
        <span className="text-zinc-400">Cloud Hosted</span>, or{" "}
        <span className="text-zinc-400">Serverless</span>. CIRCUIT&apos;s ECS volume is a Hosted or
        self-hosted conversation for production; this workshop lab stays on Serverless Search.
      </p>
    </div>
  );
}
