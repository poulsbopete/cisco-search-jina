import { AGENT_BUILDER_URL, INSTRUQT_INVITE, KIBANA_URL } from "@/lib/config";

const kb = (path: string) => `${KIBANA_URL.replace(/\/$/, "")}${path}`;

/** First lab query — hyphens in the index name must be quoted. */
export const CORPUS_ESQL =
  'FROM "cisco-jina-corpus" | KEEP title, source, account, region, concepts, content | LIMIT 20';

export const ELASTIC = {
  home: kb("/"),
  agentBuilder: AGENT_BUILDER_URL,
  discover: kb(
    "/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-24h,to:now))",
  ),
  esql: kb("/app/dev_tools#/console"),
} as const;

export type DemoBeat = {
  id: string;
  href: string;
  title: string;
  summary: string;
};

export const DEMO_BEATS: DemoBeat[] = [
  {
    id: "demo",
    href: "/demo",
    title: "Keyword vs semantic",
    summary:
      "The same question, two retrieval styles. AWS OpenSearch stops at keyword — Cisco teams told us it does not offer embeddings. Elastic + Jina rank meaning, so “legal concerns” and “vendor lock-in fears” can surface the same deals.",
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics",
    summary:
      "Find deals like this one, with a reason for every match. Account, deal, and competitor stay connected so forecast narratives are grounded — not guessed.",
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle Platform",
    summary:
      "One question across Snowflake facts, S3 payloads, and Elastic logs. Large transaction documents become searchable without standing up another warehouse.",
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infrastructure",
    summary:
      "Consistent relevance in US Gov East and West. Replicate with CCR, search locally, and keep ranking aligned so queries never cross the Gov boundary.",
  },
];

export { INSTRUQT_INVITE };
