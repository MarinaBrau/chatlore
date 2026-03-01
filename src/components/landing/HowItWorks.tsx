"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Export your chat history",
    body: "Download your conversations from ChatGPT with a few clicks. We'll walk you through every step — your file never leaves your browser.",
  },
  {
    num: "02",
    title: "Pick the conversations that shaped you",
    body: "Browse every chat with titles, dates, and previews. Select the ones where you made decisions, set preferences, or solved hard problems.",
  },
  {
    num: "03",
    title: "AI reads between the lines",
    body: "Claude discovers what makes you unique — your interests, preferences, communication style, and recurring topics — across every conversation you selected.",
  },
  {
    num: "04",
    title: "Make Claude feel like home",
    body: "Get a ready-to-use file that teaches Claude who you are. Your next conversation will feel like picking up right where you left off.",
  },
];

export function HowItWorks() {
  return (
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
  );
}
