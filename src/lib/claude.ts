import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface AnalysisResult {
  summary: string;
  topics: string[];
  preferences: string[];
  patterns: string[];
}

/**
 * Send a prompt to Claude and parse the JSON response.
 */
export async function analyzeWithClaude(
  prompt: string
): Promise<AnalysisResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const firstBlock = response.content[0];
  const text =
    firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

  // Parse JSON, handling possible markdown fences
  const cleaned = text.replace(/^```(?:json)?\s*\n?/m, "").replace(/\n?\s*```\s*$/m, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      topics: Array.isArray(parsed.topics) ? parsed.topics : [],
      preferences: Array.isArray(parsed.preferences) ? parsed.preferences : [],
      patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
    };
  } catch {
    throw new Error("Failed to parse Claude response as JSON");
  }
}
