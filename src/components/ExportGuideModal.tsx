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
          <DialogTitle>How to export from ChatGPT</DialogTitle>
          <DialogDescription>
            Follow these steps to get your chat history file
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-3">
              {/* Step number */}
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber/10 text-xs font-semibold text-amber">
                {step.num}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <step.icon className="size-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                {step.mockup && (
                  <div className="mt-3">
                    <ChatGptMockup />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-md bg-muted/50 px-3 py-2.5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Tip:</span> The email
            usually arrives within 1–5 minutes. If you don&apos;t see it, check
            your spam folder.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
