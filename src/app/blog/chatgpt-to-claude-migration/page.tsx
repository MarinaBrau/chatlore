"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Zap, Shield, Sparkles, Brain, MessageCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Ultimate Guide to AI Context Migration — ChatGPT, Claude, and Gemini",
  description: "Learn how to transfer your AI memory, style, and project context between ChatGPT, Claude, and Gemini without starting from scratch.",
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20">
      <Link 
        href="/" 
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <header className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="size-3" />
          Universal AI Guide
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
          The Ultimate Guide to <span className="italic text-primary">AI Context Migration</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
          Switching AI assistants shouldn&apos;t mean starting from zero. Learn how to sync your memory between ChatGPT, Claude, and Gemini effectively.
        </p>
      </header>

      <div className="max-w-none space-y-10 text-muted-foreground leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">The &quot;AI Cold Start&quot; Problem</h2>
          <p>
            When you use an AI for months, it learns your unique rhythm. It knows your preferred coding libraries, your specific tone of voice, and the background of your ongoing projects. 
          </p>
          <p>
            Moving from <strong>ChatGPT to Claude</strong> or <strong>Gemini to ChatGPT</strong> often feels like meeting a brilliant new colleague who has total amnesia. <strong>But you don&apos;t have to explain yourself twice.</strong>
          </p>
        </section>

        <section className="rounded-2xl border border-border/40 bg-card/30 p-8">
          <h2 className="mt-0 text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            Quick Summary
          </h2>
          <p className="mb-0 text-sm italic">
            To migrate AI context, export your data (OpenAI Data Controls, Anthropic Account Settings, or Google Takeout), extract key patterns from the JSON files, and paste them into the target AI&apos;s system instructions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground text-left">Where to get your data</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-xl border border-border/40 bg-card/20">
              <MessageCircle className="size-5 mb-2 text-primary" />
              <h3 className="font-bold text-foreground text-sm">ChatGPT</h3>
              <p className="text-xs">Settings &gt; Data Controls &gt; Export Data.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/40 bg-card/20">
              <Sparkles className="size-5 mb-2 text-primary" />
              <h3 className="font-bold text-foreground text-sm">Claude</h3>
              <p className="text-xs">Settings &gt; Account &gt; Export Data.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/40 bg-card/20">
              <Brain className="size-5 mb-2 text-primary" />
              <h3 className="font-bold text-foreground text-sm">Gemini</h3>
              <p className="text-xs">Google Takeout &gt; Select Gemini only.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why Universal Syncing Matters</h2>
          <p>
            Each AI model has its strengths. You might prefer <strong>Claude 3.5 Sonnet</strong> for coding, <strong>ChatGPT-4o</strong> for web browsing, and <strong>Gemini 1.5 Pro</strong> for large-scale document analysis. 
          </p>
          <p>
            A universal context hub allows you to maintain a consistent &quot;AI Persona&quot; across all of them, ensuring that your coding style or writing preferences remain the same regardless of the underlying engine.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">The ChatLore Solution</h2>
          <p>
            Manually reading thousands of chats to extract your own preferences is impossible. <strong>ChatLore</strong> automates this by:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Local Parsing:</strong> Analyzing your JSON exports privately in your browser.</li>
            <li><strong>Pattern Recognition:</strong> Identifying how you structure code and communication.</li>
            <li><strong>Targeted Export:</strong> Formatting instructions specifically for Claude Projects, ChatGPT Custom Instructions, or Gemini System Prompts.</li>
          </ul>
        </section>

        <section className="border-t border-border/40 pt-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">Sync your AI life.</h2>
          <p className="mt-4">
            Use ChatLore to turn your past history into a better, more consistent AI experience.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Start Your Universal Sync
              <ArrowRight className="size-4" />
            </Link>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Shield className="size-3" />
              100% Private. No sign-up required.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
