import { createContext } from 'react'

/** true quando a entrada da página vai rodar (há movimento permitido e matchMedia). */
export const IntroContext = createContext(false)

export function introEnabled() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
