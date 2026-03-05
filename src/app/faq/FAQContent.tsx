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
import { JsonLd } from "@/components/JsonLd";

const faqs = [
  {
    q: "Is ChatLore completely free?",
    a: "Yes, ChatLore is 100% free to use. We don't charge for context profile generation, and you don't even need to create an account to get started.",
  },
  {
    q: "Are my private conversations safe?",
    a: "Your privacy is our absolute priority. Your chat history file is parsed locally in your browser and never uploaded to our servers. Only the specific conversations you manually select for analysis are sent to the AI via stateless processing and are immediately discarded. We never store your data or use it for training.",
  },
  {
    q: "What is the 'Catch-up Prompt'?",
    a: "The Catch-up Prompt is a specialized export format designed to help you migrate ongoing projects between AI assistants. It generates a message that includes your profile and a request for the AI to continue exactly from where you left off, eliminating 'AI amnesia' in new chats.",
  },
  {
    q: "How does the item selection work?",
    a: "After analysis, you can toggle individual topics, preferences, technical context, and tone adjectives on or off. This gives you full control over your profile and ensures you stay within the strict character limits of platforms like ChatGPT (1,500 characters).",
  },
  {
    q: "Can it extract technical project states?",
    a: "Yes! ChatLore is designed to identify technical context, including architectural decisions, library versions, and pending TODOs. This makes it ideal for developers moving complex coding projects between IDEs like Cursor and web-based AIs.",
  },
  {
    q: "How long does the export process take?",
    a: "Platforms like ChatGPT, Claude, or Gemini (via Google Takeout) usually send the export email within 5 to 15 minutes. For very large accounts with years of history, it may take slightly longer.",
  },
  {
    q: "Does it work with Cursor or Windsurf?",
    a: "Absolutely. ChatLore can export specialized CLAUDE.md, .cursorrules, and .windsurfrules files, which are designed for AI-powered IDEs to understand your project context and coding style immediately.",
  },
  {
    q: "Can I use my profile with Perplexity?",
    a: "Yes! Use the 'Copy for Perplexity' option to get a concise persona prompt. You can paste this into Perplexity's 'System Prompt' (in Pro settings) or as the first message in a new thread to ensure results match your tone and preferences.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export function FAQContent() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
      <JsonLd data={faqSchema} />
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
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-6">
          Common <span className="italic text-primary">Questions</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about ChatLore, privacy, and syncing your technical project context.
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
