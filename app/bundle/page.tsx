import { AppShell } from "@/components/AppShell";
import { BundleStory } from "@/components/BundleStory";

export default function BundlePage() {
  return (
    <AppShell
      kicker="30–35 min"
      title="Elastic runs search. Jina powers relevance."
      speaker="Peter Simkins · Elastic SA"
    >
      <BundleStory />
    </AppShell>
  );
}
