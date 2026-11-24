import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { findPage } from '../content/navigation'
import { site } from '../content/site'
import Book from './Book'

/** A mesa preta com a revista em cima. O título da aba acompanha a URL. */
export default function Layout() {
  const { pathname } = useLocation()
  const page = findPage(pathname)

  useEffect(() => {
    document.title = `${site.brand}${site.domain} — ${page ? page.label : 'Página não encontrada'}`
  }, [page])

  return (
    <div className="desk">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Book />
    </div>
  )
}
