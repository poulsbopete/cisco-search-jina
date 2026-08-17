export const MODULE_IDS = [
  "semantic",
  "crm",
  "lifecycle",
  "webex",
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
    kicker: "Retrieval",
    title: "Keyword vs semantic",
  },
  {
    id: "crm",
    label: "CRM",
    kicker: "CRM Analytics",
    title: "Find deals like this one",
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    kicker: "Lifecycle Platform",
    title: "Federated search on large payloads",
  },
  {
    id: "webex",
    label: "Webex",
    kicker: "Webex / Infrastructure",
    title: "US Gov East + West · CCR + local search",
  },
  {
    id: "bundle",
    label: "Bundle",
    kicker: "Elastic + Jina",
    title: "Elastic runs search. Jina powers relevance.",
  },
  {
    id: "slides",
    label: "Slides",
    kicker: "Deck",
    title: "Cisco-wide search",
    immersive: true,
  },
  {
    id: "workshop",
    label: "Lab",
    kicker: "Hands-on",
    title: "Elastic Serverless Search lab",
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
  if (pathname.startsWith("/bundle")) return "bundle";
  const h = hash.replace(/^#/, "");
  if (isModuleId(h)) return h;
  return "semantic";
}
