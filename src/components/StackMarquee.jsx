import { useId, useState } from 'react'
import StackList from './StackList'
import Type from './Type'

/**
 * Stack em carrossel: as etiquetas passam sem parar da esquerda para a direita.
 * Duas cópias em fila fecham o laço (a primeira só visual, a segunda é a lida e a que
 * entra com a página). Pausa com o mouse em cima ou pelo botão; com "menos movimento"
 * no sistema, fica parada e quebra em linhas.
 */
export default function StackMarquee({ items, title }) {
  const titleId = useId()
  const [paused, setPaused] = useState(false)

  return (
    <>
      <div className="stack-head">
        <h2 className="kicker" id={titleId}>
          <Type text={title} />
        </h2>
        <button
          type="button"
          className="marquee-toggle"
          aria-label="Pausar o carrossel da stack"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? '▶ continuar' : '❚❚ pausar'}</span>
        </button>
      </div>

      <div className="marquee" data-paused={paused ? '' : undefined}>
        <div className="marquee-track">
          <StackList items={items} decorative />
          <StackList items={items} aria-labelledby={titleId} />
        </div>
      </div>
    </>
  )
}
