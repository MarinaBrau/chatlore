"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are my conversations used to train AI models?",
    a: "No. Your file is parsed entirely in your browser — nothing is uploaded. Selected conversations are sent to Claude's API for analysis via stateless calls. Anthropic does not use API inputs for training. Zero retention, zero logs.",
  },
  {
    q: "Do I need a paid Claude plan?",
    a: "No. The context file works with any Claude plan — free or Pro. Just paste it into a conversation or Project Instructions. No API key needed on your end.",
  },
  {
    q: "Does it work with Cursor, Windsurf, or other editors?",
    a: "Yes. Download the CLAUDE.md file and place it in your project root. Any tool that reads CLAUDE.md (Claude Code, Cursor, Windsurf) will pick it up automatically.",
  },
  {
    q: "What data leaves my browser?",
    a: "Only the conversations you explicitly select. They're sent to Claude's API for analysis — stateless processing, no storage, no database. Your original export file is never uploaded anywhere.",
  },
  {
    q: "How long does the analysis take?",
    a: "Usually under 30 seconds for up to 10 conversations. The file parsing itself is instant since it runs in your browser via a Web Worker.",
  },
];

export function FaqSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber">
            Common questions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
