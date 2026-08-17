import Link from "next/link";
import { DemoPlaybook } from "@/components/DemoPlaybook";
import { CISCO_TEAMS, INSTRUQT_INVITE } from "@/lib/config";
import { ELASTIC } from "@/lib/demo-playbook";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          Cisco · Elastic · Jina
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Search that understands deals, transactions, logs, and notes.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-400">
          Keyword search finds strings. Semantic search finds meaning. Elastic runs the search;
          Jina powers the relevance — across CRM Analytics, Lifecycle Platform, and Webex /
          Infrastructure.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={INSTRUQT_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-zinc-950"
          >
            Try the hands-on lab
          </a>
          <Link
            href="/demo"
            className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
          >
            Keyword vs semantic
          </Link>
          <a
            href={ELASTIC.home}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-cyan-400/40 px-5 py-3 font-mono text-sm text-cyan-200"
          >
            Open Elastic
          </a>
          <Link
            href="/slides"
            className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
          >
            Slides
          </Link>
        </div>

        <DemoPlaybook />

        <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Built for Cisco teams
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
