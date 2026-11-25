import Cut from '../components/Cut'
import SmartLink from '../components/SmartLink'
import Type from '../components/Type'
import { contatos } from '../content/site'

export default function Contato() {
  return (
    <div className="sheet">
      <h1 className="title-cuts">
        <Cut jag={3} tilt={1} font="serif" paper="white" size="clamp(32px, min(5.6vw, 8.8svh), 80px)">
          Fale
        </Cut>{' '}
        <Cut jag={2} tilt={2} font="anton" paper="ink" size="clamp(38px, min(7.2vw, 11.4svh), 104px)">
          comigo
        </Cut>
      </h1>

      <ul className="channels" aria-label="Canais de contato">
        {contatos.map((canal) => (
          <li key={canal.type}>
            <SmartLink className="channel" href={canal.href} download={canal.download}>
              <span className="kicker">
                <Type text={canal.type} />
              </span>
              <span className="channel-label">
                <Type text={canal.label} tail={canal.href ? (canal.download ? ' ↓' : ' →') : undefined} />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
