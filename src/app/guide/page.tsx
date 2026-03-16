import { Metadata } from "next";
import { GuideContent } from "./GuideContent";

export const metadata: Metadata = {
  title: "Guide: How to Export AI History — ChatLore",
  description: "Step-by-step instructions to export your conversation history from ChatGPT, Gemini, and Claude for universal AI syncing.",
};

export default function GuidePage() {
  return <GuideContent />;
}
