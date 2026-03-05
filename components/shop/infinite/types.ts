import type { AS24Listing, ShopFilters } from '@/lib/autoscout24';

export interface InfiniteCarGridProps {
  initialListings: AS24Listing[];
  initialFilters: ShopFilters;
  initialHasMore: boolean;
  viewMode: 'grid' | 'list';
}
