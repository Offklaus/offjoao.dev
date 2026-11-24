import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAt } from './test/renderAt'

describe('US2 · Folhear a revista', () => {
  it('percorre as cinco páginas com Próxima e volta à capa', async () => {
    const user = userEvent.setup()
    renderAt('/')

    for (const folio of ['02 / 05', '03 / 05', '04 / 05', '05 / 05']) {
      await user.click(screen.getByRole('link', { name: 'Próxima' }))
      expect(screen.getByText(folio)).toBeInTheDocument()
    }

    await user.click(screen.getByRole('link', { name: 'Voltar à capa' }))
    expect(screen.getByRole('heading', { level: 1, name: 'João Victor' })).toBeInTheDocument()
  })

  it('marca a página atual no menu', () => {
    renderAt('/projetos')

    const menu = screen.getByRole('navigation', { name: 'Principal' })
    expect(within(menu).getByRole('link', { name: 'Projetos' })).toHaveAttribute('aria-current', 'page')
    expect(within(menu).getByRole('link', { name: 'Perfil' })).not.toHaveAttribute('aria-current')
  })

  it('abre direto uma página interna pelo endereço', () => {
    renderAt('/projetos')

    expect(screen.getByRole('heading', { level: 1, name: 'Outras obras' })).toBeInTheDocument()
    expect(screen.getByText('04 / 05')).toBeInTheDocument()
  })

  it('atualiza o título da aba', () => {
    renderAt('/perfil')

    expect(document.title).toBe('offjoão.dev — Perfil')
  })

  it('oferece atalho para pular ao conteúdo', () => {
    renderAt('/')

    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'conteudo')
  })

  it('mostra página não encontrada para endereço inexistente', () => {
    renderAt('/nao-existe')

    expect(screen.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar à capa' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('navigation', { name: 'Folhear' })).not.toBeInTheDocument()
    expect(document.title).toBe('offjoão.dev — Página não encontrada')
  })
})
