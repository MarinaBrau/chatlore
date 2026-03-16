import { parseChatGPTExport } from "@/lib/parsers/chatgpt";
import { parseGeminiExport } from "@/lib/parsers/gemini";
import { parseClaudeExport } from "@/lib/parsers/claude";
import type { ParseWorkerRequest, ParseWorkerResponse, Conversation } from "@/lib/parsers/types";

self.onmessage = (event: MessageEvent<ParseWorkerRequest>) => {
  const { type, data } = event.data;

  if (type !== "parse") return;

  try {
    const text = data;
    const json = JSON.parse(text);
    let parsedConversations: Conversation[] = [];

    // Format detection
    if (Array.isArray(json) && json[0]?.mapping) {
      parsedConversations = parseChatGPTExport(text);
    } 
    else if (Array.isArray(json) && json[0]?.conversations) {
      parsedConversations = parseGeminiExport(text);
    }
    else if (Array.isArray(json) && json[0]?.chat_messages) {
      parsedConversations = parseClaudeExport(text);
    }
    else {
      throw new Error("Format not recognized. Please upload a valid ChatGPT, Gemini, or Claude export file.");
    }

    const response: ParseWorkerResponse = { type: "success", conversations: parsedConversations };
    self.postMessage(response);
  } catch (err) {
    const response: ParseWorkerResponse = {
      type: "error",
      error: err instanceof Error ? err.message : "Unknown parsing error",
    };
    self.postMessage(response);
  }
};
