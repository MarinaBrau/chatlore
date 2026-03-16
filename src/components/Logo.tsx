"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Icon: Digital Amphora / Jar */}
      <div className="relative flex size-8 items-center justify-center">
        {/* Glow effect behind icon */}
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
        
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative size-7 text-primary transition-transform hover:scale-110"
        >
          {/* Amphora Body */}
          <path
            d="M12 22C16.4183 22 20 18.4183 20 14C20 11.5 18.5 9 17 7.5V4H7V7.5C5.5 9 4 11.5 4 14C4 18.4183 7.58172 22 12 22Z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Decorative lines / Data flow */}
          <path
            d="M9 13.5C9.5 14.5 10.5 15 12 15C13.5 15 14.5 14.5 15 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 4H16M10 2H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* AI Sparkle Inside */}
          <path
            d="M12 10V11M12 18V19M15.5 14.5H16.5M7.5 14.5H8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {!iconOnly && (
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Chat<span className="italic text-primary">Lore</span>
        </span>
      )}
    </div>
  );
}
