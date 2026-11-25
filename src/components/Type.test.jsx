import { render, screen } from '@testing-library/react'
import { IntroContext } from '../motion/IntroContext'
import Type from './Type'

describe('Type · texto batido à máquina', () => {
  it('com a entrada ligada, separa as letras e o leitor de tela lê o texto inteiro', () => {
    const { container } = render(
      <IntroContext.Provider value={true}>
        <h2>
          <Type text="Salon Beauty" tail=" →" />
        </h2>
      </IntroContext.Provider>,
    )

    expect(screen.getByRole('heading', { name: 'Salon Beauty' })).toBeInTheDocument()
    const letras = container.querySelectorAll('[data-type] > span')
    expect(Array.from(letras, (letra) => letra.textContent).join('')).toBe('SalonBeauty→')
    expect(container.querySelector('[data-type]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('sem a entrada (menos movimento), é texto puro', () => {
    const { container } = render(
      <p>
        <Type text="Em busca de estágio" />
      </p>,
    )

    expect(screen.getByText('Em busca de estágio')).toBeInTheDocument()
    expect(container.querySelector('[data-type]')).toBeNull()
  })
})
