"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Search, ArrowUpDown } from "lucide-react";
import { ConversationCard } from "./ConversationCard";
import { SelectionBar } from "./SelectionBar";
import type { Conversation } from "@/lib/parsers/types";

interface ConversationListProps {
  conversations: Conversation[];
  onProcess: (selected: Conversation[]) => void;
}

type SortOrder = "newest" | "oldest";

export function ConversationList({
  conversations,
  onProcess,
}: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const parentRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    let result = conversations;

    if (query) {
      result = result.filter((c) => c.title.toLowerCase().includes(query));
    }

    result = [...result].sort((a, b) =>
      sortOrder === "newest"
        ? b.createTime.getTime() - a.createTime.getTime()
        : a.createTime.getTime() - b.createTime.getTime()
    );

    return result;
  }, [conversations, search, sortOrder]);

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 108,
    overscan: 10,
  });

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(filtered.map((c) => c.id)));
  }, [filtered]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const handleProcess = useCallback(() => {
    const selected = conversations.filter((c) => selectedIds.has(c.id));
    if (selected.length > 0) {
      onProcess(selected);
    }
  }, [conversations, selectedIds, onProcess]);

  return (
    <div className="flex h-full flex-col gap-4">
      <SelectionBar
        selectedCount={selectedIds.size}
        totalCount={filtered.length}
        onSelectAll={selectAll}
        onClearSelection={clearSelection}
        onProcess={handleProcess}
      />

      {/* Search + sort bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <button
          onClick={() =>
            setSortOrder((s) => (s === "newest" ? "oldest" : "newest"))
          }
          className="flex h-9 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm transition-colors hover:bg-accent"
        >
          <ArrowUpDown className="size-3.5" />
          {sortOrder === "newest" ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Counter */}
      <p className="text-sm text-muted-foreground">
        {filtered.length.toLocaleString()} conversation
        {filtered.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
      </p>

      {/* Virtualized list */}
      {filtered.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <p className="text-muted-foreground">
            {search
              ? "No conversations match your search."
              : "No conversations found."}
          </p>
        </div>
      ) : (
        <div
          ref={parentRef}
          className="flex-1 overflow-auto"
          style={{ maxHeight: "calc(100vh - 320px)" }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const conv = filtered[virtualItem.index];
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="pb-2">
                    <ConversationCard
                      conversation={conv}
                      selected={selectedIds.has(conv.id)}
                      onToggle={toggleSelection}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
