import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ChevronDown } from "lucide-react";

function ProfileImage() {
  return (
    <mesh position={[0, 0, 0]} scale={[2.5, 2.5, 0.1]}>
      <planeGeometry args={[1, 1.5]} />
      <meshBasicMaterial transparent>
        <texture attach="map" url="https://i.imgur.com/Yx5QIT7.png" />
      </meshBasicMaterial>
    </mesh>
  );
}

function AnimatedProfileImage() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.01);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto mb-8">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF007F] to-[#A020F0] opacity-70"
        animate={{
          scale: [1, 1.05, 1],
          rotate: rotation * 10,
        }}
        transition={{
          scale: {
            repeat: Infinity,
            duration: 3,
          },
          rotate: {
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          },
        }}
      />
      <motion.div
        className="absolute inset-2 rounded-full overflow-hidden border-4 border-[#0D0D0D] z-10"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          delay: 0.5,
        }}
      >
        <img
          src="https://i.imgur.com/Yx5QIT7.png"
          alt="Janith Prabash"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function CornerImage() {
  return (
    <motion.div
      className="absolute bottom-10 right-10 w-48 h-auto z-20"
      initial={{ opacity: 0, y: 20, rotate: -5 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        rotate: [-5, 5, -5],
        scale: [1, 1.05, 1],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        },
        scale: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF007F] to-[#A020F0] rounded-lg blur-md opacity-70 animate-pulse"></div>
        <img
          src="https://i.ibb.co/Jj9VVLB/janith-bg-removed.png"
          alt="Janith Prabash"
          className="relative rounded-lg w-full h-auto"
        />
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxValue = scrollY * 0.3;

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* 3D Background Canvas - Keeping existing animation */}
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

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transform: `translateY(${-parallaxValue}px)` }}
        >
          {/* New Animated Profile Image */}
          <AnimatedProfileImage />

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#F5F5F5]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] to-[#A020F0]">
              Janith Prabash
            </span>{" "}
            R.K.
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-2xl mx-auto">
            Computer Science Student at University of Colombo School of
            Computing
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
              className="inline-block bg-gradient-to-r from-[#FF007F] to-[#A020F0] text-[#F5F5F5] font-medium py-3 px-8 rounded-full shadow-lg shadow-[#FF007F]/30 hover:shadow-[#A020F0]/50 transition-all border border-transparent hover:border-[#A020F0] hover:scale-105"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Image */}
      <CornerImage />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={32} className="text-[#FF007F]" />
      </motion.div>
    </section>
  );
}
