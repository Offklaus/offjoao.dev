import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import SmartLink from '../components/SmartLink'
import { renderAt } from '../test/renderAt'

describe('US3 · Contato', () => {
  it('lista os quatro canais', () => {
    renderAt('/contato')

    expect(screen.getByRole('heading', { level: 1, name: 'Fale comigo' })).toBeInTheDocument()
    const lista = screen.getByRole('list', { name: 'Canais de contato' })
    for (const tipo of ['E-mail', 'GitHub', 'LinkedIn', 'Currículo']) {
      expect(within(lista).getByText(tipo)).toBeInTheDocument()
    }
  })

  it('GitHub e LinkedIn abrem o perfil em nova aba', () => {
    renderAt('/contato')

    const lista = screen.getByRole('list', { name: 'Canais de contato' })
    const perfis = [
      [/GitHub/, 'https://github.com/Offklaus'],
      [/LinkedIn/, 'https://www.linkedin.com/in/jo%C3%A3o-victor-pereira-ribeiro-093784265/'],
    ]
    for (const [nome, url] of perfis) {
      const link = within(lista).getByRole('link', { name: nome })
      expect(link).toHaveAttribute('href', url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('o currículo é baixado como PDF, na mesma aba', () => {
    renderAt('/contato')

    const lista = screen.getByRole('list', { name: 'Canais de contato' })
    const curriculo = within(lista).getByRole('link', { name: /Currículo/ })
    expect(curriculo).toHaveAttribute('href', '/curriculo-joao-victor-pereira-ribeiro.pdf')
    expect(curriculo).toHaveAttribute('download')
    expect(curriculo).not.toHaveAttribute('target')
  })

  it('o e-mail abre o cliente de e-mail na mesma aba', () => {
    renderAt('/contato')

    const lista = screen.getByRole('list', { name: 'Canais de contato' })
    const email = within(lista).getByRole('link', { name: /joaovictorsrs2002@gmail\.com/ })
    expect(email).toHaveAttribute('href', 'mailto:joaovictorsrs2002@gmail.com')
    expect(email).not.toHaveAttribute('target')
    expect(within(lista).getAllByRole('link')).toHaveLength(4)
  })
})

describe('US3 · Destinos dos canais (SmartLink)', () => {
  const renderLink = (props) =>
    render(
      <MemoryRouter>
        <SmartLink {...props}>Canal</SmartLink>
      </MemoryRouter>,
    )

  it('perfil externo abre em nova aba com rel seguro', () => {
    renderLink({ href: 'https://github.com/exemplo' })

    const link = screen.getByRole('link', { name: 'Canal (abre em nova aba)' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('e-mail abre o cliente de e-mail na mesma aba', () => {
    renderLink({ href: 'mailto:voce@exemplo.com' })

    const link = screen.getByRole('link', { name: 'Canal' })
    expect(link).toHaveAttribute('href', 'mailto:voce@exemplo.com')
    expect(link).not.toHaveAttribute('target')
  })

  it('currículo é baixado', () => {
    renderLink({ href: '/curriculo.pdf', download: true })

    expect(screen.getByRole('link', { name: 'Canal' })).toHaveAttribute('download')
  })
})
