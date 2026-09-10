"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MODULES } from "@/lib/modules";
import { useModule } from "@/components/ModuleProvider";
import { ELASTIC } from "@/lib/demo-playbook";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { active, setActive } = useModule();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/25 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4">
        <button
          type="button"
          onClick={() => setActive("semantic")}
          className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-primary-bright"
        >
          Cisco · Elastic + Jina
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
                  ? "bg-primary/20 text-foreground ring-1 ring-primary/40"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {mod.label}
            </button>
          ))}
        </nav>

        <a
          href={ELASTIC.discoverCorpus}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] text-primary-bright ring-1 ring-primary/40 hover:bg-primary/30 sm:inline"
        >
          Open Elastic
        </a>

        <button
          type="button"
          className="p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="space-y-1 border-t border-primary/25 px-4 py-3 md:hidden">
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
                active === mod.id ? "text-foreground" : "text-muted-foreground",
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
