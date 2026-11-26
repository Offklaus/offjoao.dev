/**
 * Entrada de cada página, no máximo 2 s, com os mesmos tempos e curvas em todas:
 * - glue: os papéis rasgados (.cut) são assentados de ponta a ponta numa passada só, da
 *   esquerda para a direita e em velocidade constante, um papel emendado no outro;
 * - type: os textos são batidos letra a letra, como numa máquina de escrever, todos no
 *   mesmo ritmo e em cascata na ordem da página.
 */
export const INTRO = {
  total: 2,
  glue: {
    // duração (s) da passada que assenta todos os papéis da página
    sweep: 0.8,
    // maior avanço (s) num quadro: se o navegador engasga, a passada desacelera em vez
    // de saltar
    maxStep: 1 / 30,
    // a passada termina, no pior caso, até este instante (s), dentro do teto
    deadline: 1.9,
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

/**
 * Início e duração (s) da colagem de cada papel, dada a largura de cada um. A passada é
 * uma só e na mesma velocidade: cada papel leva o tempo proporcional à sua largura e
 * começa quando o anterior termina. Sem medida (larguras zeradas), divide por igual.
 */
export function glueSchedule(widths, cfg = INTRO) {
  const { sweep } = cfg.glue
  const sized = widths.map((width) => Math.max(0, width) || 0)
  const total = sized.reduce((sum, width) => sum + width, 0)
  const share = (width) => (total > 0 ? width / total : 1 / sized.length)

  let start = 0
  return sized.map((width) => {
    const duration = sweep * share(width)
    const slot = { start, duration }
    start += duration
    return slot
  })
}

/**
 * Avança a passada (0–1) num quadro: `dt` é o tempo desde o quadro anterior e `elapsed`
 * desde o primeiro, em segundos. O avanço de um quadro tem teto (sem saltos quando o
 * navegador engasga), e o prazo garante o fim dentro do teto da entrada.
 */
export function glueStep(progress, dt, elapsed, cfg = INTRO) {
  const { sweep, maxStep, deadline } = cfg.glue
  const next = progress + Math.min(Math.max(0, dt), maxStep) / sweep
  return Math.min(1, Math.max(next, elapsed / deadline))
}

/**
 * Quanto de cada papel já está assentado (0–1) quando a passada está em `progress`
 * (0–1). Como reparte pelas larguras do momento, a velocidade é a mesma em todos os
 * papéis mesmo que as larguras mudem no meio (ex.: a fonte termina de carregar).
 */
export function glueAt(progress, widths, cfg = INTRO) {
  const elapsed = progress * cfg.glue.sweep
  return glueSchedule(widths, cfg).map(({ start, duration }) =>
    duration > 0 ? Math.min(1, Math.max(0, (elapsed - start) / duration)) : 1,
  )
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
