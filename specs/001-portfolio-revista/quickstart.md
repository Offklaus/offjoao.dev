# Quickstart: validar o Portfólio "Revista 2002"

## Pré-requisitos

- Node.js 22+ e npm (`node --version`)

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
```

## Gates automáticos (Princípio V)

```bash
npm test           # Vitest: um arquivo por user story
npm run lint       # oxlint
npm run build      # gera dist/
npm run preview    # serve dist/ com fallback de SPA
```

Esperado: todos os testes verdes, lint sem erros, build sem avisos de erro.

## Cenários manuais

| # | Passo | Resultado esperado | Spec |
|---|-------|--------------------|------|
| 1 | Abrir `/` | Página na tela toda (sem moldura); capa com "JOÃO VICTOR", área, frase e a foto inteira | US1 |
| 2 | Clicar `Próxima →` 4 vezes | Perfil 02, Destaque 03, Projetos 04, Contato 05; na 05 aparece "Voltar à capa ↺" | US2 |
| 3 | Abrir `/projetos` direto numa aba nova | Cai na página Projetos, menu marca "Projetos" | US2 |
| 4 | Só teclado: Tab desde o topo | 1º foco é "Pular para o conteúdo"; todos os links têm contorno visível | US2 |
| 5 | Abrir `/contato` | 4 canais; os que não têm destino ainda não são links | US3 |
| 6 | Abrir `/destaque` | Matéria do OEE-Fabric com ficha técnica | US4 |
| 7 | Abrir `/perfil` | "Quem é o dev?", UNINTER, stack (sem Black Belt) | US5 |
| 8 | Abrir `/projetos` | 3 cartões 01–03, cada print abre o site | US6 |
| 9 | Abrir `/xyz` | Página "não encontrada" com link para a capa | Edge |
| 10 | DevTools em 360 px e 1440 px | Sem rolagem horizontal; menu quebra linha | SC-005 |
| 11 | Ativar "reduzir movimento" no SO | Página aparece sem a animação de folhear | FR-015 |
| 12 | Abrir cada rota em 1920×1080, 1440×900, 1366×657, 1280×720, 768×1024, 390×664 e 360×640 | Nenhuma barra de rolagem; `main.scrollHeight <= main.clientHeight` | FR-016 |
| 13 | Clicar `Próxima →`, depois `← Anterior`, depois um item do menu | A nova página aparece na hora, sem animação | FR-015 |

Contrato das rotas: [contracts/routes.md](./contracts/routes.md). Formato do conteúdo:
[data-model.md](./data-model.md).
