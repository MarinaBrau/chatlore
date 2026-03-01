"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SelectionBarProps {
  selectedCount: number;
  totalCount: number;
  remainingUses: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onProcess: () => void;
}

export function SelectionBar({
  selectedCount,
  totalCount,
  remainingUses,
  onSelectAll,
  onClearSelection,
  onProcess,
}: SelectionBarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <div className="sticky top-14 z-40 -mx-4 flex items-center justify-between border-b border-border/40 bg-background/90 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={allSelected ? onClearSelection : onSelectAll}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {allSelected ? "Clear selection" : "Select all"}
        </button>

        {selectedCount > 0 && (
          <>
            <span className="text-border">|</span>
            <span className="text-sm font-medium">
              {selectedCount} selected
            </span>
            <button
              onClick={onClearSelection}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear
            </button>
          </>
        )}
      </div>

      <Button
        onClick={onProcess}
        disabled={selectedCount === 0}
        size="sm"
        className="gap-1.5"
      >
        <Sparkles className="size-3.5" />
        Process
        <span className="ml-1 rounded-full bg-primary-foreground/20 px-1.5 py-0.5 text-xs">
          {remainingUses}/3
        </span>
      </Button>
    </div>
  );
}
