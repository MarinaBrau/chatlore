const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;
const MAX_STORE_SIZE = 10_000; // prevent unbounded growth

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Simple in-memory rate limiter by key (typically IP).
 * Cleans expired entries to prevent memory leaks.
 * Note: in-memory — resets on serverless cold start. Acceptable for MVP.
 */
export function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
} {
  const now = Date.now();

  // Clean expired entries periodically (every check if store is large)
  if (store.size > MAX_STORE_SIZE) {
    for (const [k, v] of store) {
      if (now >= v.resetAt) store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetAt - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    retryAfterMs: 0,
  };
}
