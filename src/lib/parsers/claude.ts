import type { Conversation, Message } from "./types";

/**
 * Parse a Claude.ai data export JSON into structured Conversation[].
 * Claude exports are usually a list of conversation objects.
 */
export function parseClaudeExport(jsonString: string): Conversation[] {
  let raw: unknown;
  try {
    raw = JSON.parse(jsonString);
  } catch {
    throw new Error("Invalid JSON file. Make sure you uploaded the correct Claude export.");
  }

  if (!Array.isArray(raw)) {
    throw new Error("Expected a JSON array from Claude export.");
  }

  const conversations: Conversation[] = [];

  for (const entry of raw) {
    // Claude export format: { uuid, name, chat_messages: [{ sender, text, created_at }] }
    const rawMessages = entry.chat_messages;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) continue;

    const messages: Message[] = rawMessages.map((m: any) => ({
      id: m.uuid || `claude-msg-${Date.now()}-${Math.random()}`,
      role: m.sender === "human" ? "user" : "assistant",
      content: m.text || "",
      timestamp: m.created_at ? new Date(m.created_at) : new Date(),
    }));

    conversations.push({
      id: entry.uuid || `claude-conv-${Date.now()}`,
      title: entry.name || "Claude Conversation",
      createTime: messages[0].timestamp || new Date(),
      updateTime: messages[messages.length - 1].timestamp || new Date(),
      messageCount: messages.length,
      messages,
      preview: messages.find(m => m.role === "user")?.content.slice(0, 150) || "",
    });
  }

  return conversations.sort((a, b) => b.createTime.getTime() - a.createTime.getTime());
}
