# Feature Specification: Portfólio "Revista 2002"

**Feature Branch**: `001-portfolio-revista`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Use o artefato de design 'Portfólio — Revista 2002' para começar
o meu portfólio. Front em Vite + React e, se necessário, backend em Node.js + Express.
Seguir a metodologia Spec-Driven Development."

## User Scenarios & Testing *(mandatory)*

O portfólio é uma "revista" de cinco páginas: 01 Capa, 02 Perfil, 03 Matéria de capa,
04 Projetos e 05 Contato. O visitante típico é um recrutador, cliente ou colega que chega
por um link (LinkedIn, currículo, GitHub) e quer saber, rápido, quem é o João, o que ele
já construiu e como falar com ele.

### User Story 1 - Ver a capa e entender quem é o dev (Priority: P1)

O visitante abre o endereço principal e vê a capa: o nome "João Victor" em destaque, a
área (Desenvolvedor web · Engenharia de Software), uma frase de apresentação e a foto
inteira. A página ocupa a tela toda, sem moldura. *(Revisão 2026-11-24: título "Portfólio",
"por João" e a chamada de projetos removidos a pedido do dono.)*

**Why this priority**: é a primeira impressão; sem ela o portfólio não existe. Sozinha já
funciona como cartão de visita.

**Independent Test**: abrir o endereço principal e conferir que nome, área, chamada,
frase e foto (ou o espaço da foto) aparecem e que o menu leva às outras páginas.

**Acceptance Scenarios**:

1. **Given** um visitante sem contexto, **When** abre o endereço principal, **Then** vê o
   nome "João Victor", a área de atuação e a frase de apresentação.
2. **Given** a capa aberta, **When** o visitante olha o cabeçalho, **Then** vê a marca
   "offjoão.dev" e o menu com Perfil, Destaque, Projetos e Contato.
3. **Given** a foto ainda não foi fornecida, **When** a capa carrega, **Then** aparece o
   espaço da foto com o rótulo "[Sua foto]" em vez de uma imagem quebrada.

---

### User Story 2 - Folhear a revista (Priority: P1)

O visitante navega entre as páginas como quem folheia uma revista: pelo menu do topo
ou pelos controles "← Anterior" e "Próxima →" no rodapé, que mostram o número da página
("02 / 05"). A página atual fica destacada no menu.

**Why this priority**: é o que conecta as cinco páginas e dá a identidade de revista;
sem navegação o conteúdo fica inacessível.

**Independent Test**: a partir da capa, clicar "Próxima →" quatro vezes e conferir que
cada página aparece na ordem com o folio certo; na última, o botão volta à capa.

**Acceptance Scenarios**:

1. **Given** a capa, **When** o visitante aciona "Próxima →", **Then** abre o Perfil com o
   folio "02 / 05".
2. **Given** a capa, **When** o visitante olha o rodapé, **Then** "← Anterior" aparece
   desativado.
3. **Given** a página Contato (05 / 05), **When** o visitante aciona "Voltar à capa ↺",
   **Then** abre a capa.
4. **Given** qualquer página, **When** o visitante escolhe um item do menu, **Then** abre a
   página correspondente e esse item fica marcado como página atual.
5. **Given** um link copiado de uma página interna (ex.: Projetos), **When** outra pessoa
   o abre, **Then** cai direto nessa página.
6. **Given** um visitante que usa só o teclado, **When** navega com Tab e Enter, **Then**
   alcança e aciona todos os links com foco visível.
7. **Given** qualquer página, **When** o visitante avança ou volta, **Then** a nova página
   aparece na hora, sem animação.

---

### User Story 3 - Entrar em contato (Priority: P1)

Na página Contato ("Fale comigo"), o visitante encontra e-mail, GitHub, LinkedIn e o
link para baixar o currículo em PDF.

**Why this priority**: converter a visita em conversa é o objetivo final do portfólio.

**Independent Test**: abrir a página Contato e conferir que cada canal abre o destino
certo (cliente de e-mail, perfil do GitHub, perfil do LinkedIn, download do PDF).

**Acceptance Scenarios**:

1. **Given** a página Contato, **When** o visitante aciona "E-mail", **Then** o cliente de
   e-mail abre com o endereço do João preenchido.
2. **Given** a página Contato, **When** aciona "GitHub" ou "LinkedIn", **Then** o perfil
   abre em nova aba.
3. **Given** a página Contato, **When** aciona "Currículo", **Then** o PDF do currículo é
   baixado ou aberto.

---

### User Story 4 - Ler a matéria de capa (Priority: P2)

Na página Destaque, o visitante lê a "matéria de capa" sobre o TCC: "Do chão de fábrica
ao código" — OEE-Fabric, um sistema web para medir a eficiência das máquinas, testado na
Qualitronix Tecnologia — com imagem, resumo, tipo (TCC · artigo), tecnologias e link para
o repositório.

**Why this priority**: é o projeto mais forte e mostra impacto real, mas o portfólio já
entrega valor sem ele.

**Independent Test**: abrir a página Destaque e conferir título, subtítulo, imagem,
resumo, ficha técnica e link do repositório.

**Acceptance Scenarios**:

1. **Given** a página Destaque, **When** carrega, **Then** mostra o rótulo "Matéria de capa ·
   TCC", o título em recortes e o subtítulo sobre o OEE-Fabric.
2. **Given** a ficha técnica, **When** o visitante aciona "Ver repositório ↗", **Then** o
   repositório abre em nova aba.

---

### User Story 5 - Conhecer o perfil (Priority: P2)

Na página Perfil ("Quem é o dev?"), o visitante lê que o João estuda Engenharia de
Software na UNINTER, constrói sistemas web para problemas reais e trabalha com JavaScript,
Node.js, React e PostgreSQL, como desenvolvedor FullStack.

**Why this priority**: dá contexto humano e técnico; complementa a capa.

**Independent Test**: abrir a página Perfil e conferir foto, frases de apresentação e a
lista de tecnologias.

**Acceptance Scenarios**:

1. **Given** a página Perfil, **When** carrega, **Then** mostra o título "Quem é o dev?", a
   apresentação e a stack.

---

### User Story 6 - Ver outros projetos (Priority: P2)

Na página Projetos ("Outras obras"), o visitante vê três projetos numerados — AdoPet,
Lapidare Beauty e Oppe Clothing — cada um com o print do site, nome e uma frase; o print
leva ao site no ar. *(Revisão 2026-11-23: Times de Society removido a pedido do dono.)*

**Why this priority**: mostra amplitude, mas depende de prints e links que ainda serão
fornecidos.

**Independent Test**: abrir a página Projetos e conferir os três cartões, na ordem, com
número, nome e descrição; cartões com link levam ao projeto.

**Acceptance Scenarios**:

1. **Given** a página Projetos, **When** carrega, **Then** mostra 3 cartões numerados 01–03.
2. **Given** um projeto com link cadastrado, **When** o visitante aciona o cartão, **Then**
   o projeto abre em nova aba.
3. **Given** um projeto ainda sem link, **When** o visitante passa por ele, **Then** o
   cartão não se apresenta como link (não leva a lugar nenhum vazio).

---

### Edge Cases

- Endereço inexistente (ex.: `/qualquer-coisa`): mostra uma página "não encontrada" no
  mesmo estilo, com link de volta à capa.
- Foto ou print ainda não fornecido: aparece o espaço com rótulo entre colchetes, nunca
  ícone de imagem quebrada.
- Projeto sem link: cartão sem comportamento de link.
- Tela de 360px: menu e controles quebram linha, títulos em recorte reduzem, nada vaza
  para os lados.
- Tela baixa (notebook com barra do navegador, celular deitado): a página continua inteira
  na tela; a foto é o que encolhe primeiro.
- Tela abaixo de 360×640 ou zoom do navegador: o conteúdo nunca é cortado; só então a área
  de conteúdo pode rolar, como último recurso de acessibilidade.
- Fontes da web demoram ou falham: o texto aparece imediatamente com fontes de sistema
  equivalentes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O site MUST ter cinco páginas, cada uma com endereço próprio e
  compartilhável: Capa, Perfil, Destaque, Projetos e Contato.
- **FR-002**: Toda página MUST exibir o cabeçalho com a marca "offjoão.dev" (link para a
  capa) e o menu com Perfil, Destaque, Projetos e Contato, marcando a página atual.
- **FR-003**: Toda página MUST exibir o rodapé de folhear com "← Anterior", o folio
  "NN / 05" e "Próxima →"; na capa "Anterior" fica desativado e na página 05 o avanço
  vira "Voltar à capa ↺".
- **FR-004**: A capa MUST exibir o nome (João Victor), a área, a frase de
  apresentação e foto.
- **FR-005**: A página Perfil MUST exibir foto, apresentação e
  stack.
- **FR-006**: A página Destaque MUST exibir rótulo, título, subtítulo, imagem, resumo e
  ficha técnica (tipo, stack, link do repositório) do OEE-Fabric.
- **FR-007**: A página Projetos MUST exibir os projetos (hoje três) em cartões numerados com
  imagem, nome e descrição; o cartão só é link quando o projeto tem endereço.
- **FR-008**: A página Contato MUST exibir e-mail, GitHub, LinkedIn e currículo, cada um
  levando ao destino correspondente; destinos externos abrem em nova aba.
- **FR-009**: Endereços inexistentes MUST mostrar uma página "não encontrada" com link
  para a capa.
- **FR-010**: Todos os textos e links MUST ser editáveis em um único lugar, separado do
  layout.
- **FR-011**: Informação ainda não fornecida MUST aparecer como placeholder explícito entre
  colchetes.
- **FR-012**: O site MUST seguir a identidade visual do canvas "Revista 2002": letras
  recortadas de papel, fotos com borda rasgada e fita, paleta preto/creme e as quatro
  famílias tipográficas.
- **FR-013**: Todo conteúdo e controle MUST ser utilizável por teclado e leitor de tela,
  com foco visível e contraste adequado.
- **FR-014**: Ao trocar de página, a visualização MUST voltar ao topo e o título da aba
  MUST indicar a página ("offjoão.dev — Perfil").
- **FR-015**: A troca de página MUST ser imediata, sem animação de virar ou de entrada.
  *(Revisão 2026-11-23: "tire a animação de revista, não gostei da forma que ficou".)*
- **FR-016**: Cada página MUST caber inteira na tela, sem rolagem, em telas de 360×640 a
  1920×1080 pixels: textos se ajustam ao tamanho da tela e fotos encolhem para dar lugar
  ao texto. *(Revisão 2026-11-18: "realinhe o design pra não ter scroll na página".)*
- ~~FR-017 / FR-018~~: virada de página animada e arraste da ponta — **removidos em
  2026-11-23** a pedido do dono (ver FR-015).

### Key Entities

- **Página da revista**: número (01–05), nome, endereço, título da aba, página anterior e
  próxima.
- **Projeto**: número, nome, descrição curta, imagem (opcional), link (opcional),
  destaque (sim/não). O destaque tem ainda subtítulo, resumo, tipo e tecnologias.
- **Perfil**: nome, área, formação, frases de apresentação, stack.
- **Canal de contato**: tipo (E-mail, GitHub, LinkedIn, Currículo), rótulo visível,
  destino.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um visitante identifica nome, área e principal projeto do João em até 10
  segundos na capa.
- **SC-002**: Qualquer página é alcançada em no máximo 1 clique a partir de qualquer outra
  (menu sempre visível).
- **SC-003**: A primeira página fica legível e utilizável em menos de 2 segundos numa
  conexão móvel 4G.
- **SC-004**: 100% dos links e controles são acionáveis só com teclado; auditoria
  automatizada de acessibilidade não aponta falhas de contraste ou nomes ausentes.
- **SC-005**: Nenhuma página tem rolagem, vertical ou horizontal, em telas de 360×640 a
  1920×1080 pixels (incluindo notebooks de 1366×768 e 1280×720 com a barra do navegador).
- **SC-006**: O dono troca um texto, link ou projeto editando um único arquivo, sem mexer
  em layout.

## Assumptions

- Contato é feito por links (e-mail, GitHub, LinkedIn, PDF); não há formulário na v1,
  então nenhum servidor próprio é necessário agora.
- E-mail, usuário do GitHub, perfil do LinkedIn, fotos, prints, links dos projetos,
  resumo do TCC e currículo serão fornecidos depois pelo dono; até lá ficam como
  placeholders, exatamente como no design.
- Idioma único: português do Brasil.
- Sem analytics, cookies ou rastreamento na v1.
- Hospedagem estática (ex.: Vercel, Netlify, GitHub Pages) com suporte a endereços
  internos compartilháveis.
