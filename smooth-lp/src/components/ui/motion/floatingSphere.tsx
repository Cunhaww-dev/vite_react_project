"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { RefObject } from "react";

type Props = { targetRef: RefObject<HTMLElement | null> };

export default function FloatingSphere({ targetRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [100, -550]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.25 });

  const opacityRaw = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );
  const opacity = useSpring(opacityRaw, { stiffness: 120, damping: 40 });

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed top-[10%] right-[-5%] z-999 pointer-events-none will-change-transform transform-gpu"
    >
      <img
        src="/sphere.svg"
        alt="Esfera roxa decorativa"
        width={200}
        height={200}
        className="opacity-90"
      />
    </motion.div>
  );
}
