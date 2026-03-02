import type { ConversationAnalysis } from "../types";

export function exportForGemini(analyses: ConversationAnalysis[]): string {
  const combined = analyses[0];
  
  return `Act as a personal assistant with the following context:

TONE OF VOICE:
${combined.toneAdjectives?.join(", ")}

USER PREFERENCES:
${combined.preferences.map(p => `- ${p}`).join("
")}

NEGATIVE CONSTRAINTS (IMPORTANT):
${combined.negativeConstraints?.map(c => `- ${c}`).join("
")}

KNOWLEDGE & TOPICS:
${combined.topics.join(", ")}

SUMMARY:
${combined.summary}`;
}
