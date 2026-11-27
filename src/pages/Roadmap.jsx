import { useId, useRef } from 'react'
import { useSearchParams } from 'react-router'
import Cut from '../components/Cut'
import Type from '../components/Type'
import { roadmap } from '../content/site'

/*
 * Roadmap de estudos (contracts/routes.md, "Roadmap"): duas abas, "Concluído" (linha do
 * tempo da faculdade) e "Cursando agora" (faculdade à esquerda, Alura à direita).
 * É a única página que rola (constituição 1.2.0): só o <main>, com a animação leve de
 * pages.css. Os painéis ficam fora da colagem de entrada (data-intro-skip): só o título
 * é colado, e nada que aparece ao trocar de aba fica escondido esperando a entrada.
 */

const ABAS = [
  { id: 'concluido', label: 'Concluído' },
  { id: 'cursando', label: 'Cursando agora' },
]

const TITLE = 'clamp(34px, min(6.7vw, 10.5svh), 96px)'
const TITLE_SERIF = 'clamp(32px, min(6.4vw, 10svh), 92px)'
const MARKER = 'clamp(26px, 3vw, 40px)'

const { faculdade, alura } = roadmap
const anos = faculdade.concluidas
const totalConcluidas = anos.reduce(
  (soma, ano) => soma + ano.modulos.reduce((n, modulo) => n + modulo.disciplinas.length, 0),
  0,
)
const cursosAlura = alura.niveis.flatMap((nivel) => nivel.cursos).filter((curso) => !curso.checkpoint)

const estadoDe = (progresso) => (progresso >= 100 ? 'done' : progresso > 0 ? 'now' : 'todo')

export default function Roadmap() {
  const [params, setParams] = useSearchParams()
  const atual = params.get('aba') === 'cursando' ? 'cursando' : 'concluido'
  const base = useId()
  const tabs = useRef({})

  const escolher = (id, { focus = false } = {}) => {
    setParams(
      (anteriores) => {
        const proximos = new URLSearchParams(anteriores)
        if (id === 'concluido') proximos.delete('aba')
        else proximos.set('aba', id)
        return proximos
      },
      { replace: true },
    )
    if (focus) tabs.current[id]?.focus()
  }

  // Setas, Home e End trocam de aba (padrão de abas do WAI-ARIA)
  const onKeyDown = (event) => {
    const i = ABAS.findIndex((aba) => aba.id === atual)
    const alvo = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: ABAS.length - 1 }[event.key]
    if (alvo === undefined) return
    event.preventDefault()
    escolher(ABAS[(alvo + ABAS.length) % ABAS.length].id, { focus: true })
  }

  return (
    <div className="sheet sheet--scroll">
      <div className="roadmap-head">
        <h1 className="title-cuts">
          <Cut jag={2} tilt={1} font="anton" paper="white" size={TITLE}>
            {roadmap.titulo[0]}
          </Cut>{' '}
          <Cut jag={1} tilt={2} font="serif" paper="news" size={TITLE_SERIF}>
            {roadmap.titulo[1]}
          </Cut>
        </h1>
        <div className="tabs" role="tablist" aria-label="O que mostrar no roadmap" onKeyDown={onKeyDown}>
          {ABAS.map((aba) => (
            <button
              key={aba.id}
              ref={(element) => {
                tabs.current[aba.id] = element
              }}
              type="button"
              role="tab"
              id={`${base}-aba-${aba.id}`}
              aria-selected={aba.id === atual}
              aria-controls={`${base}-painel-${aba.id}`}
              tabIndex={aba.id === atual ? 0 : -1}
              onClick={() => escolher(aba.id)}
            >
              <Type text={aba.label} />
            </button>
          ))}
        </div>
      </div>

      {ABAS.map((aba) => (
        <div
          key={aba.id}
          role="tabpanel"
          id={`${base}-painel-${aba.id}`}
          aria-labelledby={`${base}-aba-${aba.id}`}
          className="roadmap-panel"
          hidden={aba.id !== atual}
          data-intro-skip=""
        >
          {aba.id === 'concluido' ? (
            <Concluido />
          ) : (
            <Cursando onVerConcluido={() => escolher('concluido', { focus: true })} />
          )}
        </div>
      ))}
    </div>
  )
}

/** Aba "Concluído": a faculdade de 2023 até hoje, um ano por vez, módulos alternando. */
function Concluido() {
  return (
    <>
      <div className="roadmap-meta">
        <p className="kicker">
          {faculdade.curso} · {faculdade.nome} · {totalConcluidas} disciplinas concluídas de {anos[0].ano} a{' '}
          {anos.at(-1).ano}
        </p>
        <Hint />
      </div>
      <div className="tl tl--zigzag">
        <span className="tl-fill" aria-hidden="true" />
        {anos.map((ano, k) => (
          <section key={ano.ano} className="tl-year">
            <h2 className="tl-marker tl-in">
              <Cut jag={[2, 1, 3, 2][k % 4]} tilt={[1, 2, 3, 2][k % 4]} font="anton" paper="white" size={MARKER}>
                {ano.ano}
              </Cut>
            </h2>
            <ol className="tl-mods">
              {ano.modulos.map((modulo, i) => (
                <li
                  key={modulo.modulo}
                  className="tl-mod"
                  data-side={i % 2 ? 'r' : 'l'}
                  style={{ '--row': i + 1 }}
                >
                  <h3 className="tl-badge tl-in">
                    <span className="sr-only">Módulo </span>
                    {modulo.modulo}
                  </h3>
                  <ul className="tl-cards" aria-label={`Disciplinas do módulo ${modulo.modulo} de ${ano.ano}`}>
                    {modulo.disciplinas.map((disciplina) => (
                      <li key={disciplina} className="tl-item">
                        <span className="tl-card is-done tl-in">
                          <Check state="done" />
                          {disciplina}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  )
}

/** Aba "Cursando agora": faculdade à esquerda, carreira da Alura à direita. */
function Cursando({ onVerConcluido }) {
  const { cursando } = faculdade
  const feitos = cursosAlura.filter((curso) => estadoDe(curso.progresso) === 'done').length
  const andamento = cursosAlura.filter((curso) => estadoDe(curso.progresso) === 'now').length

  return (
    <>
      <div className="roadmap-meta">
        <Legend />
        <Hint />
      </div>
      <div className="now-cols">
        <section className="now-col">
          <div className="now-head">
            <h2 className="title-cuts">
              <Cut jag={2} tilt={1} font="anton" paper="white" size={MARKER}>
                Faculdade
              </Cut>
            </h2>
            <p className="kicker">
              {faculdade.nome} · {faculdade.curso} · módulo {cursando.modulo} de {cursando.ano}
            </p>
          </div>
          <div className="tl tl--rail tl--short">
            <p className="tl-marker tl-in">
              <Cut jag={2} tilt={2} font="anton" paper="white" size={MARKER}>
                {cursando.ano}
              </Cut>
            </p>
            <div className="tl-mod">
              <span className="tl-badge is-now tl-in">
                <span className="sr-only">Módulo </span>
                {cursando.modulo}
              </span>
              <ul className="tl-cards" aria-label={`Disciplinas do módulo ${cursando.modulo} de ${cursando.ano}`}>
                {cursando.disciplinas.map((disciplina) => (
                  <li key={disciplina} className="tl-item">
                    <span className="tl-card is-now tl-in">
                      <Check state="now" />
                      <span className="tl-text">
                        <span>{disciplina}</span> <span className="tl-status">Estudando agora</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button type="button" className="tl-card is-done tl-link tl-in" onClick={onVerConcluido}>
            <Check state="done" />
            <span className="tl-text">
              <b>{totalConcluidas} disciplinas concluídas</b>{' '}
              <span className="tl-status">
                Ver na aba Concluído <span aria-hidden="true">→</span>
              </span>
            </span>
          </button>
        </section>

        <div className="now-rule" aria-hidden="true" />

        <section className="now-col">
          <div className="now-head">
            <h2 className="title-cuts">
              <Cut jag={1} tilt={2} font="anton" paper="white" size={MARKER}>
                {alura.nome}
              </Cut>{' '}
              {/* jag 3: borda direita quase reta, o rasgo não come a última letra */}
              <Cut jag={3} tilt={2} font="serif" paper="news" size="clamp(22px, 2.3vw, 30px)">
                {alura.carreira}
              </Cut>
            </h2>
            <p className="kicker">
              Carreira ·{' '}
              <span>
                {feitos} de {cursosAlura.length} cursos concluídos · {andamento} em andamento
              </span>
            </p>
          </div>
          <div className="tl tl--rail">
            <span className="tl-fill" aria-hidden="true" />
            {alura.niveis.map((nivel, k) => (
              <div key={nivel.nome} className="tl-level">
                <div className="tl-level-head tl-in">
                  <h3 className="tl-marker">
                    <Cut jag={[2, 1, 3, 2][k % 4]} tilt={[1, 2, 3, 2][k % 4]} font="anton" paper="white" size={MARKER}>
                      {nivel.nome}
                    </Cut>
                  </h3>
                  <p className="kicker">{nivel.sobre}</p>
                </div>
                <ol className="tl-mods" aria-label={`Cursos do nível ${nivel.nome}`}>
                  {nivel.cursos.map((curso, i) => (
                    <Curso key={curso.titulo} curso={curso} numero={String(i + 1).padStart(2, '0')} />
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

/** Um curso da Alura: selo com o número no trilho e o cartão com o estado. */
function Curso({ curso, numero }) {
  const estado = estadoDe(curso.progresso)
  return (
    <li className="tl-mod tl-mod--single tl-in">
      <span className={`tl-badge is-${estado}`} aria-hidden="true">
        {numero}
      </span>
      <span
        className={`tl-card is-${estado}`}
        style={estado === 'now' ? { '--progress': `${curso.progresso}%` } : undefined}
      >
        <Check state={estado} />
        <span className="tl-text">
          <b>{curso.titulo}</b> <span className="tl-sub">{curso.sub}</span>{' '}
          {estado === 'done' && <span className="tl-status">Concluído · 100%</span>}
          {estado === 'now' && <span className="tl-status">Estudando agora · {curso.progresso}%</span>}
          {estado === 'todo' && <span className="sr-only">A fazer</span>}
        </span>
      </span>
    </li>
  )
}

/** Caixa de seleção desenhada: marcada (já estudei), vazia (estudando agora) ou apagada (a fazer). */
function Check({ state }) {
  return (
    <svg className={`tl-check is-${state}`} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="16" height="16" />
      {state === 'done' && <path d="M4.5 9.5 L7.5 12.5 L13.5 5.5" />}
    </svg>
  )
}

function Legend() {
  return (
    <ul className="tl-legend" aria-label="Legenda">
      <li>
        <Check state="done" />
        Já estudei
      </li>
      <li>
        <Check state="now" />
        Estudando agora
      </li>
      <li>
        <Check state="todo" />A fazer
      </li>
    </ul>
  )
}

function Hint() {
  return (
    <p className="kicker roadmap-hint">
      Role para seguir a linha <span aria-hidden="true">↓</span>
    </p>
  )
}
