"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ManualPasteProps {
  onPaste: (text: string) => void;
  isProcessing: boolean;
}

const MAX_PASTE_LENGTH = 100000; // ~100k chars is plenty for a quick paste

export function ManualPaste({ onPaste, isProcessing }: ManualPasteProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    if (text.length > MAX_PASTE_LENGTH) {
      setError(`Text too long (${(text.length / 1000).toFixed(1)}k chars). Please keep it under 100k.`);
      return;
    }
    setError(null);
    onPaste(text);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste your ChatGPT conversation here... (Copy the messages from your chat and paste them here)"
          className={`min-h-[300px] w-full rounded-xl border bg-card/30 p-4 text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber/50 ${
            error ? "border-destructive/50 focus:border-destructive" : "border-border/60 focus:border-amber/50"
          }`}
        />
        {text.length < 50 && !isProcessing && !error && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center px-8">
            <p className="text-xs text-muted-foreground italic">
              Tip: Copy the messages from your ChatGPT window and paste them here. 
              We'll extract your style from the text.
            </p>
          </div>
        )}
        <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
          {text.length.toLocaleString()} / {MAX_PASTE_LENGTH.toLocaleString()}
        </div>
      </div>

      {error && (
        <p className="text-xs text-destructive font-medium animate-pulse">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() || isProcessing || !!error}
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
