/**
 * AutoScout24 Dealer API client — server-only.
 *
 * Handles:
 *  - OAuth 2.0 Client Credentials token acquisition & caching
 *  - Automatic token refresh on 401 (one retry)
 *  - Market/locale header injection
 *  - ISR-friendly fetch caching via `next: { revalidate }`
 *
 * Required env vars:
 *   AS24_CLIENT_ID      — OAuth client ID from AS24 developer portal
 *   AS24_CLIENT_SECRET  — OAuth client secret
 *
 * Optional:
 *   AS24_MARKET         — ISO 3166-1 alpha-2 market code (default: "FR")
 *   AS24_API_BASE       — Override API base URL (default: https://api.autoscout24.com)
 *   AS24_TOKEN_URL      — Override token endpoint
 */

import type { AS24Response, ShopFilters } from '@/lib/autoscout24';
import { adaptSearchResponse } from './adapter';
import { buildAS24Params } from './params';
import type { AS24RawSearchResponse, AS24Token } from './types';

const DEFAULT_API_BASE = 'https://api.autoscout24.com';
const DEFAULT_TOKEN_URL = 'https://accounts.autoscout24.com/connect/token';
const PAGE_SIZE = 20;

// ── Module-level token cache ──────────────────────────────────────────────────
// Survives across requests within a single server process (Node.js / Edge).
// Reduces round-trips to the token endpoint significantly.

let cachedToken: AS24Token | null = null;
/** Unix timestamp (ms) when the current token expires */
let tokenExpiresAt = 0;

// ── Token management ──────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  // Serve cached token with a 60-second safety buffer
  if (cachedToken && now < tokenExpiresAt - 60_000) {
    return cachedToken.access_token;
  }

  const clientId = process.env.AS24_CLIENT_ID;
  const clientSecret = process.env.AS24_CLIENT_SECRET;
  const tokenUrl = process.env.AS24_TOKEN_URL ?? DEFAULT_TOKEN_URL;

  if (!clientId || !clientSecret) {
    throw new Error('AS24_CLIENT_ID and AS24_CLIENT_SECRET must be set');
  }

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'listings:read',
    }),
    // Never cache the token request itself — we manage caching manually
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AS24 token request failed (${res.status}): ${body}`);
  }

  cachedToken = (await res.json()) as AS24Token;
  tokenExpiresAt = now + cachedToken.expires_in * 1_000;
  return cachedToken.access_token;
}

/** Invalidate the cached token (called automatically on 401) */
function invalidateToken() {
  cachedToken = null;
  tokenExpiresAt = 0;
}

// ── Authenticated fetch ───────────────────────────────────────────────────────

async function fetchWithAuth(url: string, retried = false): Promise<Response> {
  const token = await getAccessToken();
  const market = process.env.AS24_MARKET ?? 'FR';
  const apiBase = process.env.AS24_API_BASE ?? DEFAULT_API_BASE;

  // Prefix relative paths with the configured base URL
  const fullUrl = url.startsWith('http') ? url : `${apiBase}${url}`;

  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Market': market,
      Accept: 'application/json',
    },
    // ISR: revalidate cached API responses every 2 minutes
    next: { revalidate: 120 },
  });

  // Auto-refresh on 401 — retry once with a fresh token
  if (res.status === 401 && !retried) {
    invalidateToken();
    return fetchWithAuth(url, true);
  }

  return res;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Search vehicles on AutoScout24.
 *
 * @param filters  Internal `ShopFilters` (from URL params / sidebar)
 * @param page     1-based page number
 * @returns        Normalised `AS24Response` with internal listing shape
 * @throws         On network error or non-OK HTTP response
 */
export async function searchVehicles(filters: ShopFilters, page = 1): Promise<AS24Response> {
  const params = buildAS24Params(filters, page, PAGE_SIZE);
  const res = await fetchWithAuth(`/v1/listings?${params.toString()}`);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AS24 search failed (${res.status}): ${body}`);
  }

  const raw = (await res.json()) as AS24RawSearchResponse;
  return adaptSearchResponse(raw, PAGE_SIZE);
}
