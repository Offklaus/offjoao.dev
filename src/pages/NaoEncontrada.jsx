import { Link } from 'react-router'
import Cut from '../components/Cut'
import Type from '../components/Type'

export default function NaoEncontrada() {
  return (
    <div className="sheet">
      <h1 className="title-cuts">
        <Cut jag={2} tilt={1} font="anton" paper="white" size="clamp(34px, min(6.4vw, 10svh), 92px)">
          Página
        </Cut>{' '}
        <Cut jag={1} tilt={2} font="serif" paper="news" size="clamp(28px, min(5.3vw, 8.4svh), 76px)">
          não encontrada
        </Cut>
      </h1>
      <p className="body-copy">
        <Type text="Essa página foi arrancada da revista. Volte para a capa e folheie de novo." />
      </p>
      <p>
        <Link className="turn turn--next" to="/">
          Voltar à capa
        </Link>
      </p>
    </div>
  )
}
