"use client";

import { useState } from "react";
import { ELASTIC, type DemoBeat } from "@/lib/demo-playbook";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  const [copied, setCopied] = useState(false);
  const href = ELASTIC[beat.elasticPath];

  return (
    <aside className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
        How to sell this
      </p>
      <p className="mt-2 text-sm text-zinc-200">{beat.sell}</p>
      <p className="mt-3 text-sm text-zinc-400">{beat.elastic}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-400 px-3 py-2 font-mono text-xs font-semibold text-zinc-950"
        >
          Open in Elastic (shared Kibana)
        </a>
        <a
          href={ELASTIC.discover}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/20 px-3 py-2 font-mono text-xs text-zinc-200"
        >
          Discover
        </a>
        <button
          type="button"
          className="rounded-lg border border-white/20 px-3 py-2 font-mono text-xs text-zinc-200"
          onClick={async () => {
            await navigator.clipboard.writeText(beat.prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "Copied prompt" : "Copy Agent Builder prompt"}
        </button>
      </div>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-500">
        This page is a projector-friendly storyboard (no API keys). Elastic is the product: paste
        the prompt in Agent Builder on{" "}
        <span className="text-zinc-400">ai-assistants-ffcafb</span>.
      </p>
    </aside>
  );
}
