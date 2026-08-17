"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MODULES } from "@/lib/modules";
import { useModule } from "@/components/ModuleProvider";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { active, setActive } = useModule();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4">
        <button
          type="button"
          onClick={() => setActive("semantic")}
          className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300"
        >
          Cisco search
        </button>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Concepts">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => setActive(mod.id)}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[11px] tracking-wide",
                active === mod.id
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              {mod.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="p-2 text-zinc-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="space-y-1 border-t border-white/10 px-4 py-3 md:hidden">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                setActive(mod.id);
                setOpen(false);
              }}
              className={cn(
                "block w-full py-2 text-left font-mono text-sm",
                active === mod.id ? "text-white" : "text-zinc-400",
              )}
            >
              {mod.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
