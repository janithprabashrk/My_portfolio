import React, { useRef, useEffect } from "react";

type LetterGlitchProps = {
  glitchColors?: string[];
  glitchSpeed?: number; // ms between updates
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  opacity?: number; // overall alpha for letters
  className?: string; // allow parent to control positioning/bg
};

type Letter = {
  char: string;
  color: string; // current color (can be hex or rgb during interpolation)
  targetColor: string; // hex target
  colorProgress: number; // 0..1
};

// Theme-leaning defaults: purple/magenta/cyan to match site accents
const DEFAULT_COLORS = ["#3b1a6d", "#A020F0", "#FF007F", "#2AA9FF"];

const LetterGlitch: React.FC<LetterGlitchProps> = ({
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 80,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  opacity = 0.12,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lettersRef = useRef<Letter[]>([]);
  const gridRef = useRef<{ columns: number; rows: number }>({ columns: 0, rows: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTimeRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true); // visibility/active flag
  const reducedMotionRef = useRef<boolean>(false);

  // Slightly larger character cell to reduce letter count (perf)
  const fontSize = 16;
  const charWidth = 12; // was 10
  const charHeight = 22; // was 20

  const lettersAndSymbols = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "!","@","#","$","&","*","(",")","-","_","+","=","/",
    "[","]","{","}",";",":","<",">",",","0","1","2","3",
    "4","5","6","7","8","9",
  ];

  const getRandomChar = () =>
    lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];

  const getRandomColor = () =>
    glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const full = hex.replace(shorthandRegex, (_m, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    gridRef.current = { columns, rows };
    const total = columns * rows;
    lettersRef.current = Array.from({ length: total }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    // Clamp device pixel ratio for performance (background effect)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const rect = wrapper.getBoundingClientRect();

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d");
    }
    if (ctxRef.current) {
      ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || lettersRef.current.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";
    ctx.globalAlpha = opacity; // subtle backdrop

    const cols = gridRef.current.columns || 1;
    lettersRef.current.forEach((letter, index) => {
      const x = (index % cols) * charWidth;
      const y = Math.floor(index / cols) * charHeight;
      ctx.fillStyle = letter.color as string;
      ctx.fillText(letter.char, x, y);
    });

    ctx.globalAlpha = 1; // reset for safety
  };

  const updateLetters = () => {
    const arr = lettersRef.current;
    if (!arr || arr.length === 0) return;

    // Update ~3% per tick (lighter)
    const updateCount = Math.max(1, Math.floor(arr.length * 0.03));
    for (let i = 0; i < updateCount; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      const l = arr[idx];
      if (!l) continue;
      l.char = getRandomChar();
      l.targetColor = getRandomColor();
      if (!smooth || reducedMotionRef.current) {
        l.color = l.targetColor;
        l.colorProgress = 1;
      } else {
        l.colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    const arr = lettersRef.current;
    const ctx = ctxRef.current;
    if (!arr || arr.length === 0 || !ctx) return;

    let needsRedraw = false;
    for (const l of arr) {
      if (l.colorProgress < 1) {
        l.colorProgress += 0.05;
        if (l.colorProgress > 1) l.colorProgress = 1;
        const sRgb = hexToRgb(typeof l.color === "string" && l.color.startsWith("#") ? l.color : l.targetColor);
        const eRgb = hexToRgb(l.targetColor);
        if (sRgb && eRgb) {
          l.color = interpolateColor(sRgb, eRgb, l.colorProgress);
          needsRedraw = true;
        }
      }
    }
    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    if (!isActiveRef.current) return; // paused
    const now = Date.now();
    if (now - lastGlitchTimeRef.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTimeRef.current = now;
    }
    if (smooth && !reducedMotionRef.current) handleSmoothTransitions();
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setRM = () => (reducedMotionRef.current = mq.matches);
    setRM();
    mq.addEventListener?.("change", setRM);

    resizeCanvas();

    // Visibility pause
    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      isActiveRef.current = visible && isActiveRef.current; // keep IO state
      if (!visible && rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (visible && isActiveRef.current && rafRef.current == null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Resize (debounced)
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        resizeCanvas();
        if (isActiveRef.current) rafRef.current = requestAnimationFrame(animate);
      }, 120);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause offscreen
    let io: IntersectionObserver | null = null;
    if (wrapperRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.1;
          if (inView) {
            if (!isActiveRef.current) {
              isActiveRef.current = true;
              if (rafRef.current == null) rafRef.current = requestAnimationFrame(animate);
            }
          } else {
            isActiveRef.current = false;
            if (rafRef.current != null) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
          }
        },
        { threshold: [0, 0.1, 0.5, 1] }
      );
      io.observe(wrapperRef.current);
    }

    // Start animation if active and not reduced motion
    if (!reducedMotionRef.current) {
      isActiveRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Show static frame
      drawLetters();
    }

    return () => {
      mq.removeEventListener?.("change", setRM);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", handleResize);
      if (io && wrapperRef.current) io.unobserve(wrapperRef.current);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // We intentionally include color/speed/smooth so it re-inits when those change
  }, [glitchColors, glitchSpeed, smooth]);

  return (
    <div
      ref={wrapperRef}
      className={
        "relative w-full h-full overflow-hidden pointer-events-none " +
        (className || "")
      }
      aria-hidden
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.9)_100%)]" />
      )}
      {centerVignette && (
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0)_60%)]" />
      )}
    </div>
  );
};

export default LetterGlitch;
