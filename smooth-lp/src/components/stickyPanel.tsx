// src/components/stickyPanel.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyPanelProps {
  bgColor?: string;
  title?: string;
  children?: React.ReactNode;
  zIndex?: number;
  className?: string;
  height?: string;
  /** quando true, o conteúdo ocupa 100% (sem paddings/max-width) */
  fullBleed?: boolean;
  /** opcional: sobrescreve classes do content wrapper */
  contentClassName?: string;
}

export default function StickyPanel({
  bgColor = "bg-transparent",
  title,
  children,
  zIndex = 1,
  className = "",
  height = "h-[100svh]",
  fullBleed = false,
  contentClassName,
}: StickyPanelProps) {
  const panelRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.3, 1, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.98, 1, 1, 0.98]
  );
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      ref={panelRef}
      style={{ zIndex }}
      className={`
        ${height}
        w-full sticky top-0 rounded-t-[5rem]
        ${bgColor} ${className}
      `}
    >
      <motion.div
        // quando fullBleed: ocupa tudo; senão, layout “texto”
        className={
          contentClassName ??
          (fullBleed
            ? "relative w-full h-full"
            : "relative w-full max-w-4xl mx-auto p-8 text-center")
        }
        style={{ opacity, scale, y }}
      >
        {/* Renderiza o título só se existir */}
        {title && (
          <h1 className="text-7xl md:text-8xl font-extrabold mb-4 text-white">
            {title}
          </h1>
        )}

        {children}
      </motion.div>
    </section>
  );
}
