"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MODULES,
  moduleFromPath,
  type ModuleId,
} from "@/lib/modules";

type ModuleContextValue = {
  active: ModuleId;
  setActive: (id: ModuleId) => void;
};

const ModuleContext = createContext<ModuleContextValue | null>(null);

export function ModuleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const active = useMemo(
    () => moduleFromPath(pathname, hash),
    [pathname, hash],
  );

  const setActive = useCallback(
    (id: ModuleId) => {
      if (id === "slides") {
        router.push("/slides");
        return;
      }
      if (pathname === "/") {
        window.location.hash = id;
        setHash(`#${id}`);
        return;
      }
      router.push(`/#${id}`);
    },
    [pathname, router],
  );

  const value = useMemo(() => ({ active, setActive }), [active, setActive]);

  return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
}

export function useModule() {
  const ctx = useContext(ModuleContext);
  if (!ctx) {
    throw new Error("useModule must be used within ModuleProvider");
  }
  return ctx;
}

export function useActiveModuleMeta() {
  const { active } = useModule();
  return MODULES.find((m) => m.id === active) ?? MODULES[0];
}
