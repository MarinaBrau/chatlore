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
  FileDown,
  Lightbulb,
  FolderOpen,
  Terminal,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";

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

/* ── Simplified steps for non-tech users ── */
const steps = [
  {
    id: "export",
    num: "01",
    icon: Download,
    title: "Get your data from ChatGPT",
    accent: true,
    substeps: [
      { icon: Settings, text: "Open ChatGPT Settings \u2192 Data controls" },
      { icon: Download, text: "Click \u201cExport data\u201d. You'll get an email from OpenAI." },
      { icon: FolderOpen, text: "Open the .zip file you received and find 'conversations.json'." },
    ],
    tip: "OpenAI usually sends the email in 5-10 minutes. Don't forget to check your spam!",
  },
  {
    id: "upload",
    num: "02",
    icon: Upload,
    title: "Upload to ChatLore",
    substeps: [
      { icon: Upload, text: "Drag 'conversations.json' into the upload box." },
      { icon: FileText, text: "We read the file locally. Your private data never leaves your computer." },
    ],
    tip: "If your file is very large, it might take a few seconds to load. Just hang tight!",
  },
  {
    id: "select",
    num: "03",
    icon: Search,
    title: "Select your best chats",
    substeps: [
      { icon: Search, text: "Search for chats where you gave feedback or set rules." },
      { icon: ClipboardCheck, text: "Select at least 3-5 high-quality conversations for the best result." },
    ],
    tip: "The more specific the chats, the better Claude will understand your personal style.",
  },
  {
    id: "use",
    num: "04",
    icon: Copy,
    title: "Teach it to Claude",
    accent: true,
    substeps: [
      { icon: Copy, text: "Copy the generated text." },
      { icon: ClipboardCheck, text: "Go to Claude.ai \u2192 Project Settings \u2192 Paste into 'Instructions'." },
    ],
    tip: "Once pasted, Claude will remember these rules for every new chat in that project!",
  },
];

const useCases = [
  {
    title: "For Daily Use (Claude.ai)",
    description: "Best for writers, managers, and general tasks.",
    action: "Copy 'Project Instructions'",
    where: "Paste into Claude.ai Project Settings",
  },
  {
    title: "For Developers (Cursor/IDE)",
    description: "Best for coding with consistent style.",
    action: "Download 'CLAUDE.md'",
    where: "Place it in your project folder",
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
            Simple Guide
          </motion.p>
          <motion.h1
            variants={fadeSlide}
            className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl"
          >
            How to sync your <span className="italic text-amber">AI Memory</span>
          </motion.h1>
          <motion.p
            variants={fadeSlide}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Follow these 4 simple steps to make Claude understand your style and goals.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Steps ── */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border p-8 ${
                  step.accent ? "border-amber/30 bg-amber/5" : "border-border/40 bg-card/30"
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
                      <span>{sub.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-background/50 p-4 border border-border/20">
                  <Lightbulb className="mt-1 size-4 shrink-0 text-amber" />
                  <p className="text-sm italic">{step.tip}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Better Use Cases Section ── */}
      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-[family-name:var(--font-display)] text-3xl">
            Where to use your context?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div key={uc.title} className="rounded-2xl border border-border/40 p-8 bg-card/20">
                <h3 className="text-lg font-bold mb-2">{uc.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{uc.description}</p>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-widest text-amber font-bold">Action:</div>
                  <div className="text-sm font-mono bg-background p-2 rounded border border-border/20">
                    {uc.action}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-amber font-bold mt-4">Where:</div>
                  <div className="text-sm text-muted-foreground">
                    {uc.where}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to try it?</h2>
          <p className="text-muted-foreground mb-8">It takes less than 5 minutes to set up your AI memory.</p>
          <Link
            href="/upload"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-sm font-bold text-white transition-all hover:bg-amber/90"
          >
            Start Now
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
