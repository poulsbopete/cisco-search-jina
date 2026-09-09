import { INSTRUQT_INVITE } from "@/lib/config";

/** First lab query — hyphens in the index name must be quoted. */
export const CORPUS_ESQL =
  'FROM "cisco-jina-corpus" | KEEP title, source, account, region, concepts, content | LIMIT 20';

/** Dashboard titles seeded into each Instruqt Serverless Kibana. */
export const LAB_DASHBOARDS = {
  keywordVsSemantic: "Cisco Jina — Keyword vs semantic",
  crm: "Cisco Jina — CRM Analytics",
  lifecycle: "Cisco Jina — Lifecycle federated search",
  webex: "Cisco Jina — Webex CCR East / West",
  circuit: "Cisco Jina — CIRCUIT LLM proxy (ECS)",
} as const;

export type DemoBeat = {
  id: string;
  href: string;
  title: string;
  summary: string;
  dashboardTitle?: string;
};

export const DEMO_BEATS: DemoBeat[] = [
  {
    id: "demo",
    href: "/demo",
    title: "Keyword vs semantic",
    summary:
      "The same question, two retrieval styles. AWS OpenSearch stops at keyword — Cisco teams told us it does not offer embeddings. Elastic + Jina rank meaning, so “legal concerns” and “vendor lock-in fears” can surface the same deals.",
    dashboardTitle: LAB_DASHBOARDS.keywordVsSemantic,
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics",
    summary:
      "Find deals like this one, with a reason for every match. Account, deal, and competitor stay connected so forecast narratives are grounded — not guessed.",
    dashboardTitle: LAB_DASHBOARDS.crm,
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle Platform",
    summary:
      "One question across Snowflake facts, S3 payloads, and Elastic logs. Large transaction documents become searchable without standing up another warehouse.",
    dashboardTitle: LAB_DASHBOARDS.lifecycle,
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infrastructure",
    summary:
      "Consistent relevance in US Gov East and West. Replicate with CCR, search locally, and keep ranking aligned so queries never cross the Gov boundary.",
    dashboardTitle: LAB_DASHBOARDS.webex,
  },
  {
    id: "circuit",
    href: "/circuit",
    title: "ECS at scale for the CIRCUIT LLM proxy",
    summary:
      "CIRCUIT is Cisco’s LLM proxy. Customers choose Elastic LLM, CIRCUIT, or both. Elastic searches and explains the ECS proxy stream; Jina adds semantic neighborhood on prompts and policies.",
    dashboardTitle: LAB_DASHBOARDS.circuit,
  },
];

export { INSTRUQT_INVITE };
