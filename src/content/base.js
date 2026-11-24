/**
 * Arquivos de public/ ficam em `site.js` como caminhos absolutos ('/foto-joao.webp').
 * No GitHub Pages o site mora num subcaminho (/offjoao.dev/), então eles ganham o prefixo
 * do deploy (import.meta.env.BASE_URL, '/' no dev e nos testes).
 */
export function withBase(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return `${import.meta.env.BASE_URL}${path.slice(1)}`
}
