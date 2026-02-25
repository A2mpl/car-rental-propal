/**
 * AS24 search parameter builder.
 *
 * Maps internal `ShopFilters` to the URLSearchParams expected by the
 * AutoScout24 Dealer REST API (`GET /v1/listings`).
 */

import type { BodyType, FuelType, ShopFilters, SortOption } from '@/lib/autoscout24';
import type { AS24BodyCode, AS24FuelCode, AS24GearCode } from './types';

// ── Value mappings ────────────────────────────────────────────────────────────

const FUEL_MAP: Record<FuelType, AS24FuelCode> = {
  petrol: 'P',
  diesel: 'D',
  electric: 'E',
  hybrid: 'H',
};

const BODY_MAP: Record<BodyType, AS24BodyCode> = {
  sedan: 'limousine',
  suv: 'suv',
  sport: 'coupe',
  supercar: 'coupe',
  convertible: 'cabriolet',
};

/**
 * AS24 sort values for the `sort` query param.
 * AS24 Dealer API accepts: relevance | price_ascending | price_descending |
 *   mileage_ascending | age_descending
 */
const SORT_MAP: Record<SortOption, string> = {
  recommended: 'relevance',
  price_asc: 'price_ascending',
  price_desc: 'price_descending',
  year_desc: 'age_descending',
  mileage_asc: 'mileage_ascending',
};

// ── Builder ───────────────────────────────────────────────────────────────────

/**
 * Convert `ShopFilters` to the `URLSearchParams` expected by AS24.
 *
 * @param filters  Internal filter state (from URL / UI)
 * @param page     1-based page number (converted to 0-based for AS24)
 * @param pageSize Results per page (default 20)
 */
export function buildAS24Params(
  filters: ShopFilters,
  page = 1,
  pageSize = 20,
): URLSearchParams {
  const p = new URLSearchParams();

  // Free-text search
  if (filters.search) p.set('q', filters.search);

  // Makes — AS24 accepts repeated `make` parameters
  for (const make of filters.makes) p.append('make', make);

  // Body types — deduplicate mapped codes (sport + supercar both → coupe)
  const as24Bodies = [...new Set(filters.bodies.map((b) => BODY_MAP[b]))];
  for (const body of as24Bodies) p.append('body', body);

  // Fuel types
  for (const fuel of filters.fuels) p.append('fuel', FUEL_MAP[fuel]);

  // Transmission
  if (filters.transmission !== 'all') {
    const gear: AS24GearCode = filters.transmission === 'automatic' ? 'A' : 'M';
    p.set('gear', gear);
  }

  // Price range (EUR)
  if (filters.priceFrom > 0) p.set('priceFrom', String(filters.priceFrom));
  if (filters.priceTo < 5000) p.set('priceTo', String(filters.priceTo));

  // Registration year range
  p.set('yearFrom', String(filters.yearFrom));
  p.set('yearTo', String(filters.yearTo));

  // Max mileage (km)
  if (filters.mileageTo !== null) p.set('mileageTo', String(filters.mileageTo));

  // Sort
  p.set('sort', SORT_MAP[filters.sort] ?? 'relevance');

  // Pagination — AS24 uses 0-based page index
  p.set('page', String(page - 1));
  p.set('pageSize', String(pageSize));

  return p;
}
