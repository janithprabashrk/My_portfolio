import React, { useMemo, useState } from "react";
import { certificates } from "../data/certificates";
import CertificateCard from "./CertificateCard";

const CertificatesPage: React.FC = () => {
  const [q, setQ] = useState("");
  const allTags = useMemo(
    () => Array.from(new Set(certificates.flatMap((c) => c.tags ?? []))).sort(),
    []
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return certificates.filter((c) => {
      const matchesText = !text
        || c.title.toLowerCase().includes(text)
        || c.issuer.toLowerCase().includes(text)
        || (c.tags ?? []).some((t) => t.toLowerCase().includes(text));
      const matchesTag = !activeTag || (c.tags ?? []).includes(activeTag);
      return matchesText && matchesTag;
    });
  }, [q, activeTag]);

  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Certificates
            <span className="ml-2 text-[#FF77AA]">({filtered.length})</span>
          </h1>
          <p className="text-slate-400 mt-2">
            A curated list of my certifications and credentials.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, issuer, or tag..."
            className="w-full sm:max-w-md rounded-md bg-slate-800/70 border-2 border-[#FF007F]/40 focus:border-[#FF007F] focus:ring-0 outline-none px-3 py-2 text-sm text-white placeholder-slate-400 transition shadow-[0_0_0_0_transparent] focus:shadow-[0_0_15px_#FF007F55]"
          />

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded text-xs border-2 transition-all ${
                activeTag === null
                  ? "border-[#FF007F] text-[#FF77AA] bg-[#FF007F]/10"
                  : "border-[#FF007F]/40 text-slate-300 hover:border-[#FF007F]"
              }`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded text-xs border-2 transition-all ${
                  activeTag === t
                    ? "border-[#FF007F] text-[#FF77AA] bg-[#FF007F]/10"
                    : "border-[#FF007F]/40 text-slate-300 hover:border-[#FF007F]"
                }`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CertificateCard key={c.id} cert={c} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
