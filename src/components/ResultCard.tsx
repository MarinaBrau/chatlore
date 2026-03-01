"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Tag, Heart, Repeat } from "lucide-react";
import type { ConversationAnalysis } from "@/lib/types";

interface ResultCardProps {
  analysis: ConversationAnalysis;
}

export function ResultCard({ analysis }: ResultCardProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card">
      <div className="border-b border-border/40 px-4 py-3">
        <h3 className="font-semibold leading-snug">{analysis.title}</h3>
      </div>

      <Accordion type="multiple" defaultValue={["summary", "topics"]}>
        <AccordionItem value="summary" className="px-4">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              Summary
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground leading-relaxed">
              {analysis.summary}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="topics" className="px-4">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <Tag className="size-4 text-muted-foreground" />
              Topics ({analysis.topics.length})
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {analysis.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {analysis.preferences.length > 0 && (
          <AccordionItem value="preferences" className="px-4">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Heart className="size-4 text-muted-foreground" />
                Preferences ({analysis.preferences.length})
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {analysis.preferences.map((pref) => (
                  <li
                    key={pref}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {pref}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {analysis.patterns.length > 0 && (
          <AccordionItem value="patterns" className="px-4">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Repeat className="size-4 text-muted-foreground" />
                Patterns ({analysis.patterns.length})
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {analysis.patterns.map((pattern) => (
                  <li
                    key={pattern}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {pattern}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
