'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import CarCard from '@/components/shop/carcard/CarCard';
import { type AS24Listing, filtersToParams, type ShopFilters } from '@/lib/autoscout24';
import styles from './shop.module.css';

interface Props {
  listings: AS24Listing[];
  filters: ShopFilters;
  currentPage: number;
  totalPages: number;
  viewMode: 'grid' | 'list';
}

export default function PaginatedCarGrid({ listings, filters, currentPage, totalPages, viewMode }: Props) {
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

/**
 * Smart page range: always shows first + last page,
 * current page ±1, with ellipsis gaps in between.
 * E.g. for page 5 of 10: [1, …, 4, 5, 6, …, 10]
 */
function getPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range: (number | 'ellipsis')[] = [1];

  if (current > 3) range.push('ellipsis');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) range.push(i);

  if (current < total - 2) range.push('ellipsis');

  range.push(total);

  return range;
}
