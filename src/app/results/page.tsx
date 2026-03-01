"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ResultCard";
import { ExportButtons } from "@/components/ExportButtons";
import type { ConversationAnalysis } from "@/lib/types";
import Link from "next/link";

type ViewMode = "individual" | "combined";

interface ProcessState {
  status: "loading" | "success" | "error";
  results: ConversationAnalysis[];
  combined: ConversationAnalysis | null;
  error: string | null;
}

export default function ResultsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("individual");
  const [state, setState] = useState<ProcessState>({
    status: "loading",
    results: [],
    combined: null,
    error: null,
  });
  const hasStarted = useRef(false);

  const processConversations = useCallback(async () => {
    const raw = sessionStorage.getItem("chatlore-selected");
    if (!raw) {
      router.push("/upload");
      return;
    }

    let selected: Array<{ id: string; title: string; messages: unknown[] }>;
    try {
      selected = JSON.parse(raw);
    } catch {
      router.push("/upload");
      return;
    }

    setState({ status: "loading", results: [], combined: null, error: null });

    try {
      const payload = selected.map((c) => ({
        id: c.id,
        title: c.title,
        messages: c.messages,
      }));

      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversations: payload }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || `Request failed with status ${res.status}`
        );
      }

      const data = await res.json();
      const results: ConversationAnalysis[] = data.results;

      // Build combined view
      const combined: ConversationAnalysis = {
        id: "combined",
        title: "Combined Analysis",
        summary: results.map((r) => r.summary).join(" "),
        topics: [...new Set(results.flatMap((r) => r.topics))],
        preferences: [...new Set(results.flatMap((r) => r.preferences))],
        patterns: [...new Set(results.flatMap((r) => r.patterns))],
      };

      setState({ status: "success", results, combined, error: null });
    } catch (err) {
      setState({
        status: "error",
        results: [],
        combined: null,
        error: err instanceof Error ? err.message : "Processing failed",
      });
    }
  }, [router]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    processConversations();
  }, [processConversations]);

  // Loading state
  if (state.status === "loading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <div className="text-center">
          <p className="font-medium">Analyzing your conversations...</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This may take a few seconds per conversation.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.status === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-5 text-destructive" />
        </div>
        <div className="text-center">
          <p className="font-medium">Analysis failed</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {state.error}
          </p>
        </div>
        <Button
          onClick={() => {
            hasStarted.current = false;
            processConversations();
          }}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="size-4" />
          Try again
        </Button>
      </div>
    );
  }

  // No results
  if (state.results.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground">No results to display.</p>
        <Link href="/upload" className="text-sm underline underline-offset-4">
          Go to Upload
        </Link>
      </div>
    );
  }

  const displayResults =
    viewMode === "combined" && state.combined
      ? [state.combined]
      : state.results;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl px-4 py-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Results</h1>

        {state.results.length > 1 && (
          <div className="flex rounded-lg border border-border/60 bg-background p-0.5">
            <button
              onClick={() => setViewMode("individual")}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "individual"
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setViewMode("combined")}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "combined"
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Combined
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {displayResults.map((result) => (
          <ResultCard key={result.id} analysis={result} />
        ))}
      </div>

      {/* Export section */}
      <div className="mt-8 rounded-lg border border-border/50 bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold">Export</h2>
        <ExportButtons analyses={displayResults} />
      </div>
    </motion.div>
  );
}
