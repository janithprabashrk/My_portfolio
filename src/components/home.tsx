import { useState } from "react";
import HeroSection from "./HeroSection";
import Navigation from "./Navigation";
import ProjectsShowcase from "./ProjectsShowcase";
import SkillsVisualization from "./SkillsVisualization";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import RobotAssistant from "./RobotAssistant";
import ParticleBackground from "./ParticleBackground";

function Home() {
  const [currentSection, setCurrentSection] = useState("hero");

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Background Effects */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ProjectsShowcase />
        <SkillsVisualization />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Robot Assistant */}
      <RobotAssistant section={currentSection} />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-400">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Janith Prabash R.K. All rights
            reserved.
          </p>
          <p className="text-sm mt-2">
            Computer Science Student at University of Colombo School of
            Computing
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
