"use client";

import { Database, User, Shield, ChevronRight } from "lucide-react";

const menuItems = [
  { icon: User, label: "General" },
  { icon: Database, label: "Data controls", active: true },
  { icon: Shield, label: "Security" },
];

export function ChatGptMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-sm">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-3 py-2">
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="ml-2 text-[11px] text-neutral-400 font-medium">Settings</span>
      </div>

      <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr]">
        {/* Sidebar */}
        <div className="space-y-0.5 border-r border-neutral-200 bg-neutral-50/50 p-2">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] ${
                item.active
                  ? "bg-primary/10 font-bold text-primary"
                  : "text-neutral-500 font-medium"
              }`}
            >
              <item.icon className="size-3.5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="p-3 sm:p-4">
          <p className="text-[13px] font-bold text-neutral-700">
            Data controls
          </p>

          <div className="mt-3 space-y-2.5">
            {/* Export row - highlighted with primary purple */}
            <div className="flex items-center justify-between rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
              <div>
                <p className="text-[12px] font-bold text-neutral-800">
                  Export data
                </p>
                <p className="text-[11px] text-neutral-500">
                  Download archive
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                  Export
                </span>
                <ChevronRight className="size-3 text-primary" />
              </div>
            </div>

            {/* Other rows - dimmed */}
            <div className="flex items-center justify-between rounded-md px-3 py-2 opacity-30">
              <div>
                <p className="text-[12px] text-neutral-600">Shared links</p>
                <p className="text-[11px] text-neutral-400">Manage links</p>
              </div>
              <span className="text-[11px] text-neutral-400">Manage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
