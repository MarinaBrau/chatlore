"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, FileDown, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { exportAsMarkdown } from "@/lib/exporters/markdown";
import { exportAsProjectInstructions } from "@/lib/exporters/project-instructions";
import { exportAsClaudeMd } from "@/lib/exporters/claude-md";
import { exportAsCursorRules } from "@/lib/exporters/cursor-rules";
import { trackEvent } from "@/lib/analytics";
import type { ConversationAnalysis } from "@/lib/types";

interface ExportButtonsProps {
  analyses: ConversationAnalysis[];
}

export function ExportButtons({ analyses }: ExportButtonsProps) {
  const copyToClipboard = useCallback(async (text: string, label: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent("export_clicked", { format, method: "copy" });
      toast.success(`${label} copied! Now paste it in Claude.`);
    } catch {
      toast.error("Failed to copy. Please try again.");
    }
  }, []);

  const downloadFile = useCallback((content: string, filename: string, format: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("export_clicked", { format, method: "download" });
    toast.success(`${filename} downloaded!`);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button
        variant="default"
        size="lg"
        className="gap-2 bg-amber hover:bg-amber/90 text-white font-bold h-14 shadow-lg shadow-amber/20"
        onClick={() =>
          copyToClipboard(
            exportAsProjectInstructions(analyses),
            "Claude Instructions",
            "project_instructions"
          )
        }
      >
        <ClipboardCheck className="size-5" />
        Copy for Claude (Recommended)
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="gap-2 h-14 border-border/60"
        onClick={() =>
          copyToClipboard(exportAsMarkdown(analyses), "Simple Text", "markdown")
        }
      >
        <Copy className="size-5" />
        Copy as Simple Text
      </Button>

      <div className="sm:col-span-2 pt-2 border-t border-border/20 mt-2 flex flex-wrap gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-bold">Advanced Export</p>
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
  );
}
