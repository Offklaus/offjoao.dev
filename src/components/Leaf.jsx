import { useRef, useState } from 'react'
import { IntroContext, introEnabled } from '../motion/IntroContext'
import { useIntro } from '../motion/useIntro'
import NaoEncontrada from '../pages/NaoEncontrada'
import { views } from '../pages/views'
import Masthead from './Masthead'
import PageTurn from './PageTurn'

/**
 * Uma folha da revista: cabeçalho, conteúdo e rodapé de folhear impressos na página.
 * Só a folha `active` é interativa; durante a virada as duas folhas ficam inertes.
 * pageId nulo = página não encontrada (não faz parte da revista).
 * Cada folha nova roda a entrada da página (src/motion), a menos que o sistema peça
 * menos movimento.
 */
export default function Leaf({ pageId, active, leafRef, mainRef }) {
  const View = pageId ? views[pageId] : NaoEncontrada
  const [intro] = useState(introEnabled)
  const contentRef = useRef(null)
  useIntro(contentRef, intro)

  const setMain = (element) => {
    contentRef.current = element
    if (active && mainRef) mainRef.current = element
  }

  return (
    <div ref={leafRef} className="page leaf" inert={!active} aria-hidden={active ? undefined : true}>
      <Masthead pageId={pageId} />
      <main
        id={active ? 'conteudo' : undefined}
        ref={setMain}
        className="content"
        tabIndex={-1}
        data-intro={intro ? '' : undefined}
      >
        <IntroContext.Provider value={intro}>
          <View />
        </IntroContext.Provider>
      </main>
      {pageId && <PageTurn pageId={pageId} />}
    </div>
  )
}
