import { glueAt, glueSchedule, glueStep, INTRO, typeSchedule } from './intro'

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

  it('cola os papéis numa passada só, emendados e na mesma velocidade', () => {
    const larguras = [120, 360, 240]
    const plano = glueSchedule(larguras)

    expect(plano[0].start).toBe(0)
    // cada papel começa quando o anterior termina
    expect(plano[1].start).toBeCloseTo(plano[0].start + plano[0].duration)
    expect(plano[2].start).toBeCloseTo(plano[1].start + plano[1].duration)
    // mesma velocidade (px/s): o tempo de cada papel é proporcional à largura
    const velocidades = plano.map((papel, i) => larguras[i] / papel.duration)
    velocidades.forEach((v) => expect(v).toBeCloseTo(velocidades[0]))
    // a passada inteira dura o mesmo em toda página e cabe no teto
    const fim = plano.at(-1).start + plano.at(-1).duration
    expect(fim).toBeCloseTo(INTRO.glue.sweep)
    expect(fim).toBeLessThanOrEqual(INTRO.total)
  })

  it('a passada anda igual: um papel só começa quando o anterior está todo colado', () => {
    // dois papéis, o segundo com o dobro da largura (1/3 e 2/3 da passada)
    expect(glueAt(0, [100, 200])).toEqual([0, 0])
    expect(glueAt(1 / 6, [100, 200])[0]).toBeCloseTo(0.5)
    expect(glueAt(1 / 3, [100, 200])).toEqual([1, 0])
    expect(glueAt(2 / 3, [100, 200])[1]).toBeCloseTo(0.5)
    expect(glueAt(1, [100, 200])).toEqual([1, 1])
  })

  it('se o navegador engasga, a passada desacelera em vez de saltar, e termina no prazo', () => {
    const { sweep, maxStep, deadline } = INTRO.glue
    // quadro normal (60 fps): avança o tempo do quadro
    expect(glueStep(0, 1 / 60, 1 / 60)).toBeCloseTo(1 / 60 / sweep)
    // engasgo de 200 ms: avança só o teto de um quadro
    expect(glueStep(0.2, 0.2, 0.4)).toBeCloseTo(0.2 + maxStep / sweep)
    // muito atrasada: o prazo empurra até o fim, dentro do teto da entrada
    expect(glueStep(0.3, 0.05, deadline)).toBe(1)
    expect(deadline).toBeLessThanOrEqual(INTRO.total)
  })

  it('sem medida dos papéis, divide a passada por igual', () => {
    const plano = glueSchedule([0, 0])
    expect(plano[0].duration).toBeCloseTo(INTRO.glue.sweep / 2)
    expect(plano[1].start).toBeCloseTo(INTRO.glue.sweep / 2)
  })

  it('o carimbo de um ícone, mesmo no último texto, assenta em até 2 s', () => {
    const ultimo = typeSchedule(Array(30).fill(10)).at(-1)
    expect(ultimo.start + INTRO.stamp.settle).toBeLessThanOrEqual(INTRO.total + 1e-9)
  })
})
