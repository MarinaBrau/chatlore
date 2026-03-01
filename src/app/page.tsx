"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Shield, Zap, FileOutput } from "lucide-react";

/* ─── Transformation demo data ─── */
const rawLines = [
  '{ "title": "Debug React hooks",',
  '  "mapping": { "node-4a2f": {',
  '    "message": { "author": {',
  '      "role": "user" },',
  '    "content": { "parts": [',
  '      "Why does my useEffect',
  '      run twice in dev?" ]',
  "    }}}}",
];

const structuredLines = [
  "## Preferences",
  "",
  "- Prefers functional components",
  "- Uses TypeScript strict mode",
  "- Favors hooks over class components",
  "",
  "## Key Topics",
  "",
  "- React performance patterns",
  "- State management with Zustand",
];

/* ─── Animation variants ─── */
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
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const steps = [
  {
    num: "01",
    title: "Drop your export file",
    body: "Grab conversations.json from your ChatGPT data export. The file never leaves your browser — we parse it locally.",
  },
  {
    num: "02",
    title: "Pick the conversations that shaped you",
    body: "Browse every chat with titles, dates, and previews. Select the ones where you made decisions, set preferences, or solved hard problems.",
  },
  {
    num: "03",
    title: "AI reads between the lines",
    body: "Claude identifies what you care about — your coding style, tool preferences, communication patterns, recurring topics — across every selected conversation.",
  },
  {
    num: "04",
    title: "Paste into Claude and go",
    body: "Get a ready-to-use context file. Paste it into Claude Project instructions, download a CLAUDE.md for Claude Code, or copy as plain text.",
  },
];

const pillars = [
  {
    icon: Shield,
    title: "Your data stays on your machine",
    body: "The JSON file is parsed entirely in your browser. Only the conversations you select are sent for analysis — and nothing is stored on our servers.",
  },
  {
    icon: Zap,
    title: "Thousands of chats in seconds",
    body: "Years of ChatGPT history? No problem. The parser runs in a background thread so your browser stays responsive, even with 5,000+ conversations.",
  },
  {
    icon: FileOutput,
    title: "Works with every Claude surface",
    body: "Get output formatted for Claude.ai Projects, Claude Code (CLAUDE.md), or plain markdown you can use anywhere.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(30);
  const smoothX = useSpring(glowX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(glowY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      glowX.set(((e.clientX - rect.left) / rect.width) * 100);
      glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [glowX, glowY]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const unsub1 = smoothX.on("change", (v) =>
      el.style.setProperty("--glow-x", `${v}%`)
    );
    const unsub2 = smoothY.on("change", (v) =>
      el.style.setProperty("--glow-y", `${v}%`)
    );
    return () => {
      unsub1();
      unsub2();
    };
  }, [smoothX, smoothY]);

  return (
    <div className="grain flex flex-col">
      {/* ════════ HERO ════════ */}
      <section
        ref={heroRef}
        className="glow-amber relative flex flex-col items-center px-4 pb-28 pt-28 sm:pt-36"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeSlide}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-1.5 text-sm text-amber"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-amber" />
            </span>
            Analyze 3 conversations free — no sign-up
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeSlide}
            className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Switch to Claude
            <br />
            <span className="italic text-amber">
              without losing context
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fadeSlide}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            You taught ChatGPT your coding style, tool preferences, and how
            you think. Turn that into a context file Claude can use from
            conversation one.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeSlide} className="mt-10">
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-background transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.78_0.12_75/25%)]"
            >
              Build your context file
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── Transformation visual ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="mt-20 w-full max-w-3xl"
        >
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/50 shadow-2xl shadow-amber/5 backdrop-blur-sm">
            <div className="grid sm:grid-cols-2">
              {/* Raw side */}
              <div className="border-b border-border/40 p-5 sm:border-b-0 sm:border-r">
                <span className="mb-3 inline-block rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  conversations.json
                </span>
                <div className="mt-2 space-y-0.5 font-mono text-[13px] leading-relaxed text-muted-foreground/70">
                  {rawLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1.0 + i * 0.06,
                        duration: 0.4,
                        ease: "easeOut" as const,
                      }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Structured side */}
              <div className="p-5">
                <span className="mb-3 inline-block rounded-md bg-amber/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-amber">
                  structured output
                </span>
                <div className="mt-2 space-y-0.5 font-mono text-[13px] leading-relaxed">
                  {structuredLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1.3 + i * 0.06,
                        duration: 0.4,
                        ease: "easeOut" as const,
                      }}
                      className={
                        line.startsWith("##")
                          ? "font-semibold text-foreground"
                          : line.startsWith("-")
                            ? "text-amber/80"
                            : "h-3"
                      }
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="relative border-t border-border/40 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-amber"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center font-[family-name:var(--font-display)] text-3xl sm:text-4xl"
          >
            From raw export to ready-made context
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
                className="group relative rounded-xl border border-border/40 bg-card/30 p-6 transition-colors hover:border-amber/20 hover:bg-card/60"
              >
                <span className="font-mono text-3xl font-light tracking-tight text-amber/30 transition-colors group-hover:text-amber/50">
                  {step.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TRUST PILLARS ════════ */}
      <section className="border-t border-border/40 px-4 py-24">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
              }}
              className="flex flex-col gap-3"
            >
              <pillar.icon className="size-5 text-amber" />
              <h3 className="font-semibold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="border-t border-border/40 px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-lg flex-col items-center text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
            Claude already knows how to help.{" "}
            <span className="italic text-amber">Teach it who you are.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drop your ChatGPT export, pick the conversations that matter,
            and walk away with a context file. First 3 analyses are free.
          </p>
          <Link
            href="/upload"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-background transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.78_0.12_75/25%)]"
          >
            Build your context file
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
