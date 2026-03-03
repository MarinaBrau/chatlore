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
import { cn } from "@/lib/utils";
import type { ConversationAnalysis } from "@/lib/types";

type ViewMode = "individual" | "combined";

const STORAGE_KEY = "chatlore-last-results";

const loadingMessages = [
  "Analyzing your tone of voice...",
  "Extracting hidden preferences...",
  "Identifying constraints and dislikes...",
  "Mapping your interaction patterns...",
  "Building your universal AI profile...",
];

interface ProcessState {
  status: "loading" | "celebrating" | "success" | "error";
  results: ConversationAnalysis[];
  combined: ConversationAnalysis | null;
  error: string | null;
}

export function ResultsContent() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("individual");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [state, setState] = useState<ProcessState>({
    status: "loading",
    results: [],
    combined: null,
    error: null,
  });
  const hasStarted = useRef(false);

  const initSelections = (results: ConversationAnalysis[], combined: ConversationAnalysis | null) => {
    const all = combined ? [combined, ...results] : results;
    const initial: Record<string, string[]> = {};
    
    const topics = Array.from(new Set(all.flatMap(r => r.topics || [])));
    const tone = Array.from(new Set(all.flatMap(r => r.toneAdjectives || [])));
    const prefs = Array.from(new Set(all.flatMap(r => r.preferences || [])));
    const negative = Array.from(new Set(all.flatMap(r => r.negativeConstraints || [])));
    const patterns = Array.from(new Set(all.flatMap(r => r.patterns || [])));

    setSelectedItems({
      topics,
      toneAdjectives: tone,
      preferences: prefs,
      negativeConstraints: negative,
      patterns
    });
  };

  const toggleItem = (field: string, value: string) => {
    setSelectedItems(prev => {
      const current = prev[field] || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  useEffect(() => {
    if (state.status !== "loading") return;
    const interval = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [state.status]);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved && !hasStarted.current) {
      try {
        const { results, combined, timestamp, selections } = JSON.parse(saved);
        if (Date.now() - timestamp < 2 * 60 * 60 * 1000) {
          setState({ status: "success", results, combined, error: null });
          if (selections) setSelectedItems(selections);
          else initSelections(results, combined);
          hasStarted.current = true;
        }
      } catch (e) {
        console.error("Failed to restore from storage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (state.status === "success" && state.results.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        results: state.results,
        combined: state.combined,
        timestamp: Date.now(),
        selections: selectedItems
      }));
    }
  }, [state.results, state.combined, state.status, selectedItems]);

  const clearStorage = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    router.push("/upload");
  };

  const processConversations = useCallback(async () => {
    const raw = sessionStorage.getItem("chatlore-selected");
    if (!raw) {
      if (state.status === "success") return;
      router.push("/upload");
      return;
    }

    let selected: any[];
    try {
      selected = JSON.parse(raw);
    } catch {
      router.push("/upload");
      return;
    }

    setState({ status: "loading", results: [], combined: null, error: null });

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversations: selected }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Processing failed");
      }

      const data = await res.json();
      const results: ConversationAnalysis[] = data.results;

      const combined: ConversationAnalysis = {
        id: "combined",
        title: "Combined AI Profile",
        summary: results.map((r) => r.summary).join(" "),
        topics: Array.from(new Set(results.flatMap((r) => r.topics || []))).filter(Boolean),
        preferences: Array.from(new Set(results.flatMap((r) => r.preferences || []))).filter(Boolean),
        patterns: Array.from(new Set(results.flatMap((r) => r.patterns || []))).filter(Boolean),
        toneAdjectives: Array.from(new Set(results.flatMap((r) => r.toneAdjectives || []))).filter(Boolean),
        negativeConstraints: Array.from(new Set(results.flatMap((r) => r.negativeConstraints || []))).filter(Boolean),
      };

      trackEvent("analysis_completed", { result_count: results.length });
      initSelections(results, combined);
      setState({ status: "celebrating", results, combined, error: null });
      setTimeout(() => {
        setState((prev) => ({ ...prev, status: "success" }));
      }, 1500);
    } catch (err) {
      setState({ status: "error", results: [], combined: null, error: err instanceof Error ? err.message : "Processing failed" });
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
        <Loader2 className="size-8 animate-spin text-primary" />
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.p key={loadingMsgIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-bold text-lg text-primary">
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/20">
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
        <p className="font-bold text-lg text-foreground">Something went wrong</p>
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Universal AI Profile</h1>
          <p className="mt-1 text-muted-foreground text-sm">Review your style, preferences, and patterns. Ready for any AI.</p>
        </div>
        
        <div className="flex items-center gap-2">
          {state.results.length > 1 && (
            <div className="flex rounded-xl border border-border/60 bg-muted/30 p-1">
              <button onClick={() => setViewMode("individual")} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition-all", viewMode === "individual" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                Individual
              </button>
              <button onClick={() => setViewMode("combined")} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition-all", viewMode === "combined" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                Combined
              </button>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={clearStorage} title="Start over" className="text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mb-10 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Check className="size-24 text-primary" />
        </div>
        <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">1</span>
          Save your context
        </h2>
        <ExportButtons analyses={displayResults} selections={selectedItems} />
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
              selectedItems={selectedItems}
              onToggleItem={toggleItem}
              onUpdate={viewMode === "combined" ? updateCombinedResult : updateIndividualResult}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
