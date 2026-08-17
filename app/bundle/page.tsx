import { AppShell } from "@/components/AppShell";
import { BundleStory } from "@/components/BundleStory";

export default function BundlePage() {
  return (
    <AppShell kicker="Elastic + Jina" title="Elastic runs search. Jina powers relevance.">
      <BundleStory />
    </AppShell>
  );
}
