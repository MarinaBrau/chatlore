"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileText,
  Settings,
  Upload,
  Search,
  Copy,
  ClipboardCheck,
  Lightbulb,
  FolderOpen,
  MessageCircle,
  Brain,
  Sparkles,
} from "lucide-react";

/* ── animation variants ── */
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

/* ── Universal steps ── */
const steps = [
  {
    id: "export",
    num: "01",
    icon: Download,
    title: "Export your history",
    accent: true,
    substeps: [
      { icon: MessageCircle, text: "ChatGPT: Settings \u2192 Data controls \u2192 Export." },
      { icon: Brain, text: "Gemini: Go to Google Takeout \u2192 Select Gemini \u2192 Export." },
      { icon: Sparkles, text: "Claude: Settings \u2192 Account \u2192 Export Data." },
    ],
    tip: "You'll receive a .zip via email. Extract it and look for the .json file (e.g., conversations.json).",
  },
  {
    id: "upload",
    num: "02",
    icon: Upload,
    title: "Import your history",
    substeps: [
      { icon: Upload, text: "Drop your history file or paste a single chat manually." },
      { icon: FileText, text: "We process everything locally. Your private data never leaves your computer." },
    ],
    tip: "Pro Tip: Use 'Manual Paste' if you don't want to wait for the OpenAI email.",
  },
  {
    id: "select",
    num: "03",
    icon: Search,
    title: "Refine your profile",
    substeps: [
      { icon: Search, text: "We automatically extract your tone, preferences, and hidden rules." },
      { icon: ClipboardCheck, text: "Review and edit the results to make them 100% yours." },
    ],
    tip: "The more chats you select, the smarter your final AI assistant will be.",
  },
  {
    id: "use",
    num: "04",
    icon: Copy,
    title: "Power up your AI",
    accent: true,
    substeps: [
      { icon: Copy, text: "Choose your target: Claude, ChatGPT, or Gemini." },
      { icon: ClipboardCheck, text: "Copy your instructions and paste them once. That's it!" },
    ],
    tip: "Works instantly with Claude Projects, ChatGPT Custom Instructions, and Gemini Systems.",
  },
];

const targetAIs = [
  {
    title: "Claude.ai (Recommended)",
    description: "Best for complex reasoning and long-term projects.",
    where: "Project Settings \u2192 Instructions",
  },
  {
    title: "ChatGPT",
    description: "Best for quick daily tasks and simple automations.",
    where: "Customize ChatGPT \u2192 Custom Instructions",
  },
  {
    title: "Google Gemini",
    description: "Best for integration with Google Workspace.",
    where: "Gemini Manager \u2192 System Instructions",
  },
];

export default function GuidePage() {
  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="px-4 pb-16 pt-24 sm:pt-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeSlide}
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber"
          >
            Universal Sync Guide
          </motion.p>
          <motion.h1
            variants={fadeSlide}
            className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl"
          >
            Sync your AI Memory <span className="italic text-amber">between platforms</span>
          </motion.h1>
          <motion.p
            variants={fadeSlide}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Don&apos;t lose your style when switching assistants. Follow these steps to migrate between ChatGPT, Gemini, and Claude.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Steps ── */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {steps.map((step, i) => {
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border p-8 ${
                  step.accent ? "border-amber/30 bg-amber/5 shadow-sm shadow-amber/5" : "border-border/40 bg-card/30"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-amber/10 text-amber font-bold">
                    {step.num}
                  </div>
                  <h2 className="text-xl font-bold">{step.title}</h2>
                </div>
                <ul className="space-y-4">
                  {step.substeps.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <sub.icon className="mt-1 size-4 shrink-0 text-amber/60" />
                      <span className="text-sm">{sub.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-background/50 p-4 border border-border/20">
                  <Lightbulb className="mt-1 size-4 shrink-0 text-amber" />
                  <p className="text-xs italic leading-relaxed">{step.tip}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Target AI Section ── */}
      <section id="targets" className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-[family-name:var(--font-display)] text-3xl">
            Where to paste your results?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {targetAIs.map((target) => (
              <div key={target.title} className="rounded-2xl border border-border/40 p-6 bg-card/20 flex flex-col">
                <h3 className="text-lg font-bold mb-2">{target.title}</h3>
                <p className="text-xs text-muted-foreground mb-6 flex-1">{target.description}</p>
                <div className="mt-auto">
                  <div className="text-[10px] uppercase tracking-widest text-amber font-bold mb-2">Settings Path:</div>
                  <div className="text-xs font-mono bg-background p-2 rounded border border-border/20 break-words">
                    {target.where}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy Note ── */}
      <section id="privacy" className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/40 bg-muted/20 p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Your Privacy is our Priority</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ChatLore is a 100% client-side tool. This means your conversation files never leave your computer. 
            The analysis happens in your browser session and is forgotten as soon as you close the tab. 
            We do not have a database, and we do not store your personal information.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4 italic">Ready to Sync?</h2>
          <p className="text-muted-foreground mb-8">Take your AI personality with you, anywhere.</p>
          <Link
            href="/upload"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-10 py-4 text-sm font-bold text-white transition-all hover:bg-amber/90 shadow-xl shadow-amber/20"
          >
            Start Now
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
