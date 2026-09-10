"use client";

import { INSTRUQT_INVITE } from "@/lib/config";
import { ELASTIC, LAB_DASHBOARDS } from "@/lib/demo-playbook";
import { useModule } from "@/components/ModuleProvider";

const STEPS = [
  {
    title: "Keyword vs semantic",
    detail:
      "ES|QL MATCH(legal) vs MV_INTERSECTS concepts — Umbrella legal-hold is the false friend. Optional: Dashboards → " +
      LAB_DASHBOARDS.keywordVsSemantic +
      ".",
  },
  {
    title: "CRM Analytics",
    detail:
      "Find deals like Acme’s Webex renewal with grounded account / deal / competitor. Dashboard: " +
      LAB_DASHBOARDS.crm +
      ".",
  },
  {
    title: "Lifecycle federated search",
    detail:
      "Snowflake · S3 · Elastic as peers — counsel language inside large payloads. Dashboard: " +
      LAB_DASHBOARDS.lifecycle +
      ".",
  },
  {
    title: "Webex / CCR + CIRCUIT ML",
    detail:
      "Same intent East/West after CCR (search locally). Then Machine Learning → cisco-jina-circuit-tokens. Dashboards: " +
      LAB_DASHBOARDS.webex +
      " · " +
      LAB_DASHBOARDS.circuit +
      ".",
  },
];

export function WorkshopHub() {
  const { setActive } = useModule();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-bright">
        Facilitator Elastic · Instruqt lab
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
        Cisco — Semantic search with Elastic + Jina
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        For the live talk, deep-link into the shared{" "}
        <span className="text-foreground">Search-AI Serverless</span> project (SSO). For
        hands-on, each learner gets their own Serverless Search via Instruqt — seeded index{" "}
        <code className="text-primary-bright">cisco-jina-corpus</code> (14 docs),{" "}
        <span className="text-foreground">ES|QL only</span> (no KQL), then{" "}
        <span className="text-foreground">AI Agent</span>.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={ELASTIC.discoverCorpus}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground hover:bg-primary-bright"
        >
          Open Search-AI Discover
        </a>
        <a
          href={ELASTIC.dashboard.keywordVsSemantic}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-primary/40 px-5 py-3 font-mono text-sm text-foreground hover:bg-primary/15"
        >
          Keyword vs semantic board
        </a>
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
        >
          Start the Instruqt lab
        </a>
        <button
          type="button"
          onClick={() => setActive("semantic")}
          className="rounded-xl border border-primary/40 px-5 py-3 font-mono text-sm text-foreground hover:bg-primary/15"
        >
          Back to Keyword vs semantic
        </button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Facilitator deep links (SSO):{" "}
        <a className="text-primary-bright underline" href={ELASTIC.home} target="_blank" rel="noopener noreferrer">
          Search-AI home
        </a>
        {" · "}
        <a className="text-primary-bright underline" href={ELASTIC.dashboards} target="_blank" rel="noopener noreferrer">
          Dashboards
        </a>
        {" · "}
        <a className="text-primary-bright underline" href={ELASTIC.agentBuilder} target="_blank" rel="noopener noreferrer">
          Agent Builder
        </a>
        {" · "}
        <a className="text-primary-bright underline" href={ELASTIC.workflows} target="_blank" rel="noopener noreferrer">
          Workflows
        </a>
        {" · "}
        <a className="text-primary-bright underline" href={ELASTIC.mlJobs} target="_blank" rel="noopener noreferrer">
          ML jobs
        </a>
      </p>
      <ol className="mt-12 space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3 text-sm">
            <span className="font-mono text-xs text-primary-bright">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="font-medium text-foreground">{step.title}</span>
              <span className="mt-1 block text-muted-foreground">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-10 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Lab sandbox is short-lived (~25 minutes). If Discover shows 0 docs, set time to{" "}
        <span className="text-foreground">Last 24 hours</span> or start a new invite.
      </p>
    </div>
  );
}
