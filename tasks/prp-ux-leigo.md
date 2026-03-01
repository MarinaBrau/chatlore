# PRP: UX para Usuário Leigo — ChatLore

## Introduction

O ChatLore assume conhecimento técnico em 3 pontos críticos: (1) o usuário não sabe como exportar dados do ChatGPT, (2) a linguagem usa termos como "context file", "CLAUDE.md" e "system prompt" que não comunicam valor a um usuário comum, (3) após gerar o resultado, o usuário não sabe onde colar/usar o output. Este PRP resolve esses 3 gaps com guia visual, copy humanizada e orientação pós-export.

## Goals

- Reduzir abandono na /upload com modal de guia passo-a-passo
- Comunicar valor do produto em linguagem acessível (landing + results)
- Guiar o usuário após export com seção "Next Steps" + link direto para Claude.ai
- Usar mockups estilizados (componentes React) em vez de screenshots (fácil de manter)

## User Stories

### US-001: Modal de Guia de Exportação na /upload
**Description:** As a non-technical user, I want a step-by-step guide showing me how to export my ChatGPT data so that I can use ChatLore without getting stuck on the first step.

**Acceptance Criteria:**
- [ ] Botão "Don't know how to export?" visível na página /upload, abaixo da drop zone
- [ ] Modal abre com 4 passos numerados: (1) Abrir Settings, (2) Data Controls → Export, (3) Confirmar email, (4) Extrair .zip e localizar conversations.json
- [ ] Passo 1 inclui mockup estilizado da interface de Settings do ChatGPT (componente React, não screenshot)
- [ ] Modal tem botão de fechar e fecha ao clicar fora
- [ ] Funciona em mobile (responsive)
- [ ] Typecheck passes
- [ ] Verify in browser using dev tools

### US-002: Mockup Estilizado — ChatGPT Settings
**Description:** As a user viewing the export guide, I want to see a visual representation of the ChatGPT settings screen so that I know exactly where to click.

**Acceptance Criteria:**
- [ ] Componente `ChatGptMockup` renderiza representação minimalista da tela de Settings do ChatGPT
- [ ] Mostra menu lateral com items (General, Data controls destacado)
- [ ] Área principal mostra "Export data" com botão "Export" destacado
- [ ] Usa paleta neutra (cinza/branco) para não confundir com o estilo do ChatLore
- [ ] Responsivo — escala bem em telas menores
- [ ] Typecheck passes

### US-003: Simplificar Copy da Landing Page
**Description:** As a non-technical user, I want to understand what ChatLore does and why I should use it without encountering jargon, so that I feel confident starting the process.

**Acceptance Criteria:**
- [ ] HowItWorks: Step 01 body não menciona "conversations.json" diretamente — usa linguagem como "your chat history file"
- [ ] HowItWorks: Step 04 body explica benefício em vez de formato técnico
- [ ] TrustPillars: Remove menção a "Claude's API" — usa "securely analyzed and immediately discarded"
- [ ] FinalCta: Subtexto mais encorajador e menos técnico
- [ ] Manter headline do Hero intacta (já é emocional e eficaz)
- [ ] Typecheck passes

### US-004: Humanizar Loading States na /results
**Description:** As a user waiting for my analysis, I want to see friendly, encouraging messages instead of technical status updates so that I feel the tool is working for me.

**Acceptance Criteria:**
- [ ] Estado de loading mostra mensagens rotativas a cada ~3s: "Learning about your preferences...", "Discovering your patterns...", "Finding what makes you unique..."
- [ ] Após conclusão com sucesso, exibir mensagem de celebração breve antes de mostrar resultados (ex: "Your context file is ready!" com checkmark animado, visível por 1.5s)
- [ ] Typecheck passes

### US-005: Seção "Next Steps" na /results
**Description:** As a user who just generated my context file, I want clear guidance on where and how to use it so that I can complete the final step of the process.

**Acceptance Criteria:**
- [ ] Seção "What's next?" aparece abaixo dos botões de export
- [ ] 3 cards correspondendo aos 3 formatos de export:
  - **Claude.ai Projects**: Mockup minimalista mostrando onde colar + botão "Open Claude.ai" (link externo)
  - **Claude Code**: Instrução de onde salvar o CLAUDE.md + comando terminal estilizado
  - **Quick paste**: Instrução de colar no início de qualquer conversa
- [ ] Card do Claude.ai Projects inclui mockup estilizado da interface mostrando área de "Project Instructions"
- [ ] Botão "Open Claude.ai" abre https://claude.ai em nova aba
- [ ] Cards são colapsáveis (accordion) para não sobrecarregar visualmente
- [ ] Typecheck passes

### US-006: Mockup Estilizado — Claude Project Instructions
**Description:** As a user on the results page, I want to see where exactly to paste my context in Claude.ai so that I don't get lost in the interface.

**Acceptance Criteria:**
- [ ] Componente `ClaudeProjectMockup` renderiza representação minimalista da tela de Project do Claude.ai
- [ ] Mostra sidebar com "Projects" e área principal com campo "Instructions" destacado
- [ ] Usa paleta neutra/Claude (cream tones) mas claramente diferenciável do UI do ChatLore
- [ ] Responsivo
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Modal de guia acessível via botão na /upload, com overlay e animação de entrada
- FR-2: Mockups são componentes React puros (sem imagens externas), usando Tailwind para estilização
- FR-3: Copy revisada mantém tom "warm but confident" consistente com a marca ChatLore
- FR-4: Loading states usam array de mensagens com rotação via `useEffect` + `setInterval`
- FR-5: Seção "Next Steps" usa componente Accordion existente do shadcn/ui
- FR-6: Link "Open Claude.ai" usa `target="_blank"` com `rel="noopener noreferrer"`

## Non-Goals

- Não criar screenshots reais das interfaces (difícil de manter)
- Não traduzir o app para pt-BR (público-alvo é global, em inglês)
- Não alterar funcionalidade — apenas UX/copy/guias visuais
- Não alterar a página /guide (já é completa para usuários que a encontram)
- Não adicionar onboarding wizard multi-step (over-engineering)

## Design Considerations

- Mockups devem usar paleta neutra (cinza/branco) para contrastar com o tema cream/terracotta do ChatLore
- Modal deve seguir padrão do shadcn Dialog component
- Animações sutis (framer-motion) consistentes com o resto do app
- Cards de "Next Steps" devem ser visualmente distintos dos ResultCards

## Technical Considerations

- Usar shadcn `Dialog` para o modal (já disponível via radix-ui)
- Mockups são componentes stateless, sem dependências externas
- Loading messages array declarado como const no componente
- Accordion do "Next Steps" pode reutilizar pattern do ResultCard

## Success Metrics

- Usuário consegue ir de "nunca exportei dados do ChatGPT" até "colei no Claude" sem sair do ChatLore
- Zero menções a ".json", "API" ou "system prompt" na jornada principal (landing → upload → results)
- Tempo médio na /upload reduz (menos bounce por confusão)
- Seção "Next Steps" tem pelo menos 1 interação (accordion expand) em 50%+ das sessões

## Open Questions

- Devemos adicionar analytics events para track de interação com o modal e "Next Steps"?
- Vale incluir suporte a exportação do Google Gemini no futuro? (afetaria o mockup/guia)
