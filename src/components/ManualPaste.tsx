"use client";

import { useState } from "react";
import { Sparkles, AlertCircle, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ManualPasteProps {
  onPaste: (text: string) => void;
  isProcessing: boolean;
}

const MAX_PASTE_LENGTH = 100000;

const SAMPLE_TEXT = `User: Can you help me refactor this React component? I prefer using functional components and Tailwind CSS.
Assistant: Sure! Here is the refactored code using a cleaner approach.
User: Great, but can we make it more concise? I hate corporate jargon and long explanations. Just show me the code with step-by-step comments.
Assistant: Understood. I will provide direct code with minimal text.`;

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

  const loadSample = () => {
    setText(SAMPLE_TEXT);
    setError(null);
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
          placeholder="Paste your AI conversation here... (Copy messages from ChatGPT, Claude, or Gemini)"
          className={cn(
            "min-h-[300px] w-full rounded-xl border bg-card/30 p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 transition-all outline-none",
            error 
              ? "border-destructive/50 focus:ring-destructive/20" 
              : "border-border/60 focus:border-primary/50 focus:ring-primary/10"
          )}
        />
        
        {text.length === 0 && !isProcessing && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-4">
            <p className="text-xs text-muted-foreground italic max-w-[240px]">
              Tip: Copy messages from your AI window and paste them here to extract your unique style.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                loadSample();
              }}
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
            >
              <Wand2 className="size-3" />
              Try with example
            </button>
          </div>
        )}

        <div className="absolute bottom-3 right-3 text-[10px] font-medium text-muted-foreground/50">
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
          className="h-12 w-full gap-2 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20"
        >
          {isProcessing ? (
            "Analyzing Memory..."
          ) : (
            <>
              <Sparkles className="size-4" />
              Analyze Pasted Chat
            </>
          )}
        </Button>
        
        <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <AlertCircle className="size-4 shrink-0 text-primary mt-0.5" />
          <p className="text-[11px] text-primary/80 leading-relaxed font-medium">
            <strong>Pro Tip:</strong> Use this method if you don&apos;t want to wait for large export files. 
            Just copy the last 10-20 messages for an instant profile.
          </p>
        </div>
      </div>
    </div>
  );
}
