import { INSTRUQT_INVITE } from "@/lib/config";

export function BundleStory() {
  const rows = [
    {
      need: "Embeddings / semantic ranking",
      opensearch: "Not offered — keyword only",
      elastic: "Native inference + vectors",
      jina: "Multimodal, domain-tuned (v5)",
    },
    {
      need: "Store deal, log, note, recording metadata",
      opensearch: "Indices — lexical search",
      elastic: "Yes — indices, ILM, serverless",
      jina: "No — embeddings API only",
    },
    {
      need: "Full-text + filters + audit who searched",
      opensearch: "Keyword + filters",
      elastic: "Yes — Search + security + logs",
      jina: "No",
    },
    {
      need: "Knowledge graphs / explainability",
      opensearch: "Limited",
      elastic: "Yes — ES|QL, graphs, hit explanations",
      jina: "Vectors only",
    },
    {
      need: "Version models as relevance changes",
      opensearch: "No embedding lifecycle",
      elastic: "Inference endpoints + ingest pipelines",
      jina: "Model revisions via API",
    },
  ];

  return (
    <div>
      <p className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm leading-relaxed text-zinc-200">
        Cisco teams told us <span className="text-white">AWS OpenSearch does not offer embeddings</span>.
        That is a keyword ceiling: the words you typed, nothing else. Elastic runs embeddings in
        Hosted or self-managed Enterprise. Jina makes them multimodal. Prove it in{" "}
        <a className="text-primary-bright underline" href={INSTRUQT_INVITE} target="_blank" rel="noopener noreferrer">
          the Serverless lab
        </a>{" "}
        — ES|QL on <code className="text-primary-bright">cisco-jina-corpus</code>, then AI Agent.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Need</th>
              <th className="px-4 py-3">AWS OpenSearch</th>
              <th className="px-4 py-3">Elastic</th>
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
