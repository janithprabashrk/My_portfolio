import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  {
    name: "Spring Boot",
    level: 90,
    color: "#6DB33F",
    category: "Backend",
    icon: "🍃",
  },
  {
    name: "MySQL",
    level: 85,
    color: "#4479A1",
    category: "Backend",
    icon: "🛢️",
  },
  {
    name: "Spring Framework",
    level: 80,
    color: "#6DB33F",
    category: "Backend",
    icon: "🌱",
  },
  {
    name: "JavaScript",
    level: 75,
    color: "#F7DF1E",
    category: "Frontend",
    icon: "📜",
  },
  {
    name: "Python",
    level: 70,
    color: "#3776AB",
    category: "Programming",
    icon: "🐍",
  },
  {
    name: "Java",
    level: 85,
    color: "#007396",
    category: "Programming",
    icon: "☕",
  },
  {
    name: "Machine Learning",
    level: 60,
    color: "#9D4EDD",
    category: "Data Science",
    icon: "🤖",
  },
  {
    name: "Web Development",
    level: 80,
    color: "#5A189A",
    category: "Frontend",
    icon: "🌐",
  },
  {
    name: "Software Engineering",
    level: 75,
    color: "#7B2CBF",
    category: "Development",
    icon: "⚙️",
  },
  {
    name: "Data Science",
    level: 65,
    color: "#C77DFF",
    category: "Data Science",
    icon: "📊",
  },
  {
    name: "Network Analysis",
    level: 60,
    color: "#E0AAFF",
    category: "Networking",
    icon: "🔌",
  },
  {
    name: "Functional Programming",
    level: 70,
    color: "#3C096C",
    category: "Programming",
    icon: "λ",
  },
];

const categories = ["All", "Frontend", "Backend", "DevOps", "3D"];

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const controls = useAnimation();

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    controls.start("visible");
  }, [activeCategory, controls]);

  return (
    <section id="skills" className="py-20 bg-[#0D0D0D]/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Technical <span className="text-[#FF007F]">Skills</span>
          </h2>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            My expertise spans across various technologies and frameworks
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? "bg-[#A020F0] text-[#F5F5F5]" : "bg-[#1A1A1A] text-[#C0C0C0] hover:bg-[#1A1A1A]/80 hover:border hover:border-[#00FFFF]"}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className={`bg-[#1A1A1A] rounded-lg p-6 border border-[#1A1A1A] transition-all ${hoveredSkill === skill.name ? "shadow-lg shadow-[#FF007F]/30 scale-105 border-[#A020F0]" : ""}`}
            >
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-[#F5F5F5]">
                  {skill.name}
                </h3>
              </div>

              <div className="w-full bg-[#1A1A1A] rounded-full h-2.5 mb-2">
                <motion.div
                  className="h-2.5 rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#C0C0C0]">{skill.category}</span>
                <span className="text-[#F5F5F5] font-medium">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Floating Spheres Visualization (Alternative) */}
        <motion.div
          className="mt-16 h-64 relative overflow-hidden rounded-xl bg-[#1A1A1A]/50 border border-[#1A1A1A] hidden lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={`sphere-${skill.name}`}
              className="absolute flex items-center justify-center rounded-full text-white font-medium"
              style={{
                backgroundColor: `${skill.color}20`,
                border: `2px solid ${skill.color}`,
                width: `${skill.level * 0.8}px`,
                height: `${skill.level * 0.8}px`,
              }}
              initial={{
                x: Math.random() * 800,
                y: Math.random() * 200,
                scale: 0,
              }}
              animate={{
                x: [Math.random() * 800, Math.random() * 800],
                y: [Math.random() * 200, Math.random() * 200],
                scale: 1,
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 20 + Math.random() * 10,
                  },
                  y: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 15 + Math.random() * 10,
                  },
                  scale: { duration: 1 },
                },
              }}
              whileHover={{ scale: 1.2 }}
            >
              <div className="text-xs md:text-sm">
                {skill.icon} {skill.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
