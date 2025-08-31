import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface RobotAssistantProps {
  section?: string;
}

const sectionMessages = {
  hero: "Welcome to my portfolio! I'm a passionate developer specializing in modern web technologies.",
  projects:
    "Here are some of my recent projects. Click on any card to learn more about them!",
  skills:
    "These are the technologies I work with. My expertise ranges from frontend to backend development.",
  about:
    "Want to know more about me? I'm a developer with a passion for creating innovative solutions.",
  contact:
    "Let's connect! Feel free to reach out through any of these channels.",
};

export default function RobotAssistant({
  section = "hero",
}: RobotAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(sectionMessages.hero);
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useEffect(() => {
    if (section in sectionMessages) {
      setMessage(sectionMessages[section as keyof typeof sectionMessages]);
      if (!isOpen && !prefersReducedMotion) {
        const t = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(t);
      }
    }
  }, [section, isOpen, prefersReducedMotion]);

  useEffect(() => {
    if (isOpen && !prefersReducedMotion) {
      const timer = setTimeout(() => setIsOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, prefersReducedMotion]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsAnimating(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
  <AnimatePresence>
        {isOpen && (
          <motion.div
    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
    transition={{ type: "spring", damping: 24, stiffness: 260 }}
    className="mb-4 p-4 bg-slate-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/20 max-w-xs pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="text-cyan-400 font-semibold">Robot Assistant</div>
              <button
                aria-label="Close assistant"
                title="Close"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-white text-sm">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
    className="bg-slate-800 hover:bg-slate-700 text-cyan-400 p-3 rounded-full shadow-lg shadow-cyan-500/20 border border-cyan-500/30 pointer-events-auto"
    whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
    whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
    animate={prefersReducedMotion ? undefined : isAnimating ? { rotate: [0, 12, -12, 0] } : {}}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}
