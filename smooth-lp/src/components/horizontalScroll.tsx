'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // --------------------------
  // GSAP ANIMAÇÃO
  // --------------------------
  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

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
      },
    })

    const cards = gsap.utils.toArray<HTMLElement>('.card')

    cards.forEach((card) => {
      const visible = card.getBoundingClientRect().left < window.innerWidth
      gsap.set(card, { scale: visible ? 1 : 0.9 })

      // entrada
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'right right',
        end: 'left+=200 right',
        scrub: 1,
        onUpdate: ({ progress }) => {
          gsap.to(card, {
            scale: 0.8 + 0.2 * progress,
            duration: 0.2,
            ease: 'none',
          })
        },
      })

      // saída
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'right-=200 left',
        end: 'right left',
        scrub: 1,
        onUpdate: ({ progress }) => {
          gsap.to(card, {
            scale: 1.0 - 0.2 * progress,
            duration: 0.2,
            ease: 'none',
          })
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  // --------------------------
  // PROJETOS
  // --------------------------
  const projects = [
    {
      title: 'Dashboard Boilerplate',
      desc: 'Next.js • Dashboard • Deploy Vercel',
      imgWebp: '/images/dashboard.png',
      imgFallback: '/images/dashboard.png',
      repo: 'https://github.com/Cunhaww-dev/dashboard-boilerplate',
      url: 'https://dashboard-boilerplate-seven.vercel.app/dashboard',
    },
    {
      title: 'Lins Services Landing Page',
      desc: 'Next.js • Tailwind • Shadcn • Cloudflare',
      imgWebp: '/images/linsservices.png',
      imgFallback: '/images/linsservices.png',
      url: 'https://linsservices.com.br/',
    },
    {
      title: 'Buscador de Animes',
      desc: 'Next • Tailwind • TanStack Query',
      imgWebp: '/images/searchanime.png',
      imgFallback: '/images/searchanime.png',
      repo: 'https://github.com/Cunhaww-dev/search-anime',
      url: 'https://search-all-anime.vercel.app/',
    },
    {
      title: 'Smooth Landing Page',
      desc: 'Vite • React • Framer Motion • GSAP • TanStack Router',
      imgWebp: '/images/smoothlp.png',
      imgFallback: '/images/smoothlp.png',
      repo: 'https://github.com/Cunhaww-dev/Smooth_landing_page',
      url: 'https://smooth-landing-page-three.vercel.app/',
    },
    {
      title: 'Fundamentos Node.js',
      desc: 'Back-end • Routes • Node.js puro — projeto educacional (README completo)',
      imgWebp: '/images/node.png',
      imgFallback: '/images/node.png',
      repo: 'https://github.com/Cunhaww-dev/fundamentos-nodejs',
      noDemo: true,
    },
    {
      title: 'WordCount-NodeJs',
      desc: 'Back-end • Node.js • express • mongodb — projeto educacional (README completo)',
      imgWebp: '/images/node.png',
      imgFallback: '/images/node.png',
      repo: 'https://github.com/Cunhaww-dev/WordCount-NodeJs',
      noDemo: true,
    },
    {
      title: 'Em breve',
      desc: '',
      imgWebp: '/images/embreve.jpg',
      imgFallback: '/images/embreve.jpg',
      url: 'https://www.lucasfabri.com.br/',
      noDemo: true,
    },
  ]

  // --------------------------
  // FUNÇÕES: abrir links
  // --------------------------
  function openProject(url?: string) {
    if (!url) return
    const absolute = url.startsWith('http')
      ? url
      : `${window.location.origin}${url}`
    window.open(absolute, '_blank', 'noopener,noreferrer')
  }

  function openRepo(repo?: string) {
    if (!repo) return
    const absolute = repo.startsWith('http')
      ? repo
      : `${window.location.origin}${repo}`
    window.open(absolute, '_blank', 'noopener,noreferrer')
  }

  // --------------------------
  // RENDER
  // --------------------------
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-zinc-900 text-white"
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex gap-8 md:gap-12 px-6 md:px-28 items-center"
      >
        {projects.map((p: any, i) => (
          <article
            key={i}
            className="card rounded-xl border border-zinc-700 flex flex-col overflow-hidden shadow-xl bg-zinc-900"
            style={{
              width: 'clamp(320px, 85vw, 420px)',
              height: 'clamp(480px, 75vh, 600px)',
            }}
          >
            {/* HEADER */}
            <div
              style={{ flex: '0 0 15%' }}
              className="relative px-4 py-4 border-b border-zinc-800 flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-zinc-100 line-clamp-1">
                {p.title}
              </h3>

              <span className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700 text-zinc-300">
                #{String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* IMAGEM */}
            <div
              style={{ flex: '0 0 60%' }}
              className="bg-zinc-800 flex items-center justify-center"
            >
              <img
                src={p.imgFallback}
                alt={`Preview do projeto ${p.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* FOOTER Moderno */}
            <div
              style={{ flex: '0 0 25%' }}
              className="px-5 py-4 border-t border-zinc-800 flex flex-col justify-between"
            >
              <p className="text-sm text-zinc-400 line-clamp-2">{p.desc}</p>

              <div className="flex items-center justify-between mt-3 gap-4">
                {/* LEFT: GitHub button (aparece se repo existir) */}
                <div className="flex items-center gap-3">
                  {p.repo && (
                    <button
                      onClick={() => openRepo(p.repo)}
                      title="Ver código no GitHub"
                      className="flex items-center gap-2 px-3 py-2 rounded-md border text-zinc-100 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 cursor-pointer text-sm"
                    >
                      {/* GitHub SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-zinc-100"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.654 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                      </svg>

                      <span>Código</span>
                    </button>
                  )}
                </div>

                {/* RIGHT: Ver projeto (aparece somente se houver url e noDemo !== true) */}
                <div>
                  {!p.noDemo && p.url && (
                    <button
                      onClick={() => openProject(p.url)}
                      className="group flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-all font-medium text-sm duration-200 cursor-pointer"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        Ver projeto
                      </span>

                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
