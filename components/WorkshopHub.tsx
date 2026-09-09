"use client";

import { INSTRUQT_INVITE } from "@/lib/config";
import { LAB_DASHBOARDS } from "@/lib/demo-playbook";
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
        Instruqt lab
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
        Cisco — Semantic search with Elastic + Jina
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Per-learner <span className="text-foreground">Elastic Serverless Search</span>. Seeded
        index <code className="text-primary-bright">cisco-jina-corpus</code> (14 docs).{" "}
        <span className="text-foreground">ES|QL only</span> (no KQL) in Discover, then{" "}
        <span className="text-foreground">AI Agent</span> with the same questions. Dashboards,
        a 10-minute notes workflow, and an ML anomaly job ship at lab start.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground hover:bg-primary-bright"
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
