import type { ConversationAnalysis } from "@/lib/types";

/**
 * Merge multiple analyses into a single combined view.
 * Deduplicates topics, preferences, and patterns via Set.
 */
export function mergeAnalyses(
  analyses: ConversationAnalysis[]
): Omit<ConversationAnalysis, "id" | "title"> {
  if (analyses.length === 1) return analyses[0];

  return {
    summary: analyses.map((a) => a.summary).join(" "),
    topics: [...new Set(analyses.flatMap((a) => a.topics))],
    preferences: [...new Set(analyses.flatMap((a) => a.preferences))],
    patterns: [...new Set(analyses.flatMap((a) => a.patterns))],
  };
}
