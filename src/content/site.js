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
  { id: 'roadmap', path: '/roadmap', label: 'Roadmap', inMenu: true },
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

// status: etiqueta de papel no canto do print (ex.: 'Em produção'); sem status, sem etiqueta
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
    url: null, // sem link por enquanto (em produção)
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
    status: 'Em produção',
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
    url: null, // sem link por enquanto (em produção)
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL'],
    status: 'Em produção',
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
    status: 'Em produção',
  },
]

/*
 * Roadmap de estudos (aba "Concluído" e aba "Cursando agora").
 * - faculdade: do AVA da UNINTER. Só disciplinas aprovadas, sem atividades extensionistas
 *   nem reprovações; em curso, sem estágio e atividades complementares.
 * - alura: carreira na ordem da página da Alura. `progresso` (0–100) é copiado à mão:
 *   100 = concluído (caixa marcada), 1–99 = estudando agora (mostra a %), 0 = a fazer.
 *   Checkpoints (`checkpoint: true`) aparecem na linha, mas não contam como curso.
 */
export const roadmap = {
  titulo: ['Roadmap', 'de estudos'],
  faculdade: {
    nome: 'UNINTER',
    curso: 'Engenharia de Software',
    concluidas: [
      {
        ano: '2023',
        modulos: [
          { modulo: 'A1', disciplinas: ['Fundamentos de Design de Sistemas', 'Fundamentos da Computação'] },
          {
            modulo: 'A2',
            disciplinas: [
              'Fundamentos de Desenvolvimento de Software',
              'Fundamentos de Infraestrutura da Tecnologia da Informação',
            ],
          },
          {
            modulo: 'B1',
            disciplinas: ['Lógica de Programação e Algoritmos', 'Fundamentos de Sistemas de Informação'],
          },
          { modulo: 'B2', disciplinas: ['Engenharia de Software', 'Comunicação Empresarial'] },
          { modulo: 'C1', disciplinas: ['Interação Humano-Computador', 'Bancos de Dados Relacionais'] },
          { modulo: 'C2', disciplinas: ['Pré-Cálculo', 'Análise e Modelagem de Sistemas'] },
        ],
      },
      {
        ano: '2024',
        modulos: [
          {
            modulo: 'A1',
            disciplinas: ['Sistema Gerenciador de Banco de Dados', 'Programação Orientada a Objetos'],
          },
          { modulo: 'A2', disciplinas: ['Banco de Dados NoSQL', 'Aplicação Web e Móveis'] },
          { modulo: 'B1', disciplinas: ['Linguagem de Programação', 'Visualização de Dados e Storytelling'] },
          { modulo: 'B2', disciplinas: ['Desenvolvimento Web – Back-end', 'Qualidade de Software'] },
          { modulo: 'C1', disciplinas: ['Design para Dispositivos Móveis', 'Programação I'] },
          { modulo: 'C2', disciplinas: ['Gerência de Configuração e Evolução', 'Big Data'] },
        ],
      },
      {
        ano: '2025',
        modulos: [
          {
            modulo: 'A1',
            disciplinas: ['Ética Empresarial e Responsabilidade Socioambiental', 'Gestão de Projetos'],
          },
          { modulo: 'A2', disciplinas: ['Engenharia de Requisitos', 'Computação em Nuvem'] },
          { modulo: 'B1', disciplinas: ['Programação III', 'Governança de Sistemas da Informação'] },
          { modulo: 'B2', disciplinas: ['Desenvolvimento Web – Front-end', 'Internet das Coisas – IoT'] },
          { modulo: 'C1', disciplinas: ['Segurança de Sistemas de Informação'] },
          {
            modulo: 'C2',
            disciplinas: [
              'Trabalho de Conclusão de Curso: Projeto Final de Curso',
              'Métodos Ágeis',
              'Teste de Software',
            ],
          },
        ],
      },
      {
        ano: '2026',
        modulos: [
          { modulo: 'A1', disciplinas: ['Arquitetura de Sistemas', 'Métricas e Estimativa de Software'] },
          { modulo: 'A2', disciplinas: ['Modelagem de Processos e Negócios', 'DevOps e Integração Contínua'] },
          { modulo: 'B1', disciplinas: ['Programação II', 'Estética e Design Aplicado'] },
          {
            modulo: 'B2',
            disciplinas: ['Metodologia da Pesquisa Aplicada', 'Eletiva – Metodologia de Design e Concepção'],
          },
          { modulo: 'C1', disciplinas: ['Machine Learning', 'Gestão de Startups'] },
        ],
      },
    ],
    cursando: {
      ano: '2026',
      modulo: 'C2',
      disciplinas: ['Programação IV', 'Relações Étnico-raciais: Africana, Afro-brasileira e Indígena'],
    },
  },
  alura: {
    nome: 'Alura',
    carreira: 'Engenharia de Agentes de IA',
    niveis: [
      {
        nome: 'Base',
        sobre: 'Primeiros passos em programação para IA',
        cursos: [
          {
            titulo: 'Pensamento computacional',
            sub: 'Fundamentos da computação e lógica de programação',
            progresso: 100,
          },
          { titulo: 'Python', sub: 'Inteligência Artificial Aplicada', progresso: 22 },
        ],
      },
      {
        nome: 'Nível 1',
        sobre: 'Construção de agentes inteligentes com RAG',
        cursos: [
          { titulo: 'LangChain e Python', sub: 'Criando ferramentas com a OpenAI', progresso: 0 },
          {
            titulo: 'Arquiteturas RAG com LLMs',
            sub: 'Embeddings, busca semântica e criação de agentes com LangChain',
            progresso: 0,
          },
          { titulo: 'LangChain', sub: 'Técnicas avançadas de RAG', progresso: 0 },
          { titulo: 'LangGraph', sub: 'Orquestrando agentes e multiagentes', progresso: 0 },
          {
            titulo: 'Protocolos e arquitetura para construção de agentes',
            sub: 'MCP, A2A, AG-UI e Backend for Agents (BFA)',
            progresso: 0,
          },
          { titulo: 'Clusterização', sub: 'Lidando com dados sem rótulo', progresso: 0 },
          {
            titulo: 'NLP',
            sub: 'Aplicando processamento de linguagem natural para análise de sentimentos',
            progresso: 0,
          },
          {
            titulo: 'Checkpoint Engenharia de IA – Nível 1',
            sub: 'Atividade interativa · 2 horas',
            progresso: 0,
            checkpoint: true,
          },
        ],
      },
      {
        nome: 'Nível 2',
        sobre: 'Machine Learning, Deep Learning e Fine Tuning',
        cursos: [
          { titulo: 'Redes Neurais', sub: 'Deep Learning com PyTorch', progresso: 0 },
          { titulo: 'Treinando uma Rede Neural', sub: 'Deep Learning com PyTorch', progresso: 0 },
          { titulo: 'Redes Neurais Recorrentes', sub: 'Deep Learning com PyTorch', progresso: 0 },
          { titulo: 'Redes Neurais Convolucionais', sub: 'Deep Learning com PyTorch', progresso: 0 },
          { titulo: 'Hugging Face', sub: 'Explorando e aplicando soluções com modelos de IA', progresso: 0 },
          { titulo: 'Modelos de Difusão', sub: 'Fundamentos e aplicações avançadas', progresso: 0 },
          { titulo: 'Transformers', sub: 'Fundamentos e prática com PyTorch', progresso: 0 },
          {
            titulo: 'Checkpoint Engenharia de IA – Nível 2',
            sub: 'Atividade interativa · 2 horas',
            progresso: 0,
            checkpoint: true,
          },
        ],
      },
      {
        nome: 'Nível 3',
        sobre: 'MLOps: operando sistemas de IA em produção',
        cursos: [
          { titulo: 'Inteligência Artificial', sub: 'Preparação para o mercado', progresso: 0 },
          { titulo: 'Empreendendo com IA', sub: 'Da ideação ao modelo de negócio', progresso: 0 },
          { titulo: 'Observabilidade para LLMs', sub: 'Monitoramento e avaliação com LangFuse', progresso: 0 },
          { titulo: 'Pipelines de IA em Cloud', sub: 'Azure, AWS e GCP', progresso: 0 },
          {
            titulo: 'MLFlow',
            sub: 'Gerenciamento de experimentos e integração com IA generativa',
            progresso: 0,
          },
          {
            titulo: 'Integração contínua para LLMs',
            sub: 'Automatizando a avaliação de modelos com GitHub Actions e Deepeval',
            progresso: 0,
          },
          { titulo: 'Data Science', sub: 'Testando relações com Regressão Linear', progresso: 0 },
          { titulo: 'Hugging Face', sub: 'Transferindo aprendizado de modelos de NLP', progresso: 0 },
          {
            titulo: 'Checkpoint Engenharia de IA – Nível 3',
            sub: 'Atividade interativa · 2 horas',
            progresso: 0,
            checkpoint: true,
          },
        ],
      },
    ],
  },
}

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
