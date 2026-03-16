import { Metadata } from "next";
import { PrivacyContent } from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — ChatLore",
  description: "Read about our commitment to privacy and how we process your AI history locally and securely.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
