'use client';

import { ChevronDown, ChevronsDown, LayoutGrid, List, ListOrdered, SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { SortOption } from '@/lib/autoscout24';
import { countActiveFilters, filtersToParams, parseSearchParams, SORT_OPTIONS } from '@/lib/autoscout24';
import type { ScrollMode } from './ShopClient';
import styles from './shop.module.css';

const BODY_LABELS: Record<string, string> = {
  sedan: 'Berline',
  suv: 'SUV',
  sport: 'Sport',
  supercar: 'Supercar',
  convertible: 'Cabriolet',
};

const FUEL_LABELS: Record<string, string> = {
  electric: 'Électrique',
  hybrid: 'Hybride',
  petrol: 'Essence',
  diesel: 'Diesel',
};

const TX_LABELS: Record<string, string> = {
  automatic: 'Automatique',
  manual: 'Manuelle',
};

interface Props {
  total: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (v: 'grid' | 'list') => void;
  onMobileFilterOpen: () => void;
  scrollMode: ScrollMode;
  onScrollModeChange: (mode: ScrollMode) => void;
}

export default function ShopControls({
  total,
  viewMode,
  onViewModeChange,
  onMobileFilterOpen,
  scrollMode,
  onScrollModeChange,
}: Props) {
  const router = useRouter();
  const rawParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [sortOpen, setSortOpen] = useState(false);

  const filters = parseSearchParams(rawParams);
  const activeFilterCount = countActiveFilters(filters);
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === filters.sort)?.label ?? 'Recommandé';

  const pushFilters = (partial: Partial<typeof filters>) => {
    const next = filtersToParams({ ...filters, ...partial });
    startTransition(() => {
      router.push(`/shop?${next.toString()}`);
      setSortOpen(false);
    });
  };

  const pills: { key: string; label: string; onRemove: () => void }[] = [
    ...filters.makes.map((m) => ({
      key: `make-${m}`,
      label: m,
      onRemove: () => pushFilters({ makes: filters.makes.filter((x) => x !== m) }),
    })),
    ...filters.bodies.map((b) => ({
      key: `body-${b}`,
      label: BODY_LABELS[b] ?? b,
      onRemove: () => pushFilters({ bodies: filters.bodies.filter((x) => x !== b) }),
    })),
    ...filters.fuels.map((f) => ({
      key: `fuel-${f}`,
      label: FUEL_LABELS[f] ?? f,
      onRemove: () => pushFilters({ fuels: filters.fuels.filter((x) => x !== f) }),
    })),
    ...(filters.transmission !== 'all'
      ? [
          {
            key: 'transmission',
            label: TX_LABELS[filters.transmission] ?? filters.transmission,
            onRemove: () => pushFilters({ transmission: 'all' }),
          },
        ]
      : []),
    ...(filters.priceFrom > 0 || filters.priceTo < 5000
      ? [
          {
            key: 'price',
            label: `€${filters.priceFrom}–€${filters.priceTo}/day`,
            onRemove: () => pushFilters({ priceFrom: 0, priceTo: 5000 }),
          },
        ]
      : []),
    ...(filters.mileageTo !== null
      ? [
          {
            key: 'mileage',
            label: `< ${(filters.mileageTo / 1000).toFixed(0)}k km`,
            onRemove: () => pushFilters({ mileageTo: null }),
          },
        ]
      : []),
  ];

  return (
    <>
      <div className={`${styles.sortBar} ${isPending ? styles.sortBarPending : ''}`}>
        <button type="button" className={styles.mobileFilterBtn} onClick={onMobileFilterOpen}>
          <SlidersHorizontal size={15} />
          <span>Filtres</span>
          {activeFilterCount > 0 && <span className={styles.filterCount}>{activeFilterCount}</span>}
        </button>

        <span className={styles.resultCount}>
          <strong>{total}</strong> véhicule{total !== 1 ? 's' : ''} trouvé{total !== 1 ? 's' : ''}
        </span>

        <div className={styles.sortBarRight}>
          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
              onClick={() => onViewModeChange('grid')}
              aria-label="Vue grille"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
              onClick={() => onViewModeChange('list')}
              aria-label="Vue liste"
            >
              <List size={15} />
            </button>
          </div>

          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.viewBtn} ${scrollMode === 'infinite' ? styles.viewBtnActive : ''}`}
              onClick={() => onScrollModeChange('infinite')}
              aria-label="Défilement infini"
              title="Défilement infini"
            >
              <ChevronsDown size={15} />
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${scrollMode === 'paginated' ? styles.viewBtnActive : ''}`}
              onClick={() => onScrollModeChange('paginated')}
              aria-label="Pagination"
              title="Pagination"
            >
              <ListOrdered size={15} />
            </button>
          </div>

          <div className={styles.sortDropdown}>
            <button type="button" className={styles.sortBtn} onClick={() => setSortOpen((o) => !o)}>
              <span>{currentSortLabel}</span>
              <ChevronDown
                size={13}
                style={{
                  transition: 'transform 0.2s ease',
                  transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            {sortOpen && (
              <div className={styles.sortMenu}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.sortOption} ${filters.sort === opt.value ? styles.sortOptionActive : ''}`}
                    onClick={() => pushFilters({ sort: opt.value as SortOption })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {pills.length > 0 && (
        <div className={styles.pillsRow}>
          {pills.map(({ key, label, onRemove }) => (
            <div key={key} className={styles.pill}>
              <span>{label}</span>
              <button
                type="button"
                onClick={onRemove}
                className={styles.pillRemove}
                aria-label={`Supprimer le filtre ${label}`}
              >
                <X size={11} />
              </button>
            </div>
          ))}
          {pills.length > 1 && (
            <button
              type="button"
              className={styles.clearAllPills}
              onClick={() => startTransition(() => router.push('/shop'))}
            >
              Tout effacer
            </button>
          )}
        </div>
      )}
    </>
  );
}
