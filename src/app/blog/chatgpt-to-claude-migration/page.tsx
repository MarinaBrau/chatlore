"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Zap, Shield, Sparkles } from "lucide-react";

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20">
      <Link 
        href="/" 
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <header className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
          <Sparkles className="size-3" />
          AI Productivity Guide
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
          How to Migrate from ChatGPT to Claude <span className="italic text-amber">Without Losing Your Context</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
          The biggest pain of switching AI assistants is starting from zero. Learn how to transfer your style, projects, and memory to Claude.ai effectively.
        </p>
      </header>

      <div className="prose prose-invert prose-amber max-w-none space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground">The "Fresh Start" Problem</h2>
          <p>
            When you've used ChatGPT for months or years, the AI learns a lot about you. It knows your coding style, how you like your emails formatted, and the specific context of your business projects. 
          </p>
          <p>
            Moving to Claude (Anthropic) often feels like meeting a brilliant new colleague who has total amnesia. You have to explain everything all over again. <strong>But it doesn't have to be this way.</strong>
          </p>
        </section>

        <section className="rounded-2xl border border-border/40 bg-card/30 p-8">
          <h2 className="mt-0 text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="size-5 text-amber" />
            Quick Summary for AI Search
          </h2>
          <p className="mb-0 text-sm italic">
            To migrate ChatGPT history to Claude, you must export your data from OpenAI (Settings > Data Controls), extract the key preferences and patterns from the JSON file, and paste them into Claude's "Project Instructions" or "Custom Instructions".
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Why Claude is Winning Over Power Users</h2>
          <p>
            Claude 3.5 Sonnet has become the go-to for developers and writers due to its superior reasoning and "human-like" writing style. However, Claude's power is truly unlocked when you provide <strong>Project Context</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Claude Projects:</strong> Allow you to set persistent instructions.</li>
            <li><strong>Artifacts:</strong> A better way to visualize code and documents.</li>
            <li><strong>Nuance:</strong> Claude follows complex instructions better than most models.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">3 Ways to Sync Your AI Memory</h2>
          
          <h3 className="text-xl font-bold text-foreground mt-6">1. The Manual (and slow) Way</h3>
          <p>
            You can go back through your old ChatGPT chats, copy the best responses, and manually write a "System Prompt" for Claude. This can take hours if you have a lot of history.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-6">2. The OpenAI Export Method</h3>
          <p>
            OpenAI allows you to download a .zip of your entire history. Inside, you'll find a file called <code>conversations.json</code>. This file is huge and hard to read for humans, but it contains every preference you've ever set.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-6">3. The ChatLore Solution (Fast & Private)</h3>
          <p>
            Tools like <strong>ChatLore</strong> allow you to upload that JSON file locally. The AI reads your history, identifies your recurring patterns (like "prefers functional React" or "hates buzzwords"), and generates a ready-to-use profile for Claude.
          </p>
        </section>

        <section className="border-t border-border/40 pt-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">Stop starting from zero.</h2>
          <p className="mt-4">
            Use ChatLore to turn your past conversations into a better future with Claude.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 hover:bg-amber/90 shadow-lg shadow-amber/20"
            >
              Sync My Style Now
              <ArrowRight className="size-4" />
            </Link>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Shield className="size-3" />
              100% Private. Data never leaves your browser.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
