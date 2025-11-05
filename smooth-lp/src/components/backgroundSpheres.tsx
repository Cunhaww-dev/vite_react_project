// src/components/ui/motion/backgroundSpheres.tsx
"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMemo } from "react";
import type { RefObject } from "react";

type Props = {
  targetRef: RefObject<HTMLElement | null>;
  count?: number;
  seed?: number;
  src?: string;
  minSize?: number;
  maxSize?: number;
};

type Sphere = {
  id: number;
  leftPct: number; // 0..100
  topPct: number; // 0..100
  size: number;
  depth: number; // 0.3..1.2
  baseOpacity: number;
};

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BackgroundSpheres({
  targetRef,
  count = 2,
  seed = 42,
  src = "/sphere4.svg",
  minSize = 80,
  maxSize = 420,
}: Props) {
  const rand = useMemo(() => mulberry32(seed), [seed]);

  const spheres: Sphere[] = useMemo(() => {
    const arr: Sphere[] = [];
    for (let i = 0; i < count; i++) {
      const leftPct = rand() * 100;
      const topPct = rand() * 100;
      const size = Math.floor(minSize + rand() * (maxSize - minSize));
      const depth = 0.3 + rand() * 0.9;
      const baseOpacity = 0.35 + rand() * 0.5;
      arr.push({ id: i, leftPct, topPct, size, depth, baseOpacity });
    }
    return arr;
  }, [count, minSize, maxSize, rand]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // 🔧 1 spring global suavizando todo o progresso
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.22,
  });

  return (
    <div
      className="
        fixed left-0 top-0 w-screen h-svh z-999
        pointer-events-none isolate overflow-hidden
        contain-[paint]
        md:mask-[radial-gradient(120%_90%_at_50%_50%,black_65%,transparent_100%)]
        "
      aria-hidden
    >
      {spheres.map((s, idx) => {
        // deslocamento vertical por profundidade
        const travel = 180 + s.depth * 420;
        const start = s.depth * 50;
        const end = start - travel;

        // derive tudo a partir do "progress"
        const y = useTransform(
          progress,
          [0.2, 0.8, 1],
          [start, end * 0.9, end]
        );
        const xBase = (s.depth - 0.6) * 40; // sutil
        const x = useTransform(progress, [0, 1], [0, xBase]);
        const opacity = useTransform(
          progress,
          [0, 0.05, 0.95, 1],
          [0, s.baseOpacity, s.baseOpacity, 0]
        );

        // “quebrar a borda” SEM layout shift (translate)
        const outFactor = idx % 3 === 0 ? -0.25 : idx % 3 === 1 ? 0.25 : 0;
        const baseTranslateX = `calc(${outFactor * 100}% )`;

        // (opcional) menos sombra = mais desempenho
        const shadowClass = ""; // ex.: idx % 4 === 0 ? "drop-shadow-[0_0_18px_rgba(168,85,247,0.10)]" : ""

        return (
          <motion.div
            key={s.id}
            className="absolute will-change-transform transform-gpu"
            style={{
              top: `${s.topPct}%`,
              left: `${s.leftPct}%`,
              y,
              x,
              opacity,
            }}
          >
            <img
              src={src}
              width={s.size}
              height={s.size}
              alt=""
              decoding="async"
              loading="lazy"
              className={`select-none -translate-x-1/2 -translate-y-1/2 ${shadowClass}`}
              style={{
                transform: `translate(-50%, -50%) translateX(${baseTranslateX})`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
