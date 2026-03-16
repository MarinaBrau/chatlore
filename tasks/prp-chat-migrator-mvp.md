# PRP: AI Chat History Migrator — MVP (v1)

## Introduction

Ferramenta web que permite usuários importarem o histórico de conversas do ChatGPT e transformá-lo em memórias estruturadas e system prompts prontos pra usar no Claude.

**Escopo do MVP:** Upload + parse client-side + listagem de conversas + 3 resumos grátis com IA (sem auth, sem pagamento, sem banco de dados). Foco em validar o conceito e coletar feedback.

**Problema:** Usuários que migram de ChatGPT pro Claude perdem todo o contexto acumulado — preferências, decisões, conhecimento adquirido em centenas de conversas.

**Solução:** Parse local do `conversations.json`, processamento via Claude API, e exportação em múltiplos formatos (texto, Claude Project instructions, CLAUDE.md).

## Goals

- Permitir upload e parse do `conversations.json` do ChatGPT inteiramente no browser (privacidade)
- Listar todas as conversas com metadados navegáveis (título, data, nº mensagens, preview)
- Processar conversas selecionadas via Claude API gerando resumos estruturados
- Oferecer 3 processamentos gratuitos por sessão (sem auth — controle via localStorage)
- Exportar resultados em 3 formatos: texto estruturado, Claude Project instructions, CLAUDE.md
- Deploy funcional na Vercel

## User Stories

### US-001: Upload e parse do conversations.json
**Description:** As a user, I want to upload my ChatGPT export file so that I can see all my conversations listed.

**Acceptance Criteria:**
- [ ] Drag & drop zone aceita arquivo JSON
- [ ] Botão alternativo "Selecionar arquivo" funciona
- [ ] Parse acontece 100% client-side (arquivo não é enviado ao servidor)
- [ ] Arquivos inválidos mostram mensagem de erro clara
- [ ] Arquivos grandes (>100MB) não travam o browser (usar Web Worker ou chunked parsing)
- [ ] Typecheck passes

### US-002: Listagem de conversas com metadados
**Description:** As a user, I want to see all my conversations listed with useful metadata so that I can decide which ones to process.

**Acceptance Criteria:**
- [ ] Lista mostra: título, data de criação, nº de mensagens, preview das primeiras mensagens
- [ ] Ordenação padrão por data (mais recente primeiro)
- [ ] Busca por texto no título funciona
- [ ] Contador total de conversas visível
- [ ] Scroll virtualizado para listas grandes (>500 conversas)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Seleção de conversas para processamento
**Description:** As a user, I want to select specific conversations so that only relevant ones are processed by AI.

**Acceptance Criteria:**
- [ ] Checkbox em cada conversa para seleção individual
- [ ] "Selecionar todas" / "Limpar seleção" funciona
- [ ] Contador de selecionadas visível (ex: "5 conversas selecionadas")
- [ ] Botão "Processar selecionadas" habilitado apenas quando há seleção
- [ ] Limite visual mostra quantos processamentos gratuitos restam (ex: "2/3 restantes")
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Processamento via Claude API
**Description:** As a user, I want the AI to analyze my selected conversations and generate structured insights so that I can transfer my context to Claude.

**Acceptance Criteria:**
- [ ] API route recebe apenas o conteúdo das conversas selecionadas (não o arquivo inteiro)
- [ ] Claude API (claude-sonnet-4) processa e retorna: resumo estruturado, tópicos-chave, preferências do usuário identificadas, padrões de uso
- [ ] Loading state claro durante processamento (com estimativa ou progress)
- [ ] Erro de API mostra mensagem amigável com opção de retry
- [ ] Rate limiting básico na API route (prevenir abuso)
- [ ] Typecheck passes

### US-005: Controle freemium (3 grátis por sessão)
**Description:** As a user, I get 3 free AI processings per session, after which I see an upgrade prompt.

**Acceptance Criteria:**
- [ ] Contador de uso salvo em localStorage
- [ ] Após 3 processamentos, botão "Processar" mostra modal de "limite atingido"
- [ ] Modal mostra mensagem tipo "Gostou? Em breve teremos plano premium" (landing page / waitlist)
- [ ] Contador reseta ao limpar localStorage (aceitável para MVP)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Visualização dos resultados
**Description:** As a user, I want to see the AI-generated analysis in a clean, readable format so that I can review it before exporting.

**Acceptance Criteria:**
- [ ] Resultado mostra seções claras: Resumo, Tópicos-chave, Preferências, Padrões de uso
- [ ] Markdown renderizado com formatação adequada
- [ ] Cada conversa processada tem seu resultado individual
- [ ] Opção de "combinar tudo" que consolida resultados de múltiplas conversas
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Exportação multi-formato
**Description:** As a user, I want to export my results in different formats so that I can use them in Claude.

**Acceptance Criteria:**
- [ ] Botão "Copiar como texto" — copia markdown estruturado pro clipboard
- [ ] Botão "Copiar como Project Instructions" — formato otimizado pra colar nas instruções de projeto do Claude
- [ ] Botão "Baixar CLAUDE.md" — download de arquivo `.md` formatado pra Claude Code
- [ ] Feedback visual "Copiado!" ao clicar em copiar
- [ ] Cada formato tem template diferente otimizado pro seu uso
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Landing page e layout
**Description:** As a developer, I need the app shell, layout, and landing page so that users understand the product and can start using it.

**Acceptance Criteria:**
- [ ] Landing page com: headline, explicação do que faz, CTA "Começar grátis"
- [ ] Layout responsivo (mobile + desktop)
- [ ] Navegação: Landing → Upload → Resultados (fluxo linear)
- [ ] Footer com link para GitHub / contato
- [ ] Meta tags para SEO e Open Graph
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: Upload aceita apenas arquivos `.json` com estrutura válida de export do ChatGPT
- FR-2: Parse do JSON acontece inteiramente no client-side via Web Worker
- FR-3: Lista de conversas suporta busca, ordenação e seleção múltipla
- FR-4: API route `/api/process` recebe conversas e retorna análise via Claude API
- FR-5: Rate limiting de 10 requests/minuto por IP na API route
- FR-6: Controle de uso freemium via localStorage (3 processamentos/sessão)
- FR-7: Exportação disponível em 3 formatos: texto markdown, Claude Project instructions, CLAUDE.md
- FR-8: Nenhum dado do usuário é persistido no servidor (stateless)

## Non-Goals (Fora do Escopo — MVP)

- ❌ Autenticação (Clerk) — será v2
- ❌ Pagamentos (Stripe) — será v2
- ❌ Banco de dados (Supabase) — será v2
- ❌ Salvar memórias / histórico de uso — será v2
- ❌ Busca semântica no histórico — será v2
- ❌ Suporte a Gemini, Copilot, Grok — será v2
- ❌ PWA / offline mode
- ❌ i18n (apenas inglês no MVP — produto global)

## Design Considerations

- UI minimalista, inspirada no estilo Claude (limpo, tipografia forte)
- Fluxo wizard linear: Upload → Selecionar → Processar → Exportar
- Dark mode como padrão (target audience: devs e power users)
- Componentes: shadcn/ui para consistência e velocidade
- Animações sutis com Framer Motion nos transitions de step

## Technical Considerations

- **Parse client-side:** Web Worker para não bloquear UI com arquivos grandes
- **Estrutura ChatGPT export:** Array de objetos com `title`, `create_time`, `mapping` (árvore de mensagens)
- **Claude API:** Usar `claude-sonnet-4` via API route server-side (chave nunca exposta)
- **Tamanho de contexto:** Conversas longas precisam ser truncadas/resumidas antes de enviar ao Claude
- **Segurança:** Validar JSON no parse, sanitizar output do Claude antes de render
- **Deploy:** Vercel com environment variable `ANTHROPIC_API_KEY`

## Success Metrics (MVP)

- Usuários conseguem fazer upload e ver conversas em <5 segundos
- Taxa de conversão upload → processamento IA > 60%
- 3 processamentos gratuitos usados por >40% dos usuários
- Tempo médio de processamento IA < 15 segundos por conversa
- Bounce rate da landing page < 50%

## Open Questions

- Qual o tamanho máximo de conversa que o Claude consegue processar de uma vez? (definir estratégia de chunking)
- Incluir analytics (Vercel Analytics / PostHog) no MVP?
- Domínio? (ex: chatmigrator.com, aichatmigrator.com)
