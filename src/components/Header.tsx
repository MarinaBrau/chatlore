"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {!isHome && (
            <>
              <Link
                href="/guide"
                className={cn(
                  "rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
                  pathname === "/guide" && "bg-accent text-foreground"
                )}
              >
                Guide
              </Link>
              <Link
                href="/faq"
                className={cn(
                  "rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
                  pathname === "/faq" && "bg-accent text-foreground"
                )}
              >
                FAQ
              </Link>
              <Link
                href="/upload"
                className={cn(
                  "rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
                  pathname === "/upload" && "bg-accent text-foreground"
                )}
              >
                Upload
              </Link>
            </>
          )}
          {isHome && (
            <>
              <Link
                href="/guide"
                className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                Guide
              </Link>
              <Link
                href="/faq"
                className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                FAQ
              </Link>
              <Link
                href="/upload"
                className="rounded-full bg-amber/10 px-4 py-1.5 text-sm font-medium text-amber transition-colors hover:bg-amber/15"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
