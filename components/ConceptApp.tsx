"use client";

import { KeywordVsSemantic } from "@/components/KeywordVsSemantic";
import { CrmDemo } from "@/components/CrmDemo";
import { LifecycleDemo } from "@/components/LifecycleDemo";
import { WebexDemo } from "@/components/WebexDemo";
import { BundleStory } from "@/components/BundleStory";
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
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">{meta.kicker}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{meta.title}</h1>
      <div className="mt-8">
        {active === "semantic" ? <KeywordVsSemantic /> : null}
        {active === "crm" ? <CrmDemo /> : null}
        {active === "lifecycle" ? <LifecycleDemo /> : null}
        {active === "webex" ? <WebexDemo /> : null}
        {active === "bundle" ? <BundleStory /> : null}
      </div>
      <footer className="mt-16 border-t border-white/10 py-6 text-xs leading-relaxed text-zinc-500">
        <p>Cisco search × Elastic Serverless × Jina</p>
        <p className="mt-1">
          One app for retrieval, CRM Analytics, Lifecycle, Webex / Infra, and the Elastic + Jina
          bundle. Interactive ranking on a Cisco-shaped corpus.
        </p>
      </footer>
    </div>
  );
}
