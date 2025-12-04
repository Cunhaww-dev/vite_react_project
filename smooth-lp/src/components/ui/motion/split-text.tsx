'use client'
import { motion, type Variants } from 'framer-motion'
import { useId } from 'react'

const letterVariant = (i: number, stagger = 0.04): Variants => ({
  hidden: { opacity: 0, y: 20, filter: 'blur(2px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * stagger },
  },
})

export function SplitLetters({
  text,
  className,
  amount = 0.7,
  stagger = 0.04,
  once = false,
}: {
  text: string
  className?: string
  amount?: number
  stagger?: number
  once?: boolean
}) {
  // preserva espaços como tokens (incluindo múltiplos)
  const tokens = text.split(/(\s+)/)
  let globalIndex = 0
  const id = useId()

  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {tokens.map((token, i) => {
        // se for token de espaço (um ou mais espaços / quebras)
        if (/^\s+$/.test(token)) {
          // renderiza o espaço preservando exatamente como está e permitindo quebra
          // 'whitespace-pre-wrap' preserva múltiplos espaços, tabs e quebras, mas permite wrap quando necessário
          return (
            <span
              key={`${id}-ws-${i}`}
              className="whitespace-pre-wrap"
              aria-hidden="true"
            >
              {token}
            </span>
          )
        }

        // token é uma palavra -> impedir quebra interna e animar letras em sequência global
        const letters = Array.from(token)
        const wordKey = `${id}-w-${i}`

        return (
          <span
            key={wordKey}
            className="inline-block whitespace-nowrap"
            aria-hidden="true"
          >
            {letters.map((ch, li) => {
              const idx = globalIndex++
              return (
                <motion.span
                  key={`${wordKey}-l-${li}`}
                  className="inline-block will-change-[filter]"
                  variants={letterVariant(idx, stagger)}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </motion.span>
  )
}
