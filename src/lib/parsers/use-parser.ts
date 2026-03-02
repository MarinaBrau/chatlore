"use client";

import { useCallback, useRef, useState } from "react";
import { parseChatGPTExport } from "./chatgpt";
import { parseGeminiExport } from "./gemini";
import type { Conversation, Message } from "./types";

interface ParserState {
  status: "idle" | "parsing" | "success" | "error";
  conversations: Conversation[];
  error: string | null;
}

/**
 * Hook to parse AI export files (ChatGPT or Gemini) or manual text.
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
        setState({ status: "error", conversations: [], error: "Failed to read file" });
        return;
      }
      
      const text = result;
      
      // Auto-detect format and parse on main thread for simplicity in this universal update
      try {
        const json = JSON.parse(text);
        let parsedConversations: Conversation[] = [];

        // Check for ChatGPT format (mapping exists)
        if (Array.isArray(json) && json[0]?.mapping) {
          parsedConversations = parseChatGPTExport(text);
        } 
        // Check for Gemini format (conversations key exists)
        else if (Array.isArray(json) && json[0]?.conversations) {
          parsedConversations = parseGeminiExport(text);
        }
        else {
          throw new Error("Format not recognized. Please upload a valid ChatGPT or Gemini export file.");
        }

        setState({ status: "success", conversations: parsedConversations, error: null });
      } catch (err) {
        setState({
          status: "error",
          conversations: [],
          error: err instanceof Error ? err.message : "Parsing failed",
        });
      }
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
