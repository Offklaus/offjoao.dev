/**
 * Entrada de cada página, no máximo 2 s, com os mesmos tempos e curvas em todas:
 * - glue: os papéis rasgados (.cut) são colados de ponta a ponta, da esquerda para a
 *   direita, um depois do outro;
 * - type: os textos são batidos letra a letra, como numa máquina de escrever, todos no
 *   mesmo ritmo e em cascata na ordem da página.
 */
export const INTRO = {
  total: 2,
  ease: [0.22, 1, 0.36, 1],
  glue: {
    stagger: 0.14,
    settle: 0.55,
    bounce: 0.25,
    fade: 0.12,
    lift: -75,
    perspective: 600,
    shadowFrom: 'drop-shadow(10px 16px 8px rgba(0, 0, 0, 0.35))',
    shadowTo: 'drop-shadow(3px 4px 0px rgba(0, 0, 0, 0.6))',
  },
  type: {
    start: 0.25,
    stagger: 0.09,
    step: 0.03,
    strike: 0.04,
    lastStart: 1.2,
  },
  // ícone ao lado de um texto (ex.: stack do Perfil): carimbado quando o texto começa
  stamp: {
    from: 1.6,
    settle: 0.3,
    bounce: 0.2,
  },
}

/** Início (s) da colagem de cada papel, para que todos assentem dentro do teto. */
export function glueSchedule(count, cfg = INTRO) {
  const { stagger, settle } = cfg.glue
  const gap = count > 1 ? Math.min(stagger, (cfg.total - settle) / (count - 1)) : 0
  return Array.from({ length: count }, (_, i) => i * gap)
}

/**
 * Início (s) e intervalo entre letras de cada bloco de texto. O intervalo é um só para a
 * página inteira: o padrão, ou o menor que ainda faz o bloco mais apertado caber no teto.
 */
export function typeSchedule(lengths, cfg = INTRO) {
  const { start, stagger, step, strike, lastStart } = cfg.type
  const count = lengths.length
  const gap = count > 1 ? Math.min(stagger, (lastStart - start) / (count - 1)) : 0
  const starts = lengths.map((_, i) => start + i * gap)

  let pageStep = step
  lengths.forEach((letters, i) => {
    if (letters > 1) {
      pageStep = Math.min(pageStep, (cfg.total - strike - starts[i]) / (letters - 1))
    }
  })

  return starts.map((blockStart) => ({ start: blockStart, step: pageStep }))
}
