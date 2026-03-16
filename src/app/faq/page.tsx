import { Metadata } from "next";
import { FAQContent } from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — ChatLore Universal AI Hub",
  description: "Common questions about syncing AI memory, privacy, and how ChatLore works with ChatGPT, Claude, and Gemini.",
};

export default function FAQPage() {
  return <FAQContent />;
}
