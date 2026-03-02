"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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

export function HeroSection() {
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

        <motion.p
          variants={fadeSlide}
          className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          Starting fresh with a new AI shouldn&apos;t mean losing everything
          you taught the last one.
        </motion.p>

        <motion.div variants={fadeSlide} className="mt-10">
          <Link
            href="/upload"
            onClick={() => trackEvent("cta_clicked", { location: "hero" })}
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.65_0.15_45/20%)]"
          >
            Build your context file
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="mt-20 w-full max-w-3xl"
      >
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card/50 shadow-2xl shadow-amber/5 backdrop-blur-sm">
          <div className="grid sm:grid-cols-[1fr,auto,1fr]">
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
  );
}
