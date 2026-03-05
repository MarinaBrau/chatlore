import type { ConversationAnalysis } from "../types";

/**
 * Export analysis for Windsurf IDE (.windsurfrules).
 */
export function exportAsWindsurf(analyses: ConversationAnalysis[]): string {
  const combined = analyses[0];
  if (!combined) return "";

  const rules = {
    summary: combined.summary,
    tech_stack: combined.topics,
    technical_state: combined.technicalContext,
    preferences: combined.preferences,
    negative_constraints: combined.negativeConstraints,
    style: combined.toneAdjectives
  };

  return JSON.stringify(rules, null, 2);
}
