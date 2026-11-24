import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'

/** Renderiza o site inteiro já aberto no endereço `path`. */
export function renderAt(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}
