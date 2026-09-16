export const MODULE_IDS = [
  "semantic",
  "crm",
  "lifecycle",
  "webex",
  "circuit",
  "fips",
  "deploy",
  "bundle",
  "slides",
  "workshop",
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export const MODULES: {
  id: ModuleId;
  label: string;
  kicker: string;
  title: string;
  immersive?: boolean;
}[] = [
  {
    id: "semantic",
    label: "Semantic",
    kicker: "CRM · notes · relevance",
    title: "Stop missing deals that don’t share the same words",
  },
  {
    id: "crm",
    label: "CRM",
    kicker: "CRM Analytics",
    title: "Find deals like Acme’s Webex renewal — with a reason for every match",
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    kicker: "Lifecycle Platform",
    title: "Search Snowflake, S3, and logs as peers — without a second warehouse",
  },
  {
    id: "webex",
    label: "Webex",
    kicker: "Webex / Infrastructure",
    title: "Replicate with CCR. Search locally in US Gov East and West",
  },
  {
    id: "circuit",
    label: "Circuit",
    kicker: "CIRCUIT · Enterprise AI",
    title: "Search and alert on your LLM proxy stream — Elastic, CIRCUIT, or both",
  },
  {
    id: "fips",
    label: "FIPS",
    kicker: "Self-hosted · Enterprise",
    title: "Turn on FIPS for clusters you already run",
  },
  {
    id: "deploy",
    label: "Deploy",
    kicker: "Self-hosted · Cloud · Serverless · Gov",
    title: "Why Elastic over OpenSearch — and where we run it",
  },
  {
    id: "bundle",
    label: "Bundle",
    kicker: "Elastic + Jina",
    title: "Elasticsearch stores and ranks. Jina powers multimodal relevance.",
  },
  {
    id: "slides",
    label: "Slides",
    kicker: "Overview",
    title: "Semantic search across Cisco",
    immersive: true,
  },
  {
    id: "workshop",
    label: "Lab",
    kicker: "Try it",
    title: "Hands-on Elasticsearch Serverless — your own project",
    immersive: true,
  },
];

export function isModuleId(value: string): value is ModuleId {
  return (MODULE_IDS as readonly string[]).includes(value);
}

export function moduleFromPath(pathname: string, hash: string): ModuleId {
  if (pathname.startsWith("/slides")) return "slides";
  if (pathname.startsWith("/demo")) return "semantic";
  if (pathname.startsWith("/crm")) return "crm";
  if (pathname.startsWith("/lifecycle")) return "lifecycle";
  if (pathname.startsWith("/webex")) return "webex";
  if (pathname.startsWith("/circuit")) return "circuit";
  if (pathname.startsWith("/fips")) return "fips";
  if (pathname.startsWith("/deploy") || pathname.startsWith("/ech")) return "deploy";
  if (pathname.startsWith("/bundle")) return "bundle";
  const h = hash.replace(/^#/, "");
  if (h === "ech") return "deploy";
  if (isModuleId(h)) return h;
  return "semantic";
}
