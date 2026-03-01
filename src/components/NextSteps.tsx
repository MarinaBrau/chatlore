"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Laptop, Terminal, MessageSquare, ExternalLink } from "lucide-react";
import { ClaudeProjectMockup } from "@/components/mockups/ClaudeProjectMockup";

export function NextSteps() {
  return (
    <div className="mt-6 rounded-lg border border-border/50 bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold">What&apos;s next?</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        You&apos;ve got your context file — here&apos;s how to use it.
      </p>

      <Accordion type="single" collapsible>
        {/* Claude.ai Projects */}
        <AccordionItem value="projects" className="px-0">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <Laptop className="size-4 text-amber" />
              Claude.ai Projects
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="shrink-0 font-medium text-foreground">
                    1.
                  </span>
                  Open Claude.ai and create or open a Project
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-medium text-foreground">
                    2.
                  </span>
                  Go to Project Settings and find the &quot;Instructions&quot; field
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-medium text-foreground">
                    3.
                  </span>
                  Paste your copied context there — Claude will remember it in
                  every conversation within that project
                </li>
              </ol>

              <ClaudeProjectMockup />

              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-amber px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber/90"
              >
                Open Claude.ai
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Claude Code */}
        <AccordionItem value="code" className="px-0">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <Terminal className="size-4 text-amber" />
              Claude Code
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Save the downloaded file in your project&apos;s root folder.
                Claude Code will automatically read it every time you start a
                session.
              </p>

              <div className="rounded-md border border-border/60 bg-neutral-950 px-4 py-3 font-mono text-sm text-neutral-300">
                <span className="text-neutral-500">$</span>{" "}
                <span className="text-emerald-400">mv</span> ~/Downloads/CLAUDE.md
                ./CLAUDE.md
              </div>

              <p className="text-xs text-muted-foreground">
                You can also place it at{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  ~/.claude/CLAUDE.md
                </code>{" "}
                to apply it globally across all your projects.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Quick paste */}
        <AccordionItem value="paste" className="border-b-0 px-0">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <MessageSquare className="size-4 text-amber" />
              Quick paste into any chat
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Just paste the text at the beginning of any Claude conversation.
                Start your message with something like:
              </p>
              <div className="rounded-md border border-border/60 bg-muted/50 px-3 py-2 text-sm italic text-muted-foreground">
                &quot;Here&apos;s some context about me, please keep this in
                mind: [paste your context]&quot;
              </div>
              <p className="text-xs text-muted-foreground">
                This works in any Claude surface — web, mobile, or API. The
                context lasts for that conversation only.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
