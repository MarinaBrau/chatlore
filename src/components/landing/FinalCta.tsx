"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function FinalCta() {
  return (
    <section className="border-t border-border/40 px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-lg flex-col items-center text-center"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
          Your AI assistant should{" "}
          <span className="italic text-amber">already know how you work.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Stop starting from scratch. Sync your personality across ChatGPT, Claude, and Gemini in less than 5 minutes.
        </p>
        <Link
          href="/upload"
          onClick={() => trackEvent("cta_clicked", { location: "final_cta" })}
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 hover:bg-amber/90 hover:shadow-[0_0_32px_oklch(0.65_0.15_45/20%)]"
        >
          Sync My Personality Now
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-3 text-xs text-muted-foreground">
          100% free &middot; no sign-up &middot; takes under 5 minutes
        </p>
      </motion.div>
    </section>
  );
}
