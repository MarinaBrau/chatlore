import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/CookieBanner";
import { ConversationsProvider } from "@/context/conversations";
import "./globals.css";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ChatLore",
  "operatingSystem": "Web",
  "applicationCategory": "UtilitiesApplication",
  "description": "Universal AI Context Hub — Transfer your chat history, memory, and style between ChatGPT, Claude, Gemini, Windsurf, and Perplexity.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "ChatGPT, Gemini, and Claude export parsing",
    "Generate structured profiles for Any AI",
    "Windsurf & Cursor IDE rule generation (.windsurfrules, .cursorrules)",
    "Perplexity & AI Search system prompt optimization",
    "100% private client-side processing"
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://chatlore.app/#organization",
      "name": "ChatLore",
      "url": "https://chatlore.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chatlore.app/logo.png"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://chatlore.app/#website",
      "url": "https://chatlore.app",
      "name": "ChatLore",
      "publisher": { "@id": "https://chatlore.app/#organization" }
    },
    softwareSchema
  ]
};

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
  title: "ChatLore — Universal AI Context Hub for ChatGPT, Claude, Gemini & Windsurf",
  description:
    "Transfer your AI memory, style, and projects between ChatGPT, Claude, Gemini, Windsurf, and Perplexity instantly. 100% private, free, and no sign-up required.",
  keywords: [
    "AI context hub",
    "sync AI memory",
    "transfer ChatGPT to Claude",
    "Windsurf rules generator",
    "Perplexity system prompt",
    "AI profile migration",
    "cursor rules generator",
    ".windsurfrules generator"
  ],
  openGraph: {
    title: "ChatLore — Universal AI Context Hub",
    description:
      "Don't start from scratch. Sync your style and memory across ChatGPT, Claude, Gemini, Windsurf, and Perplexity.",
    url: "https://chatlore.app",
    siteName: "ChatLore",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatLore — Universal AI Context Hub",
    description: "Sync your AI memory and style between ChatGPT, Claude, Gemini, Windsurf, and Perplexity instantly.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <GoogleAnalytics />
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
          <CookieBanner />
        </ConversationsProvider>
      </body>
    </html>
  );
}
