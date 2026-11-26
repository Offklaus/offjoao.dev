import { stackIcons } from '../content/stackIcons'

/**
 * Ícone da tecnologia (decorativo: o nome vem ao lado). Sem ícone cadastrado, nada.
 * stamp: entra "carimbado" na entrada da página (desligue em cópias só visuais).
 */
export default function TechIcon({ name, stamp = true }) {
  const icon = stackIcons[name]
  if (!icon) return null

  return (
    <span className="tech-icon" style={{ color: icon.color }} data-stamp={stamp ? '' : undefined}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d={icon.path} />
      </svg>
    </span>
  )
}
