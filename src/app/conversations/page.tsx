import { Metadata } from "next";
import { ConversationsContent } from "./ConversationsContent";

export const metadata: Metadata = {
  title: "Select Conversations — ChatLore",
  description: "Browse and select the conversations from your history that best represent your style or project.",
};

export default function ConversationsPage() {
  return <ConversationsContent />;
}
