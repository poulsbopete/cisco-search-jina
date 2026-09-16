import { ELASTIC, INSTRUQT_INVITE, type DemoBeat } from "@/lib/demo-playbook";

const linkClass =
  "rounded-lg px-3 py-2 font-mono text-xs font-semibold transition-colors";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  return (
    <aside className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
      <p className="text-sm leading-relaxed text-foreground">{beat.summary}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        See it on your data shape: index{" "}
        <code className="text-primary-bright">cisco-jina-corpus</code>
        {beat.dashboardTitle ? (
          <>
            , dashboard <span className="text-foreground">{beat.dashboardTitle}</span>
          </>
        ) : null}
        . Open Discover with ES|QL (not KQL), then ask the same question in AI Agent.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {beat.elasticDashboard ? (
          <a
            href={beat.elasticDashboard}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} bg-primary text-primary-foreground hover:bg-primary-bright`}
          >
            Open dashboard
          </a>
        ) : null}
        {beat.elasticDiscover ? (
          <a
            href={beat.elasticDiscover}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} border border-primary/50 text-foreground hover:bg-primary/20`}
          >
            Open Discover (ES|QL)
          </a>
        ) : null}
        <a
          href={ELASTIC.agentBuilder}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} border border-primary/50 text-foreground hover:bg-primary/20`}
        >
          Try AI Agent
        </a>
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} border border-white/20 text-muted-foreground hover:border-primary/40 hover:text-foreground`}
        >
          Hands-on lab
        </a>
      </div>
    </aside>
  );
}
