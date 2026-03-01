import type { ConversationAnalysis } from "@/lib/types";
import { mergeAnalyses } from "./merge";

/**
 * Export optimized for Claude Project custom instructions field.
 * Concise, directive tone, no large headings — fits the text field well.
 */
export function exportAsProjectInstructions(
  analyses: ConversationAnalysis[]
): string {
  const merged = mergeAnalyses(analyses);
  const sections: string[] = [];

  sections.push(
    "# User Context (migrated from ChatGPT)\n"
  );

  sections.push(`## About the User\n${merged.summary}`);

  if (merged.topics.length > 0) {
    sections.push(
      `## Key Topics & Interests\n${merged.topics.map((t) => `- ${t}`).join("\n")}`
    );
  }

  if (merged.preferences.length > 0) {
    sections.push(
      `## Communication Preferences\nThe user prefers:\n${merged.preferences.map((p) => `- ${p}`).join("\n")}`
    );
  }

  if (merged.patterns.length > 0) {
    sections.push(
      `## Interaction Patterns\n${merged.patterns.map((p) => `- ${p}`).join("\n")}`
    );
  }

  sections.push(
    "\nUse this context to provide more personalized and relevant responses. Reference prior knowledge naturally without explicitly mentioning this context document."
  );

  return sections.join("\n\n");
}
