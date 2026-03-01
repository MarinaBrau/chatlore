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
  "patterns": ["pattern1", "pattern2", ...]
}

- **summary**: What the conversation covered and what was accomplished.
- **topics**: Key topics, technologies, concepts discussed (5-15 items).
- **preferences**: User preferences, opinions, or working styles revealed (e.g., "Prefers TypeScript over JavaScript", "Likes concise answers"). Only include if clearly evident.
- **patterns**: Recurring patterns in how the user interacts (e.g., "Often asks for code examples", "Prefers step-by-step explanations"). Only include if clearly evident.

If preferences or patterns are not evident, return empty arrays for those fields.
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
