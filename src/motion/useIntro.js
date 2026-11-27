import { animate } from 'motion/react'
import { useLayoutEffect } from 'react'
import { glueAt, glueStep, INTRO, typeSchedule } from './intro'

/**
 * Roda a entrada da página dentro de `rootRef` (o <main>), antes da primeira pintura:
 * cola os papéis (.cut) e bate as letras dos <Type>. Se algo falhar, mostra tudo.
 */
export function useIntro(rootRef, enabled) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!enabled || !root) return undefined

    const running = []
    try {
      // [data-intro-skip]: partes fora da colagem (ex.: os painéis de abas do Roadmap, que
      // trocam depois da entrada); intro.css também não as esconde
      const cuts = Array.from(root.querySelectorAll('.cut')).filter((cut) => !cut.closest('[data-intro-skip]'))
      // largura de layout (sem a inclinação); medida de novo quando as fontes chegam
      const measure = () => cuts.map((cut) => cut.offsetWidth)
      let widths = measure()
      document.fonts?.ready.then(() => {
        widths = measure()
      })

      // Uma passada só, de 0 a 1, avançada quadro a quadro em velocidade constante (sem
      // saltar se o navegador engasgar): a cada quadro vira o --glue de cada papel
      // (intro.css mostra a parte já assentada e desenha a dobra na frente dela).
      // Papel assentado perde o recorte (a sombra da direita volta inteira).
      const settle = (cut) => {
        cut.style.setProperty('--glue', '1')
        cut.style.clipPath = 'none'
      }
      if (cuts.length) {
        let progress = 0
        let first = null
        let last = null
        let raf = 0
        const step = (now) => {
          first ??= now
          last ??= now
          progress = glueStep(progress, (now - last) / 1000, (now - first) / 1000)
          last = now
          glueAt(progress, widths).forEach((value, i) => {
            if (value >= 1) settle(cuts[i])
            else cuts[i].style.setProperty('--glue', String(value))
          })
          if (progress < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
        running.push({ cancel: () => cancelAnimationFrame(raf) })
      }

      const blocks = Array.from(root.querySelectorAll('[data-type]'))
      const plan = typeSchedule(blocks.map((block) => block.children.length))

      // Máquina de escrever: cada letra (e o item de um ícone) aparece de uma vez no seu
      // instante. Um laço só revela todas — centenas de animações, uma por letra, faziam
      // o navegador engasgar e a colagem perder quadros.
      const strikes = []
      blocks.forEach((block, i) => {
        const { start, step } = plan[i]
        const host = block.closest(':has(> [data-stamp])')
        const stamp = host?.querySelector(':scope > [data-stamp]')
        if (stamp) {
          strikes.push({ el: host, at: start }, { el: stamp, at: start })
          running.push(
            animate(
              stamp,
              { scale: [INTRO.stamp.from, 1] },
              { type: 'spring', visualDuration: INTRO.stamp.settle, bounce: INTRO.stamp.bounce, delay: start },
            ),
          )
        }
        Array.from(block.children).forEach((letter, j) => strikes.push({ el: letter, at: start + j * step }))
      })
      strikes.sort((a, b) => a.at - b.at)

      if (strikes.length) {
        let next = 0
        let first = null
        let raf = 0
        const strike = (now) => {
          first ??= now
          const elapsed = (now - first) / 1000
          while (next < strikes.length && strikes[next].at <= elapsed) strikes[next++].el.style.opacity = '1'
          if (next < strikes.length) raf = requestAnimationFrame(strike)
        }
        raf = requestAnimationFrame(strike)
        running.push({ cancel: () => cancelAnimationFrame(raf) })
      }
    } catch {
      root.removeAttribute('data-intro')
    }

    return () => running.forEach((animation) => animation.cancel())
  }, [rootRef, enabled])
}
