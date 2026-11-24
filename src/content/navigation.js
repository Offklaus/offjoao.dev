import { pages } from './site'

const pad = (n) => String(n).padStart(2, '0')

const normalize = (pathname) =>
  pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

/** Página da revista para um endereço, ou `undefined` (404). */
export function findPage(pathname) {
  const path = normalize(pathname)
  return pages.find((page) => page.path === path)
}

/** Dados do rodapé de folhear: folio, anterior e próxima (a última volta à capa). */
export function getTurn(pageId) {
  const index = pages.findIndex((page) => page.id === pageId)
  if (index === -1) return null
  const isLast = index === pages.length - 1
  return {
    number: pad(index + 1),
    total: pad(pages.length),
    prev: index > 0 ? pages[index - 1] : null,
    next: isLast ? pages[0] : pages[index + 1],
    isLast,
  }
}
