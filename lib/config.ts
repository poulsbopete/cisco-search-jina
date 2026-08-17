export const KIBANA_URL =
  process.env.NEXT_PUBLIC_KIBANA_URL ??
  "https://ai-assistants-ffcafb.kb.us-east-1.aws.elastic.cloud";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://cisco-search-jina.vercel.app";

/** Ungated Instruqt invite — anyone can start the Serverless labs. */
export const INSTRUQT_INVITE =
  process.env.NEXT_PUBLIC_INSTRUQT_INVITE ??
  "https://play.instruqt.com/elastic/invite/rjz8vgi2xlfq";

export const SPEAKERS = [
  {
    name: "Aaron Byers",
    role: "Elastic AE",
    section: "Opening & intros",
    minutes: "0–5",
  },
  {
    name: "Peter Simkins",
    role: "Elastic SA",
    section: "Why this matters to Cisco · Elastic + Jina",
    minutes: "5–10, 30–35",
  },
  {
    name: "Kapil Jadhav",
    role: "Guest — embeddings & multimodal",
    section: "The tech + live keyword vs semantic demo",
    minutes: "10–25",
  },
  {
    name: "Ivan Silva",
    role: "Elastic",
    section: "Application to Cisco (with Peter)",
    minutes: "20–30",
  },
] as const;

export const CISCO_TEAMS = [
  {
    slug: "crm",
    name: "CRM Analytics",
    owner: "Anshul's team",
    href: "/crm",
    promise: "Find deals like this one — with explainability, not a black box.",
  },
  {
    slug: "lifecycle",
    name: "Lifecycle Platform",
    owner: "Balaji's team",
    href: "/lifecycle",
    promise: "One query across Snowflake, S3, and OpenSearch / Elastic.",
  },
  {
    slug: "webex",
    name: "Webex / Infrastructure",
    owner: "Multi-region ops",
    href: "/webex",
    promise: "Same relevance in US Gov East and West. Search locally after CCR.",
  },
] as const;
