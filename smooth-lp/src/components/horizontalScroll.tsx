'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    // 🌀 Scroll horizontal principal
    const totalScrollWidth = container.scrollWidth - section.clientWidth
    const horizontalTween = gsap.to(container, {
      x: () => -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        id: 'horizontalScroll',
      },
    })

    // ✨ Animação simples e limpa com scale apenas
    const cards = gsap.utils.toArray<HTMLElement>('.card')

    cards.forEach((card) => {
      // Verifica se o card já está visível inicialmente
      const cardRect = card.getBoundingClientRect()
      const isInitiallyVisible =
        cardRect.left < window.innerWidth && cardRect.right > 0

      // 🎨 ESTADO INICIAL
      if (isInitiallyVisible) {
        gsap.set(card, { scale: 1 })
      } else {
        gsap.set(card, { scale: 0.9 }) // 📍 escala inicial (0.8 = 80%)
      }

      // 🎬 ANIMAÇÃO DE ENTRADA (da direita)
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'right right', // 📍 quando a borda direita do card toca a tela
        end: 'left+=200 right', // 📍 distância para completar animação (200px)
        scrub: 1, // 📍 suavidade (1 = rápido, 2-3 = mais suave)
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(card, {
            scale: 0.8 + 0.2 * progress, // 📍 de 0.8 até 1.0
            duration: 0.2,
            ease: 'none',
            overwrite: true,
          })
        },
      })

      // 🎬 ANIMAÇÃO DE SAÍDA (para esquerda) - ESPELHADA
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'right-=200 left', // 📍 começa 200px antes de sair
        end: 'right left', // 📍 quando sai completamente
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(card, {
            scale: 1.0 - 0.2 * progress, // 📍 de 1.0 até 0.8 (inverso da entrada)
            duration: 0.2,
            ease: 'none',
            overwrite: true,
          })
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-900 text-white"
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex gap-8 px-8 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="card shrink-0 w-[400px] h-[500px] rounded-lg border border-zinc-700 flex items-center justify-center text-4xl font-bold shadow-lg"
            style={{
              backgroundColor: [
                '#ef4444', // red
                '#f59e0b', // amber
                '#22c55e', // green
                '#3b82f6', // blue
                '#8b5cf6', // violet
                '#ec4899', // pink
                '#14b8a6', // teal
                '#eab308', // yellow
                '#06b6d4', // cyan
                '#a855f7', // purple
              ][i % 10],
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </section>
  )
}
