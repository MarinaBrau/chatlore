"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface LimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LimitModal({ open, onOpenChange }: LimitModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="size-5 text-primary" />
          </div>
          <DialogTitle className="text-center">
            Free limit reached
          </DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve used all 3 free AI analyses. We&apos;re working on a
            premium plan with unlimited processing, semantic search, and saved
            memories. Stay tuned!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
