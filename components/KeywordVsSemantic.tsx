"use client";

import { useMemo, useState } from "react";
import { OpenInElastic } from "@/components/OpenInElastic";
import { DEMO_BEATS } from "@/lib/demo-playbook";
import { keywordSearch, semanticSearch } from "@/lib/search";

const DEFAULT_QUERY = "legal concerns about vendor lock-in";

function HitList({
  title,
  hits,
  empty,
}: {
  title: string;
  hits: ReturnType<typeof keywordSearch>;
  empty: string;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">{title}</h2>
      <p className="mt-1 text-xs text-zinc-500">{hits.length} hits</p>
      <ul className="mt-4 space-y-4">
        {hits.length === 0 ? <li className="text-sm text-zinc-500">{empty}</li> : null}
        {hits.map((h) => (
          <li key={h.doc.id} className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{h.doc.title}</p>
                <p className="mt-1 font-mono text-[11px] text-cyan-300">
                  {h.doc.system} · {h.doc.source}
                </p>
              </div>
              <span className="font-mono text-xs text-zinc-400">{h.score.toFixed(2)}</span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{h.doc.content}</p>
            <ul className="mt-3 space-y-1">
              {h.why.slice(0, 3).map((w) => (
                <li key={w} className="text-xs text-emerald-300/90">
                  {w}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function KeywordVsSemantic() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const keyword = useMemo(() => keywordSearch(query), [query]);
  const semantic = useMemo(() => semanticSearch(query), [query]);

  return (
    <div>
      <OpenInElastic beat={DEMO_BEATS[0]} />
      <label className="mt-8 block font-mono text-xs uppercase tracking-wide text-zinc-400">
        Same query
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-base text-white outline-none focus:border-cyan-400"
        />
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          DEFAULT_QUERY,
          "switching costs on a collaboration stack",
          "Acme transactions last 6 months",
          "legal hold",
        ].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuery(q)}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-zinc-300 hover:border-cyan-400"
          >
            {q}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        Left is the OpenSearch ceiling: keyword only, no embeddings. Right is Elastic + Jina:
        meaning as numbers, so different wording can still surface the same deals.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <HitList
          title="Keyword — OpenSearch ceiling"
          hits={keyword}
          empty="No exact tokens. This is the gap reps feel."
        />
        <HitList
          title="Semantic — Elastic + Jina"
          hits={semantic}
          empty="No neighborhood overlap."
        />
      </div>
    </div>
  );
}
