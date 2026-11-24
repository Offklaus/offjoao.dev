import { screen } from '@testing-library/react'
import { renderAt } from '../test/renderAt'

describe('US4 · Matéria de capa', () => {
  it('apresenta rótulo, título em recortes, subtítulo e o print do OEE-Fabric', () => {
    renderAt('/destaque')

    expect(screen.getByText('Matéria de capa · TCC')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Do chão de fábrica ao código' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/OEE-Fabric: um sistema web/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Dashboard do OEE-Fabric/ })).toBeInTheDocument()
  })

  it('mostra o problema da fábrica e a solução em textos curtos', () => {
    renderAt('/destaque')

    expect(screen.getByRole('heading', { level: 2, name: 'O problema' })).toBeInTheDocument()
    expect(screen.getByText(/anotados à mão e em planilhas/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'A solução' })).toBeInTheDocument()
    expect(screen.getByText(/OEE sai em segundos/)).toBeInTheDocument()
  })

  it('o botão Ver artigo abre o PDF do TCC em nova aba', () => {
    renderAt('/destaque')

    const artigo = screen.getByRole('link', { name: /Ver artigo/ })
    expect(artigo).toHaveAttribute('href', '/artigo-tcc-oee-fabric.pdf')
    expect(artigo).toHaveAttribute('target', '_blank')
    expect(artigo).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('mostra a ficha técnica e o link do repositório do TCC em nova aba', () => {
    renderAt('/destaque')

    expect(screen.getByText('TCC · artigo')).toBeInTheDocument()
    expect(screen.getByText('Node.js · Express · PostgreSQL')).toBeInTheDocument()
    const repo = screen.getByRole('link', { name: /Ver repositório/ })
    expect(repo).toHaveAttribute('href', 'https://github.com/Offklaus/OEE-Fabric')
    expect(repo).toHaveAttribute('target', '_blank')
  })
})
