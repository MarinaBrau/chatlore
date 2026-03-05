"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, FileDown, ClipboardCheck, MessageCircle, Sparkles, Brain } from "lucide-react";
import { toast } from "sonner";
import { exportAsProjectInstructions } from "@/lib/exporters/project-instructions";
import { exportAsClaudeMd } from "@/lib/exporters/claude-md";
import { exportAsCursorRules } from "@/lib/exporters/cursor-rules";
import { exportForChatGPT } from "@/lib/exporters/chatgpt-instructions";
import { exportForGemini } from "@/lib/exporters/gemini-instructions";
import { exportAsWindsurf } from "@/lib/exporters/windsurf";
import { exportAsPerplexity } from "@/lib/exporters/perplexity";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { ConversationAnalysis } from "@/lib/types";

interface ExportButtonsProps {
  analyses: ConversationAnalysis[];
  selections?: Record<string, string[]>;
}

type TargetAI = "claude" | "chatgpt" | "gemini" | "perplexity" | "catchup";

export function ExportButtons({ analyses, selections }: ExportButtonsProps) {
  const [target, setTarget] = useState<TargetAI>("claude");

  const copyToClipboard = useCallback(async (text: string, label: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent("export_clicked", { format, method: "copy", target });
      
      const targetLabel = target === "claude" ? "Claude" : target === "chatgpt" ? "ChatGPT" : target === "gemini" ? "Gemini" : target === "perplexity" ? "Perplexity" : "AI";
      toast.success(`${label} copied! Now paste them into ${targetLabel}.`);
    } catch {
      toast.error("Failed to copy. Please try again.");
    }
  }, [target]);

  const downloadFile = useCallback((content: string, filename: string, format: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("export_clicked", { format, method: "download", target });
    toast.success(`${filename} downloaded!`);
  }, [target]);

  const getExportText = () => {
    switch (target) {
      case "chatgpt": return exportForChatGPT(analyses, selections);
      case "gemini": return exportForGemini(analyses, selections);
      case "perplexity": return exportAsPerplexity(analyses);
      case "catchup": 
        const profile = exportAsProjectInstructions(analyses, selections);
        return `Hello! I'm moving our conversation context here. 

ABOUT ME & MY PROJECT:
${profile}

Let's continue from where we left off. Please acknowledge you've received this context.`;
      default: return exportAsProjectInstructions(analyses, selections);
    }
  };

  const exportText = getExportText();
  const charCount = exportText.length;
  const limit = target === "chatgpt" ? 1500 : target === "perplexity" ? 2500 : target === "gemini" ? 20000 : 8000;
  const isOverLimit = charCount > limit;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-xl border border-border/60 w-fit">
        <button
          onClick={() => setTarget("claude")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "claude" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Sparkles className="size-3" /> Claude
        </button>
        <button
          onClick={() => setTarget("chatgpt")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "chatgpt" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <MessageCircle className="size-3" /> ChatGPT
        </button>
        <button
          onClick={() => setTarget("gemini")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "gemini" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Brain className="size-3" /> Gemini
        </button>
        <button
          onClick={() => setTarget("perplexity")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "perplexity" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Sparkles className="size-3" /> Perplexity
        </button>
        <button
          onClick={() => setTarget("catchup")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "catchup" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <ClipboardCheck className="size-3" /> Catch-up
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Button
            variant="default"
            size="lg"
            className={cn(
              "w-full gap-2 font-bold h-14 shadow-lg transition-all",
              isOverLimit ? "bg-destructive hover:bg-destructive/90 shadow-destructive/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"
            )}
            onClick={() =>
              copyToClipboard(exportText, target === "catchup" ? "Catch-up Prompt" : `${target.toUpperCase()} Instructions`, `${target}_instructions`)
            }
          >
            <ClipboardCheck className="size-5" />
            {target === "catchup" ? "Copy Catch-up Prompt" : `Copy for ${target.charAt(0).toUpperCase() + target.slice(1)}`}
          </Button>
          
          <div className="flex items-center justify-between px-1">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              isOverLimit ? "text-destructive" : "text-muted-foreground"
            )}>
              {charCount.toLocaleString()} / {limit.toLocaleString()} chars
            </span>
            {isOverLimit && (
              <span className="text-[10px] font-medium text-destructive animate-pulse">
                Over limit! Deselect items below.
              </span>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="gap-2 h-14 border-border/60"
          onClick={() =>
            copyToClipboard(exportText, "Simple Text", "markdown")
          }
        >
          <Copy className="size-5" />
          Copy as Simple Text
        </Button>

        <div className="sm:col-span-2 pt-2 border-t border-border/20 mt-2 flex flex-wrap gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-bold">Developer Exports</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-primary"
                onClick={() =>
                  downloadFile(exportAsClaudeMd(analyses), "CLAUDE.md", "claude_md")
                }
              >
                <FileDown className="size-3.5" />
                Download CLAUDE.md
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-primary"
                onClick={() =>
                  downloadFile(exportAsCursorRules(analyses), ".cursorrules", "cursor_rules")
                }
              >
                <FileDown className="size-3.5" />
                Download .cursorrules
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-primary"
                onClick={() =>
                  downloadFile(exportAsWindsurf(analyses), ".windsurfrules", "windsurf_rules")
                }
              >
                <FileDown className="size-3.5" />
                Download .windsurfrules
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
