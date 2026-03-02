import type { ConversationAnalysis } from "../types";
import { compressAnalysis } from "../utils/compressor";

export function exportForChatGPT(analyses: ConversationAnalysis[]): string {
  // ChatGPT custom instructions usually have a 1500 char limit
  return compressAnalysis(analyses, 1500);
}
