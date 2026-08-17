"use client";

import { useMemo, useState } from "react";
import { corpus, semanticSearch, type WorkshopDoc } from "@/lib/search";

const SOURCES: WorkshopDoc["system"][] = [
  "Snowflake",
  "S3",
  "OpenSearch",
];

export function LifecycleDemo() {
  const [query, setQuery] = useState("Show me transactions from Acme over 6 months");
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Snowflake: true,
    S3: true,
    OpenSearch: true,
  });

  const hits = useMemo(() => {
    const allow = new Set(
      Object.entries(enabled)
        .filter(([, v]) => v)
        .map(([k]) => k),
    );
    const scoped = corpus.documents.filter(
      (d) => d.source === "lifecycle" && allow.has(d.system),
    );
    return semanticSearch(query, scoped.length ? scoped : corpus.documents.filter((d) => d.source === "lifecycle"));
  }, [enabled, query]);

  return (
    <div>
      <p className="text-sm text-zinc-400">
        Balaji&apos;s team: federate Snowflake facts, S3 payloads (~10 MB), and OpenSearch logs in
        one question. Toggle sources — Ivan demos the agent question without hopping tools.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {SOURCES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setEnabled((e) => ({ ...e, [s]: !e[s] }))}
            className={`rounded-full border px-3 py-1 font-mono text-xs ${
              enabled[s]
                ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                : "border-white/15 text-zinc-500"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <ul className="mt-6 space-y-3">
        {hits.map((h) => (
          <li key={h.doc.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{h.doc.title}</p>
              <span className="font-mono text-[11px] text-cyan-300">
                {h.doc.system}
                {"bytes" in h.doc && h.doc.bytes
                  ? ` · ${(Number(h.doc.bytes) / 1048576).toFixed(1)} MB`
                  : ""}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{h.doc.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
