import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { findPage } from '../content/navigation'
import Leaf from './Leaf'

/**
 * A revista: mostra a página da URL. A troca é imediata (sem animação de virar).
 * Ao trocar de página, o foco vai para o conteúdo (leitor de tela anuncia a página).
 */
export default function Book() {
  const { pathname } = useLocation()
  const pageId = findPage(pathname)?.id ?? null
  const mainRef = useRef(null)
  const lastPage = useRef(pageId)

  useEffect(() => {
    if (lastPage.current === pageId) return
    lastPage.current = pageId
    mainRef.current?.focus({ preventScroll: true })
  }, [pageId])

  return (
    <div className="book">
      <Leaf key={pageId ?? '404'} pageId={pageId} active mainRef={mainRef} />
    </div>
  )
}
