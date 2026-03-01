"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-amber/10 font-mono text-xs font-bold text-amber">
            CL
          </span>
          <span className="text-sm font-medium tracking-tight">
            ChatLore
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {!isHome && (
            <Link
              href="/upload"
              className={cn(
                "rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
                pathname === "/upload" && "bg-accent text-foreground"
              )}
            >
              Upload
            </Link>
          )}
          {isHome && (
            <Link
              href="/upload"
              className="rounded-full bg-amber/10 px-4 py-1.5 text-sm font-medium text-amber transition-colors hover:bg-amber/15"
            >
              Get started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
