/** Illustrative TCO helpers — link customers to cloud.elastic.co/pricing for quotes. */

export type CostScenario = {
  label: string;
  totalRamGb: number;
  zones: 1 | 2 | 3;
  storageGb: number;
  opsFte: number;
};

/** Cisco-shaped presets (Elasticsearch nodes + Kibana RAM). */
export const COST_SCENARIOS: CostScenario[] = [
  {
    label: "Production search",
    totalRamGb: 48,
    zones: 2,
    storageGb: 1500,
    opsFte: 0.25,
  },
  {
    label: "Gov multi-region",
    totalRamGb: 96,
    zones: 2,
    storageGb: 3000,
    opsFte: 0.35,
  },
];

/** USD / GB RAM / hour — illustrative commercial AWS; use Elastic's calculator for quotes. */
export const ECH_RATE_GB_HOUR = 0.095;

/** Loaded monthly cost per FTE of platform ops (patch, upgrade, on-call, backup). */
export const OPS_FTE_MONTHLY = 28_000;

/** Rough AWS compute $/GB RAM / month for self-managed (r-family equivalent). */
export const OSS_COMPUTE_GB_MONTH = 5.5;

/** AWS OpenSearch Service — managed premium per GB RAM / month (× AZ). */
export const OPENSEARCH_COMPUTE_GB_MONTH = 6.2;

/** Rough EBS / OpenSearch storage $/GB / month. */
export const OSS_STORAGE_GB_MONTH = 0.08;

export const OPENSEARCH_STORAGE_GB_MONTH = 0.09;

/** Snapshot storage on ECH (metered separately). */
export const ECH_SNAPSHOT_GB_MONTH = 0.06;

/** Illustrative Enterprise subscription when OSS teams add vectors / support / CCR. */
export const ENTERPRISE_LICENSE_MONTHLY = 7_500;

/**
 * Illustrative monthly cost to bolt semantic search onto OpenSearch (no native embeddings):
 * Jina API + pipeline engineering + parallel vector path.
 */
export const OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY = 4_000;

/** OpenSearch still needs tuning / ISM / access policies — fraction of full platform ops. */
export const OPENSEARCH_OPS_FACTOR = 0.45;

export type CostEstimate = {
  ech: {
    capacity: number;
    snapshots: number;
    total: number;
  };
  opensearch: {
    compute: number;
    storage: number;
    ops: number;
    semanticOverlay: number;
    infra: number;
    total: number;
  };
  oss: {
    compute: number;
    storage: number;
    ops: number;
    enterprise: number;
    infra: number;
    total: number;
    totalWithEnterprise: number;
  };
  savings: {
    vsOpenSearch: number;
    vsOssEnterprise: number;
    opsReclaimed: number;
    annualVsOpenSearch: number;
    threeYearVsOpenSearch: number;
    percentVsOpenSearch: number;
    annualVsEnterprise: number;
    threeYearVsEnterprise: number;
    percentVsEnterprise: number;
  };
  notes: string[];
};

export function estimateCosts(s: CostScenario): CostEstimate {
  const hours = 730;
  const capacityRam = s.totalRamGb * s.zones;
  const echCapacity = capacityRam * hours * ECH_RATE_GB_HOUR;
  const echSnapshots = s.storageGb * ECH_SNAPSHOT_GB_MONTH;
  const echTotal = echCapacity + echSnapshots;

  const ossCompute = s.totalRamGb * OSS_COMPUTE_GB_MONTH;
  const ossStorage = s.storageGb * OSS_STORAGE_GB_MONTH;
  const ossOps = s.opsFte * OPS_FTE_MONTHLY;
  const ossInfra = ossCompute + ossStorage;
  const ossTotal = ossInfra + ossOps;
  const ossWithEnterprise = ossTotal + ENTERPRISE_LICENSE_MONTHLY;

  const osCompute = s.totalRamGb * s.zones * OPENSEARCH_COMPUTE_GB_MONTH;
  const osStorage = s.storageGb * OPENSEARCH_STORAGE_GB_MONTH;
  const osOps = s.opsFte * OPENSEARCH_OPS_FACTOR * OPS_FTE_MONTHLY;
  const osInfra = osCompute + osStorage;
  const osTotal =
    osInfra + osOps + OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY;

  const vsOpenSearch = osTotal - echTotal;
  const vsOssEnterprise = ossWithEnterprise - echTotal;

  const notes = [
    "AWS OpenSearch fits EDP — Elastic Cloud Hosted is also on AWS Marketplace and can count toward AWS commit.",
    "OpenSearch has no native embeddings; the semantic overlay line is illustrative (Jina + engineering).",
    "Compare Hosted to OpenSearch + overlay for the CRM / Lifecycle / Webex semantic story — not keyword-only.",
    "GovCloud ECH requires Platinum or Enterprise; OpenSearch Gov pricing differs — use your account team.",
  ];

  return {
    ech: {
      capacity: Math.round(echCapacity),
      snapshots: Math.round(echSnapshots),
      total: Math.round(echTotal),
    },
    opensearch: {
      compute: Math.round(osCompute),
      storage: Math.round(osStorage),
      ops: Math.round(osOps),
      semanticOverlay: OPENSEARCH_SEMANTIC_OVERLAY_MONTHLY,
      infra: Math.round(osInfra),
      total: Math.round(osTotal),
    },
    oss: {
      compute: Math.round(ossCompute),
      storage: Math.round(ossStorage),
      ops: Math.round(ossOps),
      enterprise: ENTERPRISE_LICENSE_MONTHLY,
      infra: Math.round(ossInfra),
      total: Math.round(ossTotal),
      totalWithEnterprise: Math.round(ossWithEnterprise),
    },
    savings: {
      vsOpenSearch: Math.round(vsOpenSearch),
      vsOssEnterprise: Math.round(vsOssEnterprise),
      opsReclaimed: Math.round(ossOps),
      annualVsOpenSearch: Math.round(vsOpenSearch * 12),
      threeYearVsOpenSearch: Math.round(vsOpenSearch * 36),
      percentVsOpenSearch:
        osTotal > 0 ? Math.round((vsOpenSearch / osTotal) * 100) : 0,
      annualVsEnterprise: Math.round(vsOssEnterprise * 12),
      threeYearVsEnterprise: Math.round(vsOssEnterprise * 36),
      percentVsEnterprise:
        ossWithEnterprise > 0
          ? Math.round((vsOssEnterprise / ossWithEnterprise) * 100)
          : 0,
    },
    notes,
  };
}

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
