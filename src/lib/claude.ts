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
  technicalContext: string[];
}

/**
 * Send a prompt to Claude and parse the JSON response.
 */
export async function analyzeWithClaude(
  prompt: string,
  systemPrompt?: string,
  retries = 2
): Promise<AnalysisResult> {
  try {
    const response = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 0,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    });

    const firstBlock = response.content[0];
    const text = firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

    // Parse JSON, handling markdown fences
    const cleaned = text
      .replace(/^```(?:json)?\s*\n?/m, "")
      .replace(/\n?\s*```\s*$/m, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    
    return {
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      topics: Array.isArray(parsed.topics) ? parsed.topics : [],
      preferences: Array.isArray(parsed.preferences) ? parsed.preferences : [],
      patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
      toneAdjectives: Array.isArray(parsed.tone_adjectives) ? parsed.tone_adjectives : 
                       (Array.isArray(parsed.toneAdjectives) ? parsed.toneAdjectives : []),
      negativeConstraints: Array.isArray(parsed.negative_constraints) ? parsed.negative_constraints :
                           (Array.isArray(parsed.negativeConstraints) ? parsed.negativeConstraints : []),
      technicalContext: Array.isArray(parsed.technical_context) ? parsed.technical_context :
                        (Array.isArray(parsed.technicalContext) ? parsed.technicalContext : []),
    };
  } catch (e) {
    if (retries > 0) {
      console.warn(`Claude API error, retrying... (${retries} left)`);
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, (3 - retries) * 1000));
      return analyzeWithClaude(prompt, systemPrompt, retries - 1);
    }
    console.error("Claude Analysis Error:", e);
    throw e;
  }
}
