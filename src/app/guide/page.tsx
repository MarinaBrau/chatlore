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
  BarChart3,
  Copy,
  ClipboardCheck,
  FileDown,
  Lightbulb,
  FolderOpen,
  Terminal,
  MessageSquare,
} from "lucide-react";

/* ── animation variants (same as landing) ── */
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

/* ── 4 condensed steps ── */
const steps = [
  {
    id: "export",
    num: "01",
    icon: Download,
    title: "Export from ChatGPT",
    accent: true,
    substeps: [
      { icon: Settings, text: "Open ChatGPT \u2192 Settings \u2192 Data controls" },
      { icon: Download, text: "Click \u201cExport data\u201d and confirm via email" },
      { icon: FolderOpen, text: "Download the .zip and extract it" },
      { icon: FileText, text: "Find conversations.json inside" },
    ],
    tip: "The export email usually arrives within a few minutes. Check your spam folder if you don\u2019t see it.",
  },
  {
    id: "upload-select",
    num: "02",
    icon: Upload,
    title: "Upload & select conversations",
    substeps: [
      { icon: Upload, text: "Drag & drop conversations.json onto the upload area" },
      { icon: FileText, text: "The file is parsed entirely in your browser \u2014 nothing leaves your machine" },
      { icon: Search, text: "Search by title or keyword to find specific chats" },
      { icon: BarChart3, text: "Sort by date or message count" },
      { icon: MessageSquare, text: "Select the conversations that reflect your preferences and decisions" },
    ],
    tip: "Focus on chats where you made decisions, stated preferences, or solved problems \u2014 these produce the richest context.",
  },
  {
    id: "review",
    num: "03",
    icon: BarChart3,
    title: "Review the analysis",
    substeps: [
      { icon: FileText, text: "Summary \u2014 a high-level overview of your selected conversations" },
      { icon: Search, text: "Topics \u2014 recurring subjects and themes Claude identified" },
      { icon: Lightbulb, text: "Preferences \u2014 your stated likes, dislikes, and opinions" },
      { icon: BarChart3, text: "Patterns \u2014 behavioral patterns across conversations" },
    ],
    tip: "Toggle between individual and combined views to see per-conversation details or the merged analysis.",
  },
  {
    id: "export-use",
    num: "04",
    icon: Terminal,
    title: "Export & use in Claude",
    accent: true,
    substeps: [
      { icon: Copy, text: "Plain Text \u2014 copy to clipboard for pasting anywhere" },
      { icon: ClipboardCheck, text: "Project Instructions \u2014 formatted for Claude.ai Projects" },
      { icon: FileDown, text: "CLAUDE.md \u2014 download a file for Claude Code" },
      { icon: ClipboardCheck, text: "Claude.ai \u2192 paste into \u201cProject instructions\u201d in any project\u2019s settings" },
      { icon: Terminal, text: "Claude Code \u2192 place the CLAUDE.md file in your repo root or ~/.claude/" },
    ],
    tip: "Project Instructions and CLAUDE.md persist across conversations, so Claude always knows your context.",
  },
];

/* ── export format comparison ── */
const formatRows = [
  {
    icon: Copy,
    name: "Plain Text",
    bestFor: "Quick, one-off conversations",
    persistence: "Per conversation",
    where: "Paste at the start of any chat",
  },
  {
    icon: ClipboardCheck,
    name: "Project Instructions",
    bestFor: "Claude.ai power users",
    persistence: "Per project",
    where: "Project settings \u2192 Instructions",
  },
  {
    icon: FileDown,
    name: "CLAUDE.md",
    bestFor: "Claude Code developers",
    persistence: "Per repo",
    where: "Repo root or ~/.claude/",
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
            Step-by-step guide
          </motion.p>
          <motion.h1
            variants={fadeSlide}
            className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl"
          >
            From ChatGPT export to Claude context
          </motion.h1>
          <motion.p
            variants={fadeSlide}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Four steps. Five minutes. A context file that makes Claude feel
            like it already knows you.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Steps with timeline ── */}
      <section className="px-4 py-20">
        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-[23px] top-6 bottom-6 hidden w-px bg-gradient-to-b from-amber/30 via-border/40 to-amber/30 sm:block" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isAccent = step.accent;
              return (
                <motion.div
                  key={step.num}
                  id={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                  className="relative sm:pl-14"
                >
                  {/* Timeline dot (desktop) */}
                  <div
                    className={`absolute left-[18px] top-7 hidden size-[11px] rounded-full border-2 sm:block ${
                      isAccent
                        ? "border-amber bg-amber/20"
                        : "border-border bg-background"
                    }`}
                  />

                  <div
                    className={`group scroll-mt-20 rounded-xl border p-6 transition-colors hover:bg-card/60 ${
                      isAccent
                        ? "border-amber/30 bg-card/40 hover:border-amber/40"
                        : "border-border/40 bg-card/30 hover:border-amber/20"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber/10 text-amber transition-colors group-hover:bg-amber/15">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="font-mono text-xs text-amber/40">
                          {step.num}
                        </p>
                        <h2 className="text-lg font-semibold">{step.title}</h2>
                      </div>
                    </div>

                    {/* Substeps */}
                    <ul className="mt-5 space-y-3 pl-14">
                      {step.substeps.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <li
                            key={sub.text}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <SubIcon className="mt-0.5 size-4 shrink-0 text-amber/40" />
                            <span>{sub.text}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Tip */}
                    {step.tip && (
                      <div className="mt-5 ml-14 rounded-md border-l-2 border-amber/30 bg-amber/5 py-2 pl-4 pr-3">
                        <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                          <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber/50" />
                          <span>{step.tip}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Which format should you use? ── */}
      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-amber"
          >
            Quick reference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-[family-name:var(--font-display)] text-3xl sm:text-4xl"
          >
            Which format should you use?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-xl border border-border/40"
          >
            {/* Table header */}
            <div className="hidden grid-cols-[1fr,1fr,auto,1fr] gap-px bg-border/20 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid">
              <div className="bg-card/50 px-4 py-3">Format</div>
              <div className="bg-card/50 px-4 py-3">Best for</div>
              <div className="bg-card/50 px-4 py-3">Persists</div>
              <div className="bg-card/50 px-4 py-3">Where to put it</div>
            </div>

            {/* Table rows */}
            {formatRows.map((row, i) => {
              const RowIcon = row.icon;
              return (
                <div
                  key={row.name}
                  className={`border-t border-border/20 ${i % 2 === 0 ? "bg-card/20" : "bg-card/30"}`}
                >
                  {/* Desktop row */}
                  <div className="hidden grid-cols-[1fr,1fr,auto,1fr] items-center gap-px sm:grid">
                    <div className="flex items-center gap-2.5 px-4 py-3.5">
                      <RowIcon className="size-4 text-amber/60" />
                      <span className="text-sm font-medium">{row.name}</span>
                    </div>
                    <div className="px-4 py-3.5 text-sm text-muted-foreground">
                      {row.bestFor}
                    </div>
                    <div className="px-4 py-3.5">
                      <span className="rounded-full bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber">
                        {row.persistence}
                      </span>
                    </div>
                    <div className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                      {row.where}
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="space-y-2 px-4 py-4 sm:hidden">
                    <div className="flex items-center gap-2.5">
                      <RowIcon className="size-4 text-amber/60" />
                      <span className="text-sm font-medium">{row.name}</span>
                      <span className="ml-auto rounded-full bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber">
                        {row.persistence}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {row.bestFor}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/60">
                      {row.where}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40 px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
            Ready to build your context file?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Upload your ChatGPT export and let Claude distill your preferences
            into a reusable context file.
          </p>
          <Link
            href="/upload"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.65_0.15_45/20%)]"
          >
            Start now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-3 text-xs text-muted-foreground/60">
            100% free, no sign-up required
          </p>
        </motion.div>
      </section>
    </div>
  );
}
