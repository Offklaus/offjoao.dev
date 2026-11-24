import { Link } from 'react-router'

const isExternal = (href) => /^https?:\/\//i.test(href)
const isFile = (href) => /\.[a-z0-9]+$/i.test(href)

/**
 * Link que decide sozinho o que ser (contracts/routes.md, "Links"):
 * - href nulo      → elemento sem link (`fallback`, padrão <span>)
 * - https://…      → nova aba, rel seguro e aviso para leitor de tela
 * - /rota interna  → <Link> do roteador
 * - mailto:, arquivo → <a> comum (com `download` quando pedido)
 */
export default function SmartLink({ href, download, fallback: Fallback = 'span', className, children }) {
  if (!href) {
    return <Fallback className={className}>{children}</Fallback>
  }

  if (isExternal(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}{' '}
        <span className="sr-only">(abre em nova aba)</span>
      </a>
    )
  }

  if (href.startsWith('/') && !isFile(href) && !download) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className={className} href={href} download={download || undefined}>
      {children}
    </a>
  )
}
