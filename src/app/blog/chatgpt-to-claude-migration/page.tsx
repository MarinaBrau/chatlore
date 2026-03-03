import { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "The Ultimate Guide to AI Context Migration — ChatGPT, Claude, and Gemini",
  description: "Learn how to transfer your AI memory, style, and project context between ChatGPT, Claude, and Gemini without starting from scratch.",
};

export default function BlogPost() {
  return <BlogContent />;
}
