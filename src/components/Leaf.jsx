import NaoEncontrada from '../pages/NaoEncontrada'
import { views } from '../pages/views'
import Masthead from './Masthead'
import PageTurn from './PageTurn'

/**
 * Uma folha da revista: cabeçalho, conteúdo e rodapé de folhear impressos na página.
 * Só a folha `active` é interativa; durante a virada as duas folhas ficam inertes.
 * pageId nulo = página não encontrada (não faz parte da revista).
 */
export default function Leaf({ pageId, active, leafRef, mainRef }) {
  const View = pageId ? views[pageId] : NaoEncontrada

  return (
    <div ref={leafRef} className="page leaf" inert={!active} aria-hidden={active ? undefined : true}>
      <Masthead pageId={pageId} />
      <main
        id={active ? 'conteudo' : undefined}
        ref={active ? mainRef : undefined}
        className="content"
        tabIndex={-1}
      >
        <View />
      </main>
      {pageId && <PageTurn pageId={pageId} />}
    </div>
  )
}
