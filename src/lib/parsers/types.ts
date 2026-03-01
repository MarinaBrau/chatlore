// ---- ChatGPT raw export types ----

export interface ChatGPTExportConversation {
  title: string;
  create_time: number;
  update_time: number;
  current_node: string;
  mapping: Record<string, ChatGPTNode>;
}

export interface ChatGPTNode {
  id: string;
  message: ChatGPTMessage | null;
  parent: string | null;
  children: string[];
}

export interface ChatGPTMessage {
  id: string;
  author: { role: string; name?: string };
  content: { content_type: string; parts?: unknown[] };
  create_time: number | null;
  metadata?: { is_user_system_message?: boolean };
}

// ---- Parsed output types ----

export interface Conversation {
  id: string;
  title: string;
  createTime: Date;
  updateTime: Date;
  messageCount: number;
  messages: Message[];
  preview: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  timestamp: Date | null;
}

// ---- Worker message types ----

export interface ParseWorkerRequest {
  type: "parse";
  data: string; // raw JSON string
}

export interface ParseWorkerResponse {
  type: "success" | "error";
  conversations?: Conversation[];
  error?: string;
}
