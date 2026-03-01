"use client";

import { FolderOpen, ChevronRight, FileText } from "lucide-react";

const projects = [
  { name: "Work assistant", active: false },
  { name: "My context", active: true },
  { name: "Writing help", active: false },
];

export function ClaudeProjectMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-amber/20 bg-[oklch(0.97_0.01_75)] text-neutral-800 shadow-sm">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-amber/10 bg-[oklch(0.95_0.015_75)] px-3 py-2">
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="ml-2 text-[11px] text-neutral-400">
          claude.ai — Project
        </span>
      </div>

      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr]">
        {/* Sidebar */}
        <div className="space-y-0.5 border-r border-amber/10 bg-[oklch(0.96_0.012_75)] p-2">
          <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            Projects
          </p>
          {projects.map((p) => (
            <div
              key={p.name}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] ${
                p.active
                  ? "bg-amber/10 font-medium text-amber"
                  : "text-neutral-500"
              }`}
            >
              <FolderOpen className="size-3 shrink-0" />
              <span className="truncate">{p.name}</span>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-700">
            <FileText className="size-3.5" />
            My context
            <ChevronRight className="size-3 text-neutral-400" />
            <span className="text-neutral-400">Settings</span>
          </div>

          <div className="mt-3 space-y-2">
            {/* Instructions field - highlighted */}
            <div className="relative">
              <p className="mb-1 text-[11px] font-medium text-neutral-600">
                Project instructions
              </p>
              <div className="rounded-md border-2 border-dashed border-amber/40 bg-amber/5 p-2.5">
                <p className="text-[11px] italic text-amber/70">
                  Paste your context here...
                </p>
              </div>
              {/* Paste here indicator */}
              <div className="absolute -right-1 top-5 flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                <span>paste here</span>
              </div>
            </div>

            {/* Other fields - dimmed */}
            <div className="opacity-30">
              <p className="mb-1 text-[11px] text-neutral-500">Description</p>
              <div className="h-6 rounded-md border border-neutral-200 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
