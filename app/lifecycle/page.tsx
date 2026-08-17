import { AppShell } from "@/components/AppShell";
import { LifecycleDemo } from "@/components/LifecycleDemo";

export default function LifecyclePage() {
  return (
    <AppShell kicker="Lifecycle Platform" title="Federated search on large payloads">
      <LifecycleDemo />
    </AppShell>
  );
}
