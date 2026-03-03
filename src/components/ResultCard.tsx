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
  selectedItems?: Record<string, string[]>;
  onToggleItem?: (field: string, value: string) => void;
}

export function ResultCard({ analysis, onUpdate, selectedItems, onToggleItem }: ResultCardProps) {
  const [editedAnalysis, setEditedAnalysis] = useState(analysis);

  useEffect(() => {
    setEditedAnalysis(analysis);
  }, [analysis]);

  const handleUpdate = (field: keyof ConversationAnalysis, value: any) => {
    const updated = { ...editedAnalysis, [field]: value };
    setEditedAnalysis(updated);
    if (onUpdate) onUpdate(updated);
  };

  const isSelected = (field: string, value: string) => {
    if (!selectedItems) return true;
    return selectedItems[field]?.includes(value);
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="border-b border-border/40 bg-muted/30 px-6 py-4">
        <h3 className="font-bold text-lg leading-snug">{analysis.title}</h3>
      </div>

      <Accordion type="multiple" defaultValue={["summary", "tone", "preferences"]}>
        <AccordionItem value="summary" className="px-6 border-b border-border/40">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
              <FileText className="size-4 text-primary" />
              Summary
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <textarea
              value={editedAnalysis.summary}
              onChange={(e) => handleUpdate("summary", e.target.value)}
              className="w-full bg-transparent text-sm text-muted-foreground leading-relaxed focus:outline-none resize-none min-h-[80px]"
            />
          </AccordionContent>
        </AccordionItem>

        {editedAnalysis.topics && editedAnalysis.topics.length > 0 && (
          <AccordionItem value="topics" className="px-6 border-b border-border/40">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                <Tag className="size-4 text-primary" />
                Key Topics
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {editedAnalysis.topics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => onToggleItem?.("topics", topic)}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs font-medium transition-all",
                      isSelected("topics", topic)
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-muted border-border/40 text-muted-foreground opacity-60"
                    )}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {editedAnalysis.toneAdjectives && editedAnalysis.toneAdjectives.length > 0 && (
          <AccordionItem value="tone" className="px-6 border-b border-border/40">
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                <Mic2 className="size-4 text-primary" />
                Tone of Voice
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {editedAnalysis.toneAdjectives.map((tone, i) => (
                  <button
                    key={i}
                    onClick={() => onToggleItem?.("toneAdjectives", tone)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold transition-all",
                      isSelected("toneAdjectives", tone)
                        ? "bg-primary text-white border-primary"
                        : "bg-muted border-border/40 text-muted-foreground opacity-60"
                    )}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="preferences" className="px-6 border-b border-border/40">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
              <Heart className="size-4 text-primary" />
              Preferences
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {editedAnalysis.preferences.map((pref, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <button 
                    onClick={() => onToggleItem?.("preferences", pref)}
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full transition-all",
                      isSelected("preferences", pref) ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                  <input
                    value={pref}
                    onChange={(e) => {
                      const newPrefs = [...editedAnalysis.preferences];
                      newPrefs[i] = e.target.value;
                      handleUpdate("preferences", newPrefs);
                    }}
                    className={cn(
                      "flex-1 bg-transparent text-sm transition-all focus:outline-none",
                      isSelected("preferences", pref) ? "text-muted-foreground" : "text-muted-foreground/40 italic"
                    )}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

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
                    <button 
                      onClick={() => onToggleItem?.("negativeConstraints", constraint)}
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full transition-all",
                        isSelected("negativeConstraints", constraint) ? "bg-destructive" : "bg-muted-foreground/30"
                      )}
                    />
                    <input
                      value={constraint}
                      onChange={(e) => {
                        const newConstraints = [...(editedAnalysis.negativeConstraints || [])];
                        newConstraints[i] = e.target.value;
                        handleUpdate("negativeConstraints", newConstraints);
                      }}
                      className={cn(
                        "flex-1 bg-transparent text-sm transition-all focus:outline-none",
                        isSelected("negativeConstraints", constraint) ? "text-muted-foreground" : "text-muted-foreground/40 italic"
                      )}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="patterns" className="px-6 border-b-0">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
              <Repeat className="size-4 text-primary" />
              Patterns & Behaviors
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {editedAnalysis.patterns.map((pattern, i) => (
                <li key={i} className="flex items-start gap-3">
                  <button 
                    onClick={() => onToggleItem?.("patterns", pattern)}
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full transition-all",
                      isSelected("patterns", pattern) ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                  <input
                    value={pattern}
                    onChange={(e) => {
                      const newPatterns = [...editedAnalysis.patterns];
                      newPatterns[i] = e.target.value;
                      handleUpdate("patterns", newPatterns);
                    }}
                    className={cn(
                      "flex-1 bg-transparent text-sm transition-all focus:outline-none",
                      isSelected("patterns", pattern) ? "text-muted-foreground" : "text-muted-foreground/40 italic"
                    )}
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
    </div>
  );
}
