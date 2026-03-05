import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteName } from '@/lib/site';
import { fetchCars, filtersToParams, parseSearchParams } from '@/lib/autoscout24';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Véhicules — BMW, Audi, Porsche, Moto & Électrique à Bordeaux',
  description:
    'Découvrez notre sélection de voitures sport, BMW, Audi, Porsche, Ferrari, Tesla électrique et motos à Bordeaux. Filtrez par marque, budget et type de véhicule.',
  keywords: [
    'voiture sport bordeaux',
    'BMW occasion bordeaux',
    'Audi sport bordeaux',
    'Porsche bordeaux',
    'Ferrari bordeaux',
    'Tesla occasion bordeaux',
    'moto sport bordeaux',
    'véhicule premium bordeaux',
    'voiture électrique bordeaux',
  ],
  openGraph: {
    title: `Véhicules — BMW, Audi, Porsche, Moto & Électrique | ${siteName} Bordeaux`,
    description: `Sélection de voitures sport, électriques et motos à Bordeaux. BMW, Audi, Porsche, Ferrari, Tesla — trouvez votre prochain véhicule avec ${siteName}.`,
  },
  alternates: {
    canonical: '/shop',
  },
};

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
export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[]>> }) {
  const params = await searchParams;
  const filters = parseSearchParams(params);

  const rawPage = params.page;
  const currentPage = Math.max(1, Number(Array.isArray(rawPage) ? rawPage[0] : (rawPage ?? '1')));

  const initialData = await fetchCars(filters, currentPage);
  const filterKey = filtersToParams(filters).toString();

  return (
    <Suspense>
      <ShopClient
        initialListings={initialData.listings}
        initialFilters={filters}
        initialHasMore={initialData.page < initialData.pages}
        total={initialData.total}
        filterKey={filterKey}
        currentPage={currentPage}
        totalPages={initialData.pages}
      />
    </Suspense>
  );
}
