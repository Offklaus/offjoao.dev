import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles/tokens.css'
import './styles/global.css'
import './styles/paper.css'
import './styles/pages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* basename = subcaminho do deploy (/offjoao.dev/ no GitHub Pages, / no dev) */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
