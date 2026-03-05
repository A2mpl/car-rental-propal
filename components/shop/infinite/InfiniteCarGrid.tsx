'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import CarCard from '@/components/shop/carcard/CarCard';
import type { InfiniteCarGridProps } from '@/components/shop/infinite/types';
import _gridStyles from '@/components/shop/shared/grid.module.css';
import _skeletonStyles from '@/components/shop/shared/skeleton.module.css';
import { type AS24Listing, type AS24Response, filtersToParams } from '@/lib/autoscout24';
import _styles from './InfiniteCarGrid.module.css';

const styles = { ..._styles, ..._gridStyles, ..._skeletonStyles };

export default function InfiniteCarGrid({
  initialListings,
  initialFilters,
  initialHasMore,
  viewMode,
}: InfiniteCarGridProps) {
  const [listings, setListings] = useState<AS24Listing[]>(initialListings);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);

  /**
   * Load the next page via Server Action inside a transition so the UI
   * stays interactive (no blocking) and React marks the update as non-urgent.
   */
  const loadMore = useCallback(() => {
    if (!hasMore || isPending) return;

    startTransition(async () => {
      const nextPage = page + 1;
      const params = filtersToParams(initialFilters);
      params.set('page', String(nextPage));
      const res = await fetch(`/api/cars?${params.toString()}`);
      if (!res.ok) return;
      const data = (await res.json()) as AS24Response;
      setListings((prev) => [...prev, ...data.listings]);
      setPage(nextPage);
      setHasMore(nextPage < data.pages);
    });
  }, [hasMore, isPending, page, initialFilters]);

  /**
   * IntersectionObserver — fires loadMore when the invisible sentinel div
   * at the bottom of the list enters the viewport (rootMargin: 300px ahead).
   */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <>
      <div className={viewMode === 'grid' ? styles.grid : styles.listView}>
        {listings.map((car, index) => (
          <CarCard key={car.id} car={car} priority={index < 3} />
        ))}

        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`sk-${
                // biome-ignore lint/suspicious/noArrayIndexKey: dev
                i
              }`}
              className={styles.skeletonCard}
            >
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonLine} style={{ width: '35%' }} />
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} style={{ width: '60%' }} />
                <div className={styles.skeletonLine} style={{ width: '45%' }} />
              </div>
            </div>
          ))}
      </div>

      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      {!hasMore && listings.length > 0 && (
        <p className={styles.allLoaded}>Les {listings.length} véhicules ont été chargés</p>
      )}
    </>
  );
}
