"use client";

import { Laptop, MessageSquare, ExternalLink, Sparkles, MessageCircle, Brain } from "lucide-react";
import { useState } from "react";
import { ClaudeProjectMockup } from "@/components/mockups/ClaudeProjectMockup";
import { cn } from "@/lib/utils";

type Target = "claude" | "chatgpt" | "gemini";

export function NextSteps() {
  const [activeTab, setActiveTarget] = useState<Target>("claude");

  const targets = [
    { id: "claude", name: "Claude", icon: Sparkles, url: "https://claude.ai" },
    { id: "chatgpt", name: "ChatGPT", icon: MessageCircle, url: "https://chatgpt.com" },
    { id: "gemini", name: "Gemini", icon: Brain, url: "https://gemini.google.com" },
  ];

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Laptop className="size-6 text-primary" />
            What&apos;s next?
          </h2>
          
          <div className="flex p-1 bg-muted/20 rounded-xl border border-border/40 w-fit">
            {targets.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTarget(t.id as Target)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeTab === t.id ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <t.icon className="size-3" />
                {t.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground font-medium">
              How to use your generated profile in {targets.find(t => t.id === activeTab)?.name}:
            </p>
            
            <div className="space-y-4">
              {activeTab === "claude" && (
                <>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">1</div>
                    <p className="text-sm">Click <strong>Copy for Claude</strong> above.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</div>
                    <p className="text-sm">Go to Claude.ai, open <strong>Project Settings</strong>.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">3</div>
                    <p className="text-sm">Paste into <strong>Project Instructions</strong>. Done!</p>
                  </div>
                </>
              )}

              {activeTab === "chatgpt" && (
                <>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">1</div>
                    <p className="text-sm">Click <strong>Copy for ChatGPT</strong> above.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</div>
                    <p className="text-sm">Go to ChatGPT, click your profile &rarr; <strong>Customize ChatGPT</strong>.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">3</div>
                    <p className="text-sm">Paste into <strong>Custom Instructions</strong>. Save!</p>
                  </div>
                </>
              )}

              {activeTab === "gemini" && (
                <>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">1</div>
                    <p className="text-sm">Click <strong>Copy for Gemini</strong> above.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</div>
                    <p className="text-sm">Go to Gemini, find <strong>System Instructions</strong> in settings.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">3</div>
                    <p className="text-sm">Paste your profile to set the global context.</p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4">
              <a
                href={targets.find(t => t.id === activeTab)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
              >
                Open {targets.find(t => t.id === activeTab)?.name}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl opacity-50" />
            <div className="relative overflow-hidden rounded-xl border border-border/40 shadow-sm bg-white/50 backdrop-blur-sm">
              <div className="bg-muted/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                {targets.find(t => t.id === activeTab)?.name} Interface Example
              </div>
              <ClaudeProjectMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card p-6">
        <h3 className="mb-3 text-sm font-bold flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          Pro Tip: Developer Setup
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Using <strong>Cursor</strong> or <strong>Windsurf</strong>? Download the <code>CLAUDE.md</code> file and place it in your project root. 
          Your IDE will instantly understand your entire coding style and preferences.
        </p>
      </div>
    </div>
  );
}
