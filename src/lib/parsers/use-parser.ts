"use client";

import { useCallback, useState } from "react";
import type { Conversation, ParseWorkerResponse } from "./types";

interface ParserState {
  status: "idle" | "parsing" | "success" | "error";
  conversations: Conversation[];
  error: string | null;
}

/**
 * Hook to parse AI export files (ChatGPT, Gemini, or Claude) or manual text.
 */
export function useParser() {
  const [state, setState] = useState<ParserState>({
    status: "idle",
    conversations: [],
    error: null,
  });

  const parseRawText = useCallback((text: string) => {
    setState({ status: "parsing", conversations: [], error: null });
    
    setTimeout(() => {
      try {
        if (text.length < 50) {
          throw new Error("Please paste a longer conversation for better analysis.");
        }

        const conversation: Conversation = {
          id: `manual-${Date.now()}`,
          title: "Pasted Conversation",
          createTime: new Date(),
          updateTime: new Date(),
          messageCount: 1,
          preview: text.slice(0, 150),
          messages: [
            {
              id: "msg-1",
              role: "user",
              content: text,
              timestamp: new Date(),
            },
          ],
        };

        setState({ status: "success", conversations: [conversation], error: null });
      } catch (err) {
        setState({
          status: "error",
          conversations: [],
          error: err instanceof Error ? err.message : "Processing failed",
        });
      }
    }, 800);
  }, []);

  const parse = useCallback((file: File) => {
    setState({ status: "parsing", conversations: [], error: null });

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== "string") {
        setState({ status: "error", conversations: [], error: "Failed to read file" });
        return;
      }
      
      // Use Web Worker for parsing large files
      const worker = new Worker(new URL("../../workers/parse-worker.ts", import.meta.url));
      
      worker.onmessage = (event: MessageEvent<ParseWorkerResponse>) => {
        const response = event.data;
        if (response.type === "success" && response.conversations) {
          setState({ status: "success", conversations: response.conversations, error: null });
        } else {
          setState({ status: "error", conversations: [], error: response.error || "Parsing failed" });
        }
        worker.terminate();
      };

      worker.onerror = (err) => {
        console.error("Worker error:", err);
        setState({ status: "error", conversations: [], error: "Parsing failed. The file might be too large or corrupted." });
        worker.terminate();
      };

      worker.postMessage({ type: "parse", data: text });
    };

    reader.onerror = () => {
      setState({ status: "error", conversations: [], error: "Failed to read file" });
    };

    reader.readAsText(file);
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle", conversations: [], error: null });
  }, []);

  return { ...state, parse, parseRawText, reset };
}
