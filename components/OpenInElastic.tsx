import { INSTRUQT_INVITE, type DemoBeat } from "@/lib/demo-playbook";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  return (
    <aside className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
      <p className="text-sm leading-relaxed text-zinc-200">{beat.summary}</p>
      <p className="mt-3 text-sm text-zinc-400">
        Hands-on lives in the{" "}
        <span className="text-zinc-200">Instruqt Serverless Search</span> lab only — seeded index{" "}
        <code className="text-cyan-200">cisco-jina-corpus</code>
        {beat.dashboardTitle ? (
          <>
            , dashboard <span className="text-zinc-200">{beat.dashboardTitle}</span>
          </>
        ) : null}
        , ES|QL in Discover, then AI Agent.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-400 px-3 py-2 font-mono text-xs font-semibold text-zinc-950"
        >
          Open the Serverless lab
        </a>
      </div>
    </aside>
  );
}
