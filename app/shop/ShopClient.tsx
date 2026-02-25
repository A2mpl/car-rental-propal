'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ShopControls from './ShopControls';
import InfiniteCarGrid from './InfiniteCarGrid';
import type { AS24Listing, ShopFilters } from '@/lib/autoscout24';
import styles from './shop.module.css';

interface Props {
  initialListings: AS24Listing[];
  initialFilters: ShopFilters;
  initialHasMore: boolean;
  total: number;
  filterKey: string;
}

export default function ShopClient({
  initialListings,
  initialFilters,
  initialHasMore,
  total,
  filterKey,
}: Props) {
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className={styles.pageWrap}>
      <FilterSidebar
        isMobileOpen={mobileFiltersOpen}
        onMobileClose={() => setMobileFiltersOpen(false)}
      />

      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <h1 className={styles.pageTitle}>Trouvez Votre Véhicule</h1>
            <p className={styles.pageSubtitle}>
              Parcourez notre flotte sélectionnée de véhicules de location premium
            </p>
          </div>
          <div className={styles.pageHeaderRight}>
            <span className={styles.sourceBadge}>Propulsé par AutoScout24</span>
          </div>
        </div>

        {/* Sort / count bar */}
        <ShopControls
          total={total}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onMobileFilterOpen={() => setMobileFiltersOpen(true)}
        />

        {/* Results or empty state */}
        {total === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🚗</div>
            <p className={styles.emptyTitle}>Aucun véhicule trouvé</p>
            <p className={styles.emptySubtitle}>Essayez d&apos;ajuster vos filtres</p>
            <button
              type="button"
              className={styles.emptyReset}
              onClick={() => router.push('/shop')}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          // key forces remount (and state reset) whenever filters change
          <InfiniteCarGrid
            key={filterKey}
            initialListings={initialListings}
            initialFilters={initialFilters}
            initialHasMore={initialHasMore}
            viewMode={viewMode}
          />
        )}
      </main>
    </div>
  );
}
