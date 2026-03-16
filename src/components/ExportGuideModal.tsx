"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle, Settings, Mail, FolderOpen, Upload, MessageCircle, Sparkles, Brain, LucideIcon } from "lucide-react";
import { ChatGptMockup } from "@/components/mockups/ChatGptMockup";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface GuideStep {
  num: string;
  icon: LucideIcon;
  title: string;
  body: string;
  mockup?: boolean;
}

const GUIDES: Record<string, GuideStep[]> = {
  chatgpt: [
    { num: "1", icon: Settings, title: "Open Settings", body: "Click your profile picture (bottom-left) → Settings." },
    { num: "2", icon: Upload, title: "Export Data", body: "Go to Data controls and click Export. OpenAI will bundle your data.", mockup: true },
    { num: "3", icon: Mail, title: "Check Email", body: "You&apos;ll receive a link within minutes. Check spam if it&apos;s missing." },
    { num: "4", icon: FolderOpen, title: "Pick JSON", body: "Extract the .zip and find &apos;conversations.json&apos; to upload here." },
  ],
  gemini: [
    { num: "1", icon: Brain, title: "Google Takeout", body: "Go to takeout.google.com and sign in." },
    { num: "2", icon: Settings, title: "Select Gemini", body: "Deselect all and check only Gemini → Create export." },
    { num: "3", icon: Mail, title: "Download Zip", body: "Google will email you when your archive is ready to download." },
    { num: "4", icon: FolderOpen, title: "Upload JSON", body: "Inside the zip, find the .json conversation file and drop it here." },
  ],
  claude: [
    { num: "1", icon: Sparkles, title: "Claude Settings", body: "Click your name (bottom-left) → Settings." },
    { num: "2", icon: Upload, title: "Account Export", body: "Go to Account and click &apos;Export Data&apos;." },
    { num: "3", icon: Mail, title: "Get Link", body: "Anthropic will email you a unique download link for your data." },
    { num: "4", icon: FolderOpen, title: "Upload File", body: "Upload the .json file from your export to ChatLore." },
  ]
};

export function ExportGuideModal() {
  const [activeTab, setActiveTab] = useState<keyof typeof GUIDES>("chatgpt");

  return (
    <Dialog onOpenChange={(open) => open && trackEvent("guide_modal_opened", { platform: activeTab })}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
          <HelpCircle className="size-3.5" />
          How to export? See guide
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Export Guide</DialogTitle>
          <DialogDescription className="text-sm">
            Select your platform to see step-by-step instructions.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex p-1 bg-muted/30 rounded-xl border border-border/60 w-fit">
          <button
            onClick={() => setActiveTab("chatgpt")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === "chatgpt" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MessageCircle className="size-3" /> ChatGPT
          </button>
          <button
            onClick={() => setActiveTab("gemini")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === "gemini" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Brain className="size-3" /> Gemini
          </button>
          <button
            onClick={() => setActiveTab("claude")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === "claude" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="size-3" /> Claude
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {GUIDES[activeTab].map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20">
                {step.num}
              </div>

              <div className="flex-1 space-y-2 text-left">
                <div className="flex items-center gap-2 text-primary">
                  <step.icon className="size-4" />
                  <h3 className="text-sm font-bold">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                  {step.body}
                </p>
                {step.mockup && activeTab === "chatgpt" && (
                  <div className="mt-4 rounded-xl border border-border/40 overflow-hidden shadow-sm opacity-80">
                    <ChatGptMockup />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-xs leading-relaxed text-primary/80 font-medium">
            <span className="font-bold uppercase tracking-wider">Privacy Note:</span> Parsing is 100% local. Your data never leaves your machine during this process.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
