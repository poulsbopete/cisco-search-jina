export const KIBANA_URL =
  process.env.NEXT_PUBLIC_KIBANA_URL ??
  "https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud";

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
    promise: "One query across Snowflake, S3, and OpenSearch / Elastic.",
  },
  {
    slug: "webex",
    name: "Webex / Infrastructure",
    owner: "Multi-region ops",
    href: "/#webex",
    promise: "Same relevance in US Gov East and West. Search locally after CCR.",
  },
] as const;
