import { screen, within } from '@testing-library/react'
import { renderAt } from '../test/renderAt'

describe('US1 · Capa', () => {
  it('apresenta o nome, a área e a frase de apresentação', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'João Victor' })).toBeInTheDocument()
    expect(screen.getByText('Desenvolvedor web · Engenharia de Software')).toBeInTheDocument()
    expect(screen.getByText(/Sistemas web para problemas reais/)).toBeInTheDocument()
    expect(screen.queryByText(/Portfólio/i)).not.toBeInTheDocument()
    expect(screen.queryByText('por João')).not.toBeInTheDocument()
    expect(screen.queryByText(/que saíram do papel/)).not.toBeInTheDocument()
  })

  it('mostra a foto do João sem fundo, com texto alternativo', () => {
    renderAt('/')

    expect(screen.getByRole('img', { name: /Foto de João Victor/ })).toHaveAttribute(
      'src',
      '/foto-joao-recorte.webp',
    )
    expect(screen.queryByText('[Sua foto]')).not.toBeInTheDocument()
  })

  it('exibe a marca e o menu com as outras páginas', () => {
    renderAt('/')

    expect(screen.getByRole('link', { name: 'offjoão.dev — capa' })).toHaveAttribute('href', '/')
    const menu = screen.getByRole('navigation', { name: 'Principal' })
    for (const label of ['Perfil', 'Destaque', 'Projetos', 'Contato']) {
      expect(within(menu).getByRole('link', { name: label })).toBeInTheDocument()
    }
  })
})
