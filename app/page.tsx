import Link from "next/link";
import { DemoPlaybook } from "@/components/DemoPlaybook";
import { CISCO_TEAMS, INSTRUQT_INVITE, KIBANA_URL, SPEAKERS } from "@/lib/config";
import { ELASTIC } from "@/lib/demo-playbook";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          How to use this in a Cisco room
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Storyboard here. Proof in Elastic. Practice in Instruqt.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-400">
          This Vercel app does <span className="text-zinc-200">not</span> query{" "}
          <a className="text-cyan-200 underline underline-offset-2" href={KIBANA_URL} target="_blank" rel="noopener noreferrer">
            ai-assistants-ffcafb
          </a>
          . That Kibana is the live Search project. Use the panes below to sell the idea, then
          open Agent Builder and paste the prompt.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={ELASTIC.agents}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-zinc-950"
          >
            Open Agent Builder (shared Elastic)
          </a>
          <Link
            href="/slides"
            className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
          >
            Slides
          </Link>
          <a
            href={INSTRUQT_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm"
          >
            Ungated lab
          </a>
        </div>

        <DemoPlaybook />

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
