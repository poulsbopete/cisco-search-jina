export function BundleStory() {
  const rows = [
    {
      need: "Store deal, log, note, recording metadata",
      elastic: "Yes — indices, ILM, serverless",
      jina: "No — embeddings API only",
    },
    {
      need: "Full-text + filters + audit who searched",
      elastic: "Yes — Search + security + logs",
      jina: "No",
    },
    {
      need: "Knowledge graphs / explainability",
      elastic: "Yes — ES|QL, graphs, hit explanations",
      jina: "Vectors only",
    },
    {
      need: "Multimodal embeddings (text, deck, audio)",
      elastic: "Good native embeddings",
      jina: "Best-in-class / domain-tuned (v5)",
    },
    {
      need: "Version models as relevance changes",
      elastic: "Inference endpoints + ingest pipelines",
      jina: "Model revisions via API",
    },
  ];

  return (
    <div>
      <p className="text-sm text-zinc-400">
        Elastic runs the search. Jina powers the relevance. CRM indexed in Elastic, embedded via
        Jina, queried with knowledge graphs — one-click answers to complex questions.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Need</th>
              <th className="px-4 py-3">Elastic</th>
              <th className="px-4 py-3">Jina</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.need} className="border-t border-white/10">
                <td className="px-4 py-3 text-zinc-200">{r.need}</td>
                <td className="px-4 py-3 text-emerald-300/90">{r.elastic}</td>
                <td className="px-4 py-3 text-cyan-200">{r.jina}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
