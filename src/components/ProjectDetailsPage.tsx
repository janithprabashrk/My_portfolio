import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";

const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-400 mb-3">Project not found.</p>
          <Link to="/" className="text-[#FF77AA] hover:text-[#FF007F]">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero with backdrop */}
      <div className="relative h-64 md:h-80">
        <img
          src={project.backdropImage || project.image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
        <div className="relative container mx-auto px-4 h-full flex items-end pb-6">
          <div>
            <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4">
              <ArrowLeft size={18} className="mr-2" /> Back
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="px-2 py-1 text-xs rounded-full bg-[#1A1A1A] text-[#FF77AA]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          {project.fullDescription && (
            <p className="text-slate-300 whitespace-pre-line leading-relaxed">
              {project.fullDescription}
            </p>
          )}
          {/* Media gallery */}
          {(project.images && project.images.length > 0) || (project.videos && project.videos.length > 0) ? (
            <div className="mt-8 space-y-6">
              {project.videos && project.videos.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Videos</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {project.videos.map((v, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50">
                        <AspectRatio ratio={16 / 9}>
                          {v.type === "youtube" || (!v.type && v.src.includes("youtube.com")) ? (
                            <iframe
                              src={v.src.replace("watch?v=", "embed/")}
                              title={v.title || `Video ${idx + 1}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : v.type === "vimeo" || (!v.type && v.src.includes("vimeo.com")) ? (
                            <iframe
                              src={v.src.replace("vimeo.com/", "player.vimeo.com/video/")}
                              title={v.title || `Video ${idx + 1}`}
                              className="w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              controls
                              poster={v.poster}
                              className="w-full h-full object-cover"
                            >
                              <source src={v.src} />
                            </video>
                          )}
                        </AspectRatio>
                        {v.title && (
                          <div className="px-3 py-2 text-sm text-slate-300 border-t border-slate-800">{v.title}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.images && project.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Screenshots</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.map((img, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50">
            <AspectRatio ratio={img.ratio ?? 16 / 9}>
                          <img
                            src={img.src}
                            alt={img.alt || project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </AspectRatio>
                        {img.caption && (
                          <div className="px-3 py-2 text-sm text-slate-300 border-t border-slate-800">{img.caption}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <img src={project.image} alt={project.title} className="w-full rounded-lg border border-slate-800" />
            </div>
          )}
        </div>
        <aside>
          <div className="rounded-lg border border-slate-800 p-4 bg-slate-900/60">
            <h3 className="font-semibold mb-3">Links</h3>
            <div className="flex flex-col gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#FF77AA] hover:text-[#FF007F]"
                >
                  <ExternalLink size={16} /> Live / Details
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
