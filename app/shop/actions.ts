'use server';

import type { AS24Response, ShopFilters } from '@/lib/autoscout24';
import { fetchCars } from '@/lib/autoscout24';

/**
 * Load a specific page of cars matching the given filters.
 * Called by InfiniteCarGrid via useTransition to append more listings
 * without a full page navigation.
 */
export async function loadMoreCars(filters: ShopFilters, page: number): Promise<AS24Response> {
  return await fetchCars(filters, page);
}
