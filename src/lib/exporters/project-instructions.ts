import type { ConversationAnalysis } from "@/lib/types";
import { mergeAnalyses } from "./merge";

/**
 * Export optimized for Claude Project custom instructions field.
 * Concise, directive tone, no large headings — fits the text field well.
 */
export function exportAsProjectInstructions(
  analyses: ConversationAnalysis[],
  selections?: Record<string, string[]>
): string {
  const merged = mergeAnalyses(analyses);
  const sections: string[] = [];

  const filter = (field: string, items: string[] = []) => {
    if (!selections) return items;
    const selected = selections[field] || [];
    return items.filter(item => selected.includes(item));
  };

  sections.push(
    "# User Context & Profile\n"
  );

  sections.push(`## About the User\n${merged.summary}`);

  const topics = filter("topics", merged.topics);
  if (topics.length > 0) {
    sections.push(
      `## Key Topics & Interests\n${topics.map((t) => `- ${t}`).join("\n")}`
    );
  }

  const tone = filter("toneAdjectives", merged.toneAdjectives);
  if (tone.length > 0) {
    sections.push(
      `## Tone of Voice\n${tone.join(", ")}`
    );
  }

  const prefs = filter("preferences", merged.preferences);
  if (prefs.length > 0) {
    sections.push(
      `## Communication Preferences\nThe user prefers:\n${prefs.map((p) => `- ${p}`).join("\n")}`
    );
  }

  const avoid = filter("negativeConstraints", merged.negativeConstraints);
  if (avoid.length > 0) {
    sections.push(
      `## Negative Constraints\n${avoid.map((c) => `- ${c}`).join("\n")}`
    );
  }

  const patterns = filter("patterns", merged.patterns);
  if (patterns.length > 0) {
    sections.push(
      `## Interaction Patterns\n${patterns.map((p) => `- ${p}`).join("\n")}`
    );
  }

  sections.push(
    "\nUse this context to provide more personalized and relevant responses. Reference prior knowledge naturally without explicitly mentioning this context document."
  );

  return sections.join("\n\n");
}
