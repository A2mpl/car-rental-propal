import type { AS24Listing, ShopFilters } from '@/lib/autoscout24';

export interface PaginatedCarGridProps {
  listings: AS24Listing[];
  filters: ShopFilters;
  currentPage: number;
  totalPages: number;
  viewMode: 'grid' | 'list';
}
