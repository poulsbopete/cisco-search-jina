import corpus from "@/data/workshop-corpus.json";

export type WorkshopDoc = (typeof corpus.documents)[number];

const SYNONYM_GROUPS: string[][] = [
  ["legal", "counsel", "gc", "attorney", "legal-review", "legal concerns"],
  ["lock-in", "lockin", "vendor-lock-in", "stuck", "switching", "switching-cost", "exclusive", "termination"],
  ["webex", "calling", "control hub", "collaboration"],
  ["fedramp", "gov", "government", "residency"],
  ["invoice", "payload", "transaction", "snowflake", "s3"],
  ["meraki", "branch", "ap"],
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function expand(tokens: string[]): Set<string> {
  const out = new Set(tokens);
  for (const token of tokens) {
    for (const group of SYNONYM_GROUPS) {
      if (group.some((g) => g.includes(token) || token.includes(g.replace(/-/g, " ")))) {
        for (const g of group) out.add(g);
      }
    }
  }
  return out;
}

export type RankedHit = {
  doc: WorkshopDoc;
  score: number;
  why: string[];
};

export function keywordSearch(query: string, docs: WorkshopDoc[] = corpus.documents): RankedHit[] {
  const terms = tokenize(query);
  return docs
    .map((doc) => {
      const hay = `${doc.title} ${doc.content}`.toLowerCase();
      const why: string[] = [];
      let score = 0;
      for (const term of terms) {
        if (hay.includes(term)) {
          score += 1;
          why.push(`Exact token “${term}” in ${doc.system}`);
        }
      }
      return { doc, score, why };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function semanticSearch(query: string, docs: WorkshopDoc[] = corpus.documents): RankedHit[] {
  const qTokens = expand(tokenize(query));
  return docs
    .map((doc) => {
      const hayTokens = expand(tokenize(`${doc.title} ${doc.content} ${(doc.concepts ?? []).join(" ")}`));
      const why: string[] = [];
      let overlap = 0;
      for (const token of qTokens) {
        if (hayTokens.has(token)) {
          overlap += 1;
        }
      }
      for (const concept of doc.concepts ?? []) {
        if (qTokens.has(concept) || [...qTokens].some((t) => concept.includes(t))) {
          why.push(`Shared concept · ${concept}`);
        }
      }
      if (!why.length && overlap > 0) {
        why.push("Expanded synonym / embedding neighborhood (workshop replica of Jina ranking)");
      }
      const score = overlap + (doc.concepts?.length ? 0.15 * why.length : 0);
      return { doc, score, why };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function docsBySource(source: WorkshopDoc["source"]): WorkshopDoc[] {
  return corpus.documents.filter((d) => d.source === source);
}

export { corpus };
