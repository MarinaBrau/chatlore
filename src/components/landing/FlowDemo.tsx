"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FileJson, Check, Upload, ArrowRight } from "lucide-react";

const FRAME_DURATION = 2500;
const TOTAL_FRAMES = 3;

const conversations = [
  { title: "Debug React hooks", msgs: 23 },
  { title: "Best database for my app", msgs: 45 },
  { title: "Auth flow best practices", msgs: 31 },
  { title: "CSS Grid vs Flexbox", msgs: 12 },
];

const contextLines = [
  "## Preferences",
  "- Functional React + TypeScript",
  "- PostgreSQL for relational data",
  "## Communication",
  "- Direct, concise answers",
];

export function FlowDemo() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % TOTAL_FRAMES);
    }, FRAME_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber">
            See it in action
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {["Upload", "Select", "Context"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                  frame === i
                    ? "bg-amber/15 text-amber"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < 2 && (
                <ArrowRight className="size-3 text-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>

        {/* Animation container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-8"
          style={{ minHeight: 220 }}
        >
          <AnimatePresence mode="wait">
            {/* Frame 1: Upload */}
            {frame === 0 && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="rounded-xl border-2 border-dashed border-amber/30 bg-amber/5 px-12 py-8">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Upload className="size-8 text-amber/60" />
                    <div className="flex items-center gap-2">
                      <FileJson className="size-4 text-amber" />
                      <span className="font-mono text-sm text-amber">
                        conversations.json
                      </span>
                    </div>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Drop your export file
                </p>
              </motion.div>
            )}

            {/* Frame 2: Select */}
            {frame === 1 && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-2"
              >
                {conversations.map((conv, i) => (
                  <motion.div
                    key={conv.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.3 }}
                    className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/50 px-4 py-2.5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 300 }}
                      className="flex size-5 items-center justify-center rounded border border-amber bg-amber/10"
                    >
                      <Check className="size-3 text-amber" />
                    </motion.div>
                    <span className="flex-1 text-sm">{conv.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {conv.msgs} msgs
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Frame 3: Context generated */}
            {frame === 2 && (
              <motion.div
                key="context"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <div className="overflow-hidden rounded-lg border border-border/40 bg-neutral-950">
                  <div className="border-b border-neutral-800 px-3 py-1.5">
                    <span className="font-mono text-[11px] text-neutral-500">
                      universal-ai-profile.md
                    </span>
                  </div>
                  <div className="px-4 py-3 font-mono text-xs leading-relaxed">
                    {contextLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className={
                          line.startsWith("##")
                            ? "mt-1 text-amber"
                            : "text-neutral-400"
                        }
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="size-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">
                    Context ready
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
