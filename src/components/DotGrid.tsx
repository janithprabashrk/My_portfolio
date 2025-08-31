import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";

// Try to register InertiaPlugin if available (optional)
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { InertiaPlugin } = require("gsap/InertiaPlugin");
  if (InertiaPlugin) gsap.registerPlugin(InertiaPlugin);
  // eslint-disable-next-line no-empty
} catch {}

type Dot = {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied?: boolean;
};

type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  opacity?: number; // overall alpha for draw
  className?: string;
};

function throttle<T extends (...args: any[]) => void>(func: T, limit: number) {
  let lastCall = 0;
  return function throttled(this: any, ...args: Parameters<T>) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  } as T;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 14,
  gap = 30,
  baseColor = "#2b1e48",
  activeColor = "#A020F0",
  proximity = 140,
  speedTrigger = 120,
  shockRadius = 220,
  shockStrength = 4.5,
  maxSpeed = 4000,
  resistance = 700,
  returnDuration = 1.4,
  opacity = 0.1,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const activeRef = useRef<boolean>(true);
  const inViewRef = useRef<boolean>(true);
  const reducedRef = useRef<boolean>(false);

  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !(window as any).Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const extraX = width - gridW;
    const extraY = height - gridH;
    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const proxSq = proximity * proximity;

    const draw = () => {
      if (!activeRef.current || !inViewRef.current) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = opacity;
      const { x: px, y: py } = pointerRef.current;
      const cols = dotsRef.current.length;
      if (cols === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath as Path2D);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, opacity]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => buildGrid());
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    }
    // Always attach window resize as a fallback and for environments where IO stops
    window.addEventListener("resize", buildGrid as any);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", buildGrid as any);
    };
  }, [buildGrid]);

  useEffect(() => {
    const hasInertia = !!(gsap as any).plugins?.InertiaPlugin;

    const onMove = (e: MouseEvent) => {
      if (!inViewRef.current || !canvasRef.current) return;
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      if (reducedRef.current) return; // skip heavy dot response

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          if (hasInertia) {
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            } as any);
          } else {
            gsap.to(dot, {
              xOffset: pushX,
              yOffset: pushY,
              duration: 0.25,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            });
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!inViewRef.current || !canvasRef.current || reducedRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          if (hasInertia) {
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            } as any);
          } else {
            gsap.to(dot, {
              xOffset: pushX,
              yOffset: pushY,
              duration: 0.25,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            });
          }
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener("mousemove", throttledMove as any, { passive: true } as any);
    window.addEventListener("click", onClick as any);

    return () => {
      window.removeEventListener("mousemove", throttledMove as any);
      window.removeEventListener("click", onClick as any);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  useEffect(() => {
    // Reduced motion + visibility + intersection
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onRM = () => (reducedRef.current = mq.matches);
    onRM();
    mq.addEventListener?.("change", onRM);

    const onVis = () => {
      activeRef.current = !document.hidden && !reducedRef.current;
    };
    document.addEventListener("visibilitychange", onVis);

    let io: IntersectionObserver | null = null;
    if (wrapperRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          inViewRef.current = entries[0]?.isIntersecting ?? true;
        },
        { threshold: [0, 0.1, 0.5, 1] }
      );
      io.observe(wrapperRef.current);
    }

    return () => {
      mq.removeEventListener?.("change", onRM);
      document.removeEventListener("visibilitychange", onVis);
      if (io && wrapperRef.current) io.unobserve(wrapperRef.current);
    };
  }, []);

  return (
  <section
      className={[
        "p-0 m-0 h-full w-full relative select-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <div ref={wrapperRef} className="w-full h-full relative pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </section>
  );
};

export default DotGrid;
