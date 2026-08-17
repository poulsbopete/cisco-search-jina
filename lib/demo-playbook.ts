import { INSTRUQT_INVITE, KIBANA_URL } from "@/lib/config";

const kb = (path: string) => `${KIBANA_URL.replace(/\/$/, "")}${path}`;

export const ELASTIC = {
  home: kb("/"),
  discover: kb("/app/discover"),
  esql: kb("/app/elasticsearch"),
  agents: kb("/app/agent_builder"),
  playground: kb("/app/search_playground"),
} as const;

export type DemoBeat = {
  id: string;
  href: string;
  title: string;
  summary: string;
  elasticPath: keyof typeof ELASTIC;
};

export const DEMO_BEATS: DemoBeat[] = [
  {
    id: "demo",
    href: "/demo",
    title: "Keyword vs semantic",
    summary:
      "The same question, two retrieval styles. Keyword matches the words you typed. Semantic ranking matches meaning — so “legal concerns” and “vendor lock-in fears” can surface the same deals.",
    elasticPath: "agents",
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics",
    summary:
      "Find deals like this one, with a reason for every match. Account, deal, and competitor stay connected so forecast narratives are grounded — not guessed.",
    elasticPath: "agents",
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle Platform",
    summary:
      "One question across Snowflake facts, S3 payloads, and OpenSearch logs. Large transaction documents become searchable without standing up another warehouse.",
    elasticPath: "esql",
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infrastructure",
    summary:
      "Consistent relevance in US Gov East and West. Replicate with CCR, search locally, and keep ranking aligned so queries never cross the Gov boundary.",
    elasticPath: "agents",
  },
];

export { INSTRUQT_INVITE };
