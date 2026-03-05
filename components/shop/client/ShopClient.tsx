'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FilterSidebar from '@/components/shop/filter/FilterSidebar';
import { filtersToParams } from '@/lib/autoscout24';
import styles from './shop.module.css';
import type {ShopClientProps, ScrollMode} from "@/components/shop/client/types";
import PaginatedCarGrid from "@/components/shop/paginated/PaginatedCarGrid";
import InfiniteCarGrid from "@/components/shop/infinite/InfiniteCarGrid";
import ShopControls from "@/components/shop/controls/ShopControls";

export default function ShopClient({
  initialListings,
  initialFilters,
  initialHasMore,
  total,
  filterKey,
  currentPage,
  totalPages,
}: ShopClientProps) {
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [scrollMode, setScrollMode] = useState<ScrollMode>('infinite');
  const [infiniteResetKey, setInfiniteResetKey] = useState(0);

  const handleScrollModeChange = (mode: ScrollMode) => {
    if (mode === scrollMode) return;
    setScrollMode(mode);

    if (mode === 'infinite') {
      setInfiniteResetKey((k) => k + 1);
      if (currentPage > 1) {
        const params = filtersToParams(initialFilters);
        router.push(`/shop?${params.toString()}`);
      }
    }
  };

  return (
    <div className={styles.pageWrap}>
      <FilterSidebar isMobileOpen={mobileFiltersOpen} onMobileClose={() => setMobileFiltersOpen(false)} />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <h1 className={styles.pageTitle}>Trouvez Votre Véhicule</h1>
            <p className={styles.pageSubtitle}>Parcourez notre flotte sélectionnée de véhicules de location premium</p>
          </div>
          <div className={styles.pageHeaderRight}>
            <span className={styles.sourceBadge}>Propulsé par AutoScout24</span>
          </div>
        </div>

        <ShopControls
          total={total}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onMobileFilterOpen={() => setMobileFiltersOpen(true)}
          scrollMode={scrollMode}
          onScrollModeChange={handleScrollModeChange}
        />

        {total === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🚗</div>
            <p className={styles.emptyTitle}>Aucun véhicule trouvé</p>
            <p className={styles.emptySubtitle}>Essayez d&apos;ajuster vos filtres</p>
            <button type="button" className={styles.emptyReset} onClick={() => router.push('/shop')}>
              Réinitialiser les filtres
            </button>
          </div>
          // biome-ignore lint/style/noNestedTernary: DEV
        ) : scrollMode === 'paginated' ? (
          <PaginatedCarGrid
            listings={initialListings}
            filters={initialFilters}
            currentPage={currentPage}
            totalPages={totalPages}
            viewMode={viewMode}
          />
        ) : (
          <InfiniteCarGrid
            key={`${filterKey}-${infiniteResetKey}`}
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
