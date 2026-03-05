import { type NextRequest, NextResponse } from 'next/server';
import { filterAndSort, MOCK_CARS, parseSearchParams } from '@/lib/autoscout24';

/**
 * GET /api/cars
 *
 * Car listing endpoint — integration point for AutoScout24.
 *
 * Behaviour:
 *  1. If AS24_CLIENT_ID + AS24_CLIENT_SECRET are set → real AS24 Dealer API
 *  2. Falls back to local MOCK_CARS if the API errors or creds are absent
 *
 * To activate the real API:
 *  1. Get credentials from https://developer.autoscout24.com
 *  2. Set AS24_CLIENT_ID and AS24_CLIENT_SECRET in .env.local
 *  3. Optionally set AS24_MARKET (default "FR") and AS24_API_BASE
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const filters = parseSearchParams(sp);
  const page = Math.max(1, Number(sp.get('page') ?? 1));

  // ── Real AutoScout24 API (active when credentials are configured) ──────────
  const clientId = process.env.AS24_CLIENT_ID;
  const clientSecret = process.env.AS24_CLIENT_SECRET;

  if (clientId && clientSecret) {
    try {
      const { searchVehicles } = await import('@/lib/as24/client');
      const data = await searchVehicles(filters, page);
      return NextResponse.json(data, {
        headers: {
          // Longer cache: real data changes less frequently than mock
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
        },
      });
    } catch (err) {
      console.error('[GET /api/cars] AS24 API error, falling back to mock:', err);
    }
  }

  const result = filterAndSort(MOCK_CARS, { ...filters, page });

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
