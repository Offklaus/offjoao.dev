import Cut from '../components/Cut'
import Photo from '../components/Photo'
import SmartLink from '../components/SmartLink'
import Type from '../components/Type'
import { projetos } from '../content/site'

export default function Projetos() {
  return (
    <div className="sheet">
      <h1 className="title-cuts">
        <Cut jag={2} tilt={1} font="anton" paper="white" size="clamp(34px, min(6.7vw, 10.5svh), 96px)">
          Outras
        </Cut>{' '}
        <Cut jag={1} tilt={2} font="serif" paper="news" size="clamp(32px, min(6.4vw, 10svh), 92px)">
          obras
        </Cut>
      </h1>

      <ul className="cards" aria-label="Projetos">
        {projetos.map((projeto) => (
          <li key={projeto.number}>
            <SmartLink className="card" href={projeto.url} fallback="div">
              <Photo image={projeto.image} />
              <h2 className="card-title">
                <span className="kicker">
                  <Type text={projeto.number} />
                </span>{' '}
                <span className="card-name">
                  <Type text={projeto.name} />
                </span>
              </h2>
              <span className="card-desc">
                <Type text={projeto.description} />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
