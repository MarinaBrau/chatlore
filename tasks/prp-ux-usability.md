# PRP: Melhorias de Usabilidade e Conversão — ChatLore

## Introduction
Conjunto de melhorias para aumentar a confiança do usuário técnico, reduzir fricção na seleção de conversas, e antecipar o "aha moment" mostrando o output antes do upload. Tom: direto, técnico, utility-first.

## Goals
- Eliminar ambiguidade sobre o que acontece com os dados do usuário (parse local vs API)
- Mostrar o valor do output antes do upload (preview do contexto gerado)
- Reduzir fricção na seleção com filtro por data
- Quebrar objeções de segurança/preço com FAQ técnico
- Aumentar engajamento com mockup animado do fluxo

## User Stories

### US-001: Clarificação técnica de privacidade no Step 03
**Description:** As a developer visiting the landing page, I want to understand exactly what happens with my data so that I can trust the tool before uploading.

**Acceptance Criteria:**
- [ ] HowItWorks step 03 reescrito: título e body explicam que parse é local (browser) e análise usa API Claude com stateless processing (zero data retention)
- [ ] TrustPillars pilar 1 atualizado com terminologia "Stateless API calls" ou equivalente
- [ ] Ícone ShieldCheck ou EyeOff adicionado ao step 03
- [ ] Texto menciona explicitamente: "Your file never leaves your browser. Only selected conversations are sent to Claude's API for analysis — stateless, zero logs."
- [ ] Typecheck passes

### US-002: Componente de Preview do Output
**Description:** As a first-time visitor, I want to see an example of what I'll get before uploading so that I understand the value immediately.

**Acceptance Criteria:**
- [ ] Nova seção "What you get" inserida entre HeroSection e SocialProof na landing page
- [ ] Mockup estilizado mostrando um arquivo de contexto com linhas de exemplo: preferências de código, estilo de comunicação, stacks
- [ ] Visual: card com syntax highlighting simulado (estilo código/markdown), fundo escuro (terminal-like)
- [ ] Animação de entrada (whileInView fade-in) consistente com os outros componentes
- [ ] Typecheck passes

### US-003: Filtro por data na seleção de conversas
**Description:** As a user with many conversations, I want to filter by date range so that I can quickly find recent or relevant chats.

**Acceptance Criteria:**
- [ ] Botões de filtro rápido na ConversationList: "All", "Last 30 days", "Last 90 days", "Last year"
- [ ] Filtro por data funciona em conjunto com a busca por título já existente
- [ ] Contagem de conversas filtradas exibida (ex: "42 of 1,203 conversations")
- [ ] Filtro default é "All" (comportamento atual mantido)
- [ ] Typecheck passes

### US-004: Mockup animado do fluxo (CTA refinado)
**Description:** As a visitor, I want to see a quick animated demo of the tool in action so that I understand the process without reading a full guide.

**Acceptance Criteria:**
- [ ] Componente FlowDemo: mockup animado (Framer Motion) mostrando 3 frames em loop: (1) arquivo sendo arrastado, (2) conversas sendo selecionadas, (3) contexto gerado
- [ ] Inserido na landing page entre HowItWorks e TrustPillars (ou como parte do HowItWorks)
- [ ] Animação leve (CSS/Framer), sem vídeo/GIF externo
- [ ] Duração total do loop: ~6-8 segundos
- [ ] Typecheck passes

### US-005: Seção FAQ de objeções
**Description:** As a privacy-conscious developer, I want answers to common concerns so that I can decide to use the tool with confidence.

**Acceptance Criteria:**
- [ ] Seção FAQ adicionada na landing page entre TrustPillars e FinalCta
- [ ] Usa componente Accordion do shadcn/ui (já existe no projeto)
- [ ] Mínimo 4 perguntas: (1) "Are my conversations used to train models?" → No. (2) "Do I need a paid Claude plan?" → No, works with free. (3) "Does it work with Cursor/Windsurf?" → Yes, via CLAUDE.md. (4) "What data leaves my browser?" → Only selected conversations, stateless API, zero retention.
- [ ] Tom direto e técnico, sem marketing fluff
- [ ] Typecheck passes

## Functional Requirements
- FR-1: Step 03 do HowItWorks deve explicar: parse local + API stateless + zero data retention
- FR-2: Seção de preview mostra mockup de output com dados de exemplo realistas
- FR-3: ConversationList deve suportar filtro por data (all/30d/90d/1y) combinado com busca por título
- FR-4: Mockup animado demonstra o fluxo drag→select→context em loop
- FR-5: FAQ usa Accordion com 4+ perguntas focadas em objeções técnicas

## Non-Goals
- Não criar vídeo real ou GIF externo
- Não implementar categorização automática de conversas (ex: "código", "escrita")
- Não adicionar contador de "contextos gerados" (futuro, quando houver volume)
- Não mudar a página /guide (mantém como está)

## Design Considerations
- Reusar Accordion do shadcn/ui (já em NextSteps.tsx)
- Paleta cream/terracotta mantida
- Animações Framer Motion consistentes com stagger/fadeSlide existentes
- Preview do output: estilo terminal/código (fundo escuro, fonte mono)
- Filtros de data: botões pill/chip inline (estilo do toggle Individual/Combined em /results)

## Technical Considerations
- ConversationList já tem search (título) + sort (date). Filtro de data é aditivo
- Conversations têm campo `create_time` (timestamp) para filtro
- Framer Motion já está no projeto — usar para animações do FlowDemo
- Sem dependências novas

## Success Metrics
- Redução de bounce rate na landing (GA4)
- Aumento de conversão upload→process (evento process_started / file_uploaded)
- FAQ section engagement (scroll depth)

## Open Questions
- Nenhuma — escopo definido nas respostas do usuário
