"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { cn } from "@/lib/utils";
import { APP_URL, INSTRUQT_INVITE } from "@/lib/config";

export type StatCard = {
  figure: string;
  title: string;
  caption?: string;
};

export type Slide = {
  section: string;
  speaker: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  statCards?: StatCard[];
  demoHref?: string;
  demoLabel?: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export const SLIDES: Slide[] = [
  {
    section: "opening",
    speaker: "Overview",
    title: "Search for Cisco",
    subtitle:
      "CRM Analytics, Lifecycle, Webex / Infra, and CIRCUIT — Elastic for search, Jina for embeddings, AI where it helps.",
    bullets: [
      "Find meaning across deals, transactions, logs, notes — and LLM proxy / security events.",
      "Connect your systems with Elastic integrations; keep audit and explainability.",
      "Run it how you need: self-hosted, Cloud Hosted, or Serverless SaaS.",
    ],
  },
  {
    section: "opening",
    speaker: "Overview",
    title: "What Elastic provides Cisco",
    statCards: [
      {
        figure: "Search",
        title: "Enterprise search",
        caption: "Vectors, ES|QL, ranking, and explainability — keyword is only the baseline.",
      },
      {
        figure: "Jina",
        title: "Embeddings",
        caption: "jina.ai multimodal relevance — text, decks, notes, and transcripts in one space.",
      },
      {
        figure: "AI",
        title: "AI-first",
        caption: "Semantic retrieval first; agents and insights on top of searchable, governed data.",
      },
      {
        figure: "Run",
        title: "Your choice",
        caption: "Self-hosted Enterprise, Elastic Cloud Hosted, or Serverless SaaS.",
      },
    ],
  },
  {
    section: "cisco",
    speaker: "Cisco groups",
    title: "How we help Cisco groups",
    subtitle: "Same Elastic + Jina story. Different jobs — including CIRCUIT at ECS scale.",
    statCards: [
      {
        figure: "CRM",
        title: "CRM Analytics",
        caption: "Find deals like this one — with a reason for every match.",
      },
      {
        figure: "Life",
        title: "Lifecycle",
        caption: "One question across warehouses, object stores, and logs.",
      },
      {
        figure: "WX",
        title: "Webex / Infra",
        caption: "Same relevance across regions — including gov East / West.",
      },
      {
        figure: "AI",
        title: "CIRCUIT",
        caption: "Fastest-growing internal AI path — ECS LLM proxy + security search.",
      },
    ],
  },
  {
    section: "tech",
    speaker: "Search + AI",
    title: "AI-first search",
    subtitle: "Start with meaning. Keep humans in control.",
    bullets: [
      "Keyword finds tokens. Semantic finds intent — “legal concerns” finds “switching costs.”",
      "Elastic stores, indexes, and explains. Agents sit on top of that — not a black box.",
      "Integrations and plugins pull from Salesforce, warehouses, object stores, logs, and more.",
    ],
    demoHref: `${APP_URL}/demo`,
    demoLabel: "Open keyword vs semantic",
  },
  {
    section: "tech",
    speaker: "Embeddings",
    title: "Jina for embeddings",
    subtitle: "Elastic runs search. Jina powers multimodal relevance.",
    bullets: [
      "jina.ai embeds text and richer content — decks, notes, call artifacts — into one vector space.",
      "Elasticsearch holds the vectors, versions them, and makes ranking auditable.",
      "Better relevance than keyword-only platforms — without replacing your systems of record.",
    ],
    demoHref: `${APP_URL}/bundle`,
    demoLabel: "Open Elastic + Jina story",
  },
  {
    section: "circuit",
    speaker: "Cisco groups",
    title: "CIRCUIT — ECS at scale",
    subtitle: "Enterprise AI LLM proxy and security. You already speak Elastic Common Schema.",
    bullets: [
      "CIRCUIT emits ECS for proxy decisions, tokens, models, and security outcomes.",
      "Elastic searches and alerts on that stream; Jina finds similar prompts and incidents by meaning.",
      "Same deploy choice as everyone else: self-hosted, Cloud Hosted, or Serverless SaaS.",
    ],
    demoHref: `${APP_URL}/circuit`,
    demoLabel: "Open CIRCUIT story",
  },
  {
    section: "deploy",
    speaker: "How you run it",
    title: "Deploy how Cisco needs",
    subtitle: "Same Elasticsearch APIs. Three operating models.",
    statCards: [
      {
        figure: "SH",
        title: "Self-hosted",
        caption: "Enterprise on your infra or VPC — competitive licensing, FIPS option, you operate.",
      },
      {
        figure: "ECH",
        title: "Cloud Hosted",
        caption: "Elastic-operated. Commercial cloud or FedRAMP GovCloud. AWS Marketplace / EDP.",
      },
      {
        figure: "SaaS",
        title: "Serverless",
        caption: "Managed Search SaaS — fastest path for commercial; powers today’s hands-on lab.",
      },
    ],
  },
  {
    section: "deploy",
    speaker: "How you run it",
    title: "Which path when",
    bullets: [
      "Already on OSS and staying in your VPC → Enterprise self-hosted (search-tier license).",
      "Want Elastic to operate — commercial or GovCloud → Elastic Cloud Hosted.",
      "Need managed Search quickly in commercial regions → Serverless SaaS (this workshop).",
      "GovCloud note: Serverless is not there today; Hosted is the managed gov path.",
    ],
    demoHref: `${APP_URL}/ech`,
    demoLabel: "Open Hosted / TCO story",
  },
  {
    section: "lab",
    speaker: "Next step",
    title: "Try it hands-on",
    subtitle: "Your own Elastic Serverless Search project — same Cisco-shaped corpus.",
    bullets: [
      "Keyword vs semantic on deals, transactions, notes — and CIRCUIT-shaped proxy events.",
      "CRM, Lifecycle, Webex, and CIRCUIT-shaped questions on one Cisco corpus.",
      "Walk out knowing what Elastic + Jina give you — and how you’d run it.",
    ],
    demoHref: INSTRUQT_INVITE,
    demoLabel: "Start the hands-on lab",
  },
];

export const SECTION_START: Record<string, number> = {
  opening: 0,
  cisco: 2,
  tech: 3,
  crm: 2,
  lifecycle: 2,
  webex: 2,
  circuit: 5,
  fips: 6,
  ech: 6,
  deploy: 6,
  bundle: 4,
  lab: 8,
};

type Props = {
  embed?: boolean;
  section?: string;
  start?: string;
};

export function SlideDeck({ embed, section, start }: Props) {
  const initial = useMemo(() => {
    if (section && section in SECTION_START) return SECTION_START[section];
    const n = Number(start);
    if (Number.isFinite(n) && n >= 0 && n < SLIDES.length) return n;
    return 0;
  }, [section, start]);

  const [i, setI] = useState(initial);

  useEffect(() => {
    setI(initial);
  }, [initial]);

  const prev = useCallback(() => setI((v) => Math.max(0, v - 1)), []);
  const next = useCallback(() => setI((v) => Math.min(SLIDES.length - 1, v + 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = SLIDES[i];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-950 text-zinc-50",
        embed ? "flex h-[100dvh] min-h-0 flex-col" : "min-h-[calc(100dvh-3rem)]",
      )}
    >
      {embed ? null : (
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <FallingPattern className="h-full" density={1.1} />
        </div>
      )}
      <div
        className={cn(
          "relative z-10 flex flex-col",
          embed ? "h-full min-h-0" : "min-h-[calc(100dvh-3rem)]",
        )}
      >
        <header
          className={cn(
            "flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-black/30 backdrop-blur-md",
            embed ? "px-3 py-1.5" : "px-5 py-3",
          )}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
            {slide.section}
          </p>
          <p className="font-mono text-[11px] text-zinc-500">
            {i + 1} / {SLIDES.length}
          </p>
        </header>

        <main
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            embed
              ? "justify-start overflow-y-auto px-3 py-3 sm:px-4"
              : "justify-center px-6 py-10 sm:px-12",
          )}
        >
          <div className="mx-auto w-full max-w-5xl text-center">
            {!embed ? (
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/90">
                {slide.section}
              </p>
            ) : null}
            <h1
              className={cn(
                "text-balance font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]",
                embed
                  ? "text-xl sm:text-2xl"
                  : "mt-4 text-4xl sm:text-5xl md:text-6xl",
              )}
            >
              {slide.title}
            </h1>
            {slide.subtitle ? (
              <p
                className={cn(
                  "mx-auto max-w-3xl text-pretty text-zinc-300",
                  embed ? "mt-1.5 text-xs sm:text-sm" : "mt-5 text-lg sm:text-xl",
                )}
              >
                {slide.subtitle}
              </p>
            ) : null}

            {slide.statCards?.length ? (
              <div
                className={cn(
                  "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
                  embed ? "mt-3" : "mt-10 gap-3",
                )}
              >
                {slide.statCards.map((s) => (
                  <div
                    key={s.title}
                    className={cn(
                      "rounded-xl border border-white/10 bg-black/40 text-left backdrop-blur-md",
                      embed ? "p-2.5" : "rounded-2xl p-5",
                    )}
                  >
                    <p
                      className={cn(
                        "font-mono font-extrabold tracking-tight text-cyan-300",
                        embed ? "text-lg" : "text-4xl",
                      )}
                    >
                      {s.figure}
                    </p>
                    <p
                      className={cn(
                        "font-mono font-semibold uppercase tracking-wide text-zinc-200",
                        embed ? "mt-1 text-[11px]" : "mt-2 text-sm",
                      )}
                    >
                      {s.title}
                    </p>
                    {s.caption ? (
                      <p
                        className={cn(
                          "leading-snug text-zinc-400",
                          embed ? "mt-1 text-[11px]" : "mt-1 text-sm",
                        )}
                      >
                        {s.caption}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {slide.bullets?.length ? (
              <ul
                className={cn(
                  "mx-auto max-w-3xl text-left text-zinc-100",
                  embed
                    ? "mt-3 space-y-1.5 text-xs sm:text-sm"
                    : "mt-10 space-y-3 text-base sm:text-lg",
                )}
              >
                {slide.bullets.map((b) => (
                  <li key={b} className="flex gap-2 leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {slide.demoHref && !embed ? (
              <div className="mt-8">
                <a
                  href={slide.demoHref}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-zinc-950 hover:brightness-110"
                >
                  <ExternalLink className="size-4" />
                  {slide.demoLabel ?? "Open demo"}
                </a>
              </div>
            ) : null}

            {slide.sourceUrl && !embed ? (
              <p className="mx-auto mt-8 max-w-3xl font-mono text-xs text-zinc-500">
                Source:{" "}
                <a
                  className="text-cyan-300 underline underline-offset-2"
                  href={slide.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {slide.sourceLabel ?? slide.sourceUrl}
                </a>
              </p>
            ) : null}
          </div>
        </main>

        <footer
          className={cn(
            "shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-md",
            embed ? "px-3 py-2" : "px-4 py-3",
          )}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={prev}
              className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <ChevronLeft className="size-4" /> Prev
            </button>
            <div className="flex flex-wrap justify-center gap-1.5">
              {SLIDES.map((s, idx) => (
                <button
                  key={`${s.title}-${idx}`}
                  type="button"
                  onClick={() => setI(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    idx === i ? "bg-cyan-300" : "bg-white/30 hover:bg-white/50",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
