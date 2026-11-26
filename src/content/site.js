/*
 * Todo o texto do portfólio mora aqui. Edite este arquivo; os componentes só leem.
 *
 * Regras (specs/001-portfolio-revista/data-model.md):
 * - `null` em src/url/href = ainda não fornecido. Imagem vira placeholder e link vira
 *   texto simples (nunca href="#").
 * - Textos entre [colchetes] são pendências: troque pelo conteúdo real.
 * - Links https:// abrem em nova aba; mailto: e arquivos em /public abrem na mesma aba.
 */

export const site = {
  brand: 'offjoão',
  domain: '.dev',
  role: 'FullStack · Engenharia de Software',
}

/** Ordem das páginas = ordem de folhear. */
export const pages = [
  { id: 'capa', path: '/', label: 'Capa', inMenu: false },
  { id: 'perfil', path: '/perfil', label: 'Perfil', inMenu: true },
  { id: 'destaque', path: '/destaque', label: 'Destaque', inMenu: true },
  { id: 'projetos', path: '/projetos', label: 'Projetos', inMenu: true },
  { id: 'contato', path: '/contato', label: 'Contato', inMenu: true },
]

export const capa = {
  title: 'João Victor', // em duas linhas na capa (uma por palavra)
  intro: 'Sistemas web para problemas reais, do chão de fábrica à agenda de um salão.',
  photo: {
    src: '/foto-joao-recorte.webp',
    alt: 'Foto de João Victor sorrindo, de óculos e camisa preta',
    placeholder: '[Sua foto]',
    ratio: '900 / 1027', // foto inteira, na proporção da imagem
    cutout: true, // sem fundo (WebP transparente): sem caixa, direto na página
  },
}

export const perfil = {
  titulo: ['Quem', 'é o dev?'],
  lead: 'Estudante de Engenharia de Software na UNINTER, construindo sistemas web para problemas reais.',
  paragrafos: ['Em busca de estágio em desenvolvimento web.'],
  stack: ['JavaScript', 'Node.js', 'Express', 'React', 'PostgreSQL', 'FullStack'],
  photo: {
    src: '/foto-joao.webp',
    alt: 'Foto de João Victor sorrindo, de óculos e camisa preta',
    placeholder: '[Sua foto]',
    ratio: '3 / 4', // foto inteira: a moldura segue a proporção da imagem (900 × 1200)
  },
}

export const destaque = {
  kicker: 'Matéria de capa · TCC',
  titulo: ['Do', 'chão de fábrica', 'ao código'],
  subtitulo:
    'OEE-Fabric: um sistema web para medir a eficiência das máquinas, testado na Qualitronix Tecnologia.',
  image: {
    src: '/projetos/oee-fabric.webp',
    alt: 'Dashboard do OEE-Fabric: OEE do setor com disponibilidade, performance, qualidade e a tendência dia a dia',
    placeholder: '[Print do OEE-Fabric]',
    position: 'top',
  },
  // Texto curto tirado do artigo (resumo e considerações finais)
  problema:
    'Produção, paradas e refugo eram anotados à mão e em planilhas, e as decisões chegavam atrasadas.',
  solucao:
    'Sistema web em que o operador registra cada evento na hora e o OEE sai em segundos, por ordem de produção, máquina e setor.',
  tipo: 'TCC · artigo',
  // Do repositório: front em JavaScript puro (esbuild) e API em Express sobre PostgreSQL
  stack: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
  artigo: { label: 'Ver artigo', href: '/artigo-tcc-oee-fabric.pdf' },
  repo: { label: 'Ver repositório', href: 'https://github.com/Offklaus/OEE-Fabric' },
}

export const projetos = [
  {
    number: '01',
    name: 'AdoPet',
    description: 'Site para adoção e doação de pets.',
    image: {
      src: '/projetos/adopet.webp',
      alt: 'Página inicial do AdoPet no celular: Amor adotado, amor redobrado',
      placeholder: '[Print]',
      position: 'top',
    },
    url: 'https://adopet-pjcw.onrender.com/',
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
  },
  {
    number: '02',
    name: 'Salon Beauty',
    description: 'Agendamento online para o salão.',
    image: {
      src: '/projetos/salon.webp',
      alt: 'Página inicial do Salon Beauty no celular: Lapidamos sua beleza com naturalidade, com o botão Agendar horário',
      placeholder: '[Print]',
      position: 'top',
    },
    url: 'https://lapidare.onrender.com/',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    number: '03',
    name: 'Oppe Clothing',
    description: 'Minha marca de streetwear e seu site-catálogo.',
    image: {
      src: '/projetos/oppe.webp',
      alt: 'Página inicial da Oppe Clothing no celular: Streetwear com fé, coleção Faith',
      placeholder: '[Print]',
      position: 'top',
    },
    url: 'https://www.oppeclothing.com/',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
  },
]

/*
 * Exemplo preenchido:
 * { type: 'E-mail', label: 'voce@exemplo.com', href: 'mailto:voce@exemplo.com' }
 * { type: 'Currículo', label: 'Baixar PDF', href: '/curriculo.pdf', download: true }
 */
export const contatos = [
  { type: 'E-mail', label: 'joaovictorsrs2002@gmail.com', href: 'mailto:joaovictorsrs2002@gmail.com' },
  { type: 'GitHub', label: 'Offklaus', href: 'https://github.com/Offklaus' },
  {
    type: 'LinkedIn',
    label: 'João Victor Pereira Ribeiro',
    href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-pereira-ribeiro-093784265/',
  },
  {
    type: 'Currículo',
    label: 'Baixar PDF',
    href: '/curriculo-joao-victor-pereira-ribeiro.pdf',
    download: true,
  },
]
