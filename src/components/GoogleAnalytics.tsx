"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA_ID } from "@/lib/analytics";

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check for consent on mount and every few seconds to catch the banner click
    const checkConsent = () => {
      const consent = localStorage.getItem("chatlore_consent");
      if (consent === "true") {
        setHasConsent(true);
      }
    };

    checkConsent();
    const interval = setInterval(checkConsent, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
