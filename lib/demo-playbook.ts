import { INSTRUQT_INVITE, KIBANA_URL } from "@/lib/config";

const kb = (path: string) => `${KIBANA_URL.replace(/\/$/, "")}${path}`;

export const ELASTIC = {
  home: kb("/"),
  discover: kb("/app/discover"),
  esql: kb("/app/elasticsearch"),
  agents: kb("/app/agent_builder"),
  playground: kb("/app/search_playground"),
} as const;

export const AGENT_PROMPTS = {
  semantic:
    "Find documents about legal concerns and vendor lock-in on a Webex-like collaboration renewal. Prefer meaning over exact words. Explain why each hit matched.",
  crm: "Find deals like Acme Corp Webex Calling renewal — counsel worried about being stuck / switching costs. Return similar deals and say why. Demote e-discovery legal-hold noise.",
  lifecycle:
    "Show me transactions from Acme over 6 months across Snowflake facts, S3 invoice payloads, and OpenSearch orchestration logs.",
  webex:
    "Same relevance question in a Gov East vs Gov West mental model: legal concerns on collaboration switching costs. What should stay consistent if we CCR the index and search locally?",
} as const;

export type DemoBeat = {
  id: string;
  href: string;
  title: string;
  sell: string;
  elastic: string;
  elasticPath: keyof typeof ELASTIC;
  prompt: string;
};

export const DEMO_BEATS: DemoBeat[] = [
  {
    id: "demo",
    href: "/demo",
    title: "Keyword vs semantic",
    sell: "Same query, two engines. Keyword matches strings. Semantic matches intent. This is the 10-second aha for Kapil’s block.",
    elastic:
      "Prove it in Elastic: Agent Builder (or Playground) on the shared Search project. Paste the prompt. Then Discover for the raw hits.",
    elasticPath: "agents",
    prompt: AGENT_PROMPTS.semantic,
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics (Anshul)",
    sell: "Find deals like this one, with a reason. Account → deal → competitor. Umbrella “legal hold” is the false positive.",
    elastic: "Agent Builder: similar-deal question. Discover: filter to CRM-shaped docs if the index is loaded.",
    elasticPath: "agents",
    prompt: AGENT_PROMPTS.crm,
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle (Balaji)",
    sell: "One question across Snowflake + S3 + OpenSearch. Fat payloads (~10 MB) become searchable. MuleSoft is the pipe.",
    elastic: "ES|QL / Agent Builder: multi-source question. You are selling federation + semantic on payloads, not a new warehouse.",
    elasticPath: "esql",
    prompt: AGENT_PROMPTS.lifecycle,
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infra East–West",
    sell: "CCR copies the index. Query stays in-region. Ranking must not drift. This page is a visual of that architecture.",
    elastic:
      "The shared Kibana is one project (us-east-1). Use Agent Builder to talk the CCR story; do not imply this cluster is dual-Gov. Instruqt is also one region.",
    elasticPath: "agents",
    prompt: AGENT_PROMPTS.webex,
  },
];

export { INSTRUQT_INVITE };
