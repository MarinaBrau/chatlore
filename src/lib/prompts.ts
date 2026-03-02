import type { Message } from "@/lib/parsers/types";

const MAX_CHARS = 50_000;

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

  return `Analyze the following ChatGPT conversation and extract structured insights that would help the user transfer their context to a new AI assistant.

## Conversation Title: "${title}"

## Conversation:
${truncated}

## Instructions:
Respond in valid JSON with exactly these keys:

{
  "summary": "A 2-4 sentence summary of what this conversation was about, the user's goals, and key outcomes.",
  "topics": ["topic1", "topic2", ...],
  "preferences": ["preference1", "preference2", ...],
  "patterns": ["pattern1", "pattern2", ...],
  "tone_adjectives": ["adjective1", "adjective2", ...],
  "negative_constraints": ["constraint1", "constraint2", ...]
}

- **summary**: What the conversation covered and what was accomplished.
- **topics**: Key topics, technologies, or concepts discussed (5-15 items).
- **preferences**: User preferences, opinions, or working styles revealed.
- **patterns**: Recurring patterns in how the user interacts.
- **tone_adjectives**: 3-5 specific adjectives describing the user's writing tone (e.g., "Technical", "Direct", "Empathetic").
- **negative_constraints**: Things the user explicitly dislikes or avoids (e.g., "No emojis", "No corporate jargon", "Don't apologize").

If any field is not evident, return an empty array.
Respond ONLY with the JSON object, no markdown fences or extra text.`;
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
