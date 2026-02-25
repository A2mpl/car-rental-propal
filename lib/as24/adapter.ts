/**
 * AS24 response → internal domain model adapter.
 *
 * Keeps API coupling isolated: if AS24 changes its response shape, only this
 * file needs updating — the rest of the codebase stays untouched.
 */

import type {
  AS24Listing,
  AS24Response,
  BadgeType,
  BodyType,
  FuelType,
  TransmissionType,
} from '@/lib/autoscout24';
import type { AS24FuelCode, AS24BodyCode, AS24GearCode, AS24RawListing, AS24RawSearchResponse } from './types';

// ── Value translators ─────────────────────────────────────────────────────────

function adaptFuel(code: AS24FuelCode): FuelType {
  switch (code) {
    case 'E': return 'electric';
    case 'H': return 'hybrid';
    case 'D': return 'diesel';
    default:  return 'petrol';
  }
}

function adaptBody(code: AS24BodyCode): BodyType {
  switch (code) {
    case 'suv':        return 'suv';
    case 'coupe':      return 'sport';
    case 'cabriolet':  return 'convertible';
    default:           return 'sedan';
  }
}

function adaptTransmission(code: AS24GearCode): TransmissionType {
  return code === 'A' ? 'automatic' : 'manual';
}

/** kW → HP (1 kW ≈ 1.341 hp), rounded to nearest integer */
function kwToHp(kw: number): number {
  return Math.round(kw * 1.341);
}

/** Badge detection heuristic — mirrors AS24's own tagging logic */
function detectBadge(raw: AS24RawListing): BadgeType | undefined {
  if (raw.vehicle.fuel === 'E' || raw.isElectric) return 'electric';
  if (raw.isNew) return 'new';
  if (raw.isBestseller) return 'popular';
  return undefined;
}

// ── Main adapters ─────────────────────────────────────────────────────────────

export function adaptVehicle(raw: AS24RawListing): AS24Listing {
  const v = raw.vehicle;

  // Parse year from "YYYY-MM" or "YYYY"
  const year = v.firstRegistration
    ? Number.parseInt(v.firstRegistration.split('-')[0], 10)
    : new Date().getFullYear();

  // Convert power to HP
  const powerKw = v.power?.value ?? 0;
  const powerHp = v.power ? (v.power.unit === 'kW' ? kwToHp(powerKw) : powerKw) : 0;

  // Primary image (falls back to first available)
  const primaryImage = raw.images.find((img) => img.isPrimary) ?? raw.images[0];

  // Price — prefer retail, fall back to lease monthly rate
  const price =
    raw.prices.retailPriceGross?.amount ??
    raw.prices.leaseMonthlyRate?.amount ??
    0;

  // Location string
  const location = [raw.location?.city, raw.location?.country]
    .filter(Boolean)
    .join(', ');

  // Engine displacement label (e.g. "2.0L")
  const engine = v.engineCapacity
    ? `${(v.engineCapacity / 1000).toFixed(1)}L`
    : '—';

  return {
    id: raw.id,
    title: `${v.make} ${v.model}`,
    make: v.make,
    model: v.model,
    year,
    price,
    mileage: v.mileage?.value ?? 0,
    fuel: adaptFuel(v.fuel),
    transmission: adaptTransmission(v.transmission),
    body: adaptBody(v.bodyType),
    power: powerHp,
    image: primaryImage?.uri ?? '',
    location,
    url: raw.url ?? `https://www.autoscout24.com/listings/${raw.id}`,
    specs: {
      engine,
      seats: v.numberOfSeats ?? 5,
      doors: v.numberOfDoors ?? 4,
    },
    acceleration: v.acceleration != null ? `${v.acceleration} S` : undefined,
    range: v.electricRange != null ? `${v.electricRange} KM` : undefined,
    badge: detectBadge(raw),
  };
}

/**
 * Transform a raw AS24 search response into the internal `AS24Response` shape.
 *
 * @param raw      Direct JSON from `GET /v1/listings`
 * @param pageSize Page size used in the request (default 20)
 */
export function adaptSearchResponse(
  raw: AS24RawSearchResponse,
  pageSize = 20,
): AS24Response {
  const pages = Math.ceil(raw.totalResults / pageSize);
  // AS24 uses 0-based page index — convert back to 1-based
  const page = raw.page + 1;

  return {
    listings: raw.results.map(adaptVehicle),
    total: raw.totalResults,
    page,
    pageSize,
    pages,
    source: 'autoscout24',
  };
}
