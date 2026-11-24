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

  it('lista a stack', () => {
    renderAt('/perfil')

    const stack = screen.getByRole('list', { name: 'Stack' })
    const itens = within(stack).getAllByRole('listitem').map((li) => li.textContent)
    expect(itens).toEqual(['JavaScript', 'Node.js', 'React', 'PostgreSQL', 'FullStack'])
  })
})
