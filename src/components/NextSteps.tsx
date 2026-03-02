"use client";

import { Laptop, MessageSquare, ExternalLink, ArrowRight } from "lucide-react";
import { ClaudeProjectMockup } from "@/components/mockups/ClaudeProjectMockup";

export function NextSteps() {
  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-2xl border border-amber/20 bg-amber/5 p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
          <Laptop className="size-6 text-amber" />
          What&apos;s next? (2 min)
        </h2>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground font-medium">
              You&apos;ve got your context file — here&apos;s how to use it in Claude.ai:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white">1</div>
                <p className="text-sm">Click the <strong>Copy for Claude</strong> button above.</p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white">2</div>
                <p className="text-sm">Go to Claude.ai, open a <strong>Project</strong> and find <strong>Settings</strong>.</p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white">3</div>
                <p className="text-sm">Paste into the <strong>Instructions</strong> box. Done!</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-bold text-white transition-all hover:bg-amber/90"
              >
                Go to Claude.ai
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-tr from-amber/20 to-transparent blur-2xl opacity-50" />
            <div className="relative overflow-hidden rounded-xl border border-border/40 shadow-sm">
              <div className="bg-muted px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                Claude Settings Example
              </div>
              <ClaudeProjectMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card p-6">
        <h3 className="mb-3 text-sm font-bold flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          Using a free Claude account?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you don&apos;t use Projects, just paste your text at the start of any new chat. 
          Claude will instantly learn your style for that conversation.
        </p>
      </div>
    </div>
  );
}
