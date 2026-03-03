import { Metadata } from "next";
import { ResultsContent } from "./ResultsContent";

export const metadata: Metadata = {
  title: "Your Universal AI Profile — ChatLore",
  description: "Review and export your personalized AI profile. Optimized for Claude, ChatGPT, and Gemini.",
};

export default function ResultsPage() {
  return <ResultsContent />;
}
