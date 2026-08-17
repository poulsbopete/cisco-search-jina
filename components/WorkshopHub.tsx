"use client";

import { INSTRUQT_INVITE } from "@/lib/config";
import { useModule } from "@/components/ModuleProvider";

const STEPS = [
  "Keyword vs semantic — MATCH tokens vs concept neighborhood",
  "CRM Analytics — find deals like this one",
  "Lifecycle — Snowflake, S3, and Elastic logs in one ES|QL",
  "Webex / Infra — same query in East and West after CCR",
];

export function WorkshopHub() {
  const { setActive } = useModule();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">Hands-on lab</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Semantic search on Elastic Serverless
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-400">
        Your own Search project in the browser. Use the <span className="text-zinc-200">Discover</span> tab
        and <span className="text-zinc-200">ES|QL</span> against{" "}
        <code className="text-cyan-200">cisco-jina-corpus</code>. Skip AI Agent / Agent Builder — it
        is not wired to this index.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-zinc-950"
        >
          Start the lab
        </a>
        <button
          type="button"
          onClick={() => setActive("semantic")}
          className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
        >
          Back to Semantic
        </button>
      </div>
      <ol className="mt-12 space-y-4">
        {STEPS.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm text-zinc-400">
            <span className="font-mono text-xs text-cyan-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
