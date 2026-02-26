/**
 * Raw AutoScout24 Dealer API types.
 *
 * These mirror the exact shapes returned by the AS24 REST API — do NOT use
 * them in the UI layer. Use the internal `AS24Listing` / `AS24Response` types
 * from `@/lib/autoscout24` instead (adapter handles the translation).
 */

// ── OAuth 2.0 Client Credentials ──────────────────────────────────────────────

export interface AS24Token {
  access_token: string;
  /** Lifetime in seconds (typically 3600) */
  expires_in: number;
  token_type: 'Bearer';
}

// ── Shared primitives ─────────────────────────────────────────────────────────

export interface AS24Money {
  amount: number;
  currency: string; // 'EUR'
}

export interface AS24Power {
  value: number;
  unit: 'kW' | 'hp';
}

export interface AS24Mileage {
  value: number;
  unit: 'km' | 'mi';
}

export interface AS24RawImage {
  uri: string;
  isPrimary?: boolean;
  width?: number;
  height?: number;
}

// ── Fuel / body / gear codes ──────────────────────────────────────────────────

/** AS24 fuel type codes */
export type AS24FuelCode =
  | 'P' // Petrol / Gasoline
  | 'D' // Diesel
  | 'E' // Electric
  | 'H' // Hybrid (or Hydrogen — context-dependent)
  | 'L' // LPG
  | 'C' // CNG
  | 'X'; // Other

/** AS24 body type identifiers */
export type AS24BodyCode =
  | 'limousine' // Sedan / Berline
  | 'suv' // SUV / Crossover
  | 'coupe' // Coupé / Sport
  | 'cabriolet' // Convertible / Cabriolet
  | 'estate' // Estate / Break
  | 'minivan' // Monospace
  | 'van' // Utilitaire
  | 'pickup'; // Pick-up

/** AS24 transmission codes */
export type AS24GearCode = 'A' | 'M'; // Automatic | Manual

// ── Raw vehicle / listing ─────────────────────────────────────────────────────

export interface AS24RawVehicle {
  make: string;
  model: string;
  bodyType: AS24BodyCode;
  /** "YYYY-MM" or "YYYY" */
  firstRegistration: string;
  fuel: AS24FuelCode;
  transmission: AS24GearCode;
  power?: AS24Power;
  mileage?: AS24Mileage;
  numberOfSeats?: number;
  numberOfDoors?: number;
  /** Displacement in cm³ */
  engineCapacity?: number;
  co2EmissionsValue?: number;
  /** 0–100 km/h in seconds */
  acceleration?: number;
  /** Electric range in km */
  electricRange?: number;
}

export interface AS24RawListing {
  id: string;
  version?: number;
  status?: string;
  vehicle: AS24RawVehicle;
  prices: {
    retailPriceGross?: AS24Money;
    leaseMonthlyRate?: AS24Money;
  };
  images: AS24RawImage[];
  location?: {
    city?: string;
    zip?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Full AutoScout24 listing URL */
  url?: string;
  isNew?: boolean;
  isElectric?: boolean;
  isBestseller?: boolean;
}

// ── Search response ───────────────────────────────────────────────────────────

export interface AS24RawSearchResponse {
  /** Total number of results across all pages */
  totalResults: number;
  /** Number of results in this page */
  pageSize: number;
  /** 0-based page index */
  page: number;
  results: AS24RawListing[];
}
