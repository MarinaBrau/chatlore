import type {
  ChatGPTExportConversation,
  ChatGPTNode,
  Conversation,
  Message,
} from "./types";

/**
 * Parse a ChatGPT conversations.json export into structured Conversation[].
 * Runs synchronously — caller should use a Web Worker for large files.
 */
export function parseChatGPTExport(jsonString: string): Conversation[] {
  let raw: unknown;
  try {
    raw = JSON.parse(jsonString);
  } catch {
    throw new Error(
      "Invalid JSON file. Make sure you uploaded the correct conversations.json."
    );
  }

  if (!Array.isArray(raw)) {
    throw new Error(
      "Expected a JSON array. This doesn't look like a ChatGPT export file."
    );
  }

  const conversations: Conversation[] = [];

  for (const entry of raw) {
    if (!isValidConversation(entry)) continue;

    const messages = extractMessages(entry);
    if (messages.length === 0) continue;

    const userMessages = messages.filter((m) => m.role === "user");
    const preview =
      userMessages[0]?.content.slice(0, 150) || messages[0]?.content.slice(0, 150) || "";

    conversations.push({
      id: entry.current_node,
      title: entry.title || "Untitled",
      createTime: new Date(entry.create_time * 1000),
      updateTime: new Date(entry.update_time * 1000),
      messageCount: messages.length,
      messages,
      preview,
    });
  }

  // Sort by most recent first
  conversations.sort(
    (a, b) => b.createTime.getTime() - a.createTime.getTime()
  );

  return conversations;
}

/**
 * Validate that an entry has the minimal required fields.
 */
function isValidConversation(
  entry: unknown
): entry is ChatGPTExportConversation {
  if (typeof entry !== "object" || entry === null) return false;
  const e = entry as Record<string, unknown>;
  return (
    typeof e.current_node === "string" &&
    typeof e.mapping === "object" &&
    e.mapping !== null &&
    typeof e.create_time === "number" &&
    typeof e.update_time === "number"
  );
}

/**
 * Walk the mapping tree from current_node backwards via parent pointers,
 * then reverse to get chronological order. Only keep user/assistant messages.
 */
function extractMessages(conv: ChatGPTExportConversation): Message[] {
  const { mapping, current_node } = conv;
  const messages: Message[] = [];

  const visited = new Set<string>();
  let nodeId: string | null = current_node;
  while (nodeId) {
    if (visited.has(nodeId)) break; // cycle detection
    visited.add(nodeId);
    const node: ChatGPTNode | undefined = mapping[nodeId];
    if (!node) break;

    const msg = node.message;
    if (msg && shouldIncludeMessage(msg)) {
      const content = extractTextContent(msg);
      if (content.trim()) {
        messages.push({
          id: msg.id,
          role: normalizeRole(msg.author.role),
          content,
          timestamp: msg.create_time ? new Date(msg.create_time * 1000) : null,
        });
      }
    }

    nodeId = node.parent;
  }

  // We walked backwards, so reverse for chronological order
  messages.reverse();
  return messages;
}

/**
 * Determine if a message should be included in the output.
 * Skip system messages and tool-internal messages.
 */
function shouldIncludeMessage(msg: ChatGPTExportConversation["mapping"][string]["message"]): boolean {
  if (!msg) return false;
  const role = msg.author.role;

  // Skip system setup messages
  if (role === "system" && !msg.metadata?.is_user_system_message) return false;

  // Keep user, assistant, and user-authored system messages
  return role === "user" || role === "assistant" || role === "system";
}

function normalizeRole(role: string): Message["role"] {
  if (role === "user") return "user";
  if (role === "assistant") return "assistant";
  return "system";
}

/**
 * Extract text content from a message's parts array.
 * Handles text and multimodal_text content types.
 */
function extractTextContent(msg: ChatGPTExportConversation["mapping"][string]["message"]): string {
  if (!msg) return "";
  const parts = msg.content?.parts;
  if (!Array.isArray(parts)) return "";

  return parts
    .filter((part): part is string => typeof part === "string")
    .join("\n");
}
