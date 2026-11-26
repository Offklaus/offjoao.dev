import { glueSchedule, INTRO, typeSchedule } from './intro'

const fim = (bloco, letras) => bloco.start + bloco.step * Math.max(0, letras - 1) + INTRO.type.strike

describe('Entrada da página: régua de tempo', () => {
  it('termina toda a digitação em até 2 s, mesmo com muito texto', () => {
    const letras = [21, 100, 10, 95, 9, 123, 4, 12, 5, 29]
    const plano = typeSchedule(letras)

    plano.forEach((bloco, i) => {
      expect(fim(bloco, letras[i])).toBeLessThanOrEqual(INTRO.total + 1e-9)
    })
  })

  it('digita todos os textos da página no mesmo ritmo, em cascata na ordem da página', () => {
    const plano = typeSchedule([20, 80, 30])

    expect(new Set(plano.map((bloco) => bloco.step)).size).toBe(1)
    expect(plano[0].start).toBe(INTRO.type.start)
    expect(plano[1].start).toBeGreaterThan(plano[0].start)
    expect(plano[2].start).toBeGreaterThan(plano[1].start)
  })

  it('usa o ritmo padrão quando o texto é curto e só acelera quando precisa', () => {
    expect(typeSchedule([8, 12])[0].step).toBe(INTRO.type.step)
    expect(typeSchedule([8, 400])[0].step).toBeLessThan(INTRO.type.step)
  })

  it('cola os papéis um depois do outro e todos assentam em até 2 s', () => {
    const inicios = glueSchedule(3)

    expect(inicios[0]).toBe(0)
    expect(inicios[1]).toBeCloseTo(INTRO.glue.stagger)
    expect(inicios[2]).toBeCloseTo(INTRO.glue.stagger * 2)
    glueSchedule(12).forEach((inicio) => {
      expect(inicio + INTRO.glue.settle).toBeLessThanOrEqual(INTRO.total + 1e-9)
    })
  })

  it('o carimbo de um ícone, mesmo no último texto, assenta em até 2 s', () => {
    const ultimo = typeSchedule(Array(30).fill(10)).at(-1)
    expect(ultimo.start + INTRO.stamp.settle).toBeLessThanOrEqual(INTRO.total + 1e-9)
  })
})
