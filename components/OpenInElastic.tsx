import { ELASTIC, INSTRUQT_INVITE, type DemoBeat } from "@/lib/demo-playbook";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  return (
    <aside className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
      <p className="text-sm leading-relaxed text-zinc-200">{beat.summary}</p>
      <p className="mt-3 text-sm text-zinc-400">
        On the shared Search-AI project, ask{" "}
        <span className="text-zinc-200">Cisco Jina Search</span> — it only reads{" "}
        <code className="text-cyan-200">cisco-jina-corpus</code>. Hands-on ES|QL stays in
        Instruqt Discover (that lab Kibana is a different cluster).
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={ELASTIC.agentBuilder}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-400 px-3 py-2 font-mono text-xs font-semibold text-zinc-950"
        >
          Open Agent Builder
        </a>
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/20 px-3 py-2 font-mono text-xs"
        >
          Open the Serverless lab
        </a>
      </div>
    </aside>
  );
}
