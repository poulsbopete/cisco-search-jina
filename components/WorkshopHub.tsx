"use client";

import { INSTRUQT_INVITE } from "@/lib/config";
import { ELASTIC, LAB_DASHBOARDS } from "@/lib/demo-playbook";
import { useModule } from "@/components/ModuleProvider";

const STEPS = [
  {
    title: "See the keyword ceiling",
    detail:
      "Search “legal” and watch Umbrella e-discovery noise. Then search by meaning — Acme counsel and vendor lock-in stay on top. Dashboard: " +
      LAB_DASHBOARDS.keywordVsSemantic +
      ".",
  },
  {
    title: "Find deals like yours",
    detail:
      "CRM Analytics: deals like Acme’s Webex renewal with account, stage, and competitor context. Dashboard: " +
      LAB_DASHBOARDS.crm +
      ".",
  },
  {
    title: "Search across systems",
    detail:
      "Lifecycle: Snowflake, S3, and Elastic logs in one question — counsel language inside large payloads. Dashboard: " +
      LAB_DASHBOARDS.lifecycle +
      ".",
  },
  {
    title: "Gov regions + CIRCUIT",
    detail:
      "Webex / Infra: same intent in US Gov East and West after CCR. Then ML on CIRCUIT token spend. Dashboards: " +
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
        Hands-on · your own Serverless project
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
        Try semantic search on Cisco-shaped data
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Launch a personal <span className="text-foreground">Elasticsearch Serverless</span> project
        with index <code className="text-primary-bright">cisco-jina-corpus</code> (14 docs),
        dashboards for CRM / Lifecycle / Webex / CIRCUIT, and AI Agent. Use{" "}
        <span className="text-foreground">ES|QL</span> (not KQL) — the same questions your teams
        ask in production.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground hover:bg-primary-bright"
        >
          Start hands-on
        </a>
        <a
          href={ELASTIC.discoverCorpus}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-primary/40 px-5 py-3 font-mono text-sm text-foreground hover:bg-primary/15"
        >
          Open Discover demo
        </a>
        <a
          href={ELASTIC.dashboard.keywordVsSemantic}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-primary/40 px-5 py-3 font-mono text-sm text-foreground hover:bg-primary/15"
        >
          Keyword vs semantic board
        </a>
        <button
          type="button"
          onClick={() => setActive("semantic")}
          className="rounded-xl border border-white/20 px-5 py-3 font-mono text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
        >
          Back to Semantic
        </button>
      </div>
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
