import Capa from './Capa'
import Contato from './Contato'
import Destaque from './Destaque'
import Perfil from './Perfil'
import Projetos from './Projetos'

/** Componente de cada página da revista, pelo `id` em content/site.js. */
export const views = {
  capa: Capa,
  perfil: Perfil,
  destaque: Destaque,
  projetos: Projetos,
  contato: Contato,
}
