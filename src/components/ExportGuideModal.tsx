"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle, Settings, Mail, FolderOpen, Upload } from "lucide-react";
import { ChatGptMockup } from "@/components/mockups/ChatGptMockup";
import { trackEvent } from "@/lib/analytics";

const steps = [
  {
    num: "1",
    icon: Settings,
    title: "Open ChatGPT Settings",
    body: "Click your profile picture in the bottom-left corner of ChatGPT, then select Settings.",
  },
  {
    num: "2",
    icon: Upload,
    title: "Export your data",
    body: "Go to Data controls and click the Export button. ChatGPT will prepare a download of all your conversations.",
    mockup: true,
  },
  {
    num: "3",
    icon: Mail,
    title: "Check your email",
    body: "You'll receive an email within a few minutes with a download link. Check your spam folder if you don't see it.",
  },
  {
    num: "4",
    icon: FolderOpen,
    title: "Open the zip and find your file",
    body: "Download the .zip file, extract it, and look for a file called conversations.json. That's the one you'll drop here.",
  },
];

export function ExportGuideModal() {
  return (
    <Dialog onOpenChange={(open) => open && trackEvent("guide_modal_opened")}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <HelpCircle className="size-3.5" />
          Don&apos;t know how to export? See our guide
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">How to get your history file</DialogTitle>
          <DialogDescription className="text-sm">
            Follow these 4 simple steps. It takes less than 2 minutes of your time.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4">
              {/* Step number */}
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber text-sm font-bold text-white shadow-lg shadow-amber/20">
                {step.num}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <step.icon className="size-4 text-amber" />
                  <h3 className="text-sm font-bold">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                {step.mockup && (
                  <div className="mt-4 rounded-xl border border-border/40 overflow-hidden shadow-sm">
                    <ChatGptMockup />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-amber/20 bg-amber/5 p-4">
          <p className="text-xs leading-relaxed text-amber/80 font-medium">
            <span className="font-bold uppercase tracking-wider">Privacy Note:</span> ChatLore reads your file locally in your browser. We never see your conversations, and we never store your data. Your history stays yours.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
