import Cut from '../components/Cut'
import Photo from '../components/Photo'
import SmartLink from '../components/SmartLink'
import Type from '../components/Type'
import { withBase } from '../content/base'
import { destaque } from '../content/site'

/**
 * Matéria de capa (TCC): título em recortes numa linha só, depois o texto (problema,
 * solução e os botões) à esquerda e o print + ficha técnica à direita.
 */
export default function Destaque() {
  const [antes, meio, depois] = destaque.titulo

  return (
    <div className="sheet destaque">
      <div className="destaque-head">
        <span className="kicker">
          <Type text={destaque.kicker} />
        </span>
        <h1 className="title-cuts destaque-title">
          <Cut jag={1} tilt={1} font="serif" paper="white" size="clamp(18px, min(3vw, 5.5svh), 52px)">
            {antes}
          </Cut>{' '}
          <Cut jag={2} tilt={2} font="anton" paper="ink" size="clamp(22px, min(4.6vw, 8svh), 84px)">
            {meio}
          </Cut>{' '}
          <Cut jag={3} tilt={3} font="brico" paper="news" size="clamp(20px, min(4vw, 7svh), 72px)">
            {depois}
          </Cut>
        </h1>
      </div>

      <div className="spread destaque-spread">
        <div className="destaque-text">
          <p className="subtitulo">
            <Type text={destaque.subtitulo} />
          </p>

          <div className="destaque-bloco">
            <h2 className="kicker">
              <Type text="O problema" />
            </h2>
            <p className="body-copy">
              <Type text={destaque.problema} />
            </p>
          </div>

          <div className="destaque-bloco">
            <h2 className="kicker">
              <Type text="A solução" />
            </h2>
            <p className="body-copy">
              <Type text={destaque.solucao} />
            </p>
          </div>

          <div className="destaque-acoes">
            <a
              className="turn turn--next"
              href={withBase(destaque.artigo.href)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {destaque.artigo.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (PDF, abre em nova aba)</span>
            </a>
            <SmartLink className="repo-link" href={destaque.repo.href}>
              {destaque.repo.label}
              {destaque.repo.href && <span aria-hidden="true"> ↗</span>}
            </SmartLink>
          </div>
        </div>

        <div className="destaque-media">
          <Photo image={destaque.image} />
          <dl className="ficha">
            <div className="ficha-row">
              <dt className="kicker">
                <Type text="Tipo" />
              </dt>
              <dd>
                <Type text={destaque.tipo} />
              </dd>
            </div>
            <div className="ficha-row">
              <dt className="kicker">
                <Type text="Stack" />
              </dt>
              <dd>
                <Type text={destaque.stack} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
