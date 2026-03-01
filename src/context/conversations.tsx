"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Conversation } from "@/lib/parsers/types";

interface ConversationsContextValue {
  conversations: Conversation[];
  setConversations: (convs: Conversation[]) => void;
  clear: () => void;
}

const ConversationsContext = createContext<ConversationsContextValue | null>(
  null
);

export function ConversationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const clear = useCallback(() => {
    setConversations([]);
  }, []);

  const value = useMemo(
    () => ({ conversations, setConversations, clear }),
    [conversations, clear]
  );

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const ctx = useContext(ConversationsContext);
  if (!ctx) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }
  return ctx;
}
