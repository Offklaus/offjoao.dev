import { Link } from 'react-router'
import { getTurn } from '../content/navigation'

/** Rodapé "← Anterior · NN / 06 · Próxima →" (contracts/routes.md). A virada é do Book. */
export default function PageTurn({ pageId }) {
  const turn = getTurn(pageId)
  if (!turn) return null
  const { number, total, prev, next, isLast } = turn

  return (
    <nav className="turnbar" aria-label="Folhear">
      {prev ? (
        <Link className="turn" to={prev.path}>
          <span aria-hidden="true">←</span> Anterior
        </Link>
      ) : (
        <span className="turn is-off" aria-hidden="true">
          ← Anterior
        </span>
      )}
      <span className="folio">
        {number} / {total}
      </span>
      <Link className="turn turn--next" to={next.path}>
        {isLast ? (
          <>
            Voltar à capa <span aria-hidden="true">↺</span>
          </>
        ) : (
          <>
            Próxima <span aria-hidden="true">→</span>
          </>
        )}
      </Link>
    </nav>
  )
}
