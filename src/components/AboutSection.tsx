import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Award } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineItems: TimelineItem[] = [
  {
    year: "Nov 2025 - Present",
    title: "Software Engineering Intern at WSO2",
    description:
      "Working on-site at WSO2 in Colombo, contributing to enterprise software solutions and gaining industry experience in software engineering.",
    icon: <Briefcase size={20} />,
  },
  {
    year: "2024 - Present",
    title: "Design Master of UCSC CS Chapter",
    description:
      "Leading design initiatives and creative projects for the Computer Science Chapter.",
    icon: <Briefcase size={20} />,
  },
  {
    year: "2022 - Present",
    title: "Freelance Software Engineer",
    description: "Developing custom software solutions for various clients.",
    icon: <Briefcase size={20} />,
  },
  {
    year: "2022 - 2023",
    title: "Design Team Member of IEEE CS Chapter of UCSC",
    description:
      "Created visual assets and UI designs for IEEE Computer Society events and platforms.",
    icon: <Briefcase size={20} />,
  },
  {
    year: "2017 - 2020",
    title: "School Web Team Member",
    description:
      "Contributed to the development and maintenance of school websites and online platforms.",
    icon: <Briefcase size={20} />,
  },
  {
    year: "May 2023 - 2027",
    title: "B.Sc. Computer Science",
    description:
      "University of Colombo School of Computing. Member of IEEE CS Chapter UCSC and Design Master of IEEE CS Chapter of UCSC.",
    icon: <Award size={20} />,
  },
  {
    year: "Feb 2011 - Mar 2022",
    title: "Rahula College",
    description: "Member of science society.",
    icon: <Award size={20} />,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            About <span className="text-[#FF007F]">Me</span>
          </h2>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            My journey in web development and the experiences that shaped my
            career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#1A1A1A] rounded-xl p-6 border border-[#1A1A1A] shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-[#F5F5F5] mb-4">
              My Story
            </h3>
            <p className="text-[#C0C0C0] mb-4">
              As a Computer Science student at the University of Colombo School
              of Computing, I'm passionate about technology, innovation, and
              problem-solving. With hands-on experience in web development,
              software engineering, data science, network analysis, and
              functional programming, I'm eager to apply my skills to impactful
              projects.
            </p>
            <p className="text-[#C0C0C0] mb-4">
              I'm also keen on pursuing DevOps engineering in the future. My
              journey in tech began during my school years where I developed a
              fascination for creating digital solutions that make a difference.
            </p>
            <p className="text-[#C0C0C0]">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge
              through technical articles and mentoring.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar size={20} className="text-[#00FFFF] mr-2" />
                <span className="text-[#C0C0C0]">Education: 2023-2027</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="text-[#00FFFF] mr-2" />
                <span className="text-[#C0C0C0]">
                  Matara District, Sri Lanka
                </span>
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-semibold text-[#F5F5F5] mb-6">
              Experience Timeline
            </h3>

            <div className="relative border-l-2 border-[#FF007F]/50 pl-6 ml-3">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-8 relative"
                >
                  <div className="absolute -left-9 flex items-center justify-center w-6 h-6 rounded-full bg-[#A020F0] text-[#F5F5F5]">
                    {item.icon}
                  </div>
                  <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#1A1A1A]">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-medium text-[#F5F5F5]">
                        {item.title}
                      </h4>
                      <span className="text-sm font-semibold px-2 py-1 rounded bg-[#1A1A1A] text-[#00FFFF]">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-[#C0C0C0] text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
