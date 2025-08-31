import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../types/project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleViewProject = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="w-full h-full rounded-xl overflow-hidden shadow-xl shadow-[#FF007F]/20 border border-[#1A1A1A] bg-[#0D0D0D]"
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Backdrop image layer */}
        <div className="absolute inset-0 -z-10">
          <img
            src={project.backdropImage || project.image}
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/60 to-[#0D0D0D]" />
        </div>
        {/* Card content */}
        <motion.div className="absolute inset-0 p-6 flex flex-col">
          <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 to-transparent"></div>
          </div>

          <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
            {project.title}
          </h3>
          <p className="text-[#C0C0C0] text-sm flex-grow">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-[#1A1A1A] text-[#FF007F]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#FF007F] to-[#A020F0] text-[#F5F5F5] font-medium hover:shadow-lg hover:shadow-[#FF007F]/30 transition-all border border-transparent hover:border-[#A020F0]"
            >
              <ExternalLink size={16} className="mr-2" />
              View Project
            </Link>
            {project.githubUrl && project.githubUrl.includes("github") && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleViewProject(project.githubUrl!, e)}
                className="flex items-center px-4 py-2 rounded-full bg-[#1A1A1A] text-[#F5F5F5] font-medium hover:bg-[#1A1A1A]/80 transition-all border border-transparent hover:border-[#FF007F]"
              >
                <Github size={16} className="mr-2" />
                GitHub
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
