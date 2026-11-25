# Research: Portfólio "Revista 2002"

Nenhum item ficou como NEEDS CLARIFICATION no Technical Context. As decisões abaixo
fixam as escolhas técnicas.

## R1 — Ferramenta de build

- **Decision**: Vite 8 com o template oficial `react` (JavaScript) do `create-vite` 9.
- **Rationale**: pedido explícito do dono; dev server instantâneo; build estático pronto
  para qualquer host.
- **Alternatives considered**: Next.js (SSR desnecessário para 5 páginas estáticas);
  Astro (bom para estático, mas fora do pedido "Vite + React").

## R2 — Roteamento

- **Decision**: React Router 7 em modo declarativo (`BrowserRouter`, `Routes`, `NavLink`).
- **Rationale**: endereços reais por página (FR-001), `NavLink` aplica `aria-current="page"`
  sozinho (FR-002), rota curinga para 404 (FR-009). O npm resolveu a linha 7.x, que
  expõe a API declarativa conferida no projeto.
- **Alternatives considered**: roteador próprio com History API (menos código de
  terceiros, mas reimplementa foco, `aria-current` e 404); hash router (URLs feias).

## R3 — Estilos

- **Decision**: CSS puro com custom properties (tokens) em três arquivos globais.
- **Rationale**: o canvas já está em CSS; os `clip-path` dos recortes são copiados
  sem tradução; zero dependência (Princípio IV).
- **Alternatives considered**: Tailwind (classes utilitárias não ajudam com polígonos
  longos de `clip-path`); CSS Modules (útil depois, mas as classes do design são
  compartilhadas por todas as páginas).

## R4 — Fontes

- **Decision**: Google Fonts (Anton, Bricolage Grotesque, Instrument Serif, Space Mono)
  com `preconnect` e `display=swap`, e pilhas de fallback (`Impact`, `Georgia`,
  `system-ui`, `monospace`).
- **Rationale**: as mesmas famílias do canvas; `swap` mostra o texto na hora (edge case
  de fonte lenta).
- **Alternatives considered**: auto-hospedar via `@fontsource` (melhor para privacidade e
  cache; fica para a fase de polimento de performance se o Lighthouse pedir).

## R5 — Título da aba e foco

- **Decision**: o `Layout` define `document.title` num efeito; após trocar de rota, rola
  ao topo e move o foco para `<main>`.
- **Rationale**: atende FR-014 sem biblioteca de head; mantém o `<title>` estático do
  `index.html` para quem chega sem JS; foco em `<main>` faz o leitor de tela anunciar a
  nova página.
- **Alternatives considered**: `<title>` nativo do React 19 (conviveria com o `<title>`
  estático e o navegador usa o primeiro); `react-helmet-async` (dependência extra).

## R6 — Backend

- **Decision**: nenhum backend na v1.
- **Rationale**: a página Contato do canvas só tem links (mailto, GitHub, LinkedIn, PDF);
  nada exige servidor. Princípio IV.
- **Alternatives considered**: Express com rota `POST /api/contato` para formulário —
  vira feature própria (`/speckit-specify`) se o dono quiser formulário.

## R7 — Testes

- **Decision**: Vitest (ambiente jsdom) + Testing Library, testes ao lado dos componentes,
  renderizando o `App` dentro de `MemoryRouter` com a rota inicial desejada.
- **Rationale**: mesma config do Vite; testes descrevem o que o visitante vê
  (Princípio V).
- **Alternatives considered**: Playwright E2E (útil para responsividade; entra depois,
  quando houver deploy).

## R8 — Lint

- **Decision**: `oxlint`, que já vem no template atual do `create-vite`.
- **Rationale**: zero configuração extra e regras de hooks do React.
- **Alternatives considered**: ESLint flat config (mais plugins, mais configuração).

## R10 — Página sem rolagem (revisão 2026-11-18, FR-016)

- **Decision**: a mesa ocupa exatamente a tela (`height: 100dvh`, `overflow: hidden`); a
  página é uma coluna flex (cabeçalho · conteúdo · rodapé) e o conteúdo usa `flex: 1` com
  `min-height: 0`. Tipografia e espaçamentos usam `clamp(min, min(Xvw, Ysvh), max)`, então
  escalam com a largura e com a altura. As fotos (`.photo-wrap`) são o elemento elástico
  (`flex: 1 1 0`) e, como `container-type: size`, somem quando ficam com menos de 72 px de
  altura. Abaixo de 861 px de largura os pares texto + foto viram coluna.
- **Rationale**: só CSS, sem medir nada em JS; o texto nunca encolhe abaixo de 13–14 px.
  Se mesmo assim não couber (tela menor que 360×640, celular deitado ou zoom do navegador),
  o `<main>` rola como último recurso, sem cortar conteúdo (Princípios III e VI).
- **Alternatives considered**: escalar a página inteira via JS (`zoom`/`transform`) até
  caber (anula o zoom do usuário, fere WCAG 1.4.4); dividir páginas longas em "subpáginas"
  (mais navegação, mais estado); `overflow: hidden` sem válvula (corta conteúdo).

## R14 — Entrada de página: colagem e máquina de escrever (2026-11-25, FR-019)

- **Decisão**: `motion` (gratuito) com `animate()` + `stagger()` num `useLayoutEffect` do
  `Leaf` (`src/motion/useIntro.js`); tempos únicos em `src/motion/intro.js`. Papel: mola em
  `rotateY` a partir da ponta esquerda (`transform-origin: 0 50%`, perspectiva 600px) +
  sombra de "levantado" para a sombra normal. Texto: `<Type>` separa as letras em `<span>`
  (cópia `sr-only` para leitor de tela) e cada letra aparece de uma vez, sem fade nem cursor.
- **Por quê**: um ritmo só por página e cascata na ordem do texto cabem no teto de 2 s sem
  digitar letra por letra de forma imperceptível; as letras já ocupam o lugar final, então
  não há layout shift (Princípio VI).
- **Alternativas rejeitadas**: `Typewriter`/`splitText` do Motion+ (pago); digitar tudo em
  sequência (com ~350 letras no Destaque, passaria de 200 letras/s); CSS puro (não dá ritmo
  por página nem cascata calculada).

## R13 — Sem animação de troca de página (revisão 2026-11-23, FR-015)

- **Decision**: a troca de página é imediata. Removidos o motor de dobra (R12), a entrada
  `pagein` e as camadas de sombra/verso; o `Book` só mostra a página da URL e move o foco
  para o conteúdo.
- **Rationale**: o dono não gostou do resultado da virada ("tire a animação de revista").
  Menos código (JS 88,7 → 85,7 KB gzip) e nenhuma dependência de quadros/animação.
- **Alternatives considered**: manter só a entrada `pagein` na primeira carga (também é
  uma animação de "página de revista"; removida junto para não sobrar meia animação).

## R12 — Virada realista com dobra e arraste (removida em 2026-11-23, ver R13)

- **Decision**: motor próprio de dobra, uma página por vez (lombada à esquerda), em
  `src/components/Book.jsx` + `src/components/flip/geometry.js`. O canto C é levado até P;
  a dobra é a mediatriz de C–P. A frente que continua deitada é a folha de cima recortada
  por `clip-path` (polígono pela reta da dobra, Sutherland–Hodgman); o verso é uma camada
  recortada com o polígono do outro lado e girada em torno da dobra com
  `rotate3d(eixo da dobra, 180° − 16°·sen(πp))` dentro de um pai com `perspective`: a 180°
  é o rebatimento exato, e os 16° no meio da virada levantam o papel em 3D. O canto é
  limitado a W da ponta da lombada e a uma diagonal da outra (o papel não estica).
  Camadas: sombra projetada a partir da dobra na página de baixo, sombra dinâmica da
  lombada (opacidade 0,15 → 0,9 → 0,15) e faixa de brilho no verso perto da dobra.
  As duas folhas são componentes React vivos (a de baixo fica `inert`); a URL continua
  mandando: qualquer mudança de rota vira automaticamente, com o canto subindo em arco.
- **Rationale**: a rotação rígida (R11) parecia uma porta abrindo, não papel. A dobra pela
  mediatriz é a técnica dos flipbooks profissionais e permite arrastar o canto com
  precisão; sem biblioteca (Princípio IV), JS ~10 KB.
- **Alternatives considered**: GSAP (pedido como opção; `requestAnimationFrame` com
  easing próprio resolveu sem dependência); StPageFlip/turn.js (canvas ou jQuery, difíceis
  de combinar com páginas React acessíveis); fatiar a página em tiras 3D para curvar
  (duplicaria o DOM de cada página dezenas de vezes).

## R11 — Virar a página com View Transitions (substituída por R12)

- **Decision**: View Transitions API (`document.startViewTransition`). O `.page` recebe
  `view-transition-name: page`; os links internos chamam o hook `useTurnPage`, que marca
  a direção em `<html data-turn="next|prev">`, inicia a transição e só libera a captura
  da nova página quando o `Layout` monta a nova rota (`useLayoutEffect`). Em CSS
  (`src/styles/turn.css`): avançar gira o `::view-transition-old(page)` de 0° a −95° sobre
  a borda esquerda, com perspectiva e sombra, enquanto a nova página clareia por baixo;
  voltar faz o inverso com o `::view-transition-new(page)` por cima.
- **Rationale**: anima as duas páginas ao mesmo tempo sem manter as duas montadas no
  React e sem dependência; o navegador tira os "retratos" das páginas. Sem suporte ou com
  movimento reduzido, a navegação acontece normalmente.
- **Alternatives considered**: `<Link viewTransition>` do React Router (só nos modos
  data/framework; aqui usamos o declarativo); Framer Motion `AnimatePresence` (+30 KB e
  duas páginas montadas); biblioteca de flipbook (turn.js/StPageFlip: canvas ou jQuery,
  pesadas e difíceis de deixar acessíveis).

## R9 — Hospedagem

- **Decision**: fora do escopo desta feature; qualquer host estático com fallback de SPA
  (todas as rotas → `index.html`) atende FR-001.
- **Rationale**: o dono ainda não escolheu o host; `vite preview` já faz o fallback.
- **Alternatives considered**: fixar Vercel/Netlify agora (decisão do dono).
