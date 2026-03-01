const STORAGE_KEY = "chatlore-usage-count";
const FREE_LIMIT = 3;

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

export function getRemainingUses(): number {
  return Math.max(0, FREE_LIMIT - getUsageCount());
}

export function hasReachedLimit(): boolean {
  return getUsageCount() >= FREE_LIMIT;
}

export const FREE_LIMIT_COUNT = FREE_LIMIT;
