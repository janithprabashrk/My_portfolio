import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styled from "styled-components";
import SplashCursor from "./SplashCursor";
import Hyperspeed, { hyperspeedPresets } from "./Hyperspeed";

// Particles background removed in favor of SplashCursor effect

const HeroSectionContainer = styled.section`
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Make this transparent so the particles background shows */
  background-color: transparent;
  color: white;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden; /* prevent any inner overscan from creating visual gaps */
`;

declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true } as any);
    return () => window.removeEventListener("scroll", handleScroll as any);
  }, []);

  // Removed particles.js script setup

  const parallaxValue = scrollY * 0.3;

  return (
    <HeroSectionContainer id="hero">
  {/* Hero background effect (Hyperspeed) */}
  <div className="absolute inset-0 z-0">
    <Hyperspeed effectOptions={hyperspeedPresets.one} />
  </div>
  {/* Fluid cursor effect overlay (above backgrounds, below main content) */}
  {/* Fluid cursor effect overlay (above backgrounds, below main content) */}
  <SplashCursor />

      {/* Larger image, near top-right corner */}
      <motion.div
        className="absolute top-8 right-8 md:top-16 md:right-16 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      >
        <motion.div
          className="relative overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <img
            src="/My_img.png"
            alt="Janith Prabash"
            className="w-64 md:w-80 lg:w-[32rem] h-auto object-cover object-top"
          />
          <div className="absolute bottom-0 w-full h-16 md:h-20 lg:h-28 bg-gradient-to-t from-[#111] to-transparent" />
        </motion.div>
      </motion.div>

  {/* Background 3D Canvas removed for performance (ParticleBackground provides background) */}

      {/* Text & Main Content */}
  <div className="container mx-auto px-4 z-10 text-center pt-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transform: `translateY(${-parallaxValue}px)` }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#F5F5F5]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] to-[#A020F0]">
              Janith Prabash
            </span>{" "}
            R.K.
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-2xl mx-auto">
            Computer Science Student at University of Colombo School of Computing
          </p>
          <p className="text-lg text-[#C0C0C0] mb-8 max-w-2xl mx-auto">
            Passionate about technology, innovation, and problem-solving
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block bg-gradient-to-r from-[#FF007F] to-[#A020F0] 
                         text-[#F5F5F5] font-medium py-3 px-8 rounded-full shadow-lg
                         shadow-[#FF007F]/30 hover:shadow-[#A020F0]/50 transition-all
                         border border-transparent hover:border-[#A020F0] hover:scale-105"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={32} className="text-[#FF007F]" />
      </motion.div>
    </HeroSectionContainer>
  );
}