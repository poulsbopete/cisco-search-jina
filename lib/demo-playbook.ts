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

export const LAB_ML_JOB = "cisco-jina-circuit-tokens";

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
      "Same corpus, two ES|QL shapes. MATCH(content, \"legal\") is the OpenSearch-style token ceiling (Umbrella legal-hold noise). MV_INTERSECTS(concepts, …) is the Elastic + Jina neighborhood — Acme counsel stays; Umbrella drops.",
    dashboardTitle: LAB_DASHBOARDS.keywordVsSemantic,
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics",
    summary:
      "Find deals like Acme’s Webex renewal with a reason for every match. Pipeline stage and competitors stay grounded in account / deal / competitor — same story as the lab dashboard.",
    dashboardTitle: LAB_DASHBOARDS.crm,
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle Platform",
    summary:
      "Snowflake · S3 · Elastic as peers in one ES|QL. Counsel language inside large payloads without a second warehouse — matching the Lifecycle federated-search lab.",
    dashboardTitle: LAB_DASHBOARDS.lifecycle,
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infrastructure",
    summary:
      "CCR replicates; search locally in US Gov East and West. Same concepts, no cross-boundary query plane — exactly Lab 4’s East/West ES|QL slices.",
    dashboardTitle: LAB_DASHBOARDS.webex,
  },
  {
    id: "circuit",
    href: "/circuit",
    title: "CIRCUIT LLM proxy (ECS)",
    summary:
      "CIRCUIT is Cisco’s LLM proxy. Customers choose Elastic LLM, CIRCUIT, or both. The lab seeds CIRCUIT docs on cisco-jina-corpus plus ML job cisco-jina-circuit-tokens on proxy metrics (token spike / policy denies).",
    dashboardTitle: LAB_DASHBOARDS.circuit,
  },
];

export { INSTRUQT_INVITE };
