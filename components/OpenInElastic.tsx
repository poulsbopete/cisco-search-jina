import { ELASTIC, type DemoBeat } from "@/lib/demo-playbook";
import { INSTRUQT_INVITE } from "@/lib/config";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  const href = ELASTIC[beat.elasticPath];

  return (
    <aside className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
      <p className="text-sm leading-relaxed text-zinc-200">{beat.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-400 px-3 py-2 font-mono text-xs font-semibold text-zinc-950"
        >
          Open in Elastic
        </a>
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/20 px-3 py-2 font-mono text-xs text-zinc-200"
        >
          Try the hands-on lab
        </a>
      </div>
    </aside>
  );
}
