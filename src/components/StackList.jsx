import TechIcon from './TechIcon'
import Type from './Type'

/**
 * Tecnologias em etiquetas: ícone na cor da marca + nome batido à máquina na entrada.
 * decorative: cópia só visual (fora da leitura e da entrada), usada para fechar o laço do
 * carrossel. Os demais props (aria-label, aria-labelledby…) vão para a <ul>.
 */
export default function StackList({ items, className = '', decorative = false, ...props }) {
  return (
    <ul
      className={`stack-list ${className}`.trim()}
      aria-hidden={decorative || undefined}
      {...props}
    >
      {items.map((tech) => (
        <li key={tech} title={tech}>
          <TechIcon name={tech} stamp={!decorative} />
          <span className="stack-name">{decorative ? <Letters text={tech} /> : <Type text={tech} />}</span>
        </li>
      ))}
    </ul>
  )
}

/* Mesma marcação letra a letra do <Type>, sem a entrada: as duas cópias do carrossel
   ficam com a mesma largura e o laço não dá tranco */
function Letters({ text }) {
  return Array.from(text).map((char, i) => (char === ' ' ? ' ' : <span key={i}>{char}</span>))
}
