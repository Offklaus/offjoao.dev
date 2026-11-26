import { stackIcons } from '../content/stackIcons'

/** Ícone da tecnologia (decorativo: o nome vem ao lado). Sem ícone cadastrado, nada. */
export default function TechIcon({ name }) {
  const icon = stackIcons[name]
  if (!icon) return null

  return (
    <span className="tech-icon" style={{ color: icon.color }} data-stamp="">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d={icon.path} />
      </svg>
    </span>
  )
}
