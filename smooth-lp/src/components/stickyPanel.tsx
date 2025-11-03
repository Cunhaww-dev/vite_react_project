import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyPanelProps {
  bgColor: string;
  title: string;
  children?: React.ReactNode;
  zIndex?: number;
  className?: string;
  height?: string;
}

export default function StickyPanel({
  bgColor,
  title,
  children,
  zIndex = 1,
  className = "",
  height = "h-[80vh]",
}: StickyPanelProps) {
  // Conecta a ref para a animação bônus
  const panelRef = useRef(null);

  // Captura o progresso da rolagem do painel
  const { scrollYProgress } = useScroll({
    target: panelRef,
    // Começa quando o fundo do painel entra na tela (0%)
    // Termina quando o topo do painel sai da tela (100%)
    offset: ["start end", "end start"],
  });

  // Opacidade: Fade-in e Fade-out
  // Fica totalmente opaco entre 40% e 60% da rolagem
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.3, 1, 1, 0.3]
  );

  // Escala: Leve zoom-in e zoom-out
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.9, 1, 1, 0.9]
  );

  // Translação Vertical (Y): Simula o "empurrão" para fora da tela
  // Move o conteúdo de -50px (subindo) para 50px (descendo)
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    // O PULO DO GATO: h-screen, sticky top-0 e o z-index
    <section
      ref={panelRef}
      style={{ zIndex }}
      className={`
        ${height} 
        w-full sticky top-0 flex flex-col items-center justify-center 
        text-white ${bgColor} ${className}
      `}
    >
      <motion.div
        className="text-center p-8 max-w-4xl"
        // Aplica as animações de opacidade, escala e translação
        style={{ opacity, scale, y }}
      >
        <h1 className="text-7xl md:text-8xl font-extrabold mb-4">{title}</h1>
        {children && (
          <div className="text-xl md:text-2xl font-light">{children}</div>
        )}
      </motion.div>
    </section>
  );
}
