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
    title: "Cisco-wide search, one story",
    subtitle:
      "Semantic search for CRM Analytics, Lifecycle Platform, and Webex / Infrastructure — Elastic Serverless Search with Jina relevance.",
    bullets: [
      "One narrative across deals, transactions, logs, and notes",
      "Keyword vs semantic on the same Cisco-shaped corpus",
      "Explainable ranking: why this deal, this payload, this region",
      "Hands-on lab on Elastic Cloud Serverless Search",
    ],
  },
  {
    section: "opening",
    speaker: "Overview",
    title: "What you will see",
    statCards: [
      { figure: "Why", title: "The time tax", caption: "Hours spent hunting similar deals and stitching forecast narratives." },
      { figure: "How", title: "Embeddings", caption: "Meaning as numbers — not just the words on the page." },
      { figure: "CRM", title: "Analytics", caption: "Find deals like this one, with a reason for every match." },
      { figure: "Life", title: "Lifecycle", caption: "One question across Snowflake, S3, and OpenSearch." },
      { figure: "WX", title: "Webex / Infra", caption: "Same relevance in US Gov East and West after CCR." },
      { figure: "Lab", title: "Hands-on", caption: "Your own Elastic Serverless Search project in the browser." },
    ],
  },
  {
    section: "opening",
    speaker: "Overview",
    title: "What you walk away with",
    bullets: [
      "Keyword vs semantic on the same Cisco-shaped corpus.",
      "A Cisco-wide narrative: CRM Analytics + Lifecycle + Webex / Infra.",
      "What Elastic owns vs what Jina owns — and why you need both.",
      "A hands-on Elastic Cloud Serverless Search lab you can run yourself.",
    ],
    demoHref: INSTRUQT_INVITE,
    demoLabel: "Start the hands-on lab",
  },
  {
    section: "cisco",
    speaker: "Cisco",
    title: "Why this matters to Cisco",
    subtitle:
      "Cisco teams already own search across deal data, transaction data, system logs, and unstructured notes.",
    bullets: [
      "Today: keyword search + manual correlation.",
      "Tomorrow: semantic search + AI-powered insights — with audit and explainability.",
      "You already have MuleSoft, Snowflake, OpenSearch, S3.",
      "The gap is search and understanding on top of that infrastructure — not another warehouse.",
    ],
  },
  {
    section: "cisco",
    speaker: "Cisco",
    title: "The time tax",
    subtitle: "Seller and manager hours still go to hunting, not deciding.",
    statCards: [
      {
        figure: "4–8h",
        title: "Reps / week",
        caption: "Searching for similar deals — not selling.",
      },
      {
        figure: "4–7h",
        title: "Managers / week",
        caption: "Building forecast narratives by hand.",
      },
    ],
    sourceLabel: "Gartner — Seller Time Spend Assessment",
    sourceUrl: "https://www.gartner.com/en/sales/research/seller-time-spend-assessment",
  },
  {
    section: "cisco",
    speaker: "Cisco",
    title: "One Cisco story — three teams",
    statCards: [
      {
        figure: "CRM",
        title: "CRM Analytics",
        caption: "Deal intelligence, account → deal → competitor graphs, why this deal matched.",
      },
      {
        figure: "Life",
        title: "Lifecycle Platform",
        caption: "Federated Snowflake + S3 + OpenSearch. 10 MB payloads. Multi-source agents.",
      },
      {
        figure: "WX",
        title: "Webex / Infra",
        caption: "US Gov East + West. CCR. Search locally with the same relevance.",
      },
    ],
  },
  {
    section: "tech",
    speaker: "Relevance",
    title: "Embeddings: meaning as numbers",
    subtitle: "“Legal concerns” and “vendor lock-in fears” can live in the same vector space.",
    bullets: [
      "A keyword engine matches strings. An embedding model matches intent.",
      "That is why similar deals stay invisible when counsel uses different words.",
      "False positives drop when ranking understands neighborhood, not just tokens.",
      "Better relevance = fewer wild-goose chases = more confident decisions.",
    ],
  },
  {
    section: "tech",
    speaker: "Relevance",
    title: "Why multimodal (Jina v5) matters here",
    bullets: [
      "Cisco does not only have CRM text. You have call recordings, decks, and notes.",
      "Jina v5: text, images, audio, video — one model, one space.",
      "A lock-icon slide and a GC transcript can retrieve each other.",
      "Elastic stores, versions, and explains. Jina is how those objects understand each other.",
    ],
  },
  {
    section: "tech",
    speaker: "Relevance",
    title: "Live demo — same query, two engines",
    subtitle: "Query: legal concerns about vendor lock-in on a Webex-like renewal.",
    bullets: [
      "Left: keyword. Hits “legal hold” noise. Misses “switching costs” in a deck.",
      "Right: semantic + ranking. Surfaces counsel notes, invoice XML, QBR transcript.",
      "Then we do the same motion on your Serverless project.",
    ],
    demoHref: `${APP_URL}/demo`,
    demoLabel: "Open keyword vs semantic demo",
  },
  {
    section: "crm",
    speaker: "Cisco teams",
    title: "CRM Analytics",
    subtitle: "Find deals like this one. Show why. Graph the account.",
    bullets: [
      "Deal intelligence with full explainability — not a mystery score.",
      "Knowledge graph: Account → Deal → Competitor.",
      "Relevance tracking: which field, which concept, which similar closed-won.",
      "Forecast narratives grounded in similar closed-won — not guessed.",
    ],
    demoHref: `${APP_URL}/crm`,
    demoLabel: "Open CRM demo",
  },
  {
    section: "lifecycle",
    speaker: "Cisco teams",
    title: "Lifecycle Platform",
    subtitle: "One question. Snowflake + S3 + OpenSearch/Elastic.",
    bullets: [
      "Federated search: do not copy the warehouse to start answering.",
      "Semantic on big payloads: ~10 MB transaction docs become searchable.",
      "Agents: “Show me transactions from this account over 6 months.”",
      "MuleSoft moves the data. Elastic is the understanding layer on top.",
    ],
    demoHref: `${APP_URL}/lifecycle`,
    demoLabel: "Open Lifecycle demo",
  },
  {
    section: "webex",
    speaker: "Cisco teams",
    title: "Webex / Infrastructure",
    subtitle: "Same relevance in US Gov East and US Gov West.",
    bullets: [
      "CCR replicates the index. Query stays local.",
      "Ranking must not drift by region — synonyms and models travel with the cluster.",
      "Call recordings + decks already showed multimodal. Infra makes it operable.",
    ],
    demoHref: `${APP_URL}/webex`,
    demoLabel: "Open multi-region demo",
  },
  {
    section: "bundle",
    speaker: "Elastic + Jina",
    title: "Why Elastic + Jina together",
    statCards: [
      {
        figure: "ES",
        title: "Elastic",
        caption: "Storage, indexing, full-text, knowledge graphs, audit trails.",
      },
      {
        figure: "Jina",
        title: "Jina",
        caption: "State-of-the-art embeddings — multimodal, domain-specific, improving.",
      },
      {
        figure: "+",
        title: "Together",
        caption: "Elastic runs the search. Jina powers the relevance.",
      },
    ],
  },
  {
    section: "bundle",
    speaker: "Elastic + Jina",
    title: "Why not just one of them",
    bullets: [
      "Why not just Jina: it is an embeddings API. You still need storage, versioning, audit, explainability.",
      "Why not just Elasticsearch: ES embeddings are good. Jina’s are better for multimodal enterprise content.",
      "Real pattern: CRM in Elastic, embedded via Jina, queried with knowledge graphs. One-click answers.",
    ],
    demoHref: `${APP_URL}/bundle`,
    demoLabel: "Open the bundle story",
  },
  {
    section: "bundle",
    speaker: "Next step",
    title: "Try it on your own project",
    bullets: [
      "CRM Analytics — start with “find deals like this” queries you already ask by hand.",
      "Lifecycle — one Snowflake fact plus one large S3 payload is enough to prove federation.",
      "Webex / Infra — East/West CCR with ranking that does not drift.",
      "Same Cisco-wide story in every demo: Elastic runs search; Jina powers relevance.",
    ],
    demoHref: INSTRUQT_INVITE,
    demoLabel: "Start the hands-on lab",
  },
];

export const SECTION_START: Record<string, number> = {
  opening: 0,
  cisco: 3,
  tech: 6,
  crm: 9,
  lifecycle: 10,
  webex: 11,
  bundle: 12,
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
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <FallingPattern className="h-full" density={1.1} />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-5 py-3 backdrop-blur-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
            Cisco · Elastic · Jina
          </p>
          <p className="truncate font-mono text-[11px] text-zinc-400">{slide.speaker}</p>
          <p className="font-mono text-[11px] text-zinc-500">
            {i + 1} / {SLIDES.length}
          </p>
        </header>

        <main className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-12">
          <div className="mx-auto w-full max-w-5xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/90">
              {slide.section}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]">
              {slide.title}
            </h1>
            {slide.subtitle ? (
              <p className="mx-auto mt-5 max-w-3xl text-pretty text-lg text-zinc-300 sm:text-xl">
                {slide.subtitle}
              </p>
            ) : null}

            {slide.statCards?.length ? (
              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {slide.statCards.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left backdrop-blur-md"
                  >
                    <p className="font-mono text-4xl font-extrabold tracking-tight text-cyan-300">
                      {s.figure}
                    </p>
                    <p className="mt-3 font-mono text-sm font-semibold uppercase tracking-wide text-zinc-200">
                      {s.title}
                    </p>
                    {s.caption ? (
                      <p className="mt-2 text-sm leading-snug text-zinc-400">{s.caption}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {slide.bullets?.length ? (
              <ul className="mx-auto mt-10 max-w-3xl space-y-3 text-left text-base text-zinc-100 sm:text-lg">
                {slide.bullets.map((b) => (
                  <li key={b} className="flex gap-3 leading-snug">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {slide.demoHref ? (
              <div className="mt-8">
                <a
                  href={slide.demoHref}
                  target={embed ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-zinc-950 hover:brightness-110"
                >
                  <ExternalLink className="size-4" />
                  {slide.demoLabel ?? "Open demo"}
                </a>
              </div>
            ) : null}

            {slide.sourceUrl ? (
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

        <footer className="border-t border-white/10 bg-black/30 px-4 py-4 backdrop-blur-md">
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
