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
    q: "Do I need to pay for this?",
    a: "No, ChatLore is completely free to use. You don&apos;t even need to create an account.",
  },
  {
    q: "Are my private chats safe?",
    a: "Yes. Your data is processed locally in your browser. We never store your conversations or use them for training.",
  },
  {
    q: "How long does the export take?",
    a: "OpenAI usually sends the export email within 5-10 minutes, but it can take longer if you have years of history.",
  },
  {
    q: "Does it work with other AIs?",
    a: "While optimized for Claude, the context file is plain text and works great with ChatGPT Custom Instructions or Gemini too.",
  },
  {
    q: "How long does the analysis take?",
    a: "Usually under 30 seconds. The file reading is instant since it runs in your browser.",
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
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
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
