import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

const projects: Project[] = [
  {
    id: 1,
    title: "DJK's AutoHub - Automotive Marketplace",
    description:
      "A full-stack MERN luxury automotive marketplace connecting buyers and sellers of high-end vehicles with an intuitive, modern interface and smooth animations.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
    ],
    demoUrl: "https://github.com/janithprabashrk/DJKs-AutoHub",
    githubUrl: "https://github.com/janithprabashrk/DJKs-AutoHub",
  },
  {
    id: 2,
    title: "TechHub by DJK",
    description:
      "A robust backend system for an Online Tech Store, built using Spring Boot. Provides powerful infrastructure to manage tech products, user roles, and secure transactions.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    technologies: [
      "Spring Boot 3",
      "MySQL",
      "JWT",
      "Spring Security",
      "Stripe Payment",
    ],
    demoUrl: "https://github.com/janithprabashrk/TechHub-By-DJK",
    githubUrl: "https://github.com/janithprabashrk/TechHub-By-DJK",
  },
  {
    id: 3,
    title: "Smart Parking Alert System",
    description:
      "An intelligent IoT parking alert system that enhances safety while minimizing energy waste. Uses ESP32, ultrasonic sensor, LDR, and buzzer to adapt to ambient light conditions for optimized efficiency and automation.",
    image:
      "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?w=800&q=80",
    technologies: [
      "IoT",
      "ESP32",
      "Embedded Systems",
      "Automation",
      "Energy Efficiency",
    ],
    demoUrl:
      "https://www.linkedin.com/posts/janithrk_iot-smartparking-embeddedsystems-activity-7297566226862485504-tFxJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUqTvYBn-_zf-crSnOigEX9waZpU75xJ7c",
    githubUrl:
      "https://www.linkedin.com/posts/janithrk_iot-smartparking-embeddedsystems-activity-7297566226862485504-tFxJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUqTvYBn-_zf-crSnOigEX9waZpU75xJ7c",
  },
  {
    id: 4,
    title: "mzQC Dashboard",
    description:
      "A Streamlit-based web application designed to visualize and analyze mass spectrometry quality control metrics from mzQC files. Provides an interactive interface to explore quality metrics, metadata, and run summaries.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: [
      "Python",
      "Streamlit",
      "Data Visualization",
      "Bioinformatics",
      "Mass Spectrometry",
    ],
    demoUrl:
      "https://mzqc-dashboard-by-janith-prabash-3ddebeaawhqfz88w8qgxan.streamlit.app/",
    githubUrl: "https://github.com/janithprabashrk/mzqc-dashboard",
  },
];

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
  const filters = ["All", "React", "Python", "Node.js", "IoT"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) =>
          project.technologies.includes(activeFilter),
        );

  return (
    <section id="projects" className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
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
