"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useConversations } from "@/context/conversations";
import { ConversationList } from "@/components/ConversationList";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Conversation } from "@/lib/parsers/types";

export default function ConversationsPage() {
  const { conversations } = useConversations();
  const router = useRouter();

  const handleProcess = useCallback(
    (selected: Conversation[]) => {
      try {
        sessionStorage.setItem(
          "chat-migrator-selected",
          JSON.stringify(selected)
        );
      } catch {
        // sessionStorage full — pass IDs only as fallback
        // BUG-06: prevent crash on large selections
        alert("Too many conversations selected. Try selecting fewer.");
        return;
      }
      router.push("/results");
    },
    [router]
  );

  if (conversations.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground">
          No conversations loaded. Upload a file first.
        </p>
        <Link href="/upload" className="text-sm underline underline-offset-4">
          Go to Upload
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6"
    >
      <h1 className="mb-2 text-2xl font-bold">Your Conversations</h1>
      <ConversationList
        conversations={conversations}
        onProcess={handleProcess}
      />
    </motion.div>
  );
}
