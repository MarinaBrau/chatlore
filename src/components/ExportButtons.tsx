"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, FileDown, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { exportAsMarkdown } from "@/lib/exporters/markdown";
import { exportAsProjectInstructions } from "@/lib/exporters/project-instructions";
import { exportAsClaudeMd } from "@/lib/exporters/claude-md";
import type { ConversationAnalysis } from "@/lib/types";

interface ExportButtonsProps {
  analyses: ConversationAnalysis[];
}

export function ExportButtons({ analyses }: ExportButtonsProps) {
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy. Try again.");
    }
  }, []);

  const downloadFile = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${filename} downloaded!`);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() =>
          copyToClipboard(exportAsMarkdown(analyses), "Markdown")
        }
      >
        <Copy className="size-3.5" />
        Copy as Text
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() =>
          copyToClipboard(
            exportAsProjectInstructions(analyses),
            "Project Instructions"
          )
        }
      >
        <ClipboardCheck className="size-3.5" />
        Copy as Project Instructions
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() =>
          downloadFile(exportAsClaudeMd(analyses), "CLAUDE.md")
        }
      >
        <FileDown className="size-3.5" />
        Download CLAUDE.md
      </Button>
    </div>
  );
}
