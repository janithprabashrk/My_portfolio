import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
  icon: string;
}

// Predefined classes for sphere colors (avoid inline styles)
const sphereClassMap: Record<string, { bg: string; border: string }> = {
  "Spring Boot": { bg: "bg-[#6DB33F]/10", border: "border-[#6DB33F]" },
  MySQL: { bg: "bg-[#4479A1]/10", border: "border-[#4479A1]" },
  "Spring Framework": { bg: "bg-[#6DB33F]/10", border: "border-[#6DB33F]" },
  JavaScript: { bg: "bg-[#F7DF1E]/10", border: "border-[#F7DF1E]" },
  Python: { bg: "bg-[#3776AB]/10", border: "border-[#3776AB]" },
  Java: { bg: "bg-[#007396]/10", border: "border-[#007396]" },
  "Machine Learning": { bg: "bg-[#9D4EDD]/10", border: "border-[#9D4EDD]" },
  "Web Development": { bg: "bg-[#5A189A]/10", border: "border-[#5A189A]" },
  "Software Engineering": { bg: "bg-[#7B2CBF]/10", border: "border-[#7B2CBF]" },
  "Data Science": { bg: "bg-[#C77DFF]/10", border: "border-[#C77DFF]" },
  "Network Analysis": { bg: "bg-[#E0AAFF]/10", border: "border-[#E0AAFF]" },
  "Functional Programming": { bg: "bg-[#3C096C]/10", border: "border-[#3C096C]" },
};

const sphereSizeClass = (level: number) => {
  if (level >= 90) return "w-44 h-44"; // 176px
  if (level >= 85) return "w-40 h-40";
  if (level >= 80) return "w-36 h-36";
  if (level >= 75) return "w-32 h-32";
  if (level >= 70) return "w-28 h-28";
  if (level >= 65) return "w-24 h-24";
  return "w-20 h-20"; // 80px
};

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
        {/* Skills Visualization with glow particles and spotlight */}
        <MagicBento
          items={filteredSkills}
          glowColor="132, 0, 255"
          particleCount={12}
          enableTilt={true}
          clickEffect={true}
          enableMagnetism={true}
          enableSpotlight={true}
        />

        {/* 3D Floating Spheres Visualization (Alternative) */}
        <motion.div
          className="mt-16 h-64 relative overflow-hidden rounded-xl bg-[#1A1A1A]/50 border border-[#1A1A1A] hidden lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill) => {
            const colorClasses = sphereClassMap[skill.name] || { bg: "bg-white/10", border: "border-white/30" };
            const size = sphereSizeClass(skill.level);
            return (
              <motion.div
                key={`sphere-${skill.name}`}
                className={`absolute flex items-center justify-center rounded-full text-white font-medium border-2 ${colorClasses.bg} ${colorClasses.border} ${size}`}
                initial={{ x: Math.random() * 800, y: Math.random() * 200, scale: 0 }}
                animate={{
                  x: [Math.random() * 800, Math.random() * 800],
                  y: [Math.random() * 200, Math.random() * 200],
                  scale: 1,
                  transition: {
                    x: { repeat: Infinity, repeatType: "reverse", duration: 20 + Math.random() * 10 },
                    y: { repeat: Infinity, repeatType: "reverse", duration: 15 + Math.random() * 10 },
                    scale: { duration: 1 },
                  },
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="text-xs md:text-sm">
                  {skill.icon} {skill.name}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ===== Enhanced glow/spotlight bento grid (integrated) =====

type ParticleCardProps = {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  particleCount?: number;
  glowColor?: string; // "r,g,b"
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x: number, y: number, color: string = "132, 0, 255") => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 1;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = "132, 0, 255",
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    magnetismAnimationRef.current = null;
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "back.in(1.7)",
        onComplete: () => particle.parentNode?.removeChild(particle),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current!.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" }
        );
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, { opacity: 0.3, duration: 1.3, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, index * 90);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.25, ease: "power2.out", transformPerspective: 1000 });
      }
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.25, ease: "power2.out" });
      if (enableMagnetism) gsap.to(element, { x: 0, y: 0, duration: 0.25, ease: "power2.out" });
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.25, ease: "power2.out" });
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute; width: ${maxDistance * 2}px; height: ${maxDistance * 2}px; border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px; top: ${y - maxDistance}px; pointer-events: none; z-index: 2;`;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() }
      );
    };
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);
    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`}>
      {children}
    </div>
  );
};

const calculateSpotlightValues = (radius: number) => ({ proximity: radius * 0.5, fadeDistance: radius * 0.75 });

type GlobalSpotlightProps = {
  gridRef: React.RefObject<HTMLDivElement>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string; // "r,g,b"
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = "132, 0, 255" }: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastEventRef = useRef<MouseEvent | PointerEvent | null>(null);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  useEffect(() => {
    if (disableAnimations || prefersReducedMotion || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `position: fixed; width: 800px; height: 800px; border-radius: 50%; pointer-events: none; z-index: 1; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; background: radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, rgba(${glowColor}, 0.01) 65%, transparent 70%);`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;
    const sectionEl = gridRef.current.closest(".bento-section") as HTMLElement | null;
    if (!sectionEl) return;

    const cardsNodeList = () => gridRef.current?.querySelectorAll(".card") || [];
    const run = () => {
      const e = lastEventRef.current as PointerEvent | MouseEvent | null;
      if (!e || !spotlightRef.current || !gridRef.current) return;
      const rect = sectionEl.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = cardsNodeList();
      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
        cards.forEach((card) => (card as HTMLElement).style.setProperty("--glow-intensity", "0"));
        rafRef.current = null;
        return;
      }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach((cardEl) => {
        const card = cardEl as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);
        const glowIntensity = effectiveDistance <= proximity ? 1 : effectiveDistance <= fadeDistance ? (fadeDistance - effectiveDistance) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
      spotlightRef.current.style.left = `${(e as MouseEvent).clientX}px`;
      spotlightRef.current.style.top = `${(e as MouseEvent).clientY}px`;
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      spotlightRef.current.style.opacity = String(targetOpacity);
      rafRef.current = null;
    };
    const onPointerMove = (e: PointerEvent) => {
      lastEventRef.current = e;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(run);
    };
    const onPointerLeave = () => {
      lastEventRef.current = null;
      const cards = cardsNodeList();
      cards.forEach((card) => (card as HTMLElement).style.setProperty("--glow-intensity", "0"));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.2 });
    };
    sectionEl.addEventListener("pointermove", onPointerMove, { passive: true });
    sectionEl.addEventListener("pointerleave", onPointerLeave, { passive: true });
    return () => {
      sectionEl.removeEventListener("pointermove", onPointerMove as any);
      sectionEl.removeEventListener("pointerleave", onPointerLeave as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);
  return null;
};

const BentoCardGrid = ({ children, gridRef }: { children: React.ReactNode; gridRef: React.RefObject<HTMLDivElement> }) => (
  <div className="bento-section grid gap-2 p-3 max-w-[72rem] select-none relative mx-auto text-[clamp(1rem,_0.9rem+0.5vw,_1.5rem)]" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

type MagicBentoProps = {
  items: Skill[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string; // "r,g,b"
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

const MagicBento = ({
  items,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = 6,
  enableTilt = false,
  glowColor = "132, 0, 255",
  clickEffect = true,
  enableMagnetism = true,
}: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  // Low-end device heuristic
  const lowEnd = (navigator as any)?.hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4 || (navigator as any)?.deviceMemory && (navigator as any).deviceMemory <= 4;
  const shouldDisableAnimations = disableAnimations || isMobile || prefersReducedMotion || lowEnd;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const widthClassFor = (lvl: number) => {
    if (lvl >= 95) return "w-[95%]";
    if (lvl >= 90) return "w-[90%]";
    if (lvl >= 85) return "w-[85%]";
    if (lvl >= 80) return "w-[80%]";
    if (lvl >= 75) return "w-[75%]";
    if (lvl >= 70) return "w-[70%]";
    if (lvl >= 65) return "w-[65%]";
    if (lvl >= 60) return "w-[60%]";
    return "w-[50%]";
  };

  return (
    <>
      <style>{`
        .bento-section { --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0; --glow-radius: 200px; --glow-color: ${glowColor}; --border-color: #392e4e; --background-dark: #060010; --white: hsl(0,0%,100%); }
        .card-responsive { grid-template-columns: 1fr; width: 100%; margin: 0 auto; padding: 0.5rem; }
        @media (min-width: 640px){ .card-responsive { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px){ .card-responsive { grid-template-columns: repeat(3, 1fr); } }
        .card--border-glow::after { content: ''; position: absolute; inset: 0; padding: 6px; background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%, rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%, transparent 60%); border-radius: inherit; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: subtract; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; pointer-events: none; z-index: 1; }
        .card--border-glow:hover { box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2); }
        .particle::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: rgba(${glowColor}, 0.2); border-radius: 50%; z-index: -1; }
      `}</style>

  {enableSpotlight && !shouldDisableAnimations && (
        <GlobalSpotlight gridRef={gridRef as any} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={glowColor} />
      )}

      <BentoCardGrid gridRef={gridRef as any}>
        <div className="card-responsive grid gap-3">
          {items.map((skill) => {
            const baseClassName = `card flex flex-col justify-between relative min-h-[180px] w-full max-w-full p-5 rounded-[16px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${enableBorderGlow ? "card--border-glow" : ""} bg-[#0b0714] text-white border-[#392e4e]`;
            if (enableStars) {
              return (
                <ParticleCard key={skill.name} className={baseClassName} disableAnimations={shouldDisableAnimations} particleCount={particleCount} glowColor={glowColor} enableTilt={enableTilt} clickEffect={clickEffect} enableMagnetism={enableMagnetism}>
                  <div className="card__header flex items-center justify-between gap-3 relative text-white">
                    <span className="text-xl" aria-hidden>{skill.icon}</span>
                    <span className="text-sm opacity-80">{skill.category}</span>
                  </div>
                  <div className="card__content flex flex-col gap-3 relative text-white">
                    <h3 className={`font-semibold text-lg m-0 ${textAutoHide ? "text-clamp-1" : ""}`}>{skill.name}</h3>
                    <div className="w-full bg-[#1A1A1A] rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full bg-gradient-to-r from-[#8400ff] to-[#4b00ff] transition-[width] duration-700 ease-out ${mounted ? widthClassFor(skill.level) : "w-0"}`} />
                    </div>
                    <div className="flex justify-between text-sm"><span className="text-[#C0C0C0]">{skill.category}</span><span className="text-[#F5F5F5] font-medium">{skill.level}%</span></div>
                  </div>
                </ParticleCard>
              );
            }
            return (
              <div key={skill.name} className={baseClassName}>
                <div className="card__header flex items-center justify-between gap-3 relative text-white">
                  <span className="text-xl" aria-hidden>{skill.icon}</span>
                  <span className="text-sm opacity-80">{skill.category}</span>
                </div>
                <div className="card__content flex flex-col gap-3 relative text-white">
                  <h3 className={`font-semibold text-lg m-0 ${textAutoHide ? "text-clamp-1" : ""}`}>{skill.name}</h3>
                  <div className="w-full bg-[#1A1A1A] rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full bg-gradient-to-r from-[#8400ff] to-[#4b00ff] transition-[width] duration-700 ease-out ${mounted ? widthClassFor(skill.level) : "w-0"}`} />
                  </div>
                  <div className="flex justify-between text-sm"><span className="text-[#C0C0C0]">{skill.category}</span><span className="text-[#F5F5F5] font-medium">{skill.level}%</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

function updateCardGlowProperties(card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
}
