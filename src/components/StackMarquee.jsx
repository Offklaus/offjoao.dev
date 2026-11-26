import { useId } from 'react'
import StackList from './StackList'
import Type from './Type'

/**
 * Stack em carrossel: as etiquetas passam sem parar da esquerda para a direita.
 * Duas cópias em fila fecham o laço (a primeira só visual, a segunda é a lida e a que
 * entra com a página). Pausa com o mouse em cima; com "menos movimento" no sistema,
 * fica parada e quebra em linhas.
 */
export default function StackMarquee({ items, title }) {
  const titleId = useId()

  return (
    <>
      <h2 className="kicker" id={titleId}>
        <Type text={title} />
      </h2>

      <div className="marquee">
        <div className="marquee-track">
          <StackList items={items} decorative />
          <StackList items={items} aria-labelledby={titleId} />
        </div>
      </div>
    </>
  )
}
