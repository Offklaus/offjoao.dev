# UI Contract: rotas e moldura da revista

O portfólio expõe ao visitante um conjunto fixo de endereços. Este contrato define o
que cada endereço precisa mostrar; os testes de cada user story verificam esta tabela.

## Rotas

| Rota | Página | Título da aba | Folio | ← Anterior | Avançar |
|------|--------|---------------|-------|------------|---------|
| `/` | Capa | `offjoão.dev — Capa` | `01 / 05` | desativado | `Próxima →` → `/perfil` |
| `/perfil` | Perfil | `offjoão.dev — Perfil` | `02 / 05` | `/` | `Próxima →` → `/destaque` |
| `/destaque` | Destaque | `offjoão.dev — Destaque` | `03 / 05` | `/perfil` | `Próxima →` → `/projetos` |
| `/projetos` | Projetos | `offjoão.dev — Projetos` | `04 / 05` | `/destaque` | `Próxima →` → `/contato` |
| `/contato` | Contato | `offjoão.dev — Contato` | `05 / 05` | `/projetos` | `Voltar à capa ↺` → `/` |
| qualquer outra | Não encontrada | `offjoão.dev — Página não encontrada` | — | — | link "Voltar à capa" → `/` |

## Moldura comum (toda rota)

- Link "Pular para o conteúdo" como primeiro elemento focável, apontando para `#conteudo`.
- `<header>` com link da marca (nome acessível "offjoão.dev — capa") → `/`.
- `<nav aria-label="Principal">` com Perfil, Destaque, Projetos, Contato; o item da rota
  atual tem `aria-current="page"`.
- `<main id="conteudo" tabindex="-1">` com exatamente um `<h1>`.
- `<nav aria-label="Folhear">` com Anterior / folio / Avançar (exceto na 404).

## Links

- Destino `https://` → `target="_blank"` + `rel="noopener noreferrer"` + texto oculto
  "(abre em nova aba)".
- Destino `null` → elemento sem link (nenhum `href="#"`).
