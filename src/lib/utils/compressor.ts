import type { ConversationAnalysis } from "../types";
import { mergeAnalyses } from "../exporters/merge";

/**
 * Compresses analysis into a string under a specific character limit.
 * Uses dynamic budget allocation: if a higher priority section is short, 
 * the budget is passed down to subsequent sections.
 */
export function compressAnalysis(
  analyses: ConversationAnalysis[],
  limit: number = 1500,
  selections?: Record<string, string[]>
): string {
  // Consolidate all analyses into a single merged view
  const combined = mergeAnalyses(analyses);
  if (!combined) return "";

  let result = "";
  
  const filter = (field: string, items: string[] = []) => {
    if (!selections) return items;
    const selected = selections[field] || [];
    return items.filter(item => selected.includes(item));
  };

  const addSection = (label: string, items: string[], separator: string = ", ") => {
    if (items.length === 0) return;
    
    const remaining = limit - result.length;
    if (remaining < 20) return;

    let content = `${label}: ${items.join(separator)}\n`;
    
    // If the content is too long for the entire remaining budget, truncate items
    if (content.length > remaining) {
      const truncatedItems: string[] = [];
      let currentLen = label.length + 2;
      for (const item of items) {
        if (currentLen + item.length + separator.length > remaining - 5) break;
        truncatedItems.push(item);
        currentLen += item.length + separator.length;
      }
      content = truncatedItems.length > 0 
        ? `${label}: ${truncatedItems.join(separator)}\n`
        : "";
    }
    
    result += content;
  };

  // 1. Tone (Highest Priority)
  addSection("TONE", filter("toneAdjectives", combined.toneAdjectives));

  // 2. Negative Constraints
  addSection("AVOID", filter("negativeConstraints", combined.negativeConstraints), "; ");

  // 3. Key Preferences
  addSection("PREFERENCES", filter("preferences", combined.preferences), "; ");

  // 4. Technical Context (New - High Priority for GPT/Windsurf)
  addSection("TECH_STATE", filter("technicalContext", combined.technicalContext), "; ");

  // 5. Topics
  addSection("TOPICS", filter("topics", combined.topics));

  // 6. Summary (Lowest Priority - Fills the rest)
  const remainingForSummary = limit - result.length - 10;
  if (remainingForSummary > 50) {
    result += `CONTEXT: ${combined.summary.slice(0, remainingForSummary)}`;
  }

  return result.trim();
}
