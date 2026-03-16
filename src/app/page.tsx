"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { OutputPreview } from "@/components/landing/OutputPreview";
import { SocialProof } from "@/components/landing/SocialProof";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustPillars } from "@/components/landing/TrustPillars";
import { FinalCta } from "@/components/landing/FinalCta";

export default function Home() {
  return (
    <div className="grain flex flex-col">
      <HeroSection />
      <SocialProof />
      <HowItWorks />
      <OutputPreview />
      <TrustPillars />
      <FinalCta />
    </div>
  );
}
