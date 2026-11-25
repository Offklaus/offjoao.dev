import { withBase } from '../content/base'

/**
 * Foto/print com contorno fino. Sem `image.src`, mostra o placeholder entre colchetes.
 * O tamanho vem do layout (é o elemento elástico da página) · tilt: graus.
 * `image.ratio` (ex.: '3 / 4'): a moldura assume a proporção da foto e ela aparece
 * inteira, sem corte; o layout dá a altura e a largura sai da proporção.
 * `image.cutout`: imagem sem fundo (PNG/WebP transparente), sem caixa nem contorno.
 */
export default function Photo({ image, tilt = 0, className = '' }) {
  const whole = Boolean(image.src && image.ratio)
  const cutout = Boolean(image.src && image.cutout)

  return (
    <div
      className={`photo-wrap${whole ? ' photo-wrap--whole' : ''} ${className}`.trim()}
      style={whole ? { '--photo-ratio': image.ratio } : undefined}
    >
      <div
        className={`photo${cutout ? ' photo--cutout' : ''}`}
        style={tilt ? { '--photo-tilt': `${tilt}deg` } : undefined}
      >
        {image.src ? (
          <img
            src={withBase(image.src)}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        ) : (
          <span className="photo-label">{image.placeholder}</span>
        )}
      </div>
    </div>
  )
}
