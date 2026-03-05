import type { AS24Listing, ShopFilters } from '@/lib/autoscout24';

export interface ShopClientProps {
  initialListings: AS24Listing[];
  initialFilters: ShopFilters;
  initialHasMore: boolean;
  total: number;
  filterKey: string;
  currentPage: number;
  totalPages: number;
}

export type ScrollMode = 'infinite' | 'paginated';
