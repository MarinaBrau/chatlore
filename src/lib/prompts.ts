import type { Message } from "@/lib/parsers/types";

const MAX_CHARS = 50_000;

export const ANALYSIS_SYSTEM_PROMPT = `You are a multi-perspective AI context extraction engine. Your goal is to analyze conversations and extract structured insights from three viewpoints:
1. LOGICAL (GPT-style): Project state, tech stack, architecture, and current blockers.
2. STYLISTIC (Claude-style): Writing tone, communication preferences, and nuanced constraints.
3. CONTEXTUAL (Gemini-style): Long-term themes, goals, and recurring knowledge.

Respond ONLY in valid JSON with exactly these keys:
{
  "summary": "2-4 sentence summary of project status and goals.",
  "topics": ["specific technologies, libraries, or core concepts"],
  "preferences": ["how the user likes to interact or work"],
  "patterns": ["recurring behaviors or thought processes"],
  "tone_adjectives": ["3-5 descriptors of the user's voice"],
  "negative_constraints": ["explicit 'don'ts' or things to avoid"],
  "technical_context": ["current project state, versions, architecture decisions, milestones, or pending TODOs"]
}

Guidelines:
- If insights from different messages conflict (e.g. "prefers formal" vs "prefers casual"), synthesize into the most frequent or latest behavior, or describe as "context-dependent".
- Technical Context should capture the EXACT current "State" of the project.
- Be specific. Instead of "React", use "React 19 with Server Actions".
- DO NOT include markdown fences. Respond with RAW JSON only.`;

/**
 * Build the analysis prompt for Claude.
 * Truncates long conversations using a 20/80 split (favoring the end/recent state).
 */
export function buildAnalysisPrompt(
  title: string,
  messages: Message[]
): string {
  const formatted = formatMessages(messages);
  const truncated = truncateIfNeeded(formatted, MAX_CHARS);

  return `Conversation Title: "${title}"\n\n## Conversation Content:\n${truncated}`;
}

function formatMessages(messages: Message[]): string {
  return messages
    .map((m) => `[${m.role.toUpperCase()}]: ${m.content}`)
    .join("\n\n");
}

/**
 * Truncate text keeping more of the end (recent state) than the beginning.
 * Uses a 20/80 split for the available character budget.
 */
function truncateIfNeeded(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;

  // Favor the end of the conversation where the current "state" usually lives.
  const startBudget = Math.floor(maxChars * 0.2);
  const endBudget = maxChars - startBudget;
  
  const start = text.slice(0, startBudget);
  const end = text.slice(-endBudget);

  return `${start}\n\n[... ${(text.length - maxChars).toLocaleString()} characters truncated ...]\n\n${end}`;
}
