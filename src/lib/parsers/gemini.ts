import { Conversation, Message, GeminiExportEntry, GeminiMessage } from "./types";

/**
 * Parse a Google Gemini export JSON into structured Conversation[].
 */
export function parseGeminiExport(json: string): Conversation[] {
  let raw: GeminiExportEntry[];
  try {
    raw = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON file. Make sure you uploaded the correct Gemini export.");
  }

  if (!Array.isArray(raw)) {
    throw new Error("Expected a JSON array from Gemini export.");
  }

  const conversations: Conversation[] = [];

  for (const entry of raw) {
    // Google Gemini structure is typically an object with a "conversations" array
    const rawMessages = entry.conversations;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) continue;

    const messages: Message[] = rawMessages.map((m: GeminiMessage, index: number) => ({
      id: `gemini-${Date.now()}-${index}`,
      role: m.author === "USER" ? "user" : "assistant",
      content: m.content || "",
      timestamp: m.create_time ? new Date(m.create_time) : new Date(),
    }));

    // Find first user message for title/preview
    const firstUserMsg = messages.find(m => m.role === "user");
    const preview = firstUserMsg?.content.slice(0, 150) || messages[0].content.slice(0, 150);

    conversations.push({
      id: `gemini-conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: firstUserMsg ? firstUserMsg.content.slice(0, 40) + "..." : "Gemini Conversation",
      createTime: messages[0].timestamp || new Date(),
      updateTime: messages[messages.length - 1].timestamp || new Date(),
      messageCount: messages.length,
      messages,
      preview,
    });
  }

  return conversations;
}
