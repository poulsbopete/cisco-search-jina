import { INSTRUQT_INVITE, type DemoBeat } from "@/lib/demo-playbook";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  return (
    <aside className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
      <p className="text-sm leading-relaxed text-foreground">{beat.summary}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        Hands-on is the{" "}
        <span className="text-foreground">Instruqt Serverless Search</span> lab only — index{" "}
        <code className="text-primary-bright">cisco-jina-corpus</code>
        {beat.dashboardTitle ? (
          <>
            , dashboard <span className="text-foreground">{beat.dashboardTitle}</span>
          </>
        ) : null}
        . Use <span className="text-foreground">ES|QL</span> in Discover (no KQL), then{" "}
        <span className="text-foreground">AI Agent</span> with the same question.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-primary px-3 py-2 font-mono text-xs font-semibold text-primary-foreground hover:bg-primary-bright"
        >
          Open the Instruqt lab
        </a>
      </div>
    </aside>
  );
}
