"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useConversations } from "@/context/conversations";
import { ConversationList } from "@/components/ConversationList";
import { trackEvent } from "@/lib/analytics";
import type { Conversation } from "@/lib/parsers/types";

export function ConversationsContent() {
  const { conversations } = useConversations();
  const router = useRouter();

  const handleProcess = useCallback(
    (selected: Conversation[]) => {
      try {
        // Optimization: Pass only essential data to avoid sessionStorage limits
        const minimized = selected.map(c => ({
          id: c.id,
          title: c.title,
          messages: c.messages.slice(-50) // Keep last 50 msgs for context
        }));
        
        sessionStorage.setItem(
          "chatlore-selected",
          JSON.stringify(minimized)
        );
      } catch (e) {
        console.error("Storage error:", e);
        alert("Selection too large for browser storage. Please select fewer conversations (max 5-10 recommended).");
        return;
      }
      trackEvent("process_started", { selected_count: selected.length });
      router.push("/results");
    },
    [router]
  );

  if (conversations.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground text-sm font-medium">
          No conversations found. Upload your export file to begin.
        </p>
        <Link 
          href="/upload" 
          className="rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary transition-all hover:bg-primary/15 active:scale-95"
        >
          Go to Upload
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex h-full max-w-3xl flex-col px-4 py-8"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Your History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select up to 10 conversations that best represent your style or project.
        </p>
      </div>
      
      <ConversationList
        conversations={conversations}
        onProcess={handleProcess}
      />
    </motion.div>
  );
}
