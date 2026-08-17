import Link from "next/link";
import { ELASTIC, DEMO_BEATS } from "@/lib/demo-playbook";
import { INSTRUQT_INVITE, KIBANA_URL } from "@/lib/config";

export function DemoPlaybook() {
  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
        How this app relates to Elastic
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-zinc-400">
        Three layers. Do not treat the Vercel panes as a live query against Kibana — they are the
        <span className="text-zinc-200"> storyboard</span>. The shared project is the{" "}
        <span className="text-zinc-200">product proof</span>. Instruqt is{" "}
        <span className="text-zinc-200">their hands on the keyboard</span>.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-mono text-xs text-cyan-300">1 · This Vercel app</p>
          <p className="mt-2 text-lg font-medium">Sell the concept</p>
          <p className="mt-2 text-sm text-zinc-400">
            Slides + split-pane visuals on a Cisco-shaped corpus. No keys. Safe on a projector.
            Keyword vs semantic, similar deals, federation, East/West CCR.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
          <p className="font-mono text-xs text-cyan-300">2 · Shared Kibana</p>
          <p className="mt-2 text-lg font-medium">Prove it in Elastic</p>
          <p className="mt-2 text-sm text-zinc-400">
            <a className="text-cyan-200 underline underline-offset-2" href={KIBANA_URL} target="_blank" rel="noopener noreferrer">
              ai-assistants-ffcafb
            </a>{" "}
            — Agent Builder, Discover, ES|QL. Same story, real Search project. You paste a prompt;
            Elastic retrieves.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={ELASTIC.agents} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-cyan-200 underline">
              Agent Builder
            </a>
            <a href={ELASTIC.discover} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-cyan-200 underline">
              Discover
            </a>
            <a href={ELASTIC.playground} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-cyan-200 underline">
              Playground
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-mono text-xs text-cyan-300">3 · Instruqt lab</p>
          <p className="mt-2 text-lg font-medium">Let them drive</p>
          <p className="mt-2 text-sm text-zinc-400">
            Ungated invite. Each learner gets their own Serverless Search project and the seeded
            corpus. Not the shared Kibana — so the demo cluster stays clean.
          </p>
          <a
            href={INSTRUQT_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-mono text-[11px] text-cyan-200 underline"
          >
            Launch lab
          </a>
        </div>
      </div>

      <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
        Room script — 4 clicks
      </h3>
      <ol className="mt-4 space-y-3">
        {DEMO_BEATS.map((b, i) => (
          <li key={b.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="font-mono text-xs text-cyan-300">
              {i + 1} · {b.title}
            </p>
            <p className="mt-1 text-sm text-zinc-300">{b.sell}</p>
            <p className="mt-1 text-sm text-zinc-500">{b.elastic}</p>
            <div className="mt-2 flex flex-wrap gap-3 font-mono text-[11px]">
              <Link href={b.href} className="text-cyan-200 underline">
                Storyboard
              </Link>
              <a href={ELASTIC[b.elasticPath]} target="_blank" rel="noopener noreferrer" className="text-zinc-400 underline">
                Then Elastic
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
