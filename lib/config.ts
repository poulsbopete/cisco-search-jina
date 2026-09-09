export const KIBANA_URL =
  process.env.NEXT_PUBLIC_KIBANA_URL ??
  "https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud";

/** Shared Search-AI Agent Builder agent (cisco-jina-corpus). */
export const AGENT_BUILDER_URL =
  process.env.NEXT_PUBLIC_AGENT_BUILDER_URL ??
  `${KIBANA_URL.replace(/\/$/, "")}/app/agent_builder`;

/** Vega workshop dashboards on Search-AI (see kibana/manifest.json). */
export const WORKSHOP_DASHBOARDS = {
  keywordVsSemantic: `${KIBANA_URL.replace(/\/$/, "")}/app/dashboards#/view/d879af5a-78fd-4c30-a859-7f2157feb331`,
  crm: `${KIBANA_URL.replace(/\/$/, "")}/app/dashboards#/view/d7568cc7-e3ea-411d-9635-745354c7e465`,
  lifecycle: `${KIBANA_URL.replace(/\/$/, "")}/app/dashboards#/view/cf1c9121-0108-4374-b9ab-562a5d08fd47`,
  webex: `${KIBANA_URL.replace(/\/$/, "")}/app/dashboards#/view/b3e910f8-1f76-4d72-a8be-dd11e313b331`,
  circuit: `${KIBANA_URL.replace(/\/$/, "")}/app/dashboards#/view/ee0ce4a4-4541-4d39-9c54-fac530788b4b`,
} as const;

export const WORKSHOP_DASHBOARD_TOUR =
  `${KIBANA_URL.replace(/\/$/, "")}/app/workflows/cisco-jina-dashboard-tour`;

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://cisco-search-jina.vercel.app";

/** Hands-on lab invite (Elastic Serverless Search). */
export const INSTRUQT_INVITE =
  process.env.NEXT_PUBLIC_INSTRUQT_INVITE ??
  "https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq";

export const CISCO_TEAMS = [
  {
    slug: "crm",
    name: "CRM Analytics",
    owner: "Deal intelligence",
    href: "/#crm",
    promise: "Find deals like this one — with explainability, not a black box.",
  },
  {
    slug: "lifecycle",
    name: "Lifecycle Platform",
    owner: "Federated sources",
    href: "/#lifecycle",
    promise: "One query across Snowflake, S3, and Elastic logs.",
  },
  {
    slug: "webex",
    name: "Webex / Infrastructure",
    owner: "Multi-region ops",
    href: "/#webex",
    promise: "Same relevance in US Gov East and West. Search locally after CCR.",
  },
  {
    slug: "circuit",
    name: "CIRCUIT",
    owner: "LLM proxy · Enterprise AI",
    href: "/#circuit",
    promise:
      "LLM proxy at ECS scale — use Elastic LLM and/or CIRCUIT; Elastic searches the stream either way.",
  },
] as const;
