import { AppShell } from "@/components/AppShell";
import { CrmDemo } from "@/components/CrmDemo";

export default function CrmPage() {
  return (
    <AppShell
      kicker="Anshul's team · CRM Analytics"
      title="Find deals like this one"
      speaker="Peter Simkins + Ivan Silva"
    >
      <CrmDemo />
    </AppShell>
  );
}
