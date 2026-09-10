import { ELASTIC, INSTRUQT_INVITE, type DemoBeat } from "@/lib/demo-playbook";

const linkClass =
  "rounded-lg px-3 py-2 font-mono text-xs font-semibold transition-colors";

export function OpenInElastic({ beat }: { beat: DemoBeat }) {
  return (
    <aside className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
      <p className="text-sm leading-relaxed text-foreground">{beat.summary}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="text-foreground">Live talk:</span> open the shared Serverless
        project (SSO).{" "}
        <span className="text-foreground">Hands-on:</span> Instruqt seeds the same index{" "}
        <code className="text-primary-bright">cisco-jina-corpus</code>
        {beat.dashboardTitle ? (
          <>
            {" "}
            and dashboard <span className="text-foreground">{beat.dashboardTitle}</span>
          </>
        ) : null}
        . ES|QL in Discover (no KQL), then AI Agent with the same question.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {beat.elasticDashboard ? (
          <a
            href={beat.elasticDashboard}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} bg-primary text-primary-foreground hover:bg-primary-bright`}
          >
            Open dashboard in Elastic
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
          Agent Builder
        </a>
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} border border-white/20 text-muted-foreground hover:border-primary/40 hover:text-foreground`}
        >
          Instruqt lab
        </a>
      </div>
    </aside>
  );
}
