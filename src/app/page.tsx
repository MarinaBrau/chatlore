"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Shield, Eye, FileOutput } from "lucide-react";

/* ─── Transformation demo data ─── */
const chatItems = [
  { title: "Debug React hooks", msgs: 23 },
  { title: "Best database for my app", msgs: 45 },
  { title: "CSS Grid vs Flexbox", msgs: 12 },
  { title: "Deploy to Vercel", msgs: 8 },
  { title: "Auth flow best practices", msgs: 31 },
];

const contextLines = [
  { type: "heading", text: "Preferences" },
  { type: "item", text: "Prefers functional React components" },
  { type: "item", text: "Uses TypeScript strict mode" },
  { type: "item", text: "Favors PostgreSQL for relational data" },
  { type: "heading", text: "Communication" },
  { type: "item", text: "Likes concise, direct answers" },
  { type: "item", text: "Prefers examples over theory" },
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
    title: "Nothing stored. Ever.",
    body: "Your file is parsed in the browser. Selected conversations are analyzed via Claude\u2019s API and immediately discarded \u2014 no database, no logs, no trace.",
  },
  {
    icon: Eye,
    title: "You choose what\u2019s shared",
    body: "Browse thousands of conversations locally. Only the ones you explicitly select are sent for analysis. Full control, full transparency.",
  },
  {
    icon: FileOutput,
    title: "Works with every Claude surface",
    body: "Get output formatted for Claude.ai Projects, Claude Code (CLAUDE.md), or plain markdown you can paste anywhere.",
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
        className="glow-amber relative flex flex-col items-center px-4 pb-16 pt-28 sm:pt-36"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col items-center text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={fadeSlide}
            className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Make Claude feel like
            <br />
            <span className="italic text-amber">
              you&apos;ve used it for years
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fadeSlide}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Starting fresh with a new AI shouldn&apos;t mean losing everything
            you taught the last one.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeSlide} className="mt-10">
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.65_0.15_45/20%)]"
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
            <div className="grid sm:grid-cols-[1fr,auto,1fr]">
              {/* Chat history side */}
              <div className="p-5">
                <span className="mb-3 inline-block rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Your ChatGPT history
                </span>
                <div className="mt-3 space-y-2">
                  {chatItems.map((chat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1.0 + i * 0.07,
                        duration: 0.4,
                        ease: "easeOut" as const,
                      }}
                      className="flex items-center gap-2.5 rounded-lg border border-border/30 bg-background/50 px-3 py-2"
                    >
                      <span className="text-sm text-muted-foreground/50">💬</span>
                      <span className="flex-1 truncate text-[13px] text-muted-foreground">
                        {chat.title}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground/40">
                        {chat.msgs} msgs
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Arrow separator */}
              <div className="hidden items-center px-2 sm:flex">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                >
                  <ArrowRight className="size-5 text-amber/40" />
                </motion.div>
              </div>
              <div className="flex items-center justify-center border-t border-border/40 py-2 sm:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  className="rotate-90"
                >
                  <ArrowRight className="size-5 text-amber/40" />
                </motion.div>
              </div>

              {/* Context file side */}
              <div className="border-t border-border/40 p-5 sm:border-t-0 sm:border-l">
                <span className="mb-3 inline-block rounded-md bg-amber/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-amber">
                  Your context file
                </span>
                <div className="mt-3 space-y-1.5">
                  {contextLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1.5 + i * 0.07,
                        duration: 0.4,
                        ease: "easeOut" as const,
                      }}
                      className={
                        line.type === "heading"
                          ? "mt-1 text-[13px] font-semibold text-foreground first:mt-0"
                          : "flex items-start gap-2 text-[13px] text-amber/80"
                      }
                    >
                      {line.type === "item" && (
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-amber/40" />
                      )}
                      {line.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ SOCIAL PROOF ════════ */}
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-2xl items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "100%", label: "Client-side parsing" },
            { value: "0", label: "Data stored on servers" },
            { value: "Free", label: "Always" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
              {i > 0 && <div className="h-8 w-px bg-border/40" />}
              <div className="text-center">
                <p className="text-2xl font-semibold text-amber">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="relative px-4 py-20">
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
            className="mb-12 text-center font-[family-name:var(--font-display)] text-3xl sm:text-4xl"
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
            Your next Claude conversation could{" "}
            <span className="italic text-amber">already know your preferences.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Upload your ChatGPT export, pick the conversations that matter,
            and walk away with a ready-to-use context file.
          </p>
          <Link
            href="/upload"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.65_0.15_45/20%)]"
          >
            Start now &mdash; no sign-up needed
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
