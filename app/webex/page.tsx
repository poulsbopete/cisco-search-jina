import { AppShell } from "@/components/AppShell";
import { WebexDemo } from "@/components/WebexDemo";

export default function WebexPage() {
  return (
    <AppShell kicker="Webex / Infrastructure" title="US Gov East + West · CCR + local search">
      <WebexDemo />
    </AppShell>
  );
}
