import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ChevronDown } from "lucide-react";
import styled from "styled-components";

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #111;
`;

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
  padding-top: 60px;
  position: relative;
`;

declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;

    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: { enable: true, value_area: 800 },
          },
          color: {
            value: ["#FFFFFF", "#A020F0"],
          },
          shape: {
            type: "circle", 
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.2,
              sync: false,
            },
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: false,
              speed: 30,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 120,
            color: "#A020F0",
            opacity: 0.6,
            width: 2,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 150, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const parallaxValue = scrollY * 0.3;

  return (
    <HeroSectionContainer id="hero">
      <ParticlesContainer id="particles-js" />

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
            src="/public/My_img.png"
            alt="Janith Prabash"
            className="w-64 md:w-80 lg:w-[32rem] h-auto object-cover object-top"
          />
          <div className="absolute bottom-0 w-full h-16 md:h-20 lg:h-28 bg-gradient-to-t from-[#111] to-transparent" />
        </motion.div>
      </motion.div>

      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Text & Main Content */}
      <div className="container mx-auto px-4 z-10 text-center">
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