import { INSTRUQT_INVITE } from "@/lib/config";

export function BundleStory() {
  const rows = [
    {
      need: "Embeddings / semantic ranking for deals and notes",
      opensearch: "Not in the product — keyword ceiling",
      elastic: "Native inference + vectors in search",
      jina: "Multimodal, domain-tuned embeddings (v5)",
    },
    {
      need: "Store CRM, lifecycle, Webex, and CIRCUIT data",
      opensearch: "Indices — lexical search",
      elastic: "Indices, ILM, Hosted or Serverless",
      jina: "Embeddings API only — not a data store",
    },
    {
      need: "Full-text, filters, and audit who searched",
      opensearch: "Keyword + filters",
      elastic: "Search + security + query audit",
      jina: "No",
    },
    {
      need: "Explain why a deal or note matched",
      opensearch: "Limited",
      elastic: "ES|QL, graphs, hit explanations",
      jina: "Vectors only",
    },
    {
      need: "Evolve models as relevance changes",
      opensearch: "No embedding lifecycle",
      elastic: "Inference endpoints + ingest pipelines",
      jina: "Model revisions via API",
    },
  ];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        Your teams need more than keywords.{" "}
        <span className="text-white">AWS OpenSearch</span> stops at tokens.{" "}
        <span className="text-white">Elasticsearch</span> stores your deals, notes, and logs and
        ranks with vectors. <span className="text-white">Jina</span> supplies multimodal embeddings
        when you need them. Prove the gap in{" "}
        <a
          className="text-primary-bright underline"
          href={INSTRUQT_INVITE}
          target="_blank"
          rel="noopener noreferrer"
        >
          a hands-on Serverless project
        </a>{" "}
        — ES|QL on <code className="text-primary-bright">cisco-jina-corpus</code>, then AI Agent
        with the same question.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">What your teams need</th>
              <th className="px-4 py-3">AWS OpenSearch</th>
              <th className="px-4 py-3">Elasticsearch</th>
              <th className="px-4 py-3">Jina</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.need} className="border-t border-white/10">
                <td className="px-4 py-3 text-zinc-200">{r.need}</td>
                <td className="px-4 py-3 text-zinc-500">{r.opensearch}</td>
                <td className="px-4 py-3 text-emerald-300/90">{r.elastic}</td>
                <td className="px-4 py-3 text-primary-bright">{r.jina}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
