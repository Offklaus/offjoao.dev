<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0 (MINOR: novo princípio)
- Modified principles: nenhum renomeado
- Added principles: VI. Uma Página, Uma Tela
- Added sections: nenhuma
- Removed sections: nenhuma
- Templates: plan/spec/tasks leem esta constituição em tempo de execução; nenhum alterado
- Follow-up TODOs: nenhum
-->

# offjoão.dev Constitution

## Core Principles

### I. Fidelidade ao Design "Revista 2002"

- O canvas de design "Portfólio — Revista 2002" é a fonte da verdade visual: paleta
  (preto #000, página #0A0B0B, tinta #F2EFE8, papel #DDD7CA/#CFC8B8), tipografia
  (Anton, Instrument Serif itálico, Bricolage Grotesque 800, Space Mono) e os
  componentes de recorte de papel (letras recortadas, fotos com borda rasgada, fita).
- As cinco páginas do canvas (Capa, Perfil, Destaque, Projetos, Contato) e a navegação
  de "folhear" (Anterior / folio NN/05 / Próxima) DEVEM existir no site.
- Cores, fontes e medidas vivem em tokens CSS únicos; nenhum componente usa hex solto.
- Qualquer desvio do design DEVE ser registrado no `plan.md` da feature com o motivo.

**Racional**: o design já foi aprovado; reproduzi-lo com precisão evita retrabalho e
mantém a identidade do portfólio coerente.

### II. Conteúdo Real, Sem Invenção

- Nenhum lorem ipsum, número inventado, depoimento falso ou projeto que não existe.
- Todo texto do site vem de um único módulo de conteúdo (`src/content/`), separado dos
  componentes, para o dono editar sem tocar em JSX.
- Fato ainda desconhecido aparece como placeholder explícito entre colchetes
  (ex.: `[Sua foto]`, `[seu@email.com]`) e é listado no README como pendência.
- Dados pessoais (e-mail, telefone, links) só entram no site quando o dono os fornecer.

**Racional**: um portfólio é avaliado pela credibilidade; conteúdo inventado destrói isso.

### III. Acessível e Responsivo (NÃO NEGOCIÁVEL)

- HTML semântico: `header`, `nav`, `main`, `h1` único por página, `<a href>` para
  navegação e `<button>` para ações; nunca `onClick` em `div`/`span`.
- Contraste mínimo 4.5:1 para texto (3:1 para texto ≥ 24px); alvos de toque ≥ 44px;
  foco visível em todo elemento interativo; navegação completa por teclado.
- Imagens com `alt` significativo; decoração com `aria-hidden="true"`.
- O layout DEVE funcionar de 360px a 1440px de largura sem rolagem horizontal.
- Animações DEVEM respeitar `prefers-reduced-motion: reduce`.

**Racional**: recrutadores usam celular, leitores de tela e teclado; o site não pode
excluir ninguém.

### IV. Simplicidade e Frontend Primeiro

- O front é uma SPA estática em Vite + React. Um backend Node.js + Express só é criado
  quando um requisito da spec exige servidor (ex.: formulário que envia e-mail, API
  própria); a justificativa vai na seção "Complexity Tracking" do plano.
- Cada dependência nova DEVE resolver um requisito concreto; preferir APIs da
  plataforma (CSS nativo, `fetch`) a bibliotecas.
- YAGNI: nada de CMS, estado global ou camadas abstratas antes de haver necessidade.

**Racional**: menos peças significam deploy mais barato, menos manutenção e um projeto
que o dono entende de ponta a ponta.

### V. Comportamento Testado

- Toda user story da spec tem pelo menos um teste automatizado (Vitest + Testing
  Library) que verifica o comportamento visível: rota renderiza, links levam ao lugar
  certo, navegação anterior/próxima funciona.
- `npm run build`, `npm run lint` e `npm test` DEVEM passar antes de uma tarefa ser
  marcada como concluída.
- Mudança visual relevante é conferida no navegador em 375px e 1440px.

**Racional**: testes pequenos e focados no usuário pegam regressões sem engessar o design.

### VI. Uma Página, Uma Tela

- Cada página da revista DEVE caber inteira na área visível do navegador, sem rolagem
  vertical nem horizontal, de 360×640 a 1920×1080 px.
- Tipografia e espaçamentos escalam com a largura E a altura da tela; fotos e prints são o
  elemento elástico e cedem espaço ao texto.
- Conteúdo nunca é cortado: só abaixo do tamanho mínimo suportado ou com zoom do
  navegador a área de conteúdo pode rolar, como último recurso (o Princípio III prevalece).
- Toda mudança visual é conferida medindo a sobra de altura de cada página em
  1920×1080, 1440×900, 1366×657, 1280×720, 768×1024, 390×664 e 360×640.

**Racional**: o portfólio é uma revista; cada página é vista inteira de uma vez, como uma
página impressa, e rolar quebra essa leitura.

## Restrições Técnicas

- **Runtime**: Node.js 22 LTS ou superior; npm como gerenciador de pacotes.
- **Front**: Vite + React (JavaScript/JSX), React Router para as rotas das páginas,
  CSS puro com variáveis (tokens) em `src/styles/`; fontes via Google Fonts.
- **Back (opcional)**: Node.js + Express em `server/`, só quando o Princípio IV permitir.
- **Estrutura**: `src/components/` (peças reutilizáveis), `src/pages/` (uma por página
  da revista), `src/content/` (textos e dados), `public/` (imagens e currículo).
- **Desempenho**: Lighthouse ≥ 90 em Performance, Acessibilidade e SEO no mobile; imagens
  otimizadas (WebP/AVIF) e com dimensões declaradas.
- **Idioma**: interface em português do Brasil (`lang="pt-BR"`).

## Fluxo de Desenvolvimento

- Toda feature segue o Spec-Driven Development do Spec Kit:
  `/speckit-specify` → (`/speckit-clarify`) → `/speckit-plan` → `/speckit-tasks` →
  (`/speckit-analyze`) → `/speckit-implement`.
- Cada feature mora em `specs/NNN-nome-curto/` com `spec.md`, `plan.md` e `tasks.md`.
- A spec descreve O QUÊ e POR QUÊ (sem tecnologia); o plano descreve COMO.
- Tarefas são pequenas, marcadas `[X]` ao concluir, e agrupadas por user story para
  permitir entregas incrementais (MVP primeiro).
- Commits pequenos e descritivos em português ou inglês, um assunto por commit.

## Governance

- Esta constituição prevalece sobre preferências pontuais; planos e tarefas DEVEM
  passar pelo "Constitution Check" do `plan-template` antes da implementação.
- Emendas: editar este arquivo via `/speckit-constitution`, registrar o Sync Impact
  Report e incrementar a versão (MAJOR remove/redefine princípio; MINOR adiciona
  princípio ou seção; PATCH ajusta redação).
- Toda violação justificada vai na tabela "Complexity Tracking" do plano da feature.
- Revisão de conformidade: ao final de cada feature, conferir os seis princípios.

**Version**: 1.1.0 | **Ratified**: 2026-11-18 | **Last Amended**: 2026-11-18
