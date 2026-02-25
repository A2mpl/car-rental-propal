'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import CarCard from '@/components/shop/CarCard';
import { filtersToParams, type AS24Listing, type AS24Response, type ShopFilters } from '@/lib/autoscout24';
import styles from './shop.module.css';

interface Props {
  initialListings: AS24Listing[];
  initialFilters: ShopFilters;
  initialHasMore: boolean;
  viewMode: 'grid' | 'list';
}

export default function InfiniteCarGrid({
  initialListings,
  initialFilters,
  initialHasMore,
  viewMode,
}: Props) {
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
      // Route Handler — benefits from Cache-Control: s-maxage=60
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
      { rootMargin: '300px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <>
      {/* Car grid / list */}
      <div className={viewMode === 'grid' ? styles.grid : styles.listView}>
        {listings.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}

        {/* Skeleton placeholders shown while fetching next page — rendered
            inside the grid so they slot naturally into the layout */}
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={`sk-${i}`} className={styles.skeletonCard}>
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

      {/* Sentinel — invisible element; when it enters the viewport the
          IntersectionObserver calls loadMore() */}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      {/* End-of-list message */}
      {!hasMore && listings.length > 0 && (
        <p className={styles.allLoaded}>Les {listings.length} véhicules ont été chargés</p>
      )}
    </>
  );
}
