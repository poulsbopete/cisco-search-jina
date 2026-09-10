export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://cisco-search-jina.vercel.app";

/** Facilitator Shared Serverless Search project (Search-AI). No keys in the app — browser SSO. */
export const KIBANA_URL =
  process.env.NEXT_PUBLIC_KIBANA_URL ??
  "https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud";

/** Hands-on lab invite (per-learner Serverless Search). */
export const INSTRUQT_INVITE =
  process.env.NEXT_PUBLIC_INSTRUQT_INVITE ??
  "https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq";

export const CISCO_TEAMS = [
  {
    slug: "crm",
    name: "CRM Analytics",
    owner: "Deal intelligence",
    href: "/#crm",
    promise: "Find deals like Acme’s Webex renewal — with explainability, not a black box.",
  },
  {
    slug: "lifecycle",
    name: "Lifecycle Platform",
    owner: "Federated sources",
    href: "/#lifecycle",
    promise: "Snowflake · S3 · Elastic peers — counsel language inside large payloads.",
  },
  {
    slug: "webex",
    name: "Webex / Infrastructure",
    owner: "Multi-region ops",
    href: "/#webex",
    promise: "CCR replicates; search locally in US Gov East and West.",
  },
  {
    slug: "circuit",
    name: "CIRCUIT",
    owner: "LLM proxy · Enterprise AI",
    href: "/#circuit",
    promise:
      "Elastic LLM and/or CIRCUIT; lab seeds ECS docs plus ML job cisco-jina-circuit-tokens.",
  },
] as const;
