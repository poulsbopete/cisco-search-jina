import { INSTRUQT_INVITE, KIBANA_URL } from "@/lib/config";

/** First lab query — hyphens in the index name must be quoted. */
export const CORPUS_ESQL =
  'FROM "cisco-jina-corpus" | KEEP title, source, account, region, concepts, content | LIMIT 20';

/** Dashboard titles seeded into each Instruqt Serverless Kibana (and Search-AI). */
export const LAB_DASHBOARDS = {
  keywordVsSemantic: "Cisco Jina — Keyword vs semantic",
  crm: "Cisco Jina — CRM Analytics",
  lifecycle: "Cisco Jina — Lifecycle federated search",
  webex: "Cisco Jina — Webex CCR East / West",
  circuit: "Cisco Jina — CIRCUIT LLM proxy (ECS)",
} as const;

/** Stable dashboard IDs on Search-AI + Instruqt seed. */
export const LAB_DASHBOARD_IDS = {
  keywordVsSemantic: "cisco-jina-keyword-vs-semantic",
  crm: "cisco-jina-crm",
  lifecycle: "cisco-jina-lifecycle",
  webex: "cisco-jina-webex-ccr",
  circuit: "cisco-jina-circuit",
} as const;

export const LAB_ML_JOB = "cisco-jina-circuit-tokens";

const kb = (path: string) => `${KIBANA_URL.replace(/\/$/, "")}${path}`;

/** Escape a string for Kibana hash-state (single-quoted Rison-ish). */
function risonString(value: string): string {
  return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

/** Discover deep link with an ES|QL query preloaded (facilitator click-demo). */
export function esqlDiscoverUrl(esql: string, timeFrom = "now-30d"): string {
  const _g = `(time:(from:${timeFrom},to:now))`;
  const _a = `(dataSource:(type:esql),query:(language:esql,esql:${risonString(esql)}))`;
  return kb(`/app/discover#/?_g=${_g}&_a=${_a}`);
}

export function dashboardUrl(id: string): string {
  return kb(`/app/dashboards#/view/${id}`);
}

/** Facilitator deep links into the shared Search-AI Serverless project. */
export const ELASTIC = {
  home: kb("/"),
  discover: kb("/app/discover"),
  discoverCorpus: esqlDiscoverUrl(CORPUS_ESQL),
  dashboards: kb("/app/dashboards"),
  agentBuilder: kb("/app/agent_builder"),
  workflows: kb("/app/workflows"),
  mlJobs: kb("/app/ml/jobs"),
  mlAnomalyExplorer: kb("/app/ml/explorer"),
  dashboard: {
    keywordVsSemantic: dashboardUrl(LAB_DASHBOARD_IDS.keywordVsSemantic),
    crm: dashboardUrl(LAB_DASHBOARD_IDS.crm),
    lifecycle: dashboardUrl(LAB_DASHBOARD_IDS.lifecycle),
    webex: dashboardUrl(LAB_DASHBOARD_IDS.webex),
    circuit: dashboardUrl(LAB_DASHBOARD_IDS.circuit),
  },
  esql: {
    keywordLegal: esqlDiscoverUrl(
      'FROM "cisco-jina-corpus" | WHERE MATCH(content, "legal") | KEEP title, account, source, content | LIMIT 20',
    ),
    semanticLockin: esqlDiscoverUrl(
      'FROM "cisco-jina-corpus" | MV_EXPAND concepts | WHERE concepts == "vendor-lock-in" | KEEP title, account, concepts, content | LIMIT 20',
    ),
    crm: esqlDiscoverUrl(
      'FROM "cisco-jina-corpus" | WHERE source == "crm" | KEEP title, account, stage, amount, competitors, content | LIMIT 20',
    ),
    lifecycle: esqlDiscoverUrl(
      'FROM "cisco-jina-corpus" | WHERE source == "lifecycle" | KEEP title, system, account, bytes, content | LIMIT 20',
    ),
    webexGov: esqlDiscoverUrl(
      'FROM "cisco-jina-corpus" | WHERE region == "us-gov-east" OR region == "us-gov-west" | KEEP title, region, source, content | LIMIT 20',
    ),
    circuit: esqlDiscoverUrl(
      'FROM "cisco-jina-corpus" | WHERE source == "circuit" | KEEP title, region, concepts, content | LIMIT 20',
    ),
  },
} as const;

export type DemoBeat = {
  id: string;
  href: string;
  title: string;
  summary: string;
  dashboardTitle?: string;
  /** Search-AI dashboard deep link (facilitator live talk). */
  elasticDashboard?: string;
  /** Search-AI Discover ES|QL deep link for this beat. */
  elasticDiscover?: string;
};

export const DEMO_BEATS: DemoBeat[] = [
  {
    id: "demo",
    href: "/demo",
    title: "Keyword vs semantic",
    summary:
      "Same corpus, two ES|QL shapes. MATCH(content, \"legal\") is the OpenSearch-style token ceiling (Umbrella legal-hold noise). MV_INTERSECTS(concepts, …) is the Elastic + Jina neighborhood — Acme counsel stays; Umbrella drops.",
    dashboardTitle: LAB_DASHBOARDS.keywordVsSemantic,
    elasticDashboard: ELASTIC.dashboard.keywordVsSemantic,
    elasticDiscover: ELASTIC.esql.keywordLegal,
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics",
    summary:
      "Find deals like Acme’s Webex renewal with a reason for every match. Pipeline stage and competitors stay grounded in account / deal / competitor — same story as the lab dashboard.",
    dashboardTitle: LAB_DASHBOARDS.crm,
    elasticDashboard: ELASTIC.dashboard.crm,
    elasticDiscover: ELASTIC.esql.crm,
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle Platform",
    summary:
      "Snowflake · S3 · Elastic as peers in one ES|QL. Counsel language inside large payloads without a second warehouse — matching the Lifecycle federated-search lab.",
    dashboardTitle: LAB_DASHBOARDS.lifecycle,
    elasticDashboard: ELASTIC.dashboard.lifecycle,
    elasticDiscover: ELASTIC.esql.lifecycle,
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infrastructure",
    summary:
      "CCR replicates; search locally in US Gov East and West. Same concepts, no cross-boundary query plane — exactly Lab 4’s East/West ES|QL slices.",
    dashboardTitle: LAB_DASHBOARDS.webex,
    elasticDashboard: ELASTIC.dashboard.webex,
    elasticDiscover: ELASTIC.esql.webexGov,
  },
  {
    id: "circuit",
    href: "/circuit",
    title: "CIRCUIT LLM proxy (ECS)",
    summary:
      "CIRCUIT is Cisco’s LLM proxy. Customers choose Elastic LLM, CIRCUIT, or both. The lab seeds CIRCUIT docs on cisco-jina-corpus plus ML job cisco-jina-circuit-tokens on proxy metrics (token spike / policy denies).",
    dashboardTitle: LAB_DASHBOARDS.circuit,
    elasticDashboard: ELASTIC.dashboard.circuit,
    elasticDiscover: ELASTIC.esql.circuit,
  },
];

export { INSTRUQT_INVITE, KIBANA_URL };
