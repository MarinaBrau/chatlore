"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, RotateCcw, Check, Trash2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ResultCard";
import { ExportButtons } from "@/components/ExportButtons";
import { NextSteps } from "@/components/NextSteps";
import type { ConversationAnalysis } from "@/lib/types";
import Link from "next/link";

type ViewMode = "individual" | "combined";

const STORAGE_KEY = "chatlore-last-results";

const loadingMessages = [
  "Analyzing your tone of voice...",
  "Extracting hidden preferences...",
  "Identifying what you dislike...",
  "Mapping your interaction patterns...",
  "Building your Claude profile...",
];

interface ProcessState {
  status: "loading" | "celebrating" | "success" | "error";
  results: ConversationAnalysis[];
  combined: ConversationAnalysis | null;
  error: string | null;
}

export default function ResultsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("individual");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [state, setState] = useState<ProcessState>({
    status: "loading",
    results: [],
    combined: null,
    error: null,
  });
  const hasStarted = useRef(false);

  // Rotate loading messages
  useEffect(() => {
    if (state.status !== "loading") return;
    const interval = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [state.status]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && !hasStarted.current) {
      try {
        const { results, combined, timestamp } = JSON.parse(saved);
        // Only restore if less than 24h old
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setState({ status: "success", results, combined, error: null });
          hasStarted.current = true;
        }
      } catch (e) {
        console.error("Failed to restore from storage", e);
      }
    }
  }, []);

  // Save to localStorage whenever results change
  useEffect(() => {
    if (state.status === "success" && state.results.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        results: state.results,
        combined: state.combined,
        timestamp: Date.now()
      }));
    }
  }, [state.results, state.combined, state.status]);

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    router.push("/upload");
  };

  const processConversations = useCallback(async () => {
    const raw = sessionStorage.getItem("chatlore-selected");
    if (!raw) {
      // If we already have success (from localStorage), don't redirect
      if (state.status === "success") return;
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
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const results: ConversationAnalysis[] = data.results;

      const combined: ConversationAnalysis = {
        id: "combined",
        title: "Combined Analysis",
        summary: results.map((r) => r.summary).join(" "),
        topics: [...new Set(results.flatMap((r) => r.topics))],
        preferences: [...new Set(results.flatMap((r) => r.preferences))],
        patterns: [...new Set(results.flatMap((r) => r.patterns))],
        toneAdjectives: [...new Set(results.flatMap((r) => r.toneAdjectives || []))],
        negativeConstraints: [...new Set(results.flatMap((r) => r.negativeConstraints || []))],
      };

      trackEvent("analysis_completed", { result_count: results.length });
      setState({ status: "celebrating", results, combined, error: null });
      setTimeout(() => {
        setState((prev) => ({ ...prev, status: "success" }));
      }, 1500);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Processing failed";
      trackEvent("analysis_failed", { error: errorMsg });
      setState({ status: "error", results: [], combined: null, error: errorMsg });
    }
  }, [router, state.status]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    processConversations();
  }, [processConversations]);

  const updateIndividualResult = (updated: ConversationAnalysis) => {
    setState(prev => ({
      ...prev,
      results: prev.results.map(r => r.id === updated.id ? updated : r)
    }));
  };

  const updateCombinedResult = (updated: ConversationAnalysis) => {
    setState(prev => ({ ...prev, combined: updated }));
  };

  if (state.status === "loading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Loader2 className="size-8 animate-spin text-amber" />
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.p key={loadingMsgIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-bold text-lg">
              {loadingMessages[loadingMsgIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-sm text-muted-foreground italic">
            This might take a few seconds... we are looking for the details.
          </p>
        </div>
      </div>
    );
  }

  if (state.status === "celebrating") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="flex size-16 items-center justify-center rounded-full bg-amber text-white shadow-xl shadow-amber/20">
          <Check className="size-8" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-bold text-xl">
          Profile Generated!
        </motion.p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
          <AlertCircle className="size-6 text-destructive" />
        </div>
        <p className="font-bold text-lg">Something went wrong</p>
        <p className="text-sm text-muted-foreground max-w-xs">{state.error}</p>
        <Button onClick={() => { hasStarted.current = false; processConversations(); }} variant="outline" className="mt-4 gap-2 border-border/60">
          <RotateCcw className="size-4" /> Try again
        </Button>
      </div>
    );
  }

  const displayResults = viewMode === "combined" && state.combined ? [state.combined] : state.results;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Universal AI Profile</h1>
          <p className="mt-1 text-muted-foreground text-sm">Review your style, preferences, and patterns. Ready for any AI.</p>
        </div>
        
        <div className="flex items-center gap-2">
          {state.results.length > 1 && (
            <div className="flex rounded-xl border border-border/60 bg-muted/30 p-1">
              <button onClick={() => setViewMode("individual")} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "individual" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                Individual
              </button>
              <button onClick={() => setViewMode("combined")} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "combined" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                Combined
              </button>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={clearStorage} title="Start over" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mb-10 rounded-3xl border border-amber/30 bg-amber/5 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Check className="size-24 text-amber" />
        </div>
        <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-amber flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-amber text-[10px] text-white">1</span>
          Save your context
        </h2>
        <ExportButtons analyses={displayResults} />
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-muted-foreground text-[10px] text-white">2</span>
          How to use it
        </h2>
        <NextSteps />
      </div>

      <div className="border-t border-border/40 pt-12">
        <h2 className="text-xl font-bold text-foreground mb-6">Generated Insights</h2>
        <div className="space-y-6">
          {displayResults.map((result) => (
            <ResultCard 
              key={result.id} 
              analysis={result} 
              onUpdate={viewMode === "combined" ? updateCombinedResult : updateIndividualResult}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
