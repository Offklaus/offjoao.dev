# Data Model: Portfólio "Revista 2002"

Todo o conteúdo vive em `src/content/site.js` como objetos JavaScript exportados.
Não há banco de dados nem estado mutável.

## Site

| Campo | Tipo | Regra |
|-------|------|-------|
| `brand` | string | marca recortada no cabeçalho ("offjoão") |
| `domain` | string | sufixo da marca (".dev") |
| `author` | string | nome usado em "por João" |
| `role` | string | área exibida na capa |

## Page (`pages`, lista ordenada)

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | `'capa' \| 'perfil' \| 'destaque' \| 'projetos' \| 'contato'` | único |
| `path` | string | começa com `/`; único; a capa é `/` |
| `label` | string | texto do menu e do título da aba |
| `inMenu` | boolean | a capa não aparece no menu (a marca leva a ela) |

**Derivados**: `number` = posição + 1, exibido com 2 dígitos ("02"); total = tamanho da
lista ("05"); `prev`/`next` = vizinhos na lista. A última página aponta `next` para a capa
com o rótulo "Voltar à capa ↺"; a primeira não tem `prev`.

## Image

| Campo | Tipo | Regra |
|-------|------|-------|
| `src` | string \| null | caminho em `public/` ou URL; `null` = ainda não fornecida |
| `alt` | string | obrigatório quando `src` existe |
| `placeholder` | string | texto entre colchetes mostrado quando `src` é `null` |
| `position` | string (opcional) | ponto focal no recorte (`object-position`), ex.: `'top'` para prints de site |

## Profile (`capa` e `perfil`)

- `capa`: `title` ("Portfólio"), `chamada` (2ª linha, "que saíram do papel"), `intro`,
  `photo: Image`. A 1ª linha da chamada é derivada: `${projetos.length + 1} projetos`.
- `perfil`: `titulo: [string, string]`, `lead`, `paragrafos: string[]`,
  `stack: string[]`, `photo: Image`.

## Project (`destaque` e `projetos`)

| Campo | Tipo | Regra |
|-------|------|-------|
| `number` | string | 2 dígitos, sequencial a partir de "01" (só em `projetos`) |
| `name` | string | obrigatório |
| `description` | string | 1 frase |
| `image` | Image | placeholder "[Print]" quando sem imagem |
| `url` | string \| null | `https://…`; `null` = cartão sem link |
| `stack` | string[] | tecnologias, cada uma com ícone (`src/content/stackIcons.js`) |
| `status` | string? | etiqueta no canto do print (ex.: `'Em produção'`); ausente = sem etiqueta (só em `projetos`) |

`destaque` acrescenta: `kicker`, `titulo: string[3]`, `subtitulo`, `resumo`, `tipo`,
`stack`, `repo: { label: string, href: string | null }` (o rótulo fica entre colchetes
enquanto `href` for `null`).

## ContactChannel (`contatos`, lista ordenada)

| Campo | Tipo | Regra |
|-------|------|-------|
| `type` | `'E-mail' \| 'GitHub' \| 'LinkedIn' \| 'Currículo'` | rótulo pequeno (kicker) |
| `label` | string | texto grande; placeholder entre colchetes enquanto não houver destino |
| `href` | string \| null | `mailto:`, `https://` ou caminho de arquivo em `public/`; `null` = sem link |
| `download` | boolean | `true` só para o currículo |

## Regras gerais

- Um valor `null` em `src`, `url` ou `href` nunca vira `href="#"`.
- `http(s)://` abre em nova aba; `mailto:` e arquivos abrem na mesma aba.
