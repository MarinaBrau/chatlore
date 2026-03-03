import type { ConversationAnalysis } from "../types";

export function exportForGemini(analyses: ConversationAnalysis[], selections?: Record<string, string[]>): string {
  const combined = analyses[0];
  
  const filter = (field: string, items: string[] = []) => {
    if (!selections) return items;
    const selected = selections[field] || [];
    return items.filter(item => selected.includes(item));
  };

  const tone = filter("toneAdjectives", combined.toneAdjectives);
  const prefs = filter("preferences", combined.preferences);
  const avoid = filter("negativeConstraints", combined.negativeConstraints);
  const topics = filter("topics", combined.topics);

  return `Act as a personal assistant with the following context:

${tone.length > 0 ? `TONE OF VOICE:\n${tone.join(", ")}\n\n` : ""}${
    prefs.length > 0 ? `USER PREFERENCES:\n${prefs.map(p => `- ${p}`).join("\n")}\n\n` : ""}${
    avoid.length > 0 ? `NEGATIVE CONSTRAINTS (IMPORTANT):\n${avoid.map(c => `- ${c}`).join("\n")}\n\n` : ""}${
    topics.length > 0 ? `KNOWLEDGE & TOPICS:\n${topics.join(", ")}\n\n` : ""}${
    combined.summary ? `SUMMARY:\n${combined.summary}` : ""
  }`.trim();
}
