"use client";

import { ModuleProvider } from "@/components/ModuleProvider";
import { SiteNav } from "@/components/SiteNav";
import { Suspense, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ChromeInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const embed =
    pathname.startsWith("/slides") && searchParams.get("embed") === "1";

  return (
    <>
      {embed ? null : <SiteNav />}
      {children}
    </>
  );
}

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ModuleProvider>
      <Suspense fallback={<>{children}</>}>
        <ChromeInner>{children}</ChromeInner>
      </Suspense>
    </ModuleProvider>
  );
}
