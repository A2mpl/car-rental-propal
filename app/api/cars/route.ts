import { NextRequest, NextResponse } from 'next/server';
import { filterAndSort, MOCK_CARS, parseSearchParams } from '@/lib/autoscout24';

/**
 * GET /api/cars
 *
 * Car listing endpoint — integration point for AutoScout24.
 *
 * Current behaviour: filters & paginates the local MOCK_CARS dataset.
 *
 * To connect a real AutoScout24 proxy:
 *  1. Deploy a scraping server (Node / Python) that fetches:
 *       https://www.autoscout24.com/lst?{params}
 *     and returns JSON matching the AS24Response shape.
 *  2. Set AUTOSCOUT24_PROXY_URL=https://your-proxy.com in .env.local
 *     (server-only env — NOT prefixed with NEXT_PUBLIC_).
 *  3. Uncomment the proxy block below.
 *
 * AutoScout24 search URL params reference:
 *   mmvmk0={make_id}  fuel={E|B|D|X}  body={1|5|9|8}
 *   gear={A|M}  pricefrom={n}  priceto={n}  fregfrom={yyyy}  fregto={yyyy}
 *   sort=standard|price  desc=0|1  size=20  page={n}
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const filters = parseSearchParams(sp);
  const page = Math.max(1, Number(sp.get('page') ?? 1));

  // ── Real AutoScout24 proxy (uncomment when proxy is ready) ─────────────────
  // const proxyUrl = process.env.AUTOSCOUT24_PROXY_URL;
  // if (proxyUrl) {
  //   const upstream = await fetch(`${proxyUrl}?${sp.toString()}`, {
  //     headers: { 'Accept': 'application/json' },
  //     next: { revalidate: 120 },
  //   });
  //   if (upstream.ok) {
  //     const data = await upstream.json();
  //     return NextResponse.json(data);
  //   }
  // }
  // ─────────────────────────────────────────────────────────────────────────

  const result = filterAndSort(MOCK_CARS, { ...filters, page });

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
