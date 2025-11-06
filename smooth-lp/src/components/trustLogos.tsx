"use client";
import { useEffect, useState } from "react";
import Logo from "./ui/logo";
import "./trustLogo.css";

const svgFiles = [
  "html5.svg",
  "css3.svg",
  "typescript.svg",
  "react.svg",
  "vitejs.svg",
  "tailwindcss.svg",
  "framermotion.svg",
  "gsap.svg",
  "pnpm.svg",
  "git.svg",
  "github.svg",
  "vercel.svg",
  "biome.svg",
  "figma.svg",
  "claude.svg",
  "lovable.svg",
  "vscode.svg",
] as const;

export default function TrustLogos() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // duplica para o efeito “marquee” contínuo
  const allLogos = [...svgFiles, ...svgFiles, ...svgFiles, ...svgFiles];

  return (
    <section className="py-10 overflow-hidden">
      <p className="text-center pb-4 text-sm font-semibold uppercase tracking-widest">
        Tecnologias utilizadas
      </p>

      <div className="relative w-full py-6 group marquee-60">
        <div className="overflow-hidden">
          <div
            className={`marquee-content flex gap-8 w-max ${
              isClient ? "running" : ""
            }`}
          >
            {allLogos.map((file, i) => (
              <Logo key={`${file}-${i}`} src={`/infinit-loop/${file}`} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-zinc-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-zinc-50 to-transparent" />
      </div>
    </section>
  );
}
