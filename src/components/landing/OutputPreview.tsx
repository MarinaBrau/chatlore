"use client";

import { motion } from "framer-motion";

const previewLines = [
  { type: "heading", text: "## Preferences" },
  { type: "item", text: "- Prefers functional React with TypeScript strict mode" },
  { type: "item", text: "- Favors PostgreSQL for relational data" },
  { type: "item", text: "- Uses Tailwind CSS over styled-components" },
  { type: "blank", text: "" },
  { type: "heading", text: "## Communication Style" },
  { type: "item", text: "- Likes concise, direct answers" },
  { type: "item", text: "- Prefers examples over theory" },
  { type: "item", text: "- Asks for trade-offs before choosing" },
  { type: "blank", text: "" },
  { type: "heading", text: "## Tech Stack" },
  { type: "item", text: "- Next.js, Tailwind, Vercel" },
  { type: "item", text: "- Claude API for AI features" },
  { type: "item", text: "- BigQuery for analytics pipelines" },
];

export function OutputPreview() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber">
            What you get
          </p>
          <h2 className="mb-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
            A context file that{" "}
            <span className="italic text-amber">speaks for you</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-muted-foreground">
            ChatLore turns your chat history into a structured profile that
            Claude reads before every conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="overflow-hidden rounded-xl border border-border/40 shadow-2xl shadow-amber/5"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-950 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-neutral-700" />
            <span className="size-2.5 rounded-full bg-neutral-700" />
            <span className="size-2.5 rounded-full bg-neutral-700" />
            <span className="ml-2 font-mono text-[11px] text-neutral-500">
              claude-context.md
            </span>
          </div>

          {/* Code content */}
          <div className="bg-neutral-950 px-5 py-4 font-mono text-[13px] leading-relaxed">
            {previewLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                className={
                  line.type === "heading"
                    ? "mt-1 text-amber"
                    : line.type === "blank"
                      ? "h-3"
                      : "text-neutral-400"
                }
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
