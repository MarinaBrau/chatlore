import { Metadata } from "next";
import { TermsContent } from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Use — ChatLore",
  description: "Read the terms and conditions for using ChatLore Universal AI Hub.",
};

export default function TermsPage() {
  return <TermsContent />;
}
