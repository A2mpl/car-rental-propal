import type { ScrollMode } from '@/components/shop/client/types';

export interface ShopControlsProps {
  total: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (v: 'grid' | 'list') => void;
  onMobileFilterOpen: () => void;
  scrollMode: ScrollMode;
  onScrollModeChange: (mode: ScrollMode) => void;
}
