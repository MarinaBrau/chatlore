"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ManualPasteProps {
  onPaste: (text: string) => void;
  isProcessing: boolean;
}

export function ManualPaste({ onPaste, isProcessing }: ManualPasteProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onPaste(text);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your ChatGPT conversation here... (Copy the messages from your chat and paste them here)"
          className="min-h-[300px] w-full rounded-xl border border-border/60 bg-card/30 p-4 text-sm leading-relaxed focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/50"
        />
        {text.length < 50 && !isProcessing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center px-8">
            <p className="text-xs text-muted-foreground italic">
              Tip: Copy the messages from your ChatGPT window and paste them here. 
              We'll extract your style from the text.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() || isProcessing}
          className="h-12 w-full gap-2 bg-amber hover:bg-amber/90 text-white font-bold shadow-lg shadow-amber/10"
        >
          {isProcessing ? (
            "Analyzing..."
          ) : (
            <>
              <Sparkles className="size-4" />
              Analyze Pasted Chat
            </>
          )}
        </Button>
        
        <div className="flex items-start gap-2 rounded-lg border border-amber/20 bg-amber/5 p-3">
          <AlertCircle className="size-4 shrink-0 text-amber mt-0.5" />
          <p className="text-[11px] text-amber/80 leading-relaxed">
            <strong>Fastest way:</strong> Use this if you don&apos;t want to wait for the OpenAI email. 
            Just copy the last 10-20 messages from your chat for the best results.
          </p>
        </div>
      </div>
    </div>
  );
}
