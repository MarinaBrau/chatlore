import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, FileJson, Check, Upload } from "lucide-react";

const FRAME_DURATION = 3000;
const TOTAL_FRAMES = 3;

const CONVERSATIONS = [
  { title: "Project: Marketing Plan", msgs: 15 },
  { title: "Personal Coding Style", msgs: 23 },
  { title: "Writing Tone Preferences", msgs: 8 },
  { title: "Study Notes: AI Ethics", msgs: 12 },
];

const CONTEXT_LINES = [
  "## Personality & Style",
  "- Professional but friendly tone",
  "- Direct and concise answers",
  "## Rules & Constraints",
  "- No corporate jargon",
  "- Prefer step-by-step code",
];

const STAGGER_ANIMATION = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const FADE_UP_ANIMATION = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(30);
  const smoothX = useSpring(glowX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(glowY, { stiffness: 40, damping: 20 });
  const [frame, setFrame] = useState(0);

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
    
    const unsub1 = smoothX.on("change", (v) => el.style.setProperty("--glow-x", `${v}%`));
    const unsub2 = smoothY.on("change", (v) => el.style.setProperty("--glow-y", `${v}%`));
    
    return () => {
      unsub1();
      unsub2();
    };
  }, [smoothX, smoothY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % TOTAL_FRAMES);
    }, FRAME_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="glow-amber relative flex flex-col items-center px-4 pb-16 pt-24 sm:pt-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-2 lg:order-1"
        >
          <div className="mb-6 flex items-center justify-center gap-2 lg:justify-start">
            {["Input", "Select", "Sync"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                    frame === i
                      ? "bg-amber/15 text-amber"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {label}
                </span>
                {i < 2 && <ArrowRight className="size-3 text-muted-foreground/20" />}
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 shadow-2xl shadow-amber/5 backdrop-blur-sm sm:p-10">
            <AnimatePresence mode="wait">
              {frame === 0 && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <div className="rounded-2xl border-2 border-dashed border-amber/30 bg-amber/5 px-16 py-12">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-3"
                    >
                      <Upload className="size-10 text-amber/60" />
                      <div className="flex items-center gap-2">
                        <FileJson className="size-4 text-amber" />
                        <span className="font-mono text-sm text-amber">AI Export File</span>
                      </div>
                    </motion.div>
                  </div>
                  <p className="font-medium text-muted-foreground text-center text-sm">
                    Import from ChatGPT, Gemini, or Claude
                  </p>
                </motion.div>
              )}

              {frame === 1 && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-2.5"
                >
                  {CONVERSATIONS.map((conv, i) => (
                    <motion.div
                      key={conv.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/50 px-4 py-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                        className="flex size-5 items-center justify-center rounded border border-amber bg-amber/10"
                      >
                        <Check className="size-3 text-amber" />
                      </motion.div>
                      <span className="flex-1 truncate text-sm font-medium">{conv.title}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {frame === 2 && (
                <motion.div
                  key="context"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <div className="overflow-hidden rounded-xl border border-border/40 bg-neutral-950">
                    <div className="border-b border-neutral-800 bg-neutral-900/50 px-4 py-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                        universal-ai-memory.md
                      </span>
                    </div>
                    <div className="px-5 py-4 font-mono text-[13px] leading-relaxed">
                      {CONTEXT_LINES.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className={line.startsWith("##") ? "mt-2 text-amber first:mt-0" : "text-neutral-400"}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-full bg-emerald-100/10">
                      <Check className="size-4 text-emerald-500" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          variants={STAGGER_ANIMATION}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center order-1 lg:order-2 lg:items-start lg:text-left"
        >
          <motion.h1
            variants={FADE_UP_ANIMATION}
            className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Stop repeating yourself
            <br />
            <span className="italic text-amber">to every new AI</span>
          </motion.h1>

          <motion.p
            variants={FADE_UP_ANIMATION}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Transfer your memory, style, and projects between ChatGPT, Claude, and Gemini in seconds. Your assistant changes, but your context stays.
          </motion.p>

          <motion.div variants={FADE_UP_ANIMATION} className="mt-10">
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.65_0.15_45/20%)]"
            >
              Sync My AI History
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.p
            variants={FADE_UP_ANIMATION}
            className="mt-6 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/40 lg:justify-start"
          >
            ChatGPT • Gemini • Claude • Cursor
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
