import { AppShell } from "@/components/AppShell";
import { CrmDemo } from "@/components/CrmDemo";

export default function CrmPage() {
  return (
    <AppShell kicker="CRM Analytics" title="Find deals like this one">
      <CrmDemo />
    </AppShell>
  );
}
