import { useState } from "react";
import HeroSection from "./HeroSection";
import Navigation from "./Navigation";
import ProjectsShowcase from "./ProjectsShowcase";
import SkillsVisualization from "./SkillsVisualization";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import { certificates } from "../data/certificates";
import CertificateCard from "./CertificateCard";
import { Link } from "react-router-dom";
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
        {/* Certificates teaser */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Certificates</h2>
                <p className="text-slate-400 text-sm mt-1">
                  A few highlights. Explore the full list.
                </p>
              </div>
              <Link
                to="/certificates"
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#FF007F] text-[#FF77AA] px-3 py-1.5 text-sm hover:bg-[#FF007F]/10 transition"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.slice(0, 3).map((c) => (
                <CertificateCard key={c.id} cert={c} />
              ))}
            </div>
          </div>
        </section>
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
