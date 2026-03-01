import type { ConversationAnalysis } from "@/lib/types";
import { mergeAnalyses } from "./merge";

/**
 * Export as a CLAUDE.md file for Claude Code.
 * Structured with clear sections, ready to drop into .claude/ directory.
 */
export function exportAsClaudeMd(analyses: ConversationAnalysis[]): string {
  const merged = mergeAnalyses(analyses);
  const sections: string[] = [];

  sections.push("# User Context");
  sections.push(
    "> Migrated from ChatGPT conversation history using AI Chat History Migrator."
  );

  sections.push(`## Background\n\n${merged.summary}`);

  if (merged.topics.length > 0) {
    sections.push(
      `## Domain Knowledge\n\nTopics the user frequently works with:\n\n${merged.topics.map((t) => `- ${t}`).join("\n")}`
    );
  }

  if (merged.preferences.length > 0) {
    sections.push(
      `## User Preferences\n\n${merged.preferences.map((p) => `- ${p}`).join("\n")}`
    );
  }

  if (merged.patterns.length > 0) {
    sections.push(
      `## Interaction Style\n\n${merged.patterns.map((p) => `- ${p}`).join("\n")}`
    );
  }

  return sections.join("\n\n");
}
