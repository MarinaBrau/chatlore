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
  "description": "A secure web tool to migrate ChatGPT history to Claude.ai. Extracts user style, preferences, and knowledge to create structured context files and Project Instructions.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "ChatGPT JSON export parsing",
    "Manual chat paste sync",
    "Claude Project Instructions generation",
    "CLAUDE.md export for developers",
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
  title: "ChatLore — Universal AI Memory Sync",
  description:
    "Sync your style and preferences between ChatGPT, Claude, and Gemini. Generate structured profiles and system instructions in minutes. 100% private and free.",
  keywords: ["AI memory sync", "transfer ChatGPT to Claude", "Gemini context migration", "AI custom instructions", "sync AI profiles"],
  openGraph: {
    title: "ChatLore — Universal AI Memory Sync",
    description:
      "Don't start from zero. Transfer your AI memory between ChatGPT, Claude, and Gemini instantly.",
    url: "https://chatlore.app",
    siteName: "ChatLore",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatLore — Universal AI Memory Sync",
    description: "Sync your AI memory between ChatGPT, Claude, and Gemini instantly.",
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
