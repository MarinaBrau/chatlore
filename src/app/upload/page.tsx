"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UploadZone } from "@/components/UploadZone";
import { ManualPaste } from "@/components/ManualPaste";
import { ExportGuideModal } from "@/components/ExportGuideModal";
import { useParser } from "@/lib/parsers/use-parser";
import { useConversations } from "@/context/conversations";
import { trackEvent } from "@/lib/analytics";
import { FileJson, ClipboardCopy } from "lucide-react";

type UploadMethod = "file" | "paste";

export default function UploadPage() {
  const router = useRouter();
  const [method, setMethod] = useState<UploadMethod>("file");
  const { status, conversations, error, parse, parseRawText } = useParser();
  const { setConversations } = useConversations();

  const handleFile = useCallback(
    (file: File) => {
      trackEvent("file_uploaded", { file_size_mb: Math.round(file.size / 1024 / 1024) });
      parse(file);
    },
    [parse]
  );

  const handlePaste = useCallback(
    (text: string) => {
      trackEvent("manual_paste", { length: text.length });
      parseRawText(text);
    },
    [parseRawText]
  );

  // Redirect to conversations list after successful parse
  useEffect(() => {
    if (status === "success" && conversations.length > 0) {
      trackEvent("parse_completed", { 
        conversation_count: conversations.length,
        method
      });
      setConversations(conversations);
      router.push("/conversations");
    }
  }, [status, conversations, setConversations, router, method]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber"></span>
            </span>
            Desktop Recommended
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            How do you want to start?
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload your history or paste a chat to capture your AI personality.
          </p>
        </div>

        {/* Method Toggle */}
        <div className="mb-8 flex rounded-xl border border-border/60 bg-card/30 p-1">
          <button
            onClick={() => setMethod("file")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              method === "file"
                ? "bg-amber text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileJson className="size-4" />
            AI History File
          </button>
          <button
            onClick={() => setMethod("paste")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              method === "paste"
                ? "bg-amber text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardCopy className="size-4" />
            Manual Paste (Instant)
          </button>
        </div>

        <AnimatePresence mode="wait">
          {method === "file" ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <UploadZone
                onFileAccepted={handleFile}
                status={status}
                error={error}
              />
              <div className="mt-4 flex flex-col items-center gap-2">
                <ExportGuideModal />
                <p className="text-center text-xs text-muted-foreground">
                  Look for <code className="text-amber font-mono">conversations.json</code> in your export zip.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="paste"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ManualPaste 
                onPaste={handlePaste} 
                isProcessing={status === "parsing"} 
              />
              {error && (
                <p className="mt-4 text-center text-sm text-destructive">{error}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 border-t border-border/40 pt-6 text-center">
          <div className="mb-4 flex justify-center -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="size-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>100% Client-side Processing:</strong> Trusted by 10,000+ users to keep their context safe. Your history is processed locally in your browser.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
