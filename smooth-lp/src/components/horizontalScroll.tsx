'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    // 🌀 Scroll horizontal principal (seu código original)
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

    // ✨ animação scale (mantive igual ao seu)
    const cards = gsap.utils.toArray<HTMLElement>('.card')

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect()
      const isInitiallyVisible =
        cardRect.left < window.innerWidth && cardRect.right > 0

      if (isInitiallyVisible) {
        gsap.set(card, { scale: 1 })
      } else {
        gsap.set(card, { scale: 0.9 })
      }

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'right right',
        end: 'left+=200 right',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(card, {
            scale: 0.8 + 0.2 * progress,
            duration: 0.2,
            ease: 'none',
            overwrite: true,
          })
        },
      })

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'right-=200 left',
        end: 'right left',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(card, {
            scale: 1.0 - 0.2 * progress,
            duration: 0.2,
            ease: 'none',
            overwrite: true,
          })
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const projects = [
    {
      title: 'Dashboard Boilerplate',
      desc: 'Next.js • Dashboard • Deploy Vercel',
      imgWebp: '/images/dashboard-thumb-4x5.webp',
      imgFallback: '/images/dashboard-thumb-4x5.png',
      url: 'https://dashboard-boilerplate-seven.vercel.app/dashboard',
    },
    {
      title: 'Dashboard Admin',
      desc: 'Next.js • Tailwind • Charts',
      imgWebp: '/images/admin-1200.webp',
      imgFallback: '/images/admin-1200.webp',
      url: '/projects/admin',
    },
    {
      title: 'Portfólio Pessoal',
      desc: 'HTML • CSS • JS',
      imgWebp: '/images/portfolio-1200.webp',
      imgFallback: '/images/portfolio-1200.webp',
      url: '/projects/portfolio',
    },
    {
      title: 'API REST',
      desc: 'Node • Express • Postgres',
      imgWebp: '/images/api-1200.webp',
      imgFallback: '/images/api-1200.webp',
      url: '/projects/api',
    },
    {
      title: 'Game 2D',
      desc: 'Unity • C#',
      imgWebp: '/images/game-1200.webp',
      imgFallback: '/images/game-1200.webp',
      url: '/projects/game',
    },
    {
      title: 'App Mobile',
      desc: 'React Native • Expo',
      imgWebp: '/images/mobile-1200.webp',
      imgFallback: '/images/mobile-1200.webp',
      url: '/projects/mobile',
    },
    {
      title: 'Microfrontends',
      desc: 'Module Federation',
      imgWebp: '/images/mf-1200.webp',
      imgFallback: '/images/mf-1200.webp',
      url: '/projects/mf',
    },
    {
      title: 'Chatbot',
      desc: 'Node • OpenAI',
      imgWebp: '/images/chat-1200.webp',
      imgFallback: '/images/chat-1200.webp',
      url: '/projects/chat',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-zinc-900 text-white"
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex gap-12 px-28 items-center"
      >
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target={p.url.startsWith('http') ? '_blank' : undefined}
            rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="card shrink-0 rounded-lg border border-zinc-700 flex flex-col overflow-hidden shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-zinc-600"
            style={{
              width: 'clamp(260px, 28vw, 400px)',
              height: 'clamp(325px, 36vw, 500px)',
            }}
            aria-label={`${p.title} — abrir projeto`}
          >
            {/* imagem (por baixo) */}
            <div style={{ flex: '0 0 65%', position: 'relative' }}>
              <picture>
                <source srcSet={p.imgWebp} type="image/webp" />
                <img
                  src={p.imgFallback}
                  alt={`${p.title} — preview`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'top center' }}
                />
              </picture>

              {/* overlay de título sobre a imagem — garante legibilidade */}
              <div
                className="absolute left-0 right-0 bottom-0 px-4 py-3"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 60%)',
                }}
              >
                <h3 className="text-base md:text-xl font-bold text-white leading-tight truncate">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-200/90 mt-1 truncate">
                  {p.desc}
                </p>
              </div>
            </div>

            {/* footer compacto transparente — mantém layout e botão de abrir */}
            <div
              style={{ flex: '1 1 35%' }}
              className="px-4 py-3 flex items-center justify-between bg-transparent"
            >
              <span className="text-xs px-3 py-1 border border-zinc-700 rounded-md">
                Abrir projeto ↗
              </span>
              <span className="text-xs text-zinc-100/70">#{i + 1}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
