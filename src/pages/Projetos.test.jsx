import { screen, within } from '@testing-library/react'
import { renderAt } from '../test/renderAt'

describe('US6 · Outros projetos', () => {
  it('mostra três cartões numerados na ordem', () => {
    renderAt('/projetos')

    expect(screen.getByRole('heading', { level: 1, name: 'Outras obras' })).toBeInTheDocument()
    const cartoes = screen.getByRole('list', { name: 'Projetos' }).querySelectorAll(':scope > li')
    expect(cartoes).toHaveLength(3)

    const titulos = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(titulos).toEqual(['01 AdoPet', '02 Salon Beauty', '03 Oppe Clothing'])
    expect(screen.queryByText(/Times de Society/)).not.toBeInTheDocument()
  })

  it('só a Oppe Clothing abre o site em nova aba; AdoPet e Salon Beauty ficam sem link', () => {
    renderAt('/projetos')

    const lista = screen.getByRole('list', { name: 'Projetos' })
    const link = within(lista).getByRole('link')
    expect(link).toHaveAccessibleName(/Oppe Clothing/)
    expect(link).toHaveAttribute('href', 'https://www.oppeclothing.com/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    const prints = {
      AdoPet: '/projetos/adopet.webp',
      'Salon Beauty': '/projetos/salon.webp',
      'Oppe Clothing': '/projetos/oppe.webp',
    }
    for (const [nome, print] of Object.entries(prints)) {
      const cartao = screen.getByRole('heading', { level: 2, name: new RegExp(nome) }).closest('li')
      expect(within(cartao).getByRole('img')).toHaveAttribute('src', print)
    }
  })

  it('todos os cartões têm a etiqueta "Em produção"', () => {
    renderAt('/projetos')

    for (const cartao of screen.getByRole('list', { name: 'Projetos' }).querySelectorAll(':scope > li')) {
      expect(within(cartao).getByText('Em produção')).toBeInTheDocument()
    }
  })

  it('cada projeto mostra a stack usada, com o ícone de cada tecnologia', () => {
    renderAt('/projetos')

    const stacks = {
      AdoPet: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
      'Salon Beauty': ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
      'Oppe Clothing': ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
    }
    for (const [nome, tecnologias] of Object.entries(stacks)) {
      const itens = within(screen.getByRole('list', { name: `Stack do ${nome}` })).getAllByRole('listitem')
      expect(itens.map((li) => li.textContent)).toEqual(tecnologias)
      for (const item of itens) {
        expect(item.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
      }
    }
  })
})
