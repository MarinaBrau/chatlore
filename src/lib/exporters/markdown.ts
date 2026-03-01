import type { ConversationAnalysis } from "@/lib/types";

/**
 * Export as structured markdown text — general purpose, easy to read/share.
 */
export function exportAsMarkdown(analyses: ConversationAnalysis[]): string {
  if (analyses.length === 1) {
    return formatSingle(analyses[0]);
  }
  return analyses.map(formatSingle).join("\n\n---\n\n");
}

function formatSingle(a: ConversationAnalysis): string {
  const sections: string[] = [];

  sections.push(`# ${a.title}\n`);
  sections.push(`## Summary\n\n${a.summary}`);

  if (a.topics.length > 0) {
    sections.push(`## Topics\n\n${a.topics.map((t) => `- ${t}`).join("\n")}`);
  }

  if (a.preferences.length > 0) {
    sections.push(
      `## Preferences\n\n${a.preferences.map((p) => `- ${p}`).join("\n")}`
    );
  }

  if (a.patterns.length > 0) {
    sections.push(
      `## Patterns\n\n${a.patterns.map((p) => `- ${p}`).join("\n")}`
    );
  }

  return sections.join("\n\n");
}
