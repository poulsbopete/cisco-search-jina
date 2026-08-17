"use client";

import { ModuleProvider } from "@/components/ModuleProvider";
import { SiteNav } from "@/components/SiteNav";
import type { ReactNode } from "react";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ModuleProvider>
      <SiteNav />
      {children}
    </ModuleProvider>
  );
}
