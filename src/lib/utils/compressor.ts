import type { ConversationAnalysis } from "../types";

/**
 * Compresses analysis into a string under a specific character limit.
 * Priority: Tone > Negative Constraints > Preferences > Topics > Summary.
 */
export function compressAnalysis(
  analyses: ConversationAnalysis[],
  limit: number = 1500,
  selections?: Record<string, string[]>
): string {
  const combined = analyses[0];
  
  let result = "";
  
  const filter = (field: string, items: string[] = []) => {
    if (!selections) return items;
    const selected = selections[field] || [];
    return items.filter(item => selected.includes(item));
  };

  // 1. Tone (Highest Priority)
  const tone = filter("toneAdjectives", combined.toneAdjectives);
  if (tone.length > 0) {
    result += `TONE: ${tone.join(", ")}\n`;
  }

  // 2. Negative Constraints
  const avoid = filter("negativeConstraints", combined.negativeConstraints);
  if (avoid.length > 0) {
    result += `AVOID: ${avoid.join("; ")}\n`;
  }

  // 3. Key Preferences
  const prefs = filter("preferences", combined.preferences);
  if (prefs.length > 0) {
    result += `PREFERENCES: ${prefs.slice(0, 10).join("; ")}\n`;
  }

  // 4. Topics
  const topics = filter("topics", combined.topics);
  if (result.length < limit - 200 && topics.length > 0) {
    result += `TOPICS: ${topics.slice(0, 8).join(", ")}\n`;
  }

  // 5. Summary
  if (result.length < limit - 300) {
    result += `CONTEXT: ${combined.summary.slice(0, 300)}`;
  }

  return result.slice(0, limit);
}
