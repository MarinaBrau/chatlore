import type { ConversationAnalysis } from "../types";

/**
 * Export analysis as a .cursorrules file content.
 * This format is specifically optimized for the Cursor IDE.
 */
export function exportAsCursorRules(analyses: ConversationAnalysis[]): string {
  const sections = analyses.map((a) => {
    let content = `// Rules extracted from: ${a.title}\n\n`;
    
    content += `Summary: ${a.summary}\n\n`;
    
    if (a.toneAdjectives && a.toneAdjectives.length > 0) {
      content += `Tone: ${a.toneAdjectives.join(", ")}\n`;
    }
    
    if (a.preferences.length > 0) {
      content += `User Preferences:\n${a.preferences.map((p) => `- ${p}`).join("\n")}\n\n`;
    }
    
    if (a.negativeConstraints && a.negativeConstraints.length > 0) {
      content += `Negative Constraints (What to avoid):\n${a.negativeConstraints.map((c) => `- ${c}`).join("\n")}\n\n`;
    }
    
    if (a.patterns.length > 0) {
      content += `Interaction Patterns:\n${a.patterns.map((p) => `- ${p}`).join("\n")}\n\n`;
    }
    
    return content;
  });

  return `# Cursor Custom Rules\n\n${sections.join("\n---\n\n")}`;
}
