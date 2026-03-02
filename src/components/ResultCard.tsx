"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Tag, Heart, Repeat, Mic2, Ban } from "lucide-react";
import type { ConversationAnalysis } from "@/lib/types";
import { useState, useEffect } from "react";

interface ResultCardProps {
  analysis: ConversationAnalysis;
  onUpdate?: (updated: ConversationAnalysis) => void;
}

export function ResultCard({ analysis, onUpdate }: ResultCardProps) {
  const [editedAnalysis, setEditedAnalysis] = useState(analysis);

  useEffect(() => {
    setEditedAnalysis(analysis);
  }, [analysis]);

  const handleUpdate = (field: keyof ConversationAnalysis, value: any) => {
    const updated = { ...editedAnalysis, [field]: value };
    setEditedAnalysis(updated);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="border-b border-border/40 bg-muted/30 px-6 py-4">
        <h3 className="font-bold text-lg leading-snug">{analysis.title}</h3>
      </div>

      <Accordion type="multiple" defaultValue={["summary", "tone", "preferences"]}>
        {/* Summary */}
        <AccordionItem value="summary" className="px-6 border-b border-border/40">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
              <FileText className="size-4 text-amber" />
              Summary
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <textarea
              value={editedAnalysis.summary}
              onChange={(e) => handleUpdate("summary", e.target.value)}
              className="w-full bg-transparent text-muted-foreground leading-relaxed focus:outline-none resize-none min-h-[80px]"
            />
          </AccordionContent>
        </AccordionItem>

        {/* Tone Adjectives */}
        {editedAnalysis.toneAdjectives && editedAnalysis.toneAdjectives.length > 0 && (
          <AccordionItem value="tone" className="px-6 border-b border-border/40">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                <Mic2 className="size-4 text-amber" />
                Tone of Voice
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {editedAnalysis.toneAdjectives.map((tone, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-amber/10 border border-amber/20 px-3 py-1 text-xs font-semibold text-amber"
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Preferences */}
        <AccordionItem value="preferences" className="px-6 border-b border-border/40">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
              <Heart className="size-4 text-amber" />
              Preferences
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {editedAnalysis.preferences.map((pref, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber/40" />
                  <input
                    value={pref}
                    onChange={(e) => {
                      const newPrefs = [...editedAnalysis.preferences];
                      newPrefs[i] = e.target.value;
                      handleUpdate("preferences", newPrefs);
                    }}
                    className="flex-1 bg-transparent text-sm text-muted-foreground focus:outline-none"
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Negative Constraints */}
        {editedAnalysis.negativeConstraints && editedAnalysis.negativeConstraints.length > 0 && (
          <AccordionItem value="negative" className="px-6 border-b border-border/40">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                <Ban className="size-4 text-destructive/70" />
                Negative Constraints
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3">
                {editedAnalysis.negativeConstraints.map((constraint, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive/30" />
                    <input
                      value={constraint}
                      onChange={(e) => {
                        const newConstraints = [...(editedAnalysis.negativeConstraints || [])];
                        newConstraints[i] = e.target.value;
                        handleUpdate("negativeConstraints", newConstraints);
                      }}
                      className="flex-1 bg-transparent text-sm text-muted-foreground focus:outline-none"
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Patterns */}
        <AccordionItem value="patterns" className="px-6 border-b-0">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
              <Repeat className="size-4 text-amber" />
              Interaction Patterns
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {editedAnalysis.patterns.map((pattern, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber/40" />
                  <input
                    value={pattern}
                    onChange={(e) => {
                      const newPatterns = [...editedAnalysis.patterns];
                      newPatterns[i] = e.target.value;
                      handleUpdate("patterns", newPatterns);
                    }}
                    className="flex-1 bg-transparent text-sm text-muted-foreground focus:outline-none"
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
