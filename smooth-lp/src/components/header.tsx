'use client'

import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useModal } from '../lib/modal-context'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { openModal } = useModal() // pega a função para abrir o modal

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-40 // Diminuído o z-index para ficar abaixo do modal
          font-semibold
          transition-colors duration-200
          ${
            scrolled
              ? 'backdrop-blur-md bg-zinc-700/50 shadow-sm'
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
            Lucas Fabri
          </Link>

          {/* Navegação */}
          <nav className="flex items-center gap-8 text-sm sm:text-base">
            <a
              href="https://github.com/Cunhaww-dev"
              target="_blank"
              rel="noopener noreferrer"
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
            </a>

            {/* 4. Botão de Contato modificado */}
            <button
              onClick={() => openModal()}
              className={`
                rounded-full px-4 py-2 font-medium cursor-pointer
                transition-colors duration-200
                ${
                  scrolled
                    ? 'bg-white text-zinc-900 hover:bg-zinc-200'
                    : 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800'
                }
              `}
            >
              Contato
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}
