"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { OutputPreview } from "@/components/landing/OutputPreview";
import { SocialProof } from "@/components/landing/SocialProof";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustPillars } from "@/components/landing/TrustPillars";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { JsonLd } from "@/components/JsonLd";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ChatLore",
  url: "https://chatlore.app",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Universal AI Context Hub — Transfer your chat history, memory, and style between ChatGPT, Claude, and Gemini in seconds.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Import from ChatGPT, Gemini, or Claude",
    "Generate structured context for Any AI",
    "Export for Claude, ChatGPT, Gemini, and Cursor",
    "100% client-side parsing for privacy",
  ],
};

export default function Home() {
  return (
    <div className="grain flex flex-col">
      <JsonLd data={softwareSchema} />
      <HeroSection />
      <SocialProof />
      <HowItWorks />
      <OutputPreview />
      <TrustPillars />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
