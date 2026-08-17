import { AppShell } from "@/components/AppShell";
import { LifecycleDemo } from "@/components/LifecycleDemo";

export default function LifecyclePage() {
  return (
    <AppShell
      kicker="Balaji's team · Lifecycle Platform"
      title="Federated search on big payloads"
      speaker="Peter Simkins + Ivan Silva"
    >
      <LifecycleDemo />
    </AppShell>
  );
}
