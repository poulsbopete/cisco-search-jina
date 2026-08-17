"use client";

import { OpenInElastic } from "@/components/OpenInElastic";
import { DEMO_BEATS } from "@/lib/demo-playbook";
import { semanticSearch } from "@/lib/search";
import { corpus } from "@/lib/search";

const SEED = "deal-acme-webex-renewal";

export function CrmDemo() {
  const seed = corpus.documents.find((d) => d.id === SEED)!;
  const similar = semanticSearch(
    `${seed.title} ${seed.content}`,
  ).filter((h) => h.doc.id !== SEED);

  const nodes = [
    { id: "Acme Corp", x: 50, y: 18 },
    { id: "Webex Calling renewal", x: 22, y: 62 },
    { id: "Microsoft Teams", x: 78, y: 62 },
    { id: "Zoom", x: 50, y: 88 },
  ];

  return (
    <div className="space-y-6">
      <OpenInElastic beat={DEMO_BEATS[1]} />
      <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          Seed deal
        </h2>
        <p className="mt-3 text-lg font-medium">{seed.title}</p>
        <p className="mt-2 text-sm text-zinc-400">{seed.content}</p>
        <p className="mt-4 font-mono text-xs text-cyan-300">
          CRM Analytics · find deals like this one
        </p>
      </section>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          Knowledge graph
        </h2>
        <svg viewBox="0 0 100 100" className="mt-4 h-56 w-full">
          <line x1="50" y1="18" x2="22" y2="62" stroke="#67e8f9" strokeWidth="0.6" />
          <line x1="50" y1="18" x2="78" y2="62" stroke="#67e8f9" strokeWidth="0.6" />
          <line x1="22" y1="62" x2="78" y2="62" stroke="#64748b" strokeWidth="0.4" />
          <line x1="50" y1="18" x2="50" y2="88" stroke="#64748b" strokeWidth="0.4" />
          {nodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="4.5" fill="#0e7490" stroke="#67e8f9" />
              <text x={n.x} y={n.y + 9} textAnchor="middle" fontSize="3.2" fill="#e2e8f0">
                {n.id}
              </text>
            </g>
          ))}
        </svg>
        <p className="font-mono text-[11px] text-zinc-500">Account → Deal → Competitor</p>
      </section>
      <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-mono text-sm uppercase tracking-wide text-zinc-300">
          Why these matched
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {similar.slice(0, 4).map((h) => (
            <li key={h.doc.id} className="rounded-xl border border-white/10 bg-black/40 p-4">
              <p className="font-medium">{h.doc.title}</p>
              <p className="mt-1 font-mono text-[11px] text-cyan-300">{h.doc.system}</p>
              <ul className="mt-2 space-y-1 text-xs text-emerald-300/90">
                {h.why.slice(0, 3).map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </div>
  );
}
