"use client";

import { KeywordVsSemantic } from "@/components/KeywordVsSemantic";
import { CrmDemo } from "@/components/CrmDemo";
import { LifecycleDemo } from "@/components/LifecycleDemo";
import { WebexDemo } from "@/components/WebexDemo";
import { CircuitStory } from "@/components/CircuitStory";
import { BundleStory } from "@/components/BundleStory";
import { FipsStory } from "@/components/FipsStory";
import { EchStory } from "@/components/EchStory";
import { WorkshopHub } from "@/components/WorkshopHub";
import { SlideDeck } from "@/components/SlideDeck";
import { useActiveModuleMeta, useModule } from "@/components/ModuleProvider";

export function ConceptApp() {
  const { active } = useModule();
  const meta = useActiveModuleMeta();

  if (active === "slides") {
    return <SlideDeck />;
  }

  if (active === "workshop") {
    return <WorkshopHub />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-bright">{meta.kicker}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {meta.title}
      </h1>
      <div className="mt-8">
        {active === "semantic" ? <KeywordVsSemantic /> : null}
        {active === "crm" ? <CrmDemo /> : null}
        {active === "lifecycle" ? <LifecycleDemo /> : null}
        {active === "webex" ? <WebexDemo /> : null}
        {active === "circuit" ? <CircuitStory /> : null}
        {active === "fips" ? <FipsStory /> : null}
        {active === "ech" ? <EchStory /> : null}
        {active === "bundle" ? <BundleStory /> : null}
      </div>
      <footer className="mt-16 border-t border-primary/25 py-6 text-xs leading-relaxed text-muted">
        <p>Cisco search × Elastic Serverless × Jina — same story as the Instruqt lab</p>
        <p className="mt-1">
          Deck for the live hour; lab for hands-on ES|QL, seeded dashboards, workflow notes, and ML.
          Index <code className="text-primary-bright">cisco-jina-corpus</code> · ES|QL only · AI Agent.
        </p>
      </footer>
    </div>
  );
}
