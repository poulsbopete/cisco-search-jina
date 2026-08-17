"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { INSTRUQT_INVITE } from "@/lib/config";
import { ELASTIC } from "@/lib/demo-playbook";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/slides", label: "Slides" },
  { href: "/demo", label: "Keyword vs semantic" },
  { href: "/crm", label: "CRM Analytics" },
  { href: "/lifecycle", label: "Lifecycle" },
  { href: "/webex", label: "Webex / Infra" },
  { href: "/bundle", label: "Elastic + Jina" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
          Cisco search
        </Link>
        <nav className="flex flex-wrap gap-2" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[11px] hover:border-cyan-400/50 hover:text-white",
                pathname === item.href
                  ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-100"
                  : "border-white/10 text-zinc-300",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={INSTRUQT_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cyan-400 px-3 py-1 font-mono text-[11px] font-semibold text-zinc-950"
          >
            Hands-on lab
          </a>
          <a
            href={ELASTIC.home}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cyan-400/40 px-3 py-1 font-mono text-[11px] text-cyan-200"
          >
            Open Elastic
          </a>
        </nav>
      </div>
    </header>
  );
}
