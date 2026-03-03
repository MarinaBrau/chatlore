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
import { trackEvent } from "@/lib/analytics";
import type { ConversationAnalysis } from "@/lib/types";

interface ExportButtonsProps {
  analyses: ConversationAnalysis[];
}

type TargetAI = "claude" | "chatgpt" | "gemini";

export function ExportButtons({ analyses }: ExportButtonsProps) {
  const [target, setTarget] = useState<TargetAI>("claude");

  const copyToClipboard = useCallback(async (text: string, label: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent("export_clicked", { format, method: "copy", target });
      
      const targetLabel = target === "claude" ? "Claude" : target === "chatgpt" ? "ChatGPT" : "Gemini";
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
      case "chatgpt": return exportForChatGPT(analyses);
      case "gemini": return exportForGemini(analyses);
      default: return exportAsProjectInstructions(analyses);
    }
  };

  return (
    <div className="space-y-6">
      {/* Target Selector */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-xl border border-border/60 w-fit">
        <button
          onClick={() => setTarget("claude")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "claude" ? "bg-amber text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Sparkles className="size-3" /> Claude
        </button>
        <button
          onClick={() => setTarget("chatgpt")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "chatgpt" ? "bg-amber text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <MessageCircle className="size-3" /> ChatGPT
        </button>
        <button
          onClick={() => setTarget("gemini")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${target === "gemini" ? "bg-amber text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Brain className="size-3" /> Gemini
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          variant="default"
          size="lg"
          className="gap-2 bg-amber hover:bg-amber/90 text-white font-bold h-14 shadow-lg shadow-amber/20"
          onClick={() =>
            copyToClipboard(getExportText(), `${target.toUpperCase()} Instructions`, `${target}_instructions`)
          }
        >
          <ClipboardCheck className="size-5" />
          Copy for {target.charAt(0).toUpperCase() + target.slice(1)} (Recommended)
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="gap-2 h-14 border-border/60"
          onClick={() =>
            copyToClipboard(getExportText(), "Simple Text", "markdown")
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
                className="gap-1.5 text-muted-foreground hover:text-amber"
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
                className="gap-1.5 text-muted-foreground hover:text-amber"
                onClick={() =>
                  downloadFile(exportAsCursorRules(analyses), ".cursorrules", "cursor_rules")
                }
              >
                <FileDown className="size-3.5" />
                Download .cursorrules
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
