import Link from "next/link";
import { CISCO_TEAMS, INSTRUQT_INVITE, KIBANA_URL, SPEAKERS } from "@/lib/config";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          90-minute workshop · Elastic Serverless + Jina
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Cisco-wide search: deals, transactions, logs, notes.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-400">
          Keyword today. Semantic + explainable ranking tomorrow. Self-paced Serverless labs —
          ungated, no login wall. Slides and click-demos on this app.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={INSTRUQT_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-zinc-950"
          >
            Launch the lab (ungated)
          </a>
          <Link
            href="/slides"
            className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
          >
            Open slides
          </Link>
          <Link
            href="/demo"
            className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
          >
            Keyword vs semantic
          </Link>
          <a
            href={KIBANA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-cyan-400/40 px-5 py-3 font-mono text-sm text-cyan-200"
          >
            Shared Kibana
          </a>
        </div>
        <p className="mt-3 font-mono text-xs text-zinc-500">
          Instruqt invite: {INSTRUQT_INVITE}
        </p>

        <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Who speaks
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SPEAKERS.map((s) => (
            <div key={s.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-medium">{s.name}</p>
              <p className="font-mono text-xs text-cyan-300">{s.role}</p>
              <p className="mt-2 text-sm text-zinc-400">{s.section}</p>
              <p className="mt-1 font-mono text-[11px] text-zinc-500">{s.minutes}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Cisco teams in this story
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {CISCO_TEAMS.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/40"
            >
              <p className="font-mono text-xs text-cyan-300">{t.owner}</p>
              <p className="mt-2 text-xl font-medium">{t.name}</p>
              <p className="mt-2 text-sm text-zinc-400">{t.promise}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
