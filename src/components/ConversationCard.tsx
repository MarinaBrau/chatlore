"use client";

import { MessageSquare, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/parsers/types";

interface ConversationCardProps {
  conversation: Conversation;
  selected: boolean;
  onToggle: (id: string) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ConversationCard({
  conversation,
  selected,
  onToggle,
}: ConversationCardProps) {
  return (
    <div
      onClick={() => onToggle(conversation.id)}
      className={cn(
        "flex cursor-pointer gap-3 rounded-lg border px-4 py-3 transition-colors",
        selected
          ? "border-primary/50 bg-primary/5"
          : "border-border/50 bg-card hover:border-border hover:bg-accent/30"
      )}
    >
      <div className="pt-0.5">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onToggle(conversation.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium leading-snug line-clamp-1">
            {conversation.title}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="size-3" />
            {conversation.messageCount}
          </div>
        </div>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {conversation.preview}
        </p>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          {formatDate(conversation.createTime)}
        </div>
      </div>
    </div>
  );
}
