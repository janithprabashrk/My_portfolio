import React from "react";
import { ExternalLink } from "lucide-react";
import type { Certificate } from "../data/certificates";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  cert: Certificate;
};

const CertificateCard: React.FC<Props> = ({ cert }) => {
  return (
    <div className="group relative rounded-xl border-2 border-[#FF007F]/40 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_#FF007F55] hover:border-[#FF007F]">
      {cert.imageUrl && (
        <div className="p-3 pb-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={cert.imageUrl}
              alt={cert.imageAlt ?? cert.title}
              className="h-full w-full object-cover rounded-md border border-[#FF007F]/30"
              loading="lazy"
            />
          </AspectRatio>
        </div>
      )}
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-[#FF77AA] transition-colors">
            {cert.title}
          </h3>
          <p className="text-slate-300 text-sm">{cert.issuer}</p>
          {cert.date && (
            <p className="text-slate-400 text-xs mt-1">{cert.date}</p>
          )}
          {cert.credentialId && (
            <p className="text-slate-400 text-xs mt-1">
              Credential ID: <span className="text-slate-200">{cert.credentialId}</span>
            </p>
          )}
        </div>
        {cert.url && (
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-[#FF007F] hover:text-[#FF77AA] transition-colors"
            aria-label="Open certificate"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>
      {cert.tags && cert.tags.length > 0 && (
        <div className="px-5 pb-5 mt-2 flex flex-wrap gap-2">
          {cert.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wide px-2 py-1 bg-[#FF007F]/10 text-[#FF77AA] rounded"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
