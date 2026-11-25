import Cut from '../components/Cut'
import Photo from '../components/Photo'
import { perfil } from '../content/site'

export default function Perfil() {
  const [antes, depois] = perfil.titulo

  return (
    <div className="sheet">
      <h1 className="title-cuts">
        <Cut jag={2} tilt={1} font="anton" paper="ink" size="clamp(34px, min(6.4vw, 10svh), 92px)">
          {antes}
        </Cut>{' '}
        <Cut jag={3} tilt={2} font="serif" paper="white" size="clamp(28px, min(5.3vw, 8.4svh), 76px)">
          {depois}
        </Cut>
      </h1>

      <div className="spread perfil-spread">
        <Photo image={perfil.photo} />

        <div className="perfil-text">
          <p className="lead-serif">{perfil.lead}</p>
          {perfil.paragrafos.map((texto) => (
            <p key={texto} className="body-copy">
              {texto}
            </p>
          ))}
          <div className="stack-block">
            <h2 className="kicker" id="stack-titulo">
              Stack
            </h2>
            <ul className="stack-list" aria-labelledby="stack-titulo">
              {perfil.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
