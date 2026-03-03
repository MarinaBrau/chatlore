import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/10 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            The universal memory layer for your AI life. Sync context between ChatGPT, Gemini, and Claude securely.
          </p>
        </div>
        
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-foreground">Product</span>
            <Link href="/upload" className="text-muted-foreground hover:text-amber transition-colors">Sync Now</Link>
            <Link href="/guide" className="text-muted-foreground hover:text-amber transition-colors">Guide</Link>
            <Link href="/faq" className="text-muted-foreground hover:text-amber transition-colors">FAQ</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="font-bold text-foreground">Legal & Support</span>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link>
            <a href="mailto:hello@chatlore.app" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Contact us via email">Contact</a>
            <a href="https://github.com/MarinaBrau/chatlore" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="View source code on GitHub">GitHub</a>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-12 max-w-5xl border-t border-border/30 px-4 pt-8 text-center sm:text-left">
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} ChatLore. Open source and privacy-first.
        </p>
      </div>
    </footer>
  );
}
