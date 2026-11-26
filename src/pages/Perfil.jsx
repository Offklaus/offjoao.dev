import Cut from '../components/Cut'
import Photo from '../components/Photo'
import StackMarquee from '../components/StackMarquee'
import Type from '../components/Type'
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
          <p className="lead-serif">
            <Type text={perfil.lead} />
          </p>
          {perfil.paragrafos.map((texto) => (
            <p key={texto} className="body-copy">
              <Type text={texto} />
            </p>
          ))}
          <div className="stack-block">
            <StackMarquee items={perfil.stack} title="Stack" />
          </div>
        </div>
      </div>
    </div>
  )
}
