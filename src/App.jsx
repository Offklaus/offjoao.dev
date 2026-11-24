import { Route, Routes } from 'react-router'
import Layout from './components/Layout'

/** Uma rota só: o Layout lê a URL e a revista (Book) vira até a página certa. */
export default function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />} />
    </Routes>
  )
}
