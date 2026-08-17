"use client";

import { useState } from "react";
import { OpenInElastic } from "@/components/OpenInElastic";
import { DEMO_BEATS } from "@/lib/demo-playbook";
import { corpus, semanticSearch } from "@/lib/search";

const REGIONS = ["us-gov-east", "us-gov-west"] as const;

export function WebexDemo() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("us-gov-east");
  const query = "legal concerns collaboration switching costs";
  const local = corpus.documents.filter((d) => d.region === region);
  const hits = semanticSearch(query, local);
  const other = region === "us-gov-east" ? "us-gov-west" : "us-gov-east";
  const otherHits = semanticSearch(query, corpus.documents.filter((d) => d.region === other));

  return (
    <div>
      <OpenInElastic beat={DEMO_BEATS[3]} />
      <p className="mt-6 text-sm text-zinc-400">
        Architecture visual only: CCR copies the index, query stays in-region, ranking must not
        drift. The shared Kibana is <span className="text-zinc-200">one</span> project
        (us-east-1) — it is not a dual Gov cluster. Toggle East / West here to show the idea;
        prove retrieval in Agent Builder.
      </p>
      <div className="mt-4 flex gap-2">
        {REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            className={`rounded-full border px-4 py-2 font-mono text-xs ${
              region === r
                ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                : "border-white/15 text-zinc-400"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-mono text-sm text-zinc-300">Searching {region}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {hits.slice(0, 5).map((h) => (
              <li key={h.doc.id}>
                <span className="text-white">{h.doc.title}</span>
                <span className="block font-mono text-[11px] text-zinc-500">{h.doc.system}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-mono text-sm text-zinc-300">CCR peer {other} (compare)</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {otherHits.slice(0, 5).map((h) => (
              <li key={h.doc.id}>
                <span className="text-white">{h.doc.title}</span>
                <span className="block font-mono text-[11px] text-zinc-500">{h.doc.system}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
