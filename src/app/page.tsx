"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { OutputPreview } from "@/components/landing/OutputPreview";
import { SocialProof } from "@/components/landing/SocialProof";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FlowDemo } from "@/components/landing/FlowDemo";
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
    "Transform your ChatGPT conversation history into structured context files for Claude. 100% free, no sign-up required.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Import ChatGPT conversation history",
    "Generate structured context for Claude",
    "Export as Project Instructions, CLAUDE.md, or plain text",
    "100% client-side parsing for privacy",
  ],
};

export default function Home() {
  return (
    <div className="grain flex flex-col">
      <JsonLd data={softwareSchema} />
      <HeroSection />
      <OutputPreview />
      <SocialProof />
      <HowItWorks />
      <FlowDemo />
      <TrustPillars />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
