"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Is ChatLore completely free?",
    a: "Yes, ChatLore is 100% free to use. We do not charge for the context file generation, and you don't even need to create an account to get started.",
  },
  {
    q: "Are my private conversations safe?",
    a: "Your privacy is our priority. Your chat history file is parsed locally in your browser. Only the specific conversations you select for analysis are sent to the AI (stateless processing) and are immediately discarded. We never store your data or use it for training.",
  },
  {
    q: "How long does the export take?",
    a: "Usually, platforms like ChatGPT or Claude send the export email within 5-15 minutes. However, if you have years of history, it might take a bit longer for them to bundle the file.",
  },
  {
    q: "Does ChatLore work with all AI models?",
    a: "Yes! While ChatLore provides optimized templates for Claude (Project Instructions, CLAUDE.md), the generated profiles are structured in markdown and work perfectly with ChatGPT Custom Instructions, Gemini System Instructions, and even local LLMs.",
  },
  {
    q: "Do I need a paid AI subscription?",
    a: "No. You can use ChatLore and its generated files with the free tiers of ChatGPT, Claude, and Gemini.",
  },
  {
    q: "Does it work with Cursor or Windsurf?",
    a: "Absolutely. ChatLore can export a CLAUDE.md file, which is specifically designed for Cursor, Windsurf, and other AI-powered coding tools to understand your project context immediately.",
  },
  {
    q: "What data leaves my browser?",
    a: "Only the text of the specific conversations you manually select. This data is sent via an encrypted connection to the Anthropic API for analysis and is not retained after the result is generated.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HelpCircle className="size-6" />
        </div>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary font-bold">
          Help Center
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl tracking-tight mb-6">
          Common <span className="italic text-primary">Questions</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about ChatLore, privacy, and how to sync your AI context.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto max-w-3xl"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/60 py-2">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* ── CTA ── */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 text-center border-t border-border/40 pt-16"
      >
        <h2 className="text-2xl font-bold mb-6">Didn't find what you were looking for?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/upload"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            Start Syncing
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="mailto:hello@chatlore.app"
            className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card px-8 py-3.5 text-sm font-bold transition-all hover:bg-accent"
          >
            Contact Support
          </a>
        </div>
      </motion.section>
    </div>
  );
}
