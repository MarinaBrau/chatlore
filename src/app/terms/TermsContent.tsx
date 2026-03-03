"use client";

import { motion } from "framer-motion";

export function TermsContent() {
  const lastUpdated = "March 03, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-12 text-muted-foreground"
      >
        <header>
          <h1 className="mb-2 font-display text-5xl tracking-tight text-foreground">Terms of Use</h1>
          <p className="italic">Last updated: {lastUpdated}</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By using ChatLore, you agree to these Terms of Use. If you do not agree, please do not use the tool. We provide this utility "as is" to help users manage their own AI data.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">2. Use of Service</h2>
          <p className="leading-relaxed">
            ChatLore is a client-side utility for parsing and analyzing your exported AI conversation data. You are responsible for ensuring you have the right to use and process the data you upload. 
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">3. Intellectual Property</h2>
          <p className="leading-relaxed">
            The code for ChatLore is open-source. However, the ChatLore brand, logos, and UI design are the property of its creators. Your conversation data remains entirely yours; ChatLore never claims ownership over any uploaded content.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">4. Limitation of Liability</h2>
          <p className="leading-relaxed">
            Since ChatLore processes data locally and does not store your information, we cannot be held responsible for any data loss, API errors from third-party providers, or misuse of the generated context profiles.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">5. Modifications</h2>
          <p className="leading-relaxed">
            We may update these terms as the tool evolves. Continued use of ChatLore after changes constitutes acceptance of the new terms.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
