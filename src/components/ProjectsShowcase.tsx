import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import LetterGlitch from "./LetterGlitch";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export default function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "React", "Python", "Node.js", "IoT", "PHP", "Spring Boot 3", "MongoDB", "Streamlit"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
  : projects.filter((project) => project.technologies.includes(activeFilter));

  return (
  <section id="projects" className="relative py-20 bg-[#0D0D0D] overflow-hidden">
      {/* Subtle, performant glitch backdrop */}
    <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchColors={["#2b1e48", "#7b2cbf", "#FF007F", "#2AA9FF"]}
          glitchSpeed={110}
          smooth
          outerVignette
          centerVignette={false}
      opacity={0.1}
          className="bg-[#0D0D0D]"
        />
      </div>

    <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Featured <span className="text-[#FF007F]">Projects</span>
          </h2>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            Explore my latest work showcasing innovative solutions and technical
            expertise
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? "bg-[#A020F0] text-[#F5F5F5]" : "bg-[#1A1A1A] text-[#C0C0C0] hover:bg-[#1A1A1A]/80 hover:border hover:border-[#FF007F]"}`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
  <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item} className="h-[450px]">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}