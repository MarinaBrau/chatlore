import { Metadata } from "next";
import { UploadContent } from "./UploadContent";

export const metadata: Metadata = {
  title: "Start Syncing — ChatLore Universal AI Hub",
  description: "Upload your AI history or paste a conversation to extract your tone, style, and project context instantly.",
};

export default function UploadPage() {
  return <UploadContent />;
}
