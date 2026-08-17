import { AppShell } from "@/components/AppShell";
import { KeywordVsSemantic } from "@/components/KeywordVsSemantic";

export default function DemoPage() {
  return (
    <AppShell
      kicker="10–25 min"
      title="Keyword vs semantic"
      speaker="Kapil Jadhav · live demo (5 min)"
    >
      <KeywordVsSemantic />
    </AppShell>
  );
}
