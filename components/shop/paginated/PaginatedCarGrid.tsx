'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import CarCard from '@/components/shop/carcard/CarCard';
import { getPageRange } from '@/components/shop/paginated/data';
import type { PaginatedCarGridProps } from '@/components/shop/paginated/types';
import _gridStyles from '@/components/shop/shared/grid.module.css';
import { filtersToParams } from '@/lib/autoscout24';
import _styles from './PaginatedCarGrid.module.css';

const styles = { ..._styles, ..._gridStyles };

export default function PaginatedCarGrid({
  listings,
  filters,
  currentPage,
  totalPages,
  viewMode,
}: PaginatedCarGridProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const params = filtersToParams(filters);
    if (page > 1) params.set('page', String(page));
    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  return (
    <>
      <div className={`${styles.gridOuter} ${isPending ? styles.gridPending : ''}`}>
        <div className={viewMode === 'grid' ? styles.grid : styles.listView}>
          {listings.map((car, index) => (
            <CarCard key={car.id} car={car} priority={index < 3} />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Navigation par pages">
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            aria-label="Page précédente"
          >
            <ChevronLeft size={15} />
          </button>

          {getPageRange(currentPage, totalPages).map((item, i) =>
            item === 'ellipsis' ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: DEV
              <span key={`e-${i}`} className={styles.pageEllipsis}>
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={`${styles.pageBtn} ${currentPage === item ? styles.pageBtnActive : ''}`}
                onClick={() => goToPage(item)}
                disabled={isPending}
                aria-label={`Page ${item}`}
                aria-current={currentPage === item ? 'page' : undefined}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages || isPending}
            aria-label="Page suivante"
          >
            <ChevronRight size={15} />
          </button>
        </nav>
      )}
    </>
  );
}
