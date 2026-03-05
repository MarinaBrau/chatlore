import type { ConversationAnalysis } from "../types";

/**
 * Export analysis as a concise prompt for Perplexity or AI Search.
 */
export function exportAsPerplexity(analyses: ConversationAnalysis[]): string {
  const combined = analyses[0];
  if (!combined) return "";

  let result = `System Persona Context for AI Search:\n\n`;
  
  if (combined.toneAdjectives && combined.toneAdjectives.length > 0) {
    result += `Tone: ${combined.toneAdjectives.join(", ")}\n`;
  }
  
  if (combined.preferences.length > 0) {
    result += `Search Preferences: ${combined.preferences.slice(0, 5).join("; ")}\n`;
  }
  
  if (combined.negativeConstraints && combined.negativeConstraints.length > 0) {
    result += `Avoid: ${combined.negativeConstraints.join("; ")}\n`;
  }
  
  result += `Context: ${combined.summary}\n`;
  
  return result.trim();
}
