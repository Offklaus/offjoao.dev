# UI Contract: rotas e moldura da revista

O portfólio expõe ao visitante um conjunto fixo de endereços. Este contrato define o
que cada endereço precisa mostrar; os testes de cada user story verificam esta tabela.

## Rotas

| Rota | Página | Título da aba | Folio | ← Anterior | Avançar |
|------|--------|---------------|-------|------------|---------|
| `/` | Capa | `offjoão.dev — Capa` | `01 / 06` | desativado | `Próxima →` → `/perfil` |
| `/perfil` | Perfil | `offjoão.dev — Perfil` | `02 / 06` | `/` | `Próxima →` → `/destaque` |
| `/destaque` | Destaque | `offjoão.dev — Destaque` | `03 / 06` | `/perfil` | `Próxima →` → `/projetos` |
| `/projetos` | Projetos | `offjoão.dev — Projetos` | `04 / 06` | `/destaque` | `Próxima →` → `/roadmap` |
| `/roadmap` | Roadmap | `offjoão.dev — Roadmap` | `05 / 06` | `/projetos` | `Próxima →` → `/contato` |
| `/contato` | Contato | `offjoão.dev — Contato` | `06 / 06` | `/roadmap` | `Voltar à capa ↺` → `/` |
| qualquer outra | Não encontrada | `offjoão.dev — Página não encontrada` | — | — | link "Voltar à capa" → `/` |

## Moldura comum (toda rota)

- Link "Pular para o conteúdo" como primeiro elemento focável, apontando para `#conteudo`.
- `<header>` com link da marca (nome acessível "offjoão.dev — capa") → `/`.
- `<nav aria-label="Principal">` com Perfil, Destaque, Projetos, Roadmap, Contato; o item da rota
  atual tem `aria-current="page"`.
- `<main id="conteudo" tabindex="-1">` com exatamente um `<h1>`.
- `<nav aria-label="Folhear">` com Anterior / folio / Avançar (exceto na 404).

## Roadmap (`/roadmap`)

- Abas em `role="tablist"` ("Concluído" e "Cursando agora"): cada aba é um `<button
  role="tab">` com `aria-selected` e `aria-controls`; só a aba selecionada fica na ordem
  do Tab, e as setas ←/→, Home e End trocam de aba.
- `?aba=cursando` abre "Cursando agora"; sem o parâmetro (ou com outro valor), "Concluído".
  Trocar de aba troca o parâmetro sem criar entrada nova no histórico.
- O painel da aba é `role="tabpanel"`, rotulado pela aba. Concluído: um `<h2>` por ano e um
  `<h3>` por módulo ("Módulo A1"). Cursando agora: `<h2>` "Faculdade" e "Alura", `<h3>`
  por nível da carreira.
- Só a área de conteúdo (`<main>`) rola; cabeçalho e rodapé de folhear ficam na tela.

## Links

- Destino `https://` → `target="_blank"` + `rel="noopener noreferrer"` + texto oculto
  "(abre em nova aba)".
- Destino `null` → elemento sem link (nenhum `href="#"`).
