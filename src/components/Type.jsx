import { useContext } from 'react'
import { IntroContext } from '../motion/IntroContext'

/**
 * Texto batido à máquina na entrada da página.
 * Com a entrada ligada, cada letra vira um <span> (animado pelo useIntro) e o leitor de
 * tela recebe o texto inteiro numa cópia invisível. Sem a entrada, é texto puro.
 * tail: enfeite visual no fim (ex.: ' →'), fora do texto lido.
 */
export default function Type({ text, tail }) {
  const intro = useContext(IntroContext)

  if (!intro) {
    return tail ? (
      <>
        {text}
        <span aria-hidden="true">{tail}</span>
      </>
    ) : (
      text
    )
  }

  return (
    <>
      <span className="sr-only type-sr">{text}</span>
      <span aria-hidden="true" data-type="">
        {Array.from(text + (tail ?? '')).map((char, i) => (char === ' ' ? ' ' : <span key={i}>{char}</span>))}
      </span>
    </>
  )
}
