# offjoão.dev — Portfólio "Revista 2002"

Portfólio pessoal em formato de revista de cinco páginas (Capa, Perfil, Matéria de capa,
Projetos e Contato), com letras recortadas de papel, fotos com borda rasgada e navegação
de "folhear". Feito com **Vite + React** a partir do design "Portfólio — Revista 2002".

## Rodar

Requer Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | servidor de desenvolvimento |
| `npm test` | testes (Vitest + Testing Library) |
| `npm run lint` | lint (oxlint) |
| `npm run build` | build de produção em `dist/` |
| `npm run preview` | serve o `dist/` localmente |

## Editar o conteúdo

**Todo texto e link fica em [`src/content/site.js`](src/content/site.js).** Não é preciso
mexer nos componentes.

- `null` em `src`, `url` ou `href` = ainda não fornecido: a imagem vira placeholder e o
  link vira texto simples.
- Imagens e o currículo vão em `public/` (ex.: `public/foto.webp` → `src: '/foto.webp'`).

### Pendências de conteúdo

- [x] Foto da capa e do perfil (`public/foto-joao.webp`)
- [x] Frase pessoal no perfil (`perfil.paragrafos[0]`): em busca de estágio
- [x] Repositório do OEE-Fabric (`destaque.repo`) — **o repositório está privado no GitHub:
  visitantes veem 404 até ele ficar público**
- [x] Print, problema, solução, tecnologias e artigo do OEE-Fabric (`destaque`)
- [x] Prints e links do Lapidare Beauty e da Oppe Clothing (`public/projetos/*.webp`)
- [x] AdoPet: link e print (`public/projetos/adopet.webp`)
- [x] GitHub e LinkedIn (`contatos`)
- [x] PDF do currículo (`public/curriculo-joao-victor-pereira-ribeiro.pdf`)
- [x] E-mail (`contatos`)

## Estrutura

```text
src/
├── content/      # site.js (conteúdo) e navigation.js (ordem/folio)
├── styles/       # tokens, base, peças de papel e layout das páginas
├── components/   # Layout, Masthead, PageTurn, Cut, Photo, SmartLink
├── pages/        # Capa, Perfil, Destaque, Projetos, Contato, NaoEncontrada
└── test/         # setup do Vitest e helper renderAt
```

## Metodologia: Spec-Driven Development (Spec Kit)

O projeto usa o [GitHub Spec Kit](https://github.com/github/spec-kit). Cada feature passa por:

1. `/speckit-specify` — o quê e por quê (`specs/NNN-nome/spec.md`)
2. `/speckit-clarify` — dúvidas (opcional)
3. `/speckit-plan` — como (`plan.md`, `research.md`, `data-model.md`, `contracts/`)
4. `/speckit-tasks` — tarefas por user story (`tasks.md`)
5. `/speckit-implement` — execução

Princípios do projeto: [`.specify/memory/constitution.md`](.specify/memory/constitution.md).
Primeira feature: [`specs/001-portfolio-revista/`](specs/001-portfolio-revista/).

## Backend

Não há backend nesta versão: o contato é por links. Se um dia houver formulário de
contato ou API própria, ela entra como nova feature com Node.js + Express em `server/`
(Princípio IV da constituição).

## Deploy

O site é publicado no **GitHub Pages** pelo workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) a cada push na `main`
(lint, testes, build e publicação). Ele fica em `https://offklaus.github.io/offjoao.dev/`.

- O build usa `BASE_PATH=/<repositório>/`; arquivos de `public/` passam por
  `withBase()` (`src/content/base.js`) e o React Router usa o mesmo `basename`.
- Links diretos (`/offjoao.dev/perfil`…) funcionam porque o workflow copia o `index.html`
  para `404.html`.
- Para testar o build do Pages localmente: `$env:BASE_PATH='/offjoao.dev/'; npm run build`
  e depois `npx vite preview --base /offjoao.dev/`.

Em outro host estático, rode `npm run build` sem `BASE_PATH` e configure o fallback de
SPA (todas as rotas → `index.html`).
