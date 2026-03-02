import type { ConversationAnalysis } from "../types";

/**
 * Compresses analysis into a string under a specific character limit.
 * Priority: Tone > Negative Constraints > Preferences > Topics > Summary.
 */
export function compressAnalysis(
  analyses: ConversationAnalysis[],
  limit: number = 1500
): string {
  const combined = analyses[0]; // Assuming combined analysis or first one
  
  let result = "";
  
  // 1. Tone (Highest Priority)
  if (combined.toneAdjectives && combined.toneAdjectives.length > 0) {
    result += `TONE: ${combined.toneAdjectives.join(", ")}
`;
  }

  // 2. Negative Constraints (Critical for AI performance)
  if (combined.negativeConstraints && combined.negativeConstraints.length > 0) {
    result += `AVOID: ${combined.negativeConstraints.join("; ")}
`;
  }

  // 3. Key Preferences
  if (combined.preferences.length > 0) {
    result += `PREFERENCES: ${combined.preferences.slice(0, 10).join("; ")}
`;
  }

  // 4. Topics (Optional/Compressed)
  if (result.length < limit - 200 && combined.topics.length > 0) {
    result += `TOPICS: ${combined.topics.slice(0, 8).join(", ")}
`;
  }

  // 5. Summary (Last Priority)
  if (result.length < limit - 300) {
    result += `CONTEXT: ${combined.summary.slice(0, 300)}`;
  }

  // Final Trim to be safe
  return result.slice(0, limit);
}
