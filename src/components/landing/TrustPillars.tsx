"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, FileOutput } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Nothing stored. Ever.",
    body: "Your file is parsed entirely in your browser. Selected conversations go through stateless AI calls \u2014 zero data retention, no database, no logs.",
  },
  {
    icon: Eye,
    title: "You choose what\u2019s shared",
    body: "Browse thousands of conversations locally. Only the ones you explicitly select are sent for analysis. Full control, full transparency.",
  },
  {
    icon: FileOutput,
    title: "Works with every AI",
    body: "Whether you use Claude, ChatGPT, Gemini, or Cursor \u2014 we provide optimized formats for every platform, from web chats to code editors.",
  },
];

export function TrustPillars() {
  return (
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
            <pillar.icon className="size-5 text-primary" />
            <h3 className="font-semibold">{pillar.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
