// src/components/theme-toggle.tsx
'use client'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../provider/theme-provider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="rounded-full border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5 transition"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
    </button>
  )
}
