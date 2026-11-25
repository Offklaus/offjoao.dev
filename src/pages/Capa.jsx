import Photo from '../components/Photo'
import { capa, site } from '../content/site'

/**
 * Capa: o nome em duas linhas, a área e a frase de apresentação à esquerda; a foto
 * inteira (retrato) à direita, na altura toda da página. No celular, a foto vai para
 * baixo do texto.
 */
export default function Capa() {
  const [first, ...rest] = capa.title.split(' ')

  return (
    <div className="sheet capa">
      <div className="capa-main">
        <h1 className="capa-title">
          <span>{first}</span> <span>{rest.join(' ')}</span>
        </h1>
        <span className="kicker">{site.role}</span>
        <p className="lede">{capa.intro}</p>
      </div>

      <Photo image={capa.photo} />
    </div>
  )
}
