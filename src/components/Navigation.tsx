import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Code, User, Mail, Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

interface NavigationProps {
  onSectionChange?: (section: string) => void;
}

export default function Navigation({ onSectionChange }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", icon: <Home size={20} />, href: "#hero" },
    { name: "Projects", icon: <Briefcase size={20} />, href: "#projects" },
    { name: "Skills", icon: <Code size={20} />, href: "#skills" },
    { name: "About", icon: <User size={20} />, href: "#about" },
    { name: "Contact", icon: <Mail size={20} />, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "hero";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          currentSection = section.id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        onSectionChange?.(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, onSectionChange]);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    onSectionChange?.(section);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-[#1A1A1A]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#F5F5F5] font-bold text-xl"
        >
          <span className="text-[#00FFFF]">Janith</span>Portfolio
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href.substring(1));
                    document
                      .querySelector(item.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeSection === item.href.substring(1) ? "bg-[#1A1A1A] text-[#00FFFF]" : "text-[#C0C0C0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]/50"}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FFFF]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#F5F5F5] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#0D0D0D] border-t border-[#1A1A1A]"
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href.substring(1));
                    document
                      .querySelector(item.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeSection === item.href.substring(1) ? "bg-[#1A1A1A] text-[#00FFFF]" : "text-[#C0C0C0] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]/50"}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
