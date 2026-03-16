"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("chatlore_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("chatlore_consent", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[100] w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-border/60 bg-card p-6 shadow-2xl backdrop-blur-xl"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Privacy & Transparency</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We use anonymous analytics to improve ChatLore. Your data processing is 100% local and private. By continuing, you agree to our{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={accept}
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              I understand
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
