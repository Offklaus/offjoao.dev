# Feature Specification: Portfólio "Revista 2002"

**Feature Branch**: `001-portfolio-revista`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Use o artefato de design 'Portfólio — Revista 2002' para começar
o meu portfólio. Front em Vite + React e, se necessário, backend em Node.js + Express.
Seguir a metodologia Spec-Driven Development."

## User Scenarios & Testing *(mandatory)*

O portfólio é uma "revista" de seis páginas: 01 Capa, 02 Perfil, 03 Matéria de capa,
04 Projetos, 05 Roadmap e 06 Contato. *(Revisão 2026-11-27: Roadmap entra entre Projetos e
Contato.)* O visitante típico é um recrutador, cliente ou colega que chega
por um link (LinkedIn, currículo, GitHub) e quer saber, rápido, quem é o João, o que ele
já construiu e como falar com ele.

### User Story 1 - Ver a capa e entender quem é o dev (Priority: P1)

O visitante abre o endereço principal e vê a capa: o nome "João Victor" em destaque, a
área (FullStack · Engenharia de Software), uma frase de apresentação e a foto
inteira. A página ocupa a tela toda, sem moldura. *(Revisão 2026-11-24: título "Portfólio",
"por João" e a chamada de projetos removidos a pedido do dono. Revisão 2026-11-26: nome
menor, área e frase maiores, para o destaque não ficar só no nome; "Desenvolvedor web"
virou "FullStack".)*

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
("02 / 06"). A página atual fica destacada no menu.

**Why this priority**: é o que conecta as seis páginas e dá a identidade de revista;
sem navegação o conteúdo fica inacessível.

**Independent Test**: a partir da capa, clicar "Próxima →" quatro vezes e conferir que
cada página aparece na ordem com o folio certo (cinco vezes, com o Roadmap); na última, o botão volta à capa.

**Acceptance Scenarios**:

1. **Given** a capa, **When** o visitante aciona "Próxima →", **Then** abre o Perfil com o
   folio "02 / 06".
2. **Given** a capa, **When** o visitante olha o rodapé, **Then** "← Anterior" aparece
   desativado.
3. **Given** a página Contato (06 / 06), **When** o visitante aciona "Voltar à capa ↺",
   **Then** abre a capa.
4. **Given** qualquer página, **When** o visitante escolhe um item do menu, **Then** abre a
   página correspondente e esse item fica marcado como página atual.
5. **Given** um link copiado de uma página interna (ex.: Projetos), **When** outra pessoa
   o abre, **Then** cai direto nessa página.
6. **Given** um visitante que usa só o teclado, **When** navega com Tab e Enter, **Then**
   alcança e aciona todos os links com foco visível.
7. **Given** qualquer página, **When** o visitante avança ou volta, **Then** a nova página
   aparece na hora, sem virar; o conteúdo entra em até 2 s (FR-019).

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
Node.js, Express, React e PostgreSQL, como desenvolvedor FullStack.

**Why this priority**: dá contexto humano e técnico; complementa a capa.

**Independent Test**: abrir a página Perfil e conferir foto, frases de apresentação e a
lista de tecnologias.

**Acceptance Scenarios**:

1. **Given** a página Perfil, **When** carrega, **Then** mostra o título "Quem é o dev?", a
   apresentação e a stack.

---

### User Story 6 - Ver outros projetos (Priority: P2)

Na página Projetos ("Outras obras"), o visitante vê três projetos numerados — AdoPet,
Salon Beauty (antigo Lapidare Beauty) e Oppe Clothing — cada um com o print do site, nome e uma frase; o print
leva ao site no ar. *(Revisão 2026-11-23: Times de Society removido a pedido do dono.)*
*(Revisão 2026-11-26: "Retira os links dos projetos do adopet e salon [...] de todos no card
coloca 'Em produção'". AdoPet e Salon Beauty ficam sem link; só a Oppe Clothing leva ao
site. Os três cartões levam a etiqueta "Em produção" no canto do print.)*

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
4. **Given** um projeto com status cadastrado (hoje "Em produção" nos três), **When** a
   página carrega, **Then** o cartão mostra a etiqueta com o status no canto do print.

---

### User Story 7 - Ver o roadmap de estudos (Priority: P2)

Na página Roadmap ("Roadmap de estudos"), o visitante vê o que o João já estudou e o que
está estudando agora, numa linha do tempo de cima para baixo, com caixas de seleção. Duas
abas separam o roadmap: "Concluído" mostra as disciplinas aprovadas da faculdade (UNINTER,
de 2023 a 2026), por ano e módulo; "Cursando agora" mostra a faculdade à esquerda (o
módulo em curso) e, à direita, a carreira Engenharia de Agentes de IA da Alura, com o
estado de cada curso. *(Pedido de 2026-11-27: "uma aba onde eu vou colocar meu roadmap do
que eu ja Estudei, e o que estou estudando no momento [...] e tende check box"; "o road
map eu quero de cima pra baixo, onde tenha uma linha do tempo"; "Faça com que tenha uma
animação leve de scroll"; "deixa separado o roadmap do que ja esta concluido do que estou
cursando [...] o lado direito pro curso da alura, e o esquerdo para da faculdade". Dados
do AVA sem atividades extensionistas, reprovações, estágio e atividades complementares.)*

**Why this priority**: mostra a formação e o estudo contínuo, que reforçam o perfil de
quem procura estágio, sem substituir os projetos.

**Independent Test**: abrir /roadmap, conferir as 46 disciplinas por ano na aba
"Concluído", trocar para "Cursando agora" e conferir as duas disciplinas em curso e os
cursos da Alura com o estado de cada um.

**Acceptance Scenarios**:

1. **Given** a página Roadmap, **When** carrega, **Then** a aba "Concluído" está
   selecionada e mostra as disciplinas aprovadas de 2023 a 2026, por módulo, cada uma com
   a caixa marcada.
2. **Given** a aba "Concluído", **When** o visitante aciona "Cursando agora" (clique ou
   setas do teclado), **Then** aparecem a coluna da faculdade (disciplinas em curso) e a da
   Alura (níveis e cursos, cada um concluído, estudando agora com a porcentagem, ou a
   fazer).
3. **Given** o endereço `/roadmap?aba=cursando`, **When** abre, **Then** a aba "Cursando
   agora" já vem selecionada.
4. **Given** a linha do tempo maior que a tela, **When** o visitante rola, **Then** só a
   área de conteúdo rola (cabeçalho e rodapé ficam), cada cartão aparece subindo de leve e
   a linha do trilho se preenche; com `prefers-reduced-motion`, nada se move.

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
- Navegador sem animação ligada à rolagem: o roadmap aparece inteiro e parado.
- Fontes da web demoram ou falham: o texto aparece imediatamente com fontes de sistema
  equivalentes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O site MUST ter seis páginas, cada uma com endereço próprio e
  compartilhável: Capa, Perfil, Destaque, Projetos, Roadmap e Contato.
- **FR-002**: Toda página MUST exibir o cabeçalho com a marca "offjoão.dev" (link para a
  capa) e o menu com Perfil, Destaque, Projetos, Roadmap e Contato, marcando a página atual.
- **FR-003**: Toda página MUST exibir o rodapé de folhear com "← Anterior", o folio
  "NN / 06" e "Próxima →"; na capa "Anterior" fica desativado e na página 06 o avanço
  vira "Voltar à capa ↺".
- **FR-004**: A capa MUST exibir o nome (João Victor), a área, a frase de
  apresentação e foto.
- **FR-005**: A página Perfil MUST exibir foto, apresentação e a
  stack em etiquetas, cada tecnologia com o seu ícone na cor da marca (Simple Icons,
  CC0) e um ícone próprio para FullStack. *(Revisão 2026-11-25: "foco a mais nas minhas
  stack [...] colocando os ícones de cada stack".)* A stack passa em carrossel contínuo da
  esquerda para a direita, sem botão de pausa (pausa só com o mouse em cima) e parada com
  `prefers-reduced-motion`. *(Revisão 2026-11-26: "tire esse botao de pausar".)*
- **FR-006**: A página Destaque MUST exibir rótulo, título, subtítulo, imagem, resumo e
  ficha técnica (tipo, stack, link do repositório) do OEE-Fabric; a stack em etiquetas
  com o ícone de cada tecnologia (só os ícones no celular).
- **FR-007**: A página Projetos MUST exibir os projetos (hoje três) em cartões numerados com
  imagem, nome, descrição e a stack usada (etiquetas com ícone; no celular, selos só com o
  ícone por cima do print); o cartão só é link quando o projeto tem endereço.
  *(Revisão 2026-11-26: "deixe evidenciado qual stack foi usada nos projetos".)* Projeto
  com `status` mostra uma etiqueta de papel no canto de cima do print (menor no celular),
  carimbada na entrada da página; hoje os três estão "Em produção" e só a Oppe Clothing
  tem link.
- **FR-008**: A página Contato MUST exibir e-mail, GitHub, LinkedIn e currículo, cada um
  levando ao destino correspondente; destinos externos abrem em nova aba.
- **FR-009**: Endereços inexistentes MUST mostrar uma página "não encontrada" com link
  para a capa.
- **FR-010**: Todos os textos e links MUST ser editáveis em um único lugar, separado do
  layout.
- **FR-011**: Informação ainda não fornecida MUST aparecer como placeholder explícito entre
  colchetes.
- **FR-012**: O site MUST seguir a identidade visual do canvas "Revista 2002": letras
  recortadas de papel, fotos com contorno fino (sem borda rasgada desde a revisão de 25/11), paleta preto/creme e as quatro
  famílias tipográficas.
- **FR-013**: Todo conteúdo e controle MUST ser utilizável por teclado e leitor de tela,
  com foco visível e contraste adequado.
- **FR-014**: Ao trocar de página, a visualização MUST voltar ao topo e o título da aba
  MUST indicar a página ("offjoão.dev — Perfil").
- **FR-015**: A troca de página MUST ser imediata, sem animação de virar.
  *(Revisão 2026-11-23: "tire a animação de revista, não gostei da forma que ficou".
  A entrada do conteúdo voltou em 2026-11-25 como FR-019.)*
- **FR-016**: Cada página MUST caber inteira na tela, sem rolagem, em telas de 360×640 a
  1920×1080 pixels: textos se ajustam ao tamanho da tela e fotos encolhem para dar lugar
  ao texto. *(Revisão 2026-11-18: "realinhe o design pra não ter scroll na página".)* Exceção desde
  2026-11-27: o Roadmap rola dentro da área de conteúdo (FR-020).
- ~~FR-017 / FR-018~~: virada de página animada e arraste da ponta — **removidos em
  2026-11-23** a pedido do dono (ver FR-015).
- **FR-019**: Ao abrir cada página, o conteúdo MUST entrar em no máximo 2 s, com os mesmos
  tempos e curvas em todas: os papéis rasgados dos títulos são colados de ponta a ponta,
  da esquerda para a direita, e os textos são batidos letra a letra como numa máquina de
  escrever, no mesmo ritmo e em cascata. O leitor de tela recebe o texto inteiro, nada
  rola durante ou depois da entrada, e com `prefers-reduced-motion: reduce` tudo aparece
  pronto. *(Revisão 2026-11-25: "crie uma animação que tenha no máximo 2 seg em cada
  página [...] máquina de escrever [...] colada de ponta a ponta". Revisão 2026-11-26:
  "parece que esta colando ela por inteira" — a colagem passa a ser uma passada contínua,
  em velocidade constante, que assenta os papéis da ponta esquerda à direita, um emendado
  no outro, com uma dobra marcando onde o papel está sendo pressionado.)*
- **FR-020**: A página Roadmap MUST mostrar o roadmap de estudos em linha do tempo
  vertical, com duas abas usáveis por teclado: "Concluído" (selecionada ao abrir) e
  "Cursando agora" (`?aba=cursando` abre direto nela). Concluído: as disciplinas aprovadas
  da faculdade por ano e módulo, com a caixa marcada. Cursando agora: a faculdade à
  esquerda e a carreira da Alura à direita (no celular, uma embaixo da outra), cada curso
  com o seu estado — concluído (caixa marcada), estudando agora (borda tracejada e a
  porcentagem feita) ou a fazer (contorno apagado). É a única página que rola, só na área
  de conteúdo, com uma animação leve (cada cartão sobe ao entrar na tela e a linha do
  trilho se preenche) que para com `prefers-reduced-motion`. O título é colado na entrada
  como nas outras páginas; a linha do tempo não entra na colagem.

### Key Entities

- **Página da revista**: número (01–06), nome, endereço, título da aba, página anterior e
  próxima.
- **Projeto**: número, nome, descrição curta, imagem (opcional), link (opcional),
  destaque (sim/não). O destaque tem ainda subtítulo, resumo, tipo e tecnologias.
- **Perfil**: nome, área, formação, frases de apresentação, stack.
- **Roadmap**: disciplinas da faculdade (ano, módulo, nome; concluídas e em curso) e a
  carreira da Alura (níveis com cursos: título, subtítulo e progresso de 0 a 100%, mais os
  checkpoints).
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
