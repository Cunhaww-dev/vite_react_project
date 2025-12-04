// src/components/ui/CodePreview.tsx
import { useEffect, useRef, useState } from 'react'
import type { Highlighter } from 'shiki'

let shikiHighlighter: Highlighter | null = null
let shikiInitializing: Promise<void> | null = null

interface Props {
  code: string
  lang?: string
  theme?: string
  className?: string
  heightClass?: string
}

export default function ShikoBlockCode({
  code,
  lang = 'typescript',
  theme = 'min-dark',
  className = 'w-full md:max-w-[700px]',
  heightClass = 'h-[260px] sm:h-[300px] md:h-[360px]',
}: Props) {
  const [html, setHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [bgColor, setBgColor] = useState<string | undefined>(undefined)
  const [textColor, setTextColor] = useState<string | undefined>(undefined)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true

    async function ensureHighlighter() {
      if (shikiHighlighter) return
      if (shikiInitializing) {
        await shikiInitializing
        return
      }
      shikiInitializing = (async () => {
        const { createHighlighter } = await import('shiki')
        shikiHighlighter = await createHighlighter({
          themes: [theme],
          langs: [lang],
        })
      })()
      await shikiInitializing
      shikiInitializing = null
    }

    ;(async () => {
      setLoading(true)
      try {
        await ensureHighlighter()
        if (!shikiHighlighter)
          throw new Error('Shiki highlighter não inicializado')

        const highlighted = shikiHighlighter.codeToHtml(code, { lang, theme })

        if (!mounted.current) return
        setHtml(highlighted)

        // extrai background e color do <pre> gerado
        try {
          const tmp = document.createElement('div')
          tmp.innerHTML = highlighted
          const pre = tmp.querySelector('pre')
          if (pre) {
            const bg =
              (pre.style && pre.style.backgroundColor) ||
              getStyleFromStyleAttr(
                pre.getAttribute('style'),
                'background-color',
              )
            const color =
              (pre.style && pre.style.color) ||
              getStyleFromStyleAttr(pre.getAttribute('style'), 'color')
            if (bg) setBgColor(bg)
            if (color) setTextColor(color)
          }
        } catch (err) {
          // não quebra se falhar
          console.warn('Não foi possível extrair background:', err)
        }
      } catch (err) {
        console.error('Erro Shiki:', err)
        setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`)
      } finally {
        if (mounted.current) setLoading(false)
      }
    })()

    return () => {
      mounted.current = false
    }
  }, [code, lang, theme])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch (e) {
      console.error('Falha ao copiar:', e)
    }
  }

  function getStyleFromStyleAttr(styleAttr: string | null, prop: string) {
    if (!styleAttr) return null
    const pairs = styleAttr
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
    for (const p of pairs) {
      const [k, v] = p.split(':').map((x) => x.trim())
      if (k === prop) return v || null
    }
    return null
  }

  return (
    <div
      className={`${className} ${heightClass} rounded-2xl shadow-lg relative overflow-hidden`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      aria-live="polite"
    >
      {/* header (no fluxo normal, não absoluto que pode causar bugs) */}
      <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b border-transparent">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="inline-block h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="inline-block h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-medium text-slate-300">
            {lang}
          </span>
          <button
            onClick={handleCopy}
            className="text-xs bg-blue-800/80 text-white px-2 py-1 rounded-md hover:bg-slate-900/90 focus:outline-none transition"
            aria-label="Copiar código"
          >
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* conteúdo: ocupa o restante, é scrollable */}
      <div
        className="px-3 sm:px-4 pb-4 overflow-auto h-[calc(100%-48px)]" // 48px = header height aproximada; ajusta conforme necessário
        style={textColor ? { color: textColor } : undefined}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-slate-400">
              Carregando visualização...
            </div>
          </div>
        ) : (
          <div
            className="m-0"
            dangerouslySetInnerHTML={{ __html: html ?? '' }}
          />
        )}
      </div>
    </div>
  )
}

/* helpers */
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]!
  })
}
