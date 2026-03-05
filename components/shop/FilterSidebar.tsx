'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import {
  BODIES,
  type BodyType,
  FUELS,
  type FuelType,
  filtersToParams,
  MAKES,
  MILEAGE_OPTIONS,
  parseSearchParams,
  type ShopFilters,
} from '@/lib/autoscout24';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function FilterSidebar({ isMobileOpen, onMobileClose }: FilterSidebarProps) {
  const router = useRouter();
  const rawParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Derive current filter state from URL — single source of truth
  const filters = parseSearchParams(rawParams);

  // ── Debounced local state for high-frequency inputs ────────────────────────
  // We keep local state so controlled inputs feel instant, and only push to
  // the URL after the user pauses (search: 350 ms, price: 500 ms).
  // Sync effects update local state whenever the URL changes externally
  // (pill removal, "reset all", etc.) and also cancel any pending timer so a
  // stale debounce doesn't re-apply a value the user just cleared.

  const [localSearch, setLocalSearch] = useState(filters.search);
  const [localPriceFrom, setLocalPriceFrom] = useState(filters.priceFrom);
  const [localPriceTo, setLocalPriceTo] = useState(filters.priceTo);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const priceTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    setLocalSearch(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (priceTimerRef.current) clearTimeout(priceTimerRef.current);
    setLocalPriceFrom(filters.priceFrom);
    setLocalPriceTo(filters.priceTo);
  }, [filters.priceFrom, filters.priceTo]);

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => push({ search: value }), 350);
  };

  const handlePriceFrom = (value: number) => {
    const v = Math.max(0, value);
    setLocalPriceFrom(v);
    if (priceTimerRef.current) clearTimeout(priceTimerRef.current);
    priceTimerRef.current = setTimeout(() => push({ priceFrom: v, priceTo: localPriceTo }), 500);
  };

  const handlePriceTo = (value: number) => {
    const v = Math.min(5000, value);
    setLocalPriceTo(v);
    if (priceTimerRef.current) clearTimeout(priceTimerRef.current);
    priceTimerRef.current = setTimeout(() => push({ priceFrom: localPriceFrom, priceTo: v }), 500);
  };
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * Push updated filters to URL via router.push inside a transition.
   * useTransition keeps the current UI interactive while Next.js streams
   * the new server-rendered page in the background.
   */
  const push = (partial: Partial<ShopFilters>) => {
    const params = filtersToParams({ ...filters, ...partial });
    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  const toggleMake = (make: string) => {
    const next = filters.makes.includes(make) ? filters.makes.filter((m) => m !== make) : [...filters.makes, make];
    push({ makes: next });
  };

  const toggleBody = (body: BodyType) => {
    const next = filters.bodies.includes(body) ? filters.bodies.filter((b) => b !== body) : [...filters.bodies, body];
    push({ bodies: next });
  };

  const toggleFuel = (fuel: FuelType) => {
    const next = filters.fuels.includes(fuel) ? filters.fuels.filter((f) => f !== fuel) : [...filters.fuels, fuel];
    push({ fuels: next });
  };

  const onReset = () =>
    startTransition(() => {
      router.push('/shop');
    });

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && <div className={styles.backdrop} onClick={onMobileClose} aria-hidden="true" />}

      <aside
        className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ''} ${
          isPending ? styles.sidebarPending : ''
        }`}
      >
        {/* Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarTitle}>
            <SlidersHorizontal size={16} />
            <span>Filtres</span>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.resetBtn} onClick={onReset}>
              Tout réinitialiser
            </button>
            <button type="button" className={styles.closeBtn} onClick={onMobileClose} aria-label="Fermer les filtres">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.filtersBody}>
          {/* Search */}
          <div className={styles.group}>
            <label className={styles.groupLabel} htmlFor="shop-search">
              Mot-clé
            </label>
            <input
              id="shop-search"
              type="text"
              className={styles.textInput}
              placeholder="ex. Tesla, Porsche…"
              value={localSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Make */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Marque</span>
            <div className={styles.checkList}>
              {MAKES.map((make) => (
                <label key={make} className={styles.checkItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={filters.makes.includes(make)}
                    onChange={() => toggleMake(make)}
                  />
                  <span className={styles.checkLabel}>{make}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category / Body */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Catégorie</span>
            <div className={styles.checkList}>
              {BODIES.map(({ value, label }) => (
                <label key={value} className={styles.checkItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={filters.bodies.includes(value)}
                    onChange={() => toggleBody(value)}
                  />
                  <span className={styles.checkLabel}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price per day */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Prix / jour</span>
            <div className={styles.rangeRow}>
              <div className={styles.rangeField}>
                <span className={styles.rangePrefix}>€</span>
                <input
                  type="number"
                  className={styles.rangeInput}
                  min={0}
                  max={filters.priceTo}
                  value={localPriceFrom}
                  onChange={(e) => handlePriceFrom(Number(e.target.value))}
                  aria-label="Prix minimum par jour (€)"
                />
              </div>
              <span className={styles.rangeSep}>—</span>
              <div className={styles.rangeField}>
                <span className={styles.rangePrefix}>€</span>
                <input
                  type="number"
                  className={styles.rangeInput}
                  min={filters.priceFrom}
                  max={5000}
                  value={localPriceTo}
                  onChange={(e) => handlePriceTo(Number(e.target.value))}
                  aria-label="Prix maximum par jour (€)"
                />
              </div>
            </div>
            <input
              type="range"
              className={styles.sliderSingle}
              min={0}
              max={5000}
              step={50}
              value={localPriceTo}
              onChange={(e) => handlePriceTo(Number(e.target.value))}
              aria-label="Prix maximum"
            />
          </div>

          {/* Year */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Année</span>
            <div className={styles.rangeRow}>
              <input
                type="number"
                className={`${styles.rangeInput} ${styles.yearInput}`}
                min={2010}
                max={filters.yearTo}
                value={filters.yearFrom}
                onChange={(e) => push({ yearFrom: Number(e.target.value) })}
                aria-label="Année de début"
              />
              <span className={styles.rangeSep}>—</span>
              <input
                type="number"
                className={`${styles.rangeInput} ${styles.yearInput}`}
                min={filters.yearFrom}
                max={2025}
                value={filters.yearTo}
                onChange={(e) => push({ yearTo: Number(e.target.value) })}
                aria-label="Année de fin"
              />
            </div>
          </div>

          {/* Fuel */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Carburant</span>
            <div className={styles.fuelGrid}>
              {FUELS.map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.fuelChip} ${filters.fuels.includes(value) ? styles.fuelChipActive : ''}`}
                  onClick={() => toggleFuel(value)}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Transmission</span>
            <div className={styles.radioGroup}>
              {(['all', 'automatic', 'manual'] as const).map((t) => (
                <label key={t} className={styles.radioItem}>
                  <input
                    type="radio"
                    className={styles.radio}
                    name="transmission"
                    value={t}
                    checked={filters.transmission === t}
                    onChange={() => push({ transmission: t })}
                  />
                  <span className={styles.radioLabel}>
                    {/** biome-ignore lint/style/noNestedTernary: Fix Biome */}
                    {t === 'all' ? 'Tous' : t === 'automatic' ? 'Automatique' : 'Manuelle'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Max mileage */}
          <div className={styles.group}>
            <label className={styles.groupLabel} htmlFor="mileage-select">
              Kilométrage max
            </label>
            <div className={styles.selectWrap}>
              <select
                id="mileage-select"
                className={styles.select}
                value={filters.mileageTo ?? ''}
                onChange={(e) =>
                  push({
                    mileageTo: e.target.value === '' ? null : Number(e.target.value),
                  })
                }
              >
                {MILEAGE_OPTIONS.map(({ value, label }) => (
                  <option key={label} value={value ?? ''}>
                    {label}
                  </option>
                ))}
              </select>
              <span className={styles.selectArrow}>▾</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.applyBtn} onClick={onMobileClose}>
            Voir les Résultats
          </button>
        </div>
      </aside>
    </>
  );
}
