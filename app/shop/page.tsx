import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import { fetchCars, filtersToParams, parseSearchParams } from '@/lib/autoscout24';
import ShopClient from './ShopClient';

/**
 * Shop page — async Server Component.
 *
 * Reads filter/sort params from the URL (searchParams), fetches page 1 of
 * matching cars on the server, then streams the pre-rendered HTML to the
 * browser. Subsequent pages are loaded client-side via the `loadMoreCars`
 * Server Action triggered by an IntersectionObserver sentinel.
 *
 * Filter changes push new URL params → Next.js re-runs this component →
 * fresh server-rendered page 1 lands in the browser → ShopClient resets its
 * accumulated listings thanks to the stable `filterKey` being used as React key.
 */
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;
  const filters = parseSearchParams(params);
  const initialData = await fetchCars(filters, 1);

  // Normalised key — forces InfiniteCarGrid to remount when filters change,
  // resetting the accumulated listings state.
  const filterKey = filtersToParams(filters).toString();

  return (
    <>
      <Navbar />
      {/* Suspense satisfies the useSearchParams() requirement for children
          that read the URL on the client side. */}
      <Suspense>
        <ShopClient
          initialListings={initialData.listings}
          initialFilters={filters}
          initialHasMore={initialData.page < initialData.pages}
          total={initialData.total}
          filterKey={filterKey}
        />
      </Suspense>
    </>
  );
}
