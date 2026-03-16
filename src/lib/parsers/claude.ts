import { Conversation, Message, ClaudeExportConversation, ClaudeMessage } from "./types";

/**
 * Parse a Claude.ai data export JSON into structured Conversation[].
 */
export function parseClaudeExport(json: string): Conversation[] {
  let raw: ClaudeExportConversation[];
  try {
    raw = JSON.parse(json);
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

    const messages: Message[] = rawMessages.map((m: ClaudeMessage) => ({
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

  return conversations;
}
