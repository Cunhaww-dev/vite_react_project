// src/components/intro.tsx
'use client'

import { useRef } from 'react'
import { Reveal } from './ui/motion/reveal'

type IntroProps = {
  embed?: boolean
}

export default function Intro({ embed = false }: IntroProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  return (
    <main
      ref={sectionRef}
      className={[
        'relative flex items-center justify-center overflow-hidden text-center',
        'bg-zinc-900',
        embed ? 'h-full' : 'h-screen',
      ].join(' ')}
    >
      {/* FX de Fundo (sem parallax) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-900" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] overflow-hidden">
        <div
          className="
            absolute inset-x-0 bottom-[-10%] h-[110%] blur-3xl opacity-70
            bg-[radial-gradient(60%_90%_at_50%_100%,rgba(168,85,247,0.50),rgba(168,85,247,0)_70%)]
            mask-[linear-gradient(to_top,black_0%,black_55%,transparent_100%)]
          "
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0
          mask-[radial-gradient(90%_70%_at_50%_50%,black_65%,transparent_100%)]
          bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0.18),transparent_60%)]
      "
      />

      {/* Conteúdo */}
      <div className="relative z-10 space-y-4 px-6 text-white">
        <Reveal as="h1" className="mb-1" amount={0.7}>
          <span className="text-4xl font-semibold">
            Em um mundo de templates iguais,
          </span>
        </Reveal>

        <Reveal as="h1" className="mb-1" amount={0.7}>
          <span className="text-4xl font-semibold">Seja único. Seja você.</span>
        </Reveal>

        <Reveal amount={0.7}>
          <p className="text-sm text-zinc-400">
            <span className="bg-gradient-to-b from-purple-300 to-purple-500 bg-clip-text text-transparent">
              único
            </span>{' '}
            é mais do que estilo — é estratégia.
          </p>
        </Reveal>
      </div>

      {/* Background animado de esferas */}
      <BackgroundSpheres
        targetRef={sectionRef}
        count={7}
        seed={5500}
        src="/sphere4.svg"
        minSize={20}
        maxSize={80}
      />
    </main>
  )
}
