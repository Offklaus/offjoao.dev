import { screen, within } from '@testing-library/react'
import { renderAt } from '../test/renderAt'

describe('US6 · Outros projetos', () => {
  it('mostra três cartões numerados na ordem', () => {
    renderAt('/projetos')

    expect(screen.getByRole('heading', { level: 1, name: 'Outras obras' })).toBeInTheDocument()
    const cartoes = within(screen.getByRole('list', { name: 'Projetos' })).getAllByRole('listitem')
    expect(cartoes).toHaveLength(3)

    const titulos = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(titulos).toEqual(['01 AdoPet', '02 Salon Beauty', '03 Oppe Clothing'])
    expect(screen.queryByText(/Times de Society/)).not.toBeInTheDocument()
  })

  it('cada projeto mostra o print e abre o site em nova aba', () => {
    renderAt('/projetos')

    const lista = screen.getByRole('list', { name: 'Projetos' })
    const sites = [
      ['AdoPet', 'https://adopet-pjcw.onrender.com/', '/projetos/adopet.webp'],
      ['Salon Beauty', 'https://lapidare.onrender.com/', '/projetos/salon.webp'],
      ['Oppe Clothing', 'https://www.oppeclothing.com/', '/projetos/oppe.webp'],
    ]
    expect(within(lista).getAllByRole('link')).toHaveLength(sites.length)
    for (const [nome, url, print] of sites) {
      const link = within(lista).getByRole('link', { name: new RegExp(nome) })
      expect(link).toHaveAttribute('href', url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(within(link).getByRole('img')).toHaveAttribute('src', print)
    }
  })
})
