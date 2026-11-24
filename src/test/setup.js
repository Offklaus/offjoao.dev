import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

// jsdom não implementa rolagem; o Layout rola ao topo ao trocar de página.
window.scrollTo = vi.fn()
