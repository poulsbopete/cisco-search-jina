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
      "Your teams type “legal” and drown in Umbrella e-discovery noise. With Elasticsearch + Jina concepts, Acme counsel and vendor lock-in stay on top — keyword MATCH is the ceiling; meaning is the product.",
    dashboardTitle: LAB_DASHBOARDS.keywordVsSemantic,
    elasticDashboard: ELASTIC.dashboard.keywordVsSemantic,
    elasticDiscover: ELASTIC.esql.keywordLegal,
  },
  {
    id: "crm",
    href: "/crm",
    title: "CRM Analytics",
    summary:
      "CRM Analytics finds deals like Acme’s Webex renewal with a reason for every match — account, stage, competitors, and counsel language grounded in your pipeline data.",
    dashboardTitle: LAB_DASHBOARDS.crm,
    elasticDashboard: ELASTIC.dashboard.crm,
    elasticDiscover: ELASTIC.esql.crm,
  },
  {
    id: "lifecycle",
    href: "/lifecycle",
    title: "Lifecycle Platform",
    summary:
      "Lifecycle Platform searches Snowflake, S3, and Elastic logs as peers — counsel language inside large payloads without standing up a second analytics warehouse.",
    dashboardTitle: LAB_DASHBOARDS.lifecycle,
    elasticDashboard: ELASTIC.dashboard.lifecycle,
    elasticDiscover: ELASTIC.esql.lifecycle,
  },
  {
    id: "webex",
    href: "/webex",
    title: "Webex / Infrastructure",
    summary:
      "Webex / Infrastructure replicates with CCR and searches locally in US Gov East and West — same intent, no cross-boundary query plane.",
    dashboardTitle: LAB_DASHBOARDS.webex,
    elasticDashboard: ELASTIC.dashboard.webex,
    elasticDiscover: ELASTIC.esql.webexGov,
  },
  {
    id: "circuit",
    href: "/circuit",
    title: "CIRCUIT LLM proxy (ECS)",
    summary:
      "CIRCUIT is your LLM proxy. Use Elastic LLM, CIRCUIT, or both — Elasticsearch searches and alerts the ECS stream either way, with optional ML on token spend and policy denies.",
    dashboardTitle: LAB_DASHBOARDS.circuit,
    elasticDashboard: ELASTIC.dashboard.circuit,
    elasticDiscover: ELASTIC.esql.circuit,
  },
];

export { INSTRUQT_INVITE, KIBANA_URL };
