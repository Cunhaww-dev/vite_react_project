# Lucas Fabri | Portfolio

Portfólio pessoal desenvolvido para apresentar meu perfil como engenheiro de software, destacar projetos publicados e facilitar o contato com clientes, recrutadores e parceiros.

O projeto foi construído com foco em experiência visual, animações suaves, performance e organização de componentes reutilizáveis.

## Preview

- Hero com apresentação pessoal e tempo de experiência calculado dinamicamente
- Faixa animada com tecnologias utilizadas
- Seções com animações e transições visuais
- Showcase horizontal com projetos e links externos
- Modal de contato com validação de formulário e envio via Formspree

## Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- React Hook Form
- Zod
- Biome

## Estrutura principal

O projeto está organizado em torno da rota principal e de componentes visuais reutilizáveis:

- `src/routes/index.tsx`: monta a landing page principal do portfólio
- `src/components/hero.tsx`: seção inicial com apresentação pessoal
- `src/components/trustLogos.tsx`: marquee com logos das tecnologias
- `src/components/horizontalScroll.tsx`: vitrine horizontal de projetos com GSAP
- `src/components/contactModal.tsx`: formulário de contato com validação
- `src/lib/modal-context.tsx`: controle global de abertura e fechamento do modal

## Funcionalidades

- Header fixo com mudança visual durante o scroll
- Layout de apresentação com foco em front-end moderno
- Destaque visual para stack e tecnologias dominadas
- Cards de projetos com links para demo e repositório
- Animações com Framer Motion, GSAP e efeitos de reveal
- Formulário com validação usando `react-hook-form` + `zod`
- Envio de mensagens para o Formspree
- Feedback visual com `react-hot-toast`

## Como rodar localmente

### Pré-requisitos

- Node.js 20+ recomendado
- pnpm

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

### Build de produção

```bash
pnpm build
```

### Preview local da build

```bash
pnpm preview
```

### Formatação

```bash
pnpm format
```

## Contato

O modal de contato envia os dados para um endpoint do Formspree configurado diretamente no componente:

- `src/components/contactModal.tsx`

Se quiser trocar o destino do formulário, basta atualizar o valor de `FORMSPREE_ENDPOINT`.

## Projetos exibidos

A vitrine principal atualmente apresenta projetos como:

- Dashboard Boilerplate
- Lins Services Landing Page
- Buscador de Animes
- Smooth Landing Page
- Projetos educacionais em Node.js

Esses dados estão centralizados em:

- `src/components/horizontalScroll.tsx`

## Observações

- O projeto usa `TanStack Router`, mas hoje o foco principal está na rota inicial do portfólio.
- As rotas `/about` e `/contact` existem no código, porém ainda estão como placeholders.
- O visual depende de assets presentes em `public/`, como imagens dos projetos, ícones da stack e foto de perfil.

## Autor

Lucas da Cunha Fabri

- GitHub: [@Cunhaww-dev](https://github.com/Cunhaww-dev)
- LinkedIn: [Lucas da Cunha Fabri](https://www.linkedin.com/in/lucas-da-cunha-fabri-b34ab4312/)
