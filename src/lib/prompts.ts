import type { Message } from "@/lib/parsers/types";

const MAX_CHARS = 50_000;

export const ANALYSIS_SYSTEM_PROMPT = `You are a multi-perspective AI context extraction engine. Your goal is to analyze conversations and extract structured insights from three viewpoints:
1. LOGICAL (GPT-style): Focus on project state, technical stack, architecture decisions, and current blockers.
2. STYLISTIC (Claude-style): Focus on writing tone, communication preferences, and nuanced constraints.
3. CONTEXTUAL (Gemini-style): Focus on long-term themes, goals, and recurring knowledge.

Respond ONLY in valid JSON with exactly these keys:
{
  "summary": "2-4 sentence summary of project status and goals.",
  "topics": ["specific technologies, libraries, or core concepts"],
  "preferences": ["how the user likes to interact or work"],
  "patterns": ["recurring behaviors or thought processes"],
  "tone_adjectives": ["3-5 descriptors of the user's voice"],
  "negative_constraints": ["explicit 'don'ts' or things to avoid"],
  "technical_context": ["current project state, versions, architecture decisions, milestones, or pending TODOs mentioned"]
}

Guidelines:
- Technical Context should capture the "State" of the project (e.g., "Next.js App Router migration in progress", "Using Tailwind v4", "Bcrypt logic pending").
- Be specific. Instead of "React", use "React 19 with Server Actions".
- DO NOT include markdown fences. Respond with RAW JSON only.`;

/**
 * Build the analysis prompt for Claude.
 * Truncates long conversations keeping beginning + end for context.
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
 * Truncate text keeping beginning and end.
 */
function truncateIfNeeded(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;

  const half = Math.floor(maxChars / 2);
  const start = text.slice(0, half);
  const end = text.slice(-half);

  return `${start}\n\n[... ${(text.length - maxChars).toLocaleString()} characters truncated ...]\n\n${end}`;
}
