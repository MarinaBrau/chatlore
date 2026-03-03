"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  const lastUpdated = "March 03, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="prose prose-slate prose-invert max-w-none dark:prose-invert"
      >
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-5xl">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12 italic">Last updated: {lastUpdated}</p>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">1. Privacy First Commitment</h2>
          <p className="text-muted-foreground leading-relaxed">
            ChatLore was built with privacy as its core principle. Unlike other tools, we do not store your chat history, your files, or your generated results on any server or database.
          </p>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">2. Data Processing (Local & API)</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-4">
            <li>
              <strong>Local Parsing:</strong> When you upload an AI export file (such as ChatGPT's <code>conversations.json</code>, Claude's <code>chat.json</code>, or a Gemini export), the parsing happens entirely within your browser using Web Workers. Your file is never uploaded to our servers.
            </li>
            <li>
              <strong>Stateless AI Analysis:</strong> Only the specific conversations you manually select are sent to our secure AI processing endpoint for analysis. This processing is <strong>stateless</strong>, meaning the data is used only for the immediate request and is not used to train models or stored by us.
            </li>
          </ul>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">3. Cookies & Analytics</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use minimal, privacy-focused analytics (Google Analytics) to understand general usage patterns. We do not track individual users, and we do not use marketing or advertising cookies.
          </p>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">4. GDPR & LGPD Compliance</h2>
          <p className="text-muted-foreground leading-relaxed">
            As a global utility, we respect European (GDPR), Brazilian (LGPD), and Californian (CCPA) privacy standards. Since we do not collect personal data or store your content, you inherently retain all rights to your information.
          </p>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">5. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about how your privacy is handled, please contact us at <a href="mailto:hello@chatlore.app" className="text-primary hover:underline">hello@chatlore.app</a>.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
