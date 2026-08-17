import Link from "next/link";
import { DEMO_BEATS, ELASTIC } from "@/lib/demo-playbook";
import { INSTRUQT_INVITE } from "@/lib/config";

export function DemoPlaybook() {
  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
        Explore the experience
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-zinc-400">
        Walk through interactive examples, continue in Elastic Cloud, or start a guided lab on
        your own Serverless Search project.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-mono text-xs text-cyan-300">Interactive demos</p>
          <p className="mt-2 text-lg font-medium">See relevance on Cisco-shaped data</p>
          <p className="mt-2 text-sm text-zinc-400">
            Keyword vs semantic, similar deals, federated sources, and multi-region search —
            using deal notes, transactions, logs, and Webex artifacts.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
          <p className="font-mono text-xs text-cyan-300">Elastic Cloud</p>
          <p className="mt-2 text-lg font-medium">Run it on Serverless Search</p>
          <p className="mt-2 text-sm text-zinc-400">
            Discover, ES|QL, and agents on Elastic — storage, ranking, audit, and
            explainability in one place.
          </p>
          <a
            href={ELASTIC.agents}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-mono text-[11px] text-cyan-200 underline underline-offset-2"
          >
            Open Elastic
          </a>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-mono text-xs text-cyan-300">Hands-on lab</p>
          <p className="mt-2 text-lg font-medium">Your own project, in the browser</p>
          <p className="mt-2 text-sm text-zinc-400">
            A guided Elastic Serverless lab. No install. Query the same Cisco-shaped corpus with
            ES|QL.
          </p>
          <a
            href={INSTRUQT_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-mono text-[11px] text-cyan-200 underline underline-offset-2"
          >
            Start the lab
          </a>
        </div>
      </div>

      <ol className="mt-10 space-y-3">
        {DEMO_BEATS.map((b, i) => (
          <li key={b.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="font-mono text-xs text-cyan-300">
              {i + 1} · {b.title}
            </p>
            <p className="mt-1 text-sm text-zinc-300">{b.summary}</p>
            <div className="mt-2 flex flex-wrap gap-3 font-mono text-[11px]">
              <Link href={b.href} className="text-cyan-200 underline underline-offset-2">
                Open demo
              </Link>
              <a
                href={ELASTIC[b.elasticPath]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 underline underline-offset-2"
              >
                Open in Elastic
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
