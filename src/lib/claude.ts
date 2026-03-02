import Anthropic from "@anthropic-ai/sdk";

// Ensure API key is present
if (!process.env.ANTHROPIC_API_KEY) {
  console.warn("Missing ANTHROPIC_API_KEY environment variable");
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "dummy-key-for-build",
});

export interface AnalysisResult {
  summary: string;
  topics: string[];
  preferences: string[];
  patterns: string[];
  toneAdjectives: string[];
  negativeConstraints: string[];
}

/**
 * Send a prompt to Claude and parse the JSON response.
 */
export async function analyzeWithClaude(
  prompt: string
): Promise<AnalysisResult> {
  // Use Haiku for speed and cost-efficiency
  const response = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 4096,
    temperature: 0, // Deterministic for consistent extraction
    messages: [{ role: "user", content: prompt }],
  });

  const firstBlock = response.content[0];
  const text =
    firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

  // Parse JSON, handling possible markdown fences
  const cleaned = text
    .replace(/^```(?:json)?\s*\n?/m, "")
    .replace(/\n?\s*```\s*$/m, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      topics: Array.isArray(parsed.topics) ? parsed.topics : [],
      preferences: Array.isArray(parsed.preferences) ? parsed.preferences : [],
      patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
      toneAdjectives: Array.isArray(parsed.tone_adjectives) ? parsed.tone_adjectives : [],
      negativeConstraints: Array.isArray(parsed.negative_constraints) ? parsed.negative_constraints : [],
    };
  } catch (e) {
    console.error("JSON Parse Error:", e, "Raw Text:", text);
    throw new Error("Failed to parse Claude response as JSON");
  }
}
