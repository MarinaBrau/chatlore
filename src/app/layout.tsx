import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ConversationsProvider } from "@/context/conversations";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AI Chat History Migrator — Import your ChatGPT history to Claude",
  description:
    "Transform your ChatGPT conversation history into structured memories and system prompts ready to use with Claude.",
  openGraph: {
    title: "AI Chat History Migrator",
    description:
      "Import your ChatGPT history and generate structured memories for Claude.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ConversationsProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ConversationsProvider>
      </body>
    </html>
  );
}
