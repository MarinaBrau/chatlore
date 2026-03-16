const STORAGE_KEY = "chatlore-usage-count";

export function getUsageCount(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return 0;
  const n = parseInt(stored, 10);
  return Number.isNaN(n) ? 0 : n;
}

export function incrementUsage(): number {
  const current = getUsageCount() + 1;
  localStorage.setItem(STORAGE_KEY, String(current));
  return current;
}
