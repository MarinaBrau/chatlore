export const GA_ID = "G-MD6Q30TZPF";

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
