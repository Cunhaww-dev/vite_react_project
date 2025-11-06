'use client'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        font-semibold
        transition-colors duration-200
        ${
          scrolled
            ? 'backdrop-blur-md bg-zinc-900/50 shadow-sm'
            : 'bg-transparent'
        }
      `}
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl items-center justify-between
          px-6 md:px-10
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className={`
            font-bold text-xl sm:text-2xl tracking-tight
            transition-colors duration-200
            ${scrolled ? 'text-zinc-50' : 'text-zinc-900'}
          `}
        >
          Logo
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-8 text-sm sm:text-base">
          <Link
            to="/about"
            className={`
              transition-colors duration-200
              ${
                scrolled
                  ? 'text-zinc-50 hover:text-zinc-300'
                  : 'text-zinc-800 hover:text-zinc-950'
              }
            `}
          >
            Sobre
          </Link>

          <Link
            to="/contact"
            className={`
              rounded-full px-4 py-2 font-medium
              transition-colors duration-200
              ${
                scrolled
                  ? 'bg-white text-zinc-900 hover:bg-zinc-200'
                  : 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800'
              }
            `}
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  )
}
