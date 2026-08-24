"use client";

import { useState } from "react";

const OSS_ROWS = [
  {
    need: "FIPS-certified crypto in the product",
    oss: "Not a supported switch. You own the JVM and the risk.",
    enterprise: "xpack.security.fips_mode.enabled: true",
  },
  {
    need: "Security as a product (TLS, realms, keystore)",
    oss: "You assemble it. No FIPS-aware defaults.",
    enterprise: "Documented FIPS path: hashing, keystore, TLS.",
  },
  {
    need: "On-prem rolling change",
    oss: "Custom JVM + undocumented restart.",
    enterprise: "Prepare config, then rolling restart into a FIPS JVM.",
  },
  {
    need: "Gov / FedRAMP story",
    oss: "Crypto is still DIY. No product attestation path.",
    enterprise: "FIPS addresses crypto. FedRAMP is still the boundary around it.",
  },
];

const STEPS = [
  {
    title: "FIPS-capable Java",
    detail:
      "Use a Java runtime the Elasticsearch version supports, plus a FIPS-certified security provider. Add the provider JARs and point the JVM at those security properties. The bundled JVM is not a FIPS runtime.",
  },
  {
    title: "One setting in elasticsearch.yml",
    detail:
      "Set xpack.security.fips_mode.enabled: true. Optionally pin providers with xpack.security.fips_mode.required_providers so the node will not start on the wrong crypto stack.",
  },
  {
    title: "Password-protect the keystore",
    detail:
      "The Elasticsearch keystore must be password protected. ASCII passwords need at least 14 characters.",
  },
  {
    title: "File-realm hashing",
    detail:
      "If you still use file-based users, create them after FIPS is on so hashing is FIPS-compliant (PBKDF2-class defaults).",
  },
  {
    title: "TLS material",
    detail:
      "Review HTTP and transport TLS. Certificates, private keys, keystores, and truststores must be FIPS-acceptable formats and key lengths. Some PKCS12 / certutil habits have to change.",
  },
  {
    title: "Stage, then roll",
    detail:
      "Prove startup, cluster formation, TLS, auth, and secret rotation in staging. On an existing cluster this is a controlled upgrade: config first, then a rolling restart into the FIPS JVM.",
  },
];

const YML = `xpack.security.enabled: true
xpack.security.fips_mode.enabled: true
# xpack.security.fips_mode.required_providers: ["<your FIPS provider>"]`;

export function FipsStory() {
  const [on, setOn] = useState(true);

  return (
    <div>
      <p className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 text-sm leading-relaxed text-zinc-200">
        On-prem Open Source Elasticsearch has no FIPS switch. Elastic{" "}
        <span className="text-white">Enterprise</span> does: prepare a FIPS JVM, flip one
        setting, password-protect the keystore, then rolling-restart. That is the path for an
        older self-managed cluster — including Webex / Infra Gov — without rebuilding search.
        FIPS is crypto. It is <span className="text-white">not</span> FedRAMP by itself.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-zinc-400">
            elasticsearch.yml
          </p>
          <p className="mt-1 text-sm text-zinc-200">
            {on
              ? "Enterprise FIPS mode is on. Nodes start under FIPS restrictions."
              : "Open Source today: no xpack.security.fips_mode. Crypto stays outside the product."}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn((v) => !v)}
          className={`relative h-8 w-16 rounded-full border font-mono text-[10px] ${
            on
              ? "border-cyan-400 bg-cyan-400/20 text-cyan-100"
              : "border-white/20 bg-black/40 text-zinc-400"
          }`}
        >
          <span
            className={`absolute top-1 size-6 rounded-full bg-white transition-transform ${
              on ? "left-9" : "left-1"
            }`}
          />
          <span className="sr-only">Enable FIPS</span>
        </button>
      </div>

      <pre
        className={`mt-3 overflow-x-auto rounded-2xl border p-4 font-mono text-xs leading-relaxed ${
          on
            ? "border-cyan-400/40 bg-black/50 text-cyan-100"
            : "border-white/10 bg-black/30 text-zinc-600"
        }`}
      >
        {on ? YML : "# Open Source — there is no FIPS mode setting to enable."}
      </pre>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Need</th>
              <th className="px-4 py-3">Open Source (today)</th>
              <th className="px-4 py-3">Elastic Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {OSS_ROWS.map((r) => (
              <tr key={r.need} className="border-t border-white/10">
                <td className="px-4 py-3 text-zinc-200">{r.need}</td>
                <td className="px-4 py-3 text-zinc-500">{r.oss}</td>
                <td className="px-4 py-3 text-emerald-300/90">{r.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-8 space-y-4">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="font-mono text-xs text-cyan-300">
              {String(i + 1).padStart(2, "0")} · {step.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{step.detail}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Confirm the Elasticsearch version and Java line you run on-prem actually support this FIPS
        model before a production rolling restart. Public reference:{" "}
        <a
          className="text-cyan-300 underline"
          href="https://www.elastic.co/docs/deploy-manage/security/fips-es"
          target="_blank"
          rel="noopener noreferrer"
        >
          FIPS compliance for Elasticsearch
        </a>
        .
      </p>
    </div>
  );
}
