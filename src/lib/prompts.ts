import type { Message } from "@/lib/parsers/types";

const MAX_CHARS = 50_000;

/**
 * System prompt for context extraction.
 */
export const ANALYSIS_SYSTEM_PROMPT = `You are an expert context extraction engine. Your goal is to analyze chat conversations and extract structured insights that help a user transfer their personality, style, and project context to a new AI assistant.

Respond ONLY in valid JSON with exactly these keys:
{
  "summary": "2-4 sentence summary of goals and outcomes.",
  "topics": ["list of technologies or concepts"],
  "preferences": ["user working styles or opinions"],
  "patterns": ["recurring interaction behaviors"],
  "tone_adjectives": ["3-5 writing tone descriptors"],
  "negative_constraints": ["explicit dislikes or things to avoid"]
}

Guidelines:
- Summary should be objective and concise.
- Topics should be specific (e.g., "Next.js 15" instead of "Coding").
- Preferences should capture how the user likes things done.
- Negative constraints should capture "don'ts" (e.g., "No apologies", "No corporate jargon").
- If a field is not evident, return an empty array.
- DO NOT include markdown fences, preambles, or postambles. Respond with RAW JSON only.`;

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
