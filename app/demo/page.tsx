import { AppShell } from "@/components/AppShell";
import { KeywordVsSemantic } from "@/components/KeywordVsSemantic";

export default function DemoPage() {
  return (
    <AppShell kicker="Interactive demo" title="Keyword vs semantic">
      <KeywordVsSemantic />
    </AppShell>
  );
}
