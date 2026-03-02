import type { ConversationAnalysis } from "../types";

/**
 * Export analysis as a .cursorrules file content.
 * This format is specifically optimized for the Cursor IDE.
 */
export function exportAsCursorRules(analyses: ConversationAnalysis[]): string {
  const sections = analyses.map((a) => {
    let content = `// Rules extracted from: ${a.title}

`;
    
    content += `Summary: ${a.summary}

`;
    
    if (a.toneAdjectives && a.toneAdjectives.length > 0) {
      content += `Tone: ${a.toneAdjectives.join(", ")}
`;
    }
    
    if (a.preferences.length > 0) {
      content += `User Preferences:
${a.preferences.map((p) => `- ${p}`).join("
")}

`;
    }
    
    if (a.negativeConstraints && a.negativeConstraints.length > 0) {
      content += `Negative Constraints (What to avoid):
${a.negativeConstraints.map((c) => `- ${c}`).join("
")}

`;
    }
    
    if (a.patterns.length > 0) {
      content += `Interaction Patterns:
${a.patterns.map((p) => `- ${p}`).join("
")}

`;
    }
    
    return content;
  });

  return `# Cursor Custom Rules

${sections.join("
---

")}`;
}
