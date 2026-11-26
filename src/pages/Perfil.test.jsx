import { screen, within } from '@testing-library/react'
import { renderAt } from '../test/renderAt'

describe('US5 · Perfil', () => {
  it('apresenta quem é o dev e a formação, sem a Black Belt', () => {
    renderAt('/perfil')

    expect(screen.getByRole('heading', { level: 1, name: 'Quem é o dev?' })).toBeInTheDocument()
    expect(screen.getByText(/Engenharia de Software na UNINTER/)).toBeInTheDocument()
    expect(screen.getByText('Em busca de estágio em desenvolvimento web.')).toBeInTheDocument()
    expect(screen.queryByText(/Black Belt/)).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Foto de João Victor/ })).toHaveAttribute(
      'src',
      '/foto-joao.webp',
    )
  })

  it('lista a stack, cada tecnologia com o seu ícone', () => {
    renderAt('/perfil')

    const stack = screen.getByRole('list', { name: 'Stack' })
    const itens = within(stack).getAllByRole('listitem')
    expect(itens.map((li) => li.textContent)).toEqual([
      'JavaScript',
      'Node.js',
      'Express',
      'React',
      'PostgreSQL',
      'FullStack',
    ])
    for (const item of itens) {
      expect(item.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('o carrossel da stack não tem botão e é lido uma vez só', () => {
    renderAt('/perfil')

    expect(screen.queryByRole('button', { name: /carrossel/i })).not.toBeInTheDocument()
    // a cópia que fecha o laço do carrossel fica fora da árvore de acessibilidade
    expect(screen.getAllByRole('list', { name: 'Stack' })).toHaveLength(1)
  })
})
