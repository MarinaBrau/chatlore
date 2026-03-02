"use client";

import { useCallback, useRef, useState } from "react";
import { parseChatGPTExport } from "./chatgpt";
import type { Conversation, Message } from "./types";

interface ParserState {
  status: "idle" | "parsing" | "success" | "error";
  conversations: Conversation[];
  error: string | null;
}

/**
 * Hook to parse a ChatGPT export file or manual text.
 */
export function useParser() {
  const [state, setState] = useState<ParserState>({
    status: "idle",
    conversations: [],
    error: null,
  });
  const workerRef = useRef<Worker | null>(null);

  const parseRawText = useCallback((text: string) => {
    setState({ status: "parsing", conversations: [], error: null });
    
    // Simulate slight delay for UX
    setTimeout(() => {
      try {
        if (text.length < 50) {
          throw new Error("Please paste a longer conversation for better analysis.");
        }

        // Create a synthetic conversation object
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

        setState({ 
          status: "success", 
          conversations: [conversation], 
          error: null 
        });
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
      const result = e.target?.result;
      if (typeof result !== "string") {
        setState({ status: "error", conversations: [], error: "Failed to read file as text" });
        return;
      }
      const text = result;

      // Try Web Worker first to avoid blocking UI
      try {
        const worker = new Worker(
          new URL("../../workers/parse-worker.ts", import.meta.url)
        );
        workerRef.current = worker;

        worker.onmessage = (event) => {
          const { type, conversations, error } = event.data;
          if (type === "success" && conversations) {
            const hydrated = conversations.map(hydrateConversation);
            setState({ status: "success", conversations: hydrated, error: null });
          } else {
            setState({
              status: "error",
              conversations: [],
              error: error || "Parsing failed",
            });
          }
          worker.terminate();
          workerRef.current = null;
        };

        worker.onerror = () => {
          worker.terminate();
          workerRef.current = null;
          parseOnMainThread(text);
        };

        worker.postMessage({ type: "parse", data: text });
      } catch {
        parseOnMainThread(text);
      }
    };

    reader.onerror = () => {
      setState({
        status: "error",
        conversations: [],
        error: "Failed to read file",
      });
    };

    reader.readAsText(file);

    function parseOnMainThread(text: string) {
      try {
        const conversations = parseChatGPTExport(text);
        setState({ status: "success", conversations, error: null });
      } catch (err) {
        setState({
          status: "error",
          conversations: [],
          error: err instanceof Error ? err.message : "Parsing failed",
        });
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setState({ status: "idle", conversations: [], error: null });
  }, []);

  return { ...state, parse, parseRawText, reset };
}

function hydrateConversation(conv: Conversation): Conversation {
  return {
    ...conv,
    createTime: new Date(conv.createTime),
    updateTime: new Date(conv.updateTime),
    messages: conv.messages.map((m) => ({
      ...m,
      timestamp: m.timestamp ? new Date(m.timestamp) : null,
    })),
  };
}
