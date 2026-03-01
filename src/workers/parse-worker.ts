import { parseChatGPTExport } from "@/lib/parsers/chatgpt";
import type { ParseWorkerRequest, ParseWorkerResponse } from "@/lib/parsers/types";

self.onmessage = (event: MessageEvent<ParseWorkerRequest>) => {
  const { type, data } = event.data;

  if (type !== "parse") return;

  try {
    const conversations = parseChatGPTExport(data);
    const response: ParseWorkerResponse = { type: "success", conversations };
    self.postMessage(response);
  } catch (err) {
    const response: ParseWorkerResponse = {
      type: "error",
      error: err instanceof Error ? err.message : "Unknown parsing error",
    };
    self.postMessage(response);
  }
};
