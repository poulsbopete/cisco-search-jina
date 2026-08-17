import type { ReactNode } from "react";

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
