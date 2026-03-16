"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Client-side parsing" },
  { value: "0", label: "Data stored on servers" },
  { value: "Free", label: "Always" },
];

export function SocialProof() {
  return (
    <section className="px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-2xl items-center justify-center gap-8 sm:gap-12"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
            {i > 0 && <div className="h-8 w-px bg-border/40" />}
            <div className="text-center">
              <p className="text-2xl font-semibold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
