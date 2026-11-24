# Implementation Plan: Portfólio "Revista 2002"

**Branch**: `001-portfolio-revista` | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-revista/spec.md`

## Summary

Transformar as cinco pranchas do canvas "Portfólio — Revista 2002" (Capa, Perfil,
Destaque, Projetos, Contato) numa SPA estática em Vite + React, com rotas próprias por
página, navegação de "folhear", conteúdo centralizado em um módulo e a identidade de
recortes de papel reproduzida em CSS puro. Não há backend: o contato é feito por links
(ver [research.md](./research.md), decisão R6).

## Technical Context

**Language/Version**: JavaScript (ES2023) + JSX; Node.js 22 LTS

**Primary Dependencies**: React 19, React Router 7 (modo declarativo), Vite 8,
@vitejs/plugin-react

**Storage**: N/A — conteúdo estático em `src/content/site.js`

**Testing**: Vitest 5 + Testing Library (react, user-event, jest-dom) + jsdom

**Target Platform**: navegadores evergreen (2 últimas versões), celular e desktop

**Project Type**: web app (SPA estática, sem servidor)

**Performance Goals**: LCP < 2 s em 4G; JS inicial < 100 KB gzip

**Constraints**: 360–1440 px sem rolagem horizontal; `prefers-reduced-motion`;
WCAG 2.2 AA; sem rastreamento

**Scale/Scope**: 5 páginas + página 404; 1 projeto destaque + 4 projetos; 4 canais

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Como o plano cumpre | Status |
|-----------|---------------------|--------|
| I. Fidelidade ao design | Tokens em `src/styles/tokens.css`; classes de recorte copiadas do canvas para `paper.css`; desvios listados abaixo | ✅ |
| II. Conteúdo real | Todo texto em `src/content/site.js`; placeholders `[...]` preservados; "5 projetos" é derivado da lista | ✅ |
| III. Acessível e responsivo | `header/nav/main`, skip link, `aria-current`, foco visível, alvos ≥ 44 px, `flex-wrap`/`clamp()` | ✅ |
| IV. Simplicidade | Sem backend, sem estado global, só 1 dependência de runtime além do React | ✅ |
| V. Comportamento testado | Um arquivo de teste por user story; `build`, `lint`, `test` como gate | ✅ |

**Re-check pós-design (Phase 1)**: sem violações; nenhuma entrada em Complexity Tracking.

### Desvios do design (registrados conforme Princípio I)

1. **Movimento reduzido**: no canvas a regra `prefers-reduced-motion` repete a animação;
   aqui ela desliga a animação de folhear (FR-015).
2. **Links vazios**: o canvas usa `href="#"` em projetos e currículo sem destino; aqui
   item sem destino é renderizado sem link (FR-007, FR-008).
3. **Marcos e atalhos**: adicionados `<main>`, link "Pular para o conteúdo" e foco no
   conteúdo após trocar de página (FR-013).
4. **Links externos**: abrem em nova aba com `rel="noopener noreferrer"` e aviso para
   leitor de tela (FR-008).
5. **Página 404**: não existe no canvas; usa o mesmo layout (FR-009).

### Revisão 2026-11-18 — uma página, uma tela (FR-016, Princípio VI)

O canvas foi realinhado primeiro (pranchas de 1440 × 900, sem rolagem) e o código segue:

- Mesa com a altura exata da tela; `<main>` é a área elástica; rolagem só como válvula de
  acessibilidade ([research.md](./research.md) R10).
- **Capa**: título, assinatura e, abaixo, chamada + foto lado a lado; a foto preenche o resto.
- **Perfil**: foto e texto lado a lado ocupando toda a altura disponível.
- **Destaque**: virou duas colunas: texto (rótulo, título empilhado, subtítulo, resumo) à
  esquerda; foto + ficha técnica à direita.
- **Projetos**: os 4 cartões numa única linha (2 × 2 no celular); a imagem de cada cartão
  é o que estica.
- **Contato**: linhas com respiro proporcional à altura da tela.
- Abaixo de 861 px as duplas texto + foto empilham e a foto fica com o espaço que sobrar.

### Revisão 2026-11-23 — sem animação de troca de página (FR-015, research.md R13)

- `Book` só renderiza a `Leaf` da página da URL (troca imediata) e move o foco para o
  conteúdo. Removidos `src/components/flip/`, `src/styles/flip.css`, a entrada `pagein`,
  `turnDirection` e o token `--c-verso`. `.book` e `.page` ficaram em `global.css`.
- As revisões de virada abaixo ficam como histórico.

### Revisão 2026-11-18 — virada realista com arraste (FR-017, FR-018 — removida)

Substitui a revisão abaixo (View Transitions). Técnica em [research.md](./research.md) R12.

- `App` tem uma rota só; `Layout` = mesa + título da aba; `Book` decide qual folha mostrar
  pela URL e vira até ela; `Leaf` = uma folha (Masthead + conteúdo + rodapé);
  `src/pages/views.js` liga cada `id` ao componente da página.
- `Masthead` recebe `pageId` (marca a página da própria folha, não a URL), para a folha
  de baixo já aparecer certa durante a virada.
- Estilos da revista e das camadas da virada em `src/styles/flip.css`; `.page` em
  `global.css` virou só a folha. Removidos `useTurnPage.js` e `turn.css`.
- Estrutura nova: `src/components/{Book,Leaf}.jsx`, `src/components/flip/geometry.js`
  (+ teste), `src/pages/views.js`, `src/styles/flip.css`.

### Revisão 2026-11-18 — virar a página (FR-017, substituída)

- Técnica em [research.md](./research.md) R11: View Transitions API +
  `src/components/useTurnPage.js` + `src/styles/turn.css`.
- A animação de entrada `pagein` passa a rodar só na primeira carga; nas trocas de
  página quem anima é a virada. Sem suporte à API, a página troca sem animação (antes
  havia a entrada `pagein` a cada troca, que continua como alternativa nesse caso).
- O canvas não mostra transições entre pranchas; a virada existe só no site (registrado
  aqui conforme Princípio I).

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-revista/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── routes.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html                 # fontes, meta, lang="pt-BR"
vite.config.js             # plugin React + config do Vitest
public/
└── favicon.ico, favicon-192.png, apple-touch-icon.png (mascote)
src/
├── main.jsx               # BrowserRouter + estilos globais
├── App.jsx                # tabela de rotas
├── content/
│   ├── site.js            # TODO o texto e links (data-model.md)
│   └── navigation.js      # página por endereço, folio, anterior/próxima
├── styles/
│   ├── tokens.css         # cores, fontes, espaçamentos
│   ├── global.css         # mesa, página, cabeçalho, rodapé, foco, animação
│   ├── paper.css          # recortes, foto rasgada, fita
│   └── pages.css          # layout de cada página
├── components/
│   ├── Layout.jsx         # moldura da página + título + foco/scroll
│   ├── Masthead.jsx       # marca + menu
│   ├── PageTurn.jsx       # ← Anterior · NN / 05 · Próxima →
│   ├── Cut.jsx            # palavra recortada de papel
│   ├── Photo.jsx          # foto/print com borda rasgada e fita
│   └── SmartLink.jsx      # link interno/externo/ausente
├── pages/
│   ├── Capa.jsx
│   ├── Perfil.jsx
│   ├── Destaque.jsx
│   ├── Projetos.jsx
│   ├── Contato.jsx
│   └── NaoEncontrada.jsx
└── test/
    ├── setup.js
    └── renderAt.jsx       # helper: renderiza App numa rota
```

Testes ficam ao lado do código (`*.test.jsx`).

**Structure Decision**: projeto único na raiz (SPA). `server/` com Express só será criado
numa feature futura que exija servidor (ex.: formulário de contato), conforme Princípio IV.

## Complexity Tracking

Nenhuma violação a justificar.
