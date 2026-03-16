"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Brain,
  Sparkles,
  MousePointer2,
  Zap,
} from "lucide-react";
import { FlowDemo } from "@/components/landing/FlowDemo";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const exportGuides = [
  {
    ai: "ChatGPT",
    icon: MessageCircle,
    steps: [
      "Click your profile picture (bottom-left) \u2192 Settings.",
      "Navigate to Data Controls \u2192 Export Data.",
      "Open the automated email from OpenAI and download the .zip archive.",
      "Extract and upload the conversations.json file to ChatLore."
    ]
  },
  {
    ai: "Google Gemini",
    icon: Brain,
    steps: [
      "Visit Google Takeout (takeout.google.com) and sign in.",
      "Deselect all products and check only Gemini.",
      "Initiate the export and download the generated .zip file.",
      "Locate the .json conversation file inside and drop it here."
    ]
  },
  {
    ai: "Claude (Anthropic)",
    icon: Sparkles,
    steps: [
      "Access your profile (bottom-left) \u2192 Settings.",
      "Go to the Account tab and click 'Export Data'.",
      "Anthropic will email you a secure download link for your history.",
      "Upload the provided .json file directly to ChatLore."
    ]
  }
];

export function GuideContent() {
  return (
    <div className="relative">
      <section className="px-4 pb-16 pt-24 sm:pt-32 text-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-3xl">
          <motion.p variants={fadeSlide} className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary font-bold">
            Universal Sync Guide
          </motion.p>
          <motion.h1 variants={fadeSlide} className="font-display text-4xl sm:text-5xl lg:text-6xl">
            How to sync your <span className="italic text-primary">AI History</span>
          </motion.h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Every AI platform has a unique data portability process. Follow our step-by-step instructions to export your memory and technical context.
          </p>
        </motion.div>
      </section>

      <section className="-mt-12 mb-8">
        <FlowDemo />
      </section>

      {/* ── Power User Tips ── */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex gap-4 shadow-sm shadow-primary/5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <MousePointer2 className="size-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Precision Item Selection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                After uploading, toggle individual topics or technical states on and off. This ensures your profile fits perfectly within ChatGPT&apos;s 1,500-character limit.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex gap-4 shadow-sm shadow-primary/5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <Zap className="size-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Advanced Catch-up Mode</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Migrating an active project? Use the <strong>Catch-up</strong> prompt to tell your new AI exactly where you left off, including architecture and pending tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
          {exportGuides.map((guide, i) => (
            <motion.div
              key={guide.ai}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border/40 bg-card/30 p-8 flex flex-col shadow-sm transition-all hover:border-primary/20 hover:bg-card/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <guide.icon className="size-5" />
                </div>
                <h2 className="text-xl font-bold">{guide.ai}</h2>
              </div>
              <ul className="space-y-4 flex-1">
                {guide.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed text-left">
                    <span className="font-mono text-primary font-bold">{idx + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Where to use your profile?</h2>
          <div className="grid gap-6 sm:grid-cols-2 text-left">
            <div className="rounded-2xl border border-border/40 p-6 bg-card/20 transition-all hover:bg-card/40">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Claude, Cursor & Windsurf
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Paste your results into <strong>Project Instructions</strong> or use <strong>CLAUDE.md</strong> and <strong>.windsurfrules</strong>. Ideal for developers moving complex technical context.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 p-6 bg-card/20 transition-all hover:bg-card/40">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <MessageCircle className="size-4 text-primary" /> ChatGPT, Gemini & Perplexity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Paste into <strong>Custom Instructions</strong> (ChatGPT), <strong>System Instructions</strong> (Gemini) or as a <strong>System Prompt</strong> in Perplexity to sync your persona.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Sync?</h2>
          <Link
            href="/upload"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-xl shadow-primary/20 active:scale-95"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
