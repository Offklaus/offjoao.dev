import { Link } from 'react-router'
import { pages, site } from '../content/site'
import Cut from './Cut'

/**
 * Cabeçalho impresso em cada folha. `pageId` é a página desta folha (e não a URL):
 * durante a virada, a folha de baixo já mostra o menu marcando a página dela.
 */
export default function Masthead({ pageId }) {
  return (
    <header className="bar">
      <Link className="logo" to="/" aria-label={`${site.brand}${site.domain} — capa`}>
        <Cut jag={3} tilt={3} font="brico" paper="white" size="22px">
          {site.brand}
        </Cut>
        <span className="logo-domain">{site.domain}</span>
      </Link>
      <nav className="menu" aria-label="Principal">
        <ul>
          {pages
            .filter((page) => page.inMenu)
            .map((page) => (
              <li key={page.id}>
                <Link to={page.path} aria-current={page.id === pageId ? 'page' : undefined}>
                  {page.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  )
}
