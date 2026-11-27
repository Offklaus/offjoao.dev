import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAt } from '../test/renderAt'

const disciplinas = (painel) =>
  within(painel)
    .getAllByRole('list', { name: /^Disciplinas do módulo/ })
    .flatMap((lista) => within(lista).getAllByRole('listitem'))

describe('US7 · Roadmap de estudos', () => {
  it('entra no menu e no folhear entre Projetos e Contato', () => {
    renderAt('/roadmap')

    expect(screen.getByRole('heading', { level: 1, name: 'Roadmap de estudos' })).toBeInTheDocument()
    const menu = screen.getByRole('navigation', { name: 'Principal' })
    expect(within(menu).getByRole('link', { name: 'Roadmap' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('05 / 06')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Anterior' })).toHaveAttribute('href', '/projetos')
    expect(screen.getByRole('link', { name: 'Próxima' })).toHaveAttribute('href', '/contato')
    expect(document.title).toBe('offjoão.dev — Roadmap')
  })

  it('abre na aba Concluído com as 46 disciplinas da faculdade, por ano e módulo', () => {
    renderAt('/roadmap')

    const abas = within(screen.getByRole('tablist', { name: 'O que mostrar no roadmap' })).getAllByRole('tab')
    expect(abas.map((aba) => aba.textContent)).toEqual(['Concluído', 'Cursando agora'])
    expect(abas[0]).toHaveAttribute('aria-selected', 'true')
    expect(abas[1]).toHaveAttribute('aria-selected', 'false')

    const painel = screen.getByRole('tabpanel', { name: 'Concluído' })
    const anos = within(painel).getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(anos).toEqual(['2023', '2024', '2025', '2026'])
    expect(within(painel).getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('Módulo A1')

    const itens = disciplinas(painel).map((li) => li.textContent)
    expect(itens).toHaveLength(46)
    expect(itens[0]).toBe('Fundamentos de Design de Sistemas')
    expect(itens.at(-1)).toBe('Gestão de Startups')
    expect(itens).toContain('Machine Learning')
  })

  it('deixa de fora extensionistas, reprovações, estágio e o que ainda está em curso', () => {
    renderAt('/roadmap')

    const texto = screen.getByRole('tabpanel', { name: 'Concluído' }).textContent
    for (const fora of [
      'Atividades Extensionistas',
      'Inteligência Artificial - IA',
      'Estágio',
      'Atividades Complementares',
      'Programação IV',
    ]) {
      expect(texto).not.toContain(fora)
    }
  })

  it('a aba Cursando agora mostra a faculdade à esquerda e a Alura à direita', async () => {
    const user = userEvent.setup()
    renderAt('/roadmap')

    await user.click(screen.getByRole('tab', { name: 'Cursando agora' }))
    expect(screen.getByRole('tab', { name: 'Cursando agora' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.queryByRole('tabpanel', { name: 'Concluído' })).not.toBeInTheDocument()

    const painel = screen.getByRole('tabpanel', { name: 'Cursando agora' })
    const colunas = within(painel).getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(colunas).toEqual(['Faculdade', 'Alura Engenharia de Agentes de IA'])

    const faculdade = disciplinas(painel).map((li) => li.textContent)
    expect(faculdade).toEqual([
      'Programação IV Estudando agora',
      'Relações Étnico-raciais: Africana, Afro-brasileira e Indígena Estudando agora',
    ])
  })

  it('cada curso da Alura mostra o estado: concluído, estudando agora com a % ou a fazer', async () => {
    const user = userEvent.setup()
    renderAt('/roadmap?aba=cursando')

    const painel = screen.getByRole('tabpanel', { name: 'Cursando agora' })
    const niveis = within(painel).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(niveis).toEqual(['Base', 'Nível 1', 'Nível 2', 'Nível 3'])
    expect(within(painel).getByText('1 de 24 cursos concluídos · 1 em andamento')).toBeInTheDocument()

    const cursos = within(painel)
      .getAllByRole('list', { name: /^Cursos do nível/ })
      .flatMap((lista) => within(lista).getAllByRole('listitem'))
    expect(cursos).toHaveLength(27) // 24 cursos + 3 checkpoints

    const curso = (titulo) => cursos.find((li) => li.querySelector('b')?.textContent === titulo)
    expect(curso('Pensamento computacional')).toHaveTextContent('Concluído · 100%')
    expect(curso('Python')).toHaveTextContent('Estudando agora · 22%')
    expect(curso('LangGraph')).toHaveTextContent('A fazer')

    // o atalho da coluna da faculdade volta para a aba Concluído
    await user.click(within(painel).getByRole('button', { name: /46 disciplinas concluídas/ }))
    expect(screen.getByRole('tab', { name: 'Concluído' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Concluído' })).toHaveFocus()
  })

  it('troca de aba pelo teclado, só a aba selecionada fica no Tab', async () => {
    const user = userEvent.setup()
    renderAt('/roadmap')

    const concluido = screen.getByRole('tab', { name: 'Concluído' })
    const cursando = screen.getByRole('tab', { name: 'Cursando agora' })
    expect(concluido).toHaveAttribute('tabindex', '0')
    expect(cursando).toHaveAttribute('tabindex', '-1')

    concluido.focus()
    await user.keyboard('{ArrowRight}')
    expect(cursando).toHaveAttribute('aria-selected', 'true')
    expect(cursando).toHaveFocus()

    await user.keyboard('{Home}')
    expect(concluido).toHaveAttribute('aria-selected', 'true')
    expect(concluido).toHaveFocus()

    await user.keyboard('{End}')
    expect(cursando).toHaveAttribute('aria-selected', 'true')
  })
})
