import { animate, stagger } from 'motion/react'
import { useLayoutEffect } from 'react'
import { glueSchedule, INTRO, typeSchedule } from './intro'

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
      const { glue, type } = INTRO
      const cuts = Array.from(root.querySelectorAll('.cut'))
      const glueStarts = glueSchedule(cuts.length)

      cuts.forEach((cut, i) => {
        const paper = cut.firstElementChild
        const delay = glueStarts[i]
        running.push(
          animate(paper, { opacity: [0, 1] }, { duration: glue.fade, delay, ease: 'linear' }),
          animate(
            paper,
            { rotateY: [glue.lift, 0], transformPerspective: [glue.perspective, glue.perspective] },
            { type: 'spring', visualDuration: glue.settle, bounce: glue.bounce, delay },
          ),
          animate(
            cut,
            { filter: [glue.shadowFrom, glue.shadowTo] },
            { duration: glue.settle, delay, ease: INTRO.ease },
          ),
        )
      })

      const blocks = Array.from(root.querySelectorAll('[data-type]'))
      const plan = typeSchedule(blocks.map((block) => block.children.length))

      blocks.forEach((block, i) => {
        const letters = Array.from(block.children)
        if (!letters.length) return
        running.push(
          animate(
            letters,
            { opacity: [0, 1] },
            { duration: type.strike, ease: 'linear', delay: stagger(plan[i].step, { startDelay: plan[i].start }) },
          ),
        )
      })
    } catch {
      root.removeAttribute('data-intro')
    }

    return () => running.forEach((animation) => animation.cancel())
  }, [rootRef, enabled])
}
