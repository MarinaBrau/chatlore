export function Footer() {
  return (
    <footer className="border-t border-border/30 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
          ChatLore
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-amber"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@chatlore.app"
            className="transition-colors hover:text-amber"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
