// src/components/theme-provider.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Ctx = { theme: 'dark'|'light'; toggle: () => void }
const ThemeCtx = createContext<Ctx>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light':'dark') }}>
      {children}
    </ThemeCtx.Provider>
  )
}
export const useTheme = () => useContext(ThemeCtx)
