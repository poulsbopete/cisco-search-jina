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
    label: "Dev / POC",
    totalRamGb: 16,
    zones: 1,
    storageGb: 500,
    opsFte: 0.1,
  },
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

/** Rough EBS $/GB / month. */
export const OSS_STORAGE_GB_MONTH = 0.08;

/** Snapshot storage on ECH (metered separately). */
export const ECH_SNAPSHOT_GB_MONTH = 0.06;

export type CostEstimate = {
  ech: {
    capacity: number;
    snapshots: number;
    total: number;
  };
  oss: {
    compute: number;
    storage: number;
    ops: number;
    total: number;
  };
  notes: string[];
};

export function estimateCosts(s: CostScenario): CostEstimate {
  const hours = 730;
  const capacityRam = s.totalRamGb * s.zones;
  const echCapacity = capacityRam * hours * ECH_RATE_GB_HOUR;
  const echSnapshots = s.storageGb * ECH_SNAPSHOT_GB_MONTH;
  const ossCompute = s.totalRamGb * OSS_COMPUTE_GB_MONTH;
  const ossStorage = s.storageGb * OSS_STORAGE_GB_MONTH;
  const ossOps = s.opsFte * OPS_FTE_MONTHLY;

  const notes = [
    "ECH: deployment capacity (GB RAM × hours) is usually the largest line item.",
    "OSS license is $0, but Enterprise features (vectors, CCR, advanced security) require a subscription on self-managed too.",
    "OSS ops FTE is the hidden cost — patching, upgrades, backups, and incident response.",
    "GovCloud ECH requires Platinum or Enterprise; rates differ — use your account team or the pricing calculator.",
  ];

  return {
    ech: {
      capacity: Math.round(echCapacity),
      snapshots: Math.round(echSnapshots),
      total: Math.round(echCapacity + echSnapshots),
    },
    oss: {
      compute: Math.round(ossCompute),
      storage: Math.round(ossStorage),
      ops: Math.round(ossOps),
      total: Math.round(ossCompute + ossStorage + ossOps),
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
