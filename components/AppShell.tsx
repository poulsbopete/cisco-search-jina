import type { ReactNode } from "react";
import Link from "next/link";
import { INSTRUQT_INVITE } from "@/lib/config";
import { ELASTIC } from "@/lib/demo-playbook";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/slides", label: "Slides" },
  { href: "/demo", label: "Keyword vs semantic" },
  { href: "/crm", label: "CRM Analytics" },
  { href: "/lifecycle", label: "Lifecycle" },
  { href: "/webex", label: "Webex / Infra" },
  { href: "/bundle", label: "Elastic + Jina" },
];

export function AppShell({
  children,
  title,
  speaker,
  kicker,
}: {
  children: ReactNode;
  title: string;
  speaker?: string;
  kicker?: string;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
            Cisco search
          </Link>
          <nav className="flex flex-wrap gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-300 hover:border-cyan-400/50 hover:text-white",
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
      <div className="mx-auto max-w-6xl px-4 py-10">
        {kicker ? (
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">{kicker}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {speaker ? <p className="mt-2 font-mono text-sm text-zinc-400">{speaker}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
