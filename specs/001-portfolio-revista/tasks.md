---

description: "Lista de tarefas do Portfólio Revista 2002"
---

# Tasks: Portfólio "Revista 2002"

**Input**: Design documents from `/specs/001-portfolio-revista/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/routes.md

**Tests**: incluídos — exigidos pelo Princípio V da constituição (um teste por user story).

**Organization**: tarefas agrupadas por user story para entrega incremental.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência pendente)
- **[Story]**: user story da spec (US1…US6)

## Path Conventions

Projeto único na raiz: `src/`, `public/`, testes `*.test.jsx` ao lado do código.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: inicializar o projeto Vite + React

- [X] T001 Gerar o template `react` do create-vite e copiar `package.json`, `vite.config.js`, `.oxlintrc.json`, `.gitignore` e `public/favicon.svg` para a raiz
- [X] T002 Instalar `react-router` e as dependências de teste (`vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`) em `package.json`
- [X] T003 Configurar Vitest (jsdom, globals, setup) em `vite.config.js` e `src/test/setup.js`; adicionar scripts `test` e `test:watch` em `package.json`
- [X] T004 [P] Escrever `index.html` com `lang="pt-BR"`, meta description, `theme-color`, preconnect e Google Fonts (research.md R4)
- [X] T005 [P] Iniciar o repositório git e conferir `.gitignore` (node_modules, dist, coverage, `*.log`, `.env*`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: tokens, peças de papel, conteúdo e moldura usados por todas as páginas

**⚠️ CRITICAL**: nenhuma user story começa antes desta fase

- [X] T006 [P] Definir tokens de cor, fonte e espaçamento em `src/styles/tokens.css`
- [X] T007 [P] Estilos de mesa, página, cabeçalho, menu, rodapé de folhear, foco, skip link e animação `pagein` com movimento reduzido em `src/styles/global.css`
- [X] T008 [P] Copiar do canvas as classes de recorte (`cut`, `j1–j3`, `r1–r3`, `f-*`, `p-*`), foto rasgada e fita para `src/styles/paper.css`
- [X] T009 [P] Criar o módulo de conteúdo `src/content/site.js` com `site`, `pages`, `capa`, `perfil`, `destaque`, `projetos`, `contatos` (data-model.md: Site, Page, Image, Profile, Project, ContactChannel)
- [X] T010 [P] Componente `Cut` (palavra recortada: `jag`, `tilt`, `font`, `paper`) em `src/components/Cut.jsx`
- [X] T011 [P] Componente `Photo` (imagem ou placeholder, fita opcional) em `src/components/Photo.jsx` (data-model.md: `Image.src`, `Image.alt`, `Image.placeholder`)
- [X] T012 [P] Componente `SmartLink` (interno, externo em nova aba, ou sem link quando o destino é `null`) em `src/components/SmartLink.jsx` (data-model.md: `Project.url`, `ContactChannel.href`; contracts/routes.md "Links")
- [X] T013 Cabeçalho com marca e menu em `src/components/Masthead.jsx` e moldura (skip link, `<main id="conteudo">`, `<title>`) em `src/components/Layout.jsx`
- [X] T014 Tabela de rotas em `src/App.jsx`, `BrowserRouter` em `src/main.jsx` e helper de teste `src/test/renderAt.jsx`

**Checkpoint**: moldura pronta; as páginas podem ser construídas

---

## Phase 3: User Story 1 - Ver a capa (Priority: P1) 🎯 MVP

**Goal**: a capa apresenta o João em segundos

**Independent Test**: abrir `/` e ver título, autoria, área, chamada, frase, foto e menu

- [X] T015 [US1] Teste da capa (título, "por João", área, chamada "5 projetos" derivada, `[Sua foto]`, menu) em `src/pages/Capa.test.jsx`
- [X] T016 [US1] Página Capa em `src/pages/Capa.jsx` (data-model.md: `capa.title`, `capa.chamada`, `capa.intro`, `capa.photo`)
- [X] T017 [US1] Registrar a rota `/` em `src/App.jsx`

**Checkpoint**: MVP — a capa sozinha já funciona como cartão de visita

---

## Phase 4: User Story 2 - Folhear a revista (Priority: P1)

**Goal**: navegar entre as cinco páginas pelo menu e por Anterior/Próxima

**Independent Test**: da capa, `Próxima →` quatro vezes percorre 02→05 e volta à capa

- [X] T018 [P] [US2] Teste do rodapé de folhear (folio, Anterior desativado na capa, "Voltar à capa ↺" na 05) em `src/components/PageTurn.test.jsx`
- [X] T019 [P] [US2] Teste de navegação (menu com `aria-current`, link direto `/projetos`, 404, título da aba, percurso completo) em `src/App.test.jsx`
- [X] T020 [US2] Componente `PageTurn` em `src/components/PageTurn.jsx` (data-model.md: `Page` derivados `number`, `prev`, `next`)
- [X] T021 [US2] Integrar `PageTurn`, rolagem ao topo e foco em `<main>` na troca de rota em `src/components/Layout.jsx`
- [X] T022 [US2] Página não encontrada em `src/pages/NaoEncontrada.jsx` e rota curinga em `src/App.jsx`

**Checkpoint**: navegação completa (o percurso de 5 páginas passa quando US3–US6 existirem)

---

## Phase 5: User Story 3 - Entrar em contato (Priority: P1)

**Goal**: o visitante acha e usa os canais de contato

**Independent Test**: abrir `/contato` e conferir os 4 canais e seus destinos

- [X] T023 [US3] Teste da página Contato (4 canais, destino nulo sem link, externo em nova aba) em `src/pages/Contato.test.jsx`
- [X] T024 [US3] Página Contato em `src/pages/Contato.jsx` (data-model.md: `ContactChannel.type`, `.label`, `.href`, `.download`)
- [X] T025 [US3] Registrar a rota `/contato` em `src/App.jsx`

---

## Phase 6: User Story 4 - Ler a matéria de capa (Priority: P2)

**Goal**: apresentar o TCC OEE-Fabric como matéria principal

**Independent Test**: abrir `/destaque` e ver rótulo, título, subtítulo, imagem, resumo e ficha

- [X] T026 [US4] Teste da página Destaque em `src/pages/Destaque.test.jsx`
- [X] T027 [US4] Página Destaque em `src/pages/Destaque.jsx` (data-model.md: `destaque.kicker`, `.titulo`, `.subtitulo`, `.resumo`, `.tipo`, `.stack`, `.repo`)
- [X] T028 [US4] Registrar a rota `/destaque` em `src/App.jsx`

---

## Phase 7: User Story 5 - Conhecer o perfil (Priority: P2)

**Goal**: contexto humano e técnico do João

**Independent Test**: abrir `/perfil` e ver título, apresentação e stack

- [X] T029 [US5] Teste da página Perfil em `src/pages/Perfil.test.jsx`
- [X] T030 [US5] Página Perfil em `src/pages/Perfil.jsx` (data-model.md: `perfil.titulo`, `.lead`, `.paragrafos`, `.stack`, `.photo`)
- [X] T031 [US5] Registrar a rota `/perfil` em `src/App.jsx`

---

## Phase 8: User Story 6 - Ver outros projetos (Priority: P2)

**Goal**: mostrar a amplitude de projetos

**Independent Test**: abrir `/projetos` e ver 4 cartões 01–04; cartões sem URL não são links

- [X] T032 [US6] Teste da página Projetos em `src/pages/Projetos.test.jsx`
- [X] T033 [US6] Página Projetos com grade de cartões em `src/pages/Projetos.jsx` (data-model.md: `Project.number`, `.name`, `.description`, `.image`, `.url`)
- [X] T034 [US6] Registrar a rota `/projetos` em `src/App.jsx`

---

## Phase 9: Polish & Cross-Cutting Concerns

- [X] T035 [P] `README.md` com como rodar, estrutura, fluxo Spec Kit e lista de pendências de conteúdo
- [X] T036 Rodar `npm run lint`, `npm test` e `npm run build` até ficarem verdes
- [X] T037 Conferir no navegador em 375 px e 1440 px: sem rolagem horizontal, foco visível, cenários 1–11 do `quickstart.md`
- [X] T038 Ajustar o que a conferência visual apontar (contraste, quebras de linha, tamanhos de recorte)

---

## Phase 10: Revisão — uma página, uma tela (FR-016, Princípio VI)

**Purpose**: nenhuma página rola; o canvas já foi realinhado (1440 × 900) e o código segue

- [X] T039 Tokens de tipografia e espaçamento que escalam com a altura (`svh`) em `src/styles/tokens.css`
- [X] T040 Mesa com altura da tela, `<main>` elástico com rolagem só como válvula, cabeçalho/rodapé compactos e ajustes de celular em `src/styles/global.css`
- [X] T041 Foto elástica (`container-type: size`, some abaixo de 72 px) em `src/styles/paper.css` e remover `height`/`minHeight` de `src/components/Photo.jsx`
- [X] T042 Novo layout `.spread` (linha ≥ 861 px, coluna abaixo) e regras de cada página em `src/styles/pages.css`
- [X] T043 [P] Capa e Perfil com tamanhos escalados e `.spread` em `src/pages/Capa.jsx` e `src/pages/Perfil.jsx`
- [X] T044 [P] Destaque em duas colunas (texto · foto + ficha) em `src/pages/Destaque.jsx`
- [X] T045 [P] Projetos em linha única de 4 cartões, Contato e 404 com tamanhos escalados em `src/pages/Projetos.jsx`, `src/pages/Contato.jsx`, `src/pages/NaoEncontrada.jsx`
- [X] T046 Medir a sobra de altura de cada rota nas 7 telas do Princípio VI e corrigir o que passar (quickstart.md, cenário 12)
- [X] T047 Rodar `npm run lint`, `npm test` e `npm run build`

---

## Phase 11: Revisão — virar a página como numa revista (FR-017)

**Purpose**: a troca de página imita uma revista: avançar vira a página atual sobre a lombada; voltar traz a anterior por cima

- [X] T048 [P] [US2] Teste de `turnDirection` (avançar, voltar, sair da 404) em `src/content/navigation.test.js`
- [X] T049 [US2] Função `turnDirection(de, para)` em `src/content/navigation.js`
- [X] T050 [US2] Hook `useTurnPage` (View Transitions, `data-turn`, alternativa sem suporte e com movimento reduzido) em `src/components/useTurnPage.js`
- [X] T051 [US2] `Layout` libera a captura da nova página (`settleTurn` em `useLayoutEffect`) e só remonta a página quando não há virada em `src/components/Layout.jsx`
- [X] T052 [US2] Ligar a virada aos links de `src/components/PageTurn.jsx`, `src/components/Masthead.jsx` e `src/pages/NaoEncontrada.jsx`
- [X] T053 [P] [US2] Animação de virar página em `src/styles/turn.css`, token `--turn-duration` em `src/styles/tokens.css` e import em `src/main.jsx`
- [X] T054 [US2] Teste de integração: Próxima vira para a frente, Anterior e menu viram na direção certa, em `src/App.test.jsx`
- [X] T055 Conferir a virada no navegador (avançar, voltar, menu) e rodar `npm run lint`, `npm test`, `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (1)** → **Foundational (2)** → User Stories (3–8) → **Polish (9)**
- T013 depende de T006–T012; T014 depende de T013

### User Story Dependencies

- **US1, US3, US4, US5, US6**: dependem só da Fase 2; independentes entre si
- **US2**: depende da Fase 2; o teste de percurso completo (T019) só fica verde depois de
  US1, US3–US6 registrarem suas rotas
- Tarefas que registram rota (T017, T022, T025, T028, T031, T034) editam o mesmo
  `src/App.jsx` e rodam em sequência

### Within Each User Story

- Teste primeiro (deve falhar), depois a página, depois a rota

## Parallel Example: Foundational

```text
Task: "Tokens em src/styles/tokens.css"            (T006)
Task: "Recortes em src/styles/paper.css"           (T008)
Task: "Conteúdo em src/content/site.js"            (T009)
Task: "Componente Cut em src/components/Cut.jsx"   (T010)
```

## Implementation Strategy

### MVP First

1. Fases 1 e 2
2. Fase 3 (US1 — capa) → validar `/` sozinho
3. Fase 4 (US2 — folhear) e Fase 5 (US3 — contato): completa o trio P1

### Incremental Delivery

- Cada página P2 (Destaque, Perfil, Projetos) entra sozinha, com seu teste e rota

## Notes

- Conteúdo pendente (fotos, prints, links, e-mail, currículo, resumo do TCC) fica como
  placeholder e é listado no README (Princípio II)
- Marcar `[X]` ao concluir cada tarefa

---

## Phase 12: Revisão — virada realista com dobra e arraste (FR-017, FR-018)

**Purpose**: a rotação rígida da Phase 11 não parecia papel; trocada por um motor de dobra com verso, sombras, brilho e arraste da ponta (research.md R12)

- [X] T056 [P] [US2] Testes da geometria (dobra, verso, papel que não estica, clip-path) em `src/components/flip/geometry.test.js`
- [X] T057 [US2] Geometria da dobra (`cornerStart`, `cornerAway`, `constrainCorner`, `fold`, `toPolygon`) em `src/components/flip/geometry.js`
- [X] T058 [US2] Folha da revista com `pageId` e `inert` em `src/components/Leaf.jsx`, registro das páginas em `src/pages/views.js`
- [X] T059 [US2] Motor da revista (virada automática pela URL, espiada, arraste, soltar com limiar e gesto rápido) em `src/components/Book.jsx`
- [X] T060 [US2] `Layout` só com mesa e título, `App` com rota única, `Masthead` marcando a página da própria folha, `PageTurn` e `NaoEncontrada` sem o hook antigo
- [X] T061 [P] [US2] Camadas da virada (lombada fixa e dinâmica, sombra projetada, verso com perspectiva e brilho) em `src/styles/flip.css`; `.page` enxuto em `src/styles/global.css`; token `--c-verso`
- [X] T062 Remover a virada anterior: `src/components/useTurnPage.js` e `src/styles/turn.css`
- [X] T063 [US2] Testes de integração da revista (botão, arraste para frente, desistir, arraste a partir da lombada) em `src/App.test.jsx`
- [X] T064 Conferir no Chrome (arraste parado no meio, soltar, espiada, virada automática congelada) e medir as 7 telas sem rolagem
- [X] T065 Rodar `npm run lint`, `npm test` e `npm run build`

---

## Phase 13: Conteúdo real — prints e links (US4, US6)

**Purpose**: projetos no ar com print clicável; repositório só no TCC

- [X] T066 [P] [US6] Prints de celular (390×844 @2x) do Lapidare Beauty e da Oppe Clothing, convertidos para WebP em `public/projetos/`
- [X] T067 [US6] Links e prints dos dois projetos em `src/content/site.js`; AdoPet e Times de Society seguem sem link
- [X] T068 [US4] Link do repositório do OEE-Fabric em `destaque.repo` (`src/content/site.js`)
- [X] T069 [P] Campo opcional `Image.position` em `src/components/Photo.jsx` (data-model.md)
- [X] T070 Toque sem arrastar só vira a página bem na ponta (`src/components/Book.jsx`), para cartões perto da borda continuarem só cartões
- [X] T071 Testes de Projetos e Destaque atualizados; conferência visual em 1440×900; `npm run lint`, `npm test`, `npm run build`

---

## Phase 14: Revisão — tirar a animação de revista (FR-015, research.md R13)

**Purpose**: o dono não gostou da virada; a troca de página volta a ser imediata

- [X] T072 [US2] `Book` renderiza só a página da URL e move o foco para o conteúdo (`src/components/Book.jsx`)
- [X] T073 Remover `src/components/flip/` (geometria + teste), `src/styles/flip.css`, a entrada `pagein` e `turnDirection` (+ `src/content/navigation.test.js`); `.book` e `.page` em `src/styles/global.css`; sem `--c-verso`
- [X] T074 Remover os testes de virada de `src/App.test.jsx`
- [X] T075 Conferir no navegador (troca imediata, nenhuma animação) e as 7 telas sem rolagem; `npm run lint`, `npm test`, `npm run build`

## Phase 15: Revisão — Perfil (US5, FR-005)

- [X] T076 Perfil: tirar o parágrafo da Black Belt; stack = JavaScript · Node.js · Express · React · PostgreSQL · FullStack (sem HTML & CSS; Express acrescentado em 2026-11-26) em `src/content/site.js` e `src/pages/Perfil.test.jsx`
- [X] T077 Separador "·" preso ao item da esquerda (`.stack-list li:not(:last-child)::after`) para a linha quebrada não começar com ponto; conferir `/perfil` sem rolagem nas 8 telas

## Phase 16: Revisão — fotos sem borda rasgada e capa sem fundo

- [X] T078 Fotos e prints sem `clip-path` rasgado, moldura creme nem fita: contorno de 1px `--c-rule` (`src/styles/paper.css`, `src/components/Photo.jsx`); Perfil sem inclinação
- [X] T079 Capa com a foto sem fundo (`public/foto-joao-recorte.webp`, rembg local + limpeza do halo do cabelo), `image.cutout` sem caixa e com a base/ombros esfumados por máscara
- [X] T080 Conferir as 6 rotas sem rolagem nas 8 telas; `npm run lint`, `npm test`, `npm run build`

## Phase 17: Entrada de página — colagem e máquina de escrever (FR-019, research.md R14)

- [X] T081 Régua de tempo única (`src/motion/intro.js`) com testes do teto de 2 s, ritmo único por página e cascata (`src/motion/intro.test.js`)
- [X] T082 `<Type>` (letras em `<span>`, cópia `sr-only`) + teste; `IntroContext` desligado sem `matchMedia` e com `prefers-reduced-motion`
- [X] T083 `useIntro` no `Leaf`: cola os `.cut` (mola em `rotateY` da ponta esquerda + sombra) e bate as letras; `cancel()` na limpeza (StrictMode)
- [X] T084 Aplicar `<Type>` nos textos das 6 páginas; `.capa-title > span`; "·" da stack só no fim
- [X] T085 Conferir no Chrome: fim da entrada ≤ 2 s em todas as rotas, nenhuma letra invisível no fim, 48 combinações sem rolagem, menos movimento sem animação

## Phase 18: Stack do Perfil com ícones (FR-005)

- [X] T086 Ícones da stack (`src/content/stackIcons.js`): JavaScript, Node.js, React e PostgreSQL do Simple Icons 16.38.1 (CC0), cores oficiais em tokens `--c-brand-*`; FullStack com desenho próprio
- [X] T087 `<TechIcon>` e a stack em etiquetas (ícone + nome, contorno fino), sem os "·"; no celular, etiquetas mais justas para caber em duas linhas e manter a foto
- [X] T088 Entrada: o ícone é carimbado (escala 1,6 → 1, mola curta) e a etiqueta surge quando o nome começa a ser batido (`INTRO.stamp`); teste do teto de 2 s
- [X] T089 Conferir Perfil sem rolagem nas 8 telas, entrada ≤ 2 s, `npm run lint`, `npm test`, `npm run build`

## Phase 19: Stack dos projetos e carrossel do Perfil (FR-005, FR-006, FR-007)

- [X] T090 Stack de cada projeto tirada dos repositórios (package.json): AdoPet (React, Vite, Node.js, PostgreSQL), Salon e Oppe (+ Express), OEE-Fabric (JavaScript, Node.js, Express, PostgreSQL); ícones de Express e Vite (Simple Icons, CC0)
- [X] T091 `<StackList>` reutilizável; etiquetas pequenas nos cartões de Projetos e na ficha do Destaque; no celular, só ícones e, nos cartões, selos por cima do print
- [X] T092 `<StackMarquee>`: duas cópias em fila (a primeira só visual, letra a letra para ter a mesma largura), CSS `translateX(-50%) → 0` em 26 s, começa depois da entrada (2 s), pausa no hover (o botão de pausa foi retirado a pedido), parada com menos movimento
- [X] T093 Testes de Projetos/Destaque/Perfil (stacks; carrossel sem botão e lido uma vez só); 48 combinações sem rolagem; entrada ≤ 2 s; carrossel conferido (direção, velocidade, laço sem emenda)

## Phase 20: Colagem de ponta a ponta, uniforme (FR-019)

- [X] T094 Colagem por passada contínua: `glueSchedule(widths)`/`glueAt`/`glueStep` em `src/motion/intro.js` (tempo proporcional à largura, avanço por quadro com teto, prazo de 1,9 s); `--glue` → `clip-path` + dobra (`::after`) em `src/styles/intro.css`; papel assentado perde o recorte
- [X] T095 Digitação revelada por um laço só de rAF (em vez de uma animação por letra): Destaque de 9–30 para ~90 quadros nos 2 s da entrada
- [X] T096 Testes da régua (passada emendada, mesma velocidade, sem saltos, prazo); quadros gravados e medidos (avanço máximo de 4,2% por quadro, passada de ~0,78 s); entrada 1,35–1,95 s em todas as páginas, sem rolagem
