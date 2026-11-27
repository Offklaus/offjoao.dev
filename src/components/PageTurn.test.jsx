import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import PageTurn from './PageTurn'

const renderTurn = (pageId) =>
  render(
    <MemoryRouter>
      <PageTurn pageId={pageId} />
    </MemoryRouter>,
  )

describe('US2 · Rodapé de folhear', () => {
  it('na capa mostra 01 / 06, Anterior desativado e Próxima para o Perfil', () => {
    renderTurn('capa')

    expect(screen.getByText('01 / 06')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Anterior/ })).not.toBeInTheDocument()
    expect(screen.getByText(/Anterior/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Próxima' })).toHaveAttribute('href', '/perfil')
  })

  it('no meio da revista liga as duas vizinhas', () => {
    renderTurn('destaque')

    expect(screen.getByText('03 / 06')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Anterior' })).toHaveAttribute('href', '/perfil')
    expect(screen.getByRole('link', { name: 'Próxima' })).toHaveAttribute('href', '/projetos')
  })

  it('o Roadmap fica entre Projetos e Contato', () => {
    renderTurn('roadmap')

    expect(screen.getByText('05 / 06')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Anterior' })).toHaveAttribute('href', '/projetos')
    expect(screen.getByRole('link', { name: 'Próxima' })).toHaveAttribute('href', '/contato')
  })

  it('na última página troca Próxima por Voltar à capa', () => {
    renderTurn('contato')

    expect(screen.getByText('06 / 06')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Anterior' })).toHaveAttribute('href', '/roadmap')
    expect(screen.getByRole('link', { name: 'Voltar à capa' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('link', { name: 'Próxima' })).not.toBeInTheDocument()
  })
})
