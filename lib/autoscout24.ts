/**
 * AutoScout24 — Types, Mock Data & Client
 *
 * Architecture:
 *  - Static build (output: 'export') → client-side filtering of MOCK_CARS
 *  - With a server proxy → set NEXT_PUBLIC_CARS_API_URL in .env.local
 *    and the shop page will fetch real AutoScout24 listings from your backend.
 *
 * AutoScout24 Search URL reference (for your proxy server):
 *   https://www.autoscout24.com/lst?mmvmk0={make_id}&fuel={fuel_code}
 *   &body={body_code}&gear={gear_code}&pricefrom={min}&priceto={max}
 *   &fregfrom={year_from}&fregto={year_to}&sort=standard&size=20&page=1
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type FuelType = 'electric' | 'hybrid' | 'petrol' | 'diesel';
export type BodyType = 'sedan' | 'suv' | 'sport' | 'supercar' | 'convertible';
export type TransmissionType = 'automatic' | 'manual';
export type SortOption = 'recommended' | 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc';
export type BadgeType = 'new' | 'popular' | 'limited' | 'electric';

export interface AS24Listing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  /** Rental price per day in EUR */
  price: number;
  mileage: number;
  fuel: FuelType;
  transmission: TransmissionType;
  body: BodyType;
  /** Peak power in HP */
  power: number;
  image: string;
  /** Gallery — jusqu'à 4 photos. Si absent, la galerie affiche uniquement `image`. */
  images?: string[];
  location: string;
  /** Link to AutoScout24 listing */
  url: string;
  specs: {
    engine: string;
    seats: number;
    doors: number;
  };
  /** 0-60 time, e.g. "3.1 S" */
  acceleration?: string;
  /** Electric range, e.g. "358 MI" */
  range?: string;
  badge?: BadgeType;
}

export interface ShopFilters {
  search: string;
  makes: string[];
  bodies: BodyType[];
  fuels: FuelType[];
  transmission: TransmissionType | 'all';
  priceFrom: number;
  priceTo: number;
  yearFrom: number;
  yearTo: number;
  mileageTo: number | null;
  sort: SortOption;
  page: number;
}

export const DEFAULT_FILTERS: ShopFilters = {
  search: '',
  makes: [],
  bodies: [],
  fuels: [],
  transmission: 'all',
  priceFrom: 0,
  priceTo: 5000,
  yearFrom: 2018,
  yearTo: 2025,
  mileageTo: null,
  sort: 'recommended',
  page: 1,
};

export const PAGE_SIZE = 12;

export interface AS24Response {
  listings: AS24Listing[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  source: 'autoscout24' | 'mock';
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Data  — 18 premium cars
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Image helper — Unsplash CDN with consistent sizing
// ─────────────────────────────────────────────────────────────────────────────
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&auto=format&fit=crop&q=80`;

// ─────────────────────────────────────────────────────────────────────────────
// AutoScout24 listing URL helper
// ─────────────────────────────────────────────────────────────────────────────
const as24 = (makeId: number, makeSlug: string, modelSlug: string) =>
  `https://www.autoscout24.com/lst/${makeSlug}/${modelSlug}?mmvmk0=${makeId}&sort=standard&desc=0&size=20&page=1`;

export const MOCK_CARS: AS24Listing[] = [
  {
    id: 'tesla-model-3-2024',
    title: 'Tesla Model 3 Performance',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 149,
    mileage: 8200,
    fuel: 'electric',
    transmission: 'automatic',
    body: 'sedan',
    power: 670,
    image: u('1560958089-b8a1929cea89'),
    images: [
      u('1560958089-b8a1929cea89'),
      u('1561580125-028ee3bd62eb'),
      u('1617788138017-80ad40651399'),
      u('1629897048514-3dd7414fe72a'),
    ],
    location: 'Paris, France',
    url: as24(38, 'tesla', 'model-3'),
    specs: { engine: 'Dual Motor AWD', seats: 5, doors: 4 },
    acceleration: '3.1 S',
    range: '358 MI',
    badge: 'popular',
  },
  {
    id: 'mclaren-720s-2023',
    title: 'McLaren 720S Spider',
    make: 'McLaren',
    model: '720S',
    year: 2023,
    price: 890,
    mileage: 3400,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'convertible',
    power: 710,
    image: u('1544636331-e26879cd4d9b'),
    images: [
      u('1544636331-e26879cd4d9b'),
      u('1592198084033-aade902d1aae'),
      u('1503376780353-7e6692767b70'),
      u('1567818735868-e71b99932e29'),
    ],
    location: 'Monaco',
    url: as24(25, 'mclaren', '720s'),
    specs: { engine: '4.0L V8 Twin-Turbo', seats: 2, doors: 2 },
    acceleration: '2.9 S',
    badge: 'limited',
  },
  {
    id: 'porsche-911-gt3-2024',
    title: 'Porsche 911 GT3',
    make: 'Porsche',
    model: '911 GT3',
    year: 2024,
    price: 650,
    mileage: 1200,
    fuel: 'petrol',
    transmission: 'manual',
    body: 'sport',
    power: 510,
    image: u('1503376780353-7e6692767b70'),
    images: [
      u('1503376780353-7e6692767b70'),
      u('1592198084033-aade902d1aae'),
      u('1544636331-e26879cd4d9b'),
      u('1588258219511-64eb629cb833'),
    ],
    location: 'Stuttgart, Germany',
    url: as24(30, 'porsche', '911-gt3'),
    specs: { engine: '4.0L Flat-6', seats: 2, doors: 2 },
    acceleration: '3.4 S',
    badge: 'new',
  },
  {
    id: 'bmw-m5-2024',
    title: 'BMW M5 Competition',
    make: 'BMW',
    model: 'M5',
    year: 2024,
    price: 380,
    mileage: 5100,
    fuel: 'hybrid',
    transmission: 'automatic',
    body: 'sedan',
    power: 727,
    image: u('1555215695-3004980ad54e'),
    images: [
      u('1555215695-3004980ad54e'),
      u('1606664515524-ed2f786a0bd6'),
      u('1618843479313-40f8afb4b4d8'),
      u('1617788138017-80ad40651399'),
    ],
    location: 'Munich, Germany',
    url: as24(7, 'bmw', 'm5'),
    specs: { engine: '4.4L V8 + Electric', seats: 5, doors: 4 },
    acceleration: '3.5 S',
    badge: 'new',
  },
  {
    id: 'ferrari-roma-2023',
    title: 'Ferrari Roma',
    make: 'Ferrari',
    model: 'Roma',
    year: 2023,
    price: 780,
    mileage: 2800,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'sport',
    power: 620,
    image: u('1592198084033-aade902d1aae'),
    images: [
      u('1592198084033-aade902d1aae'),
      u('1503376780353-7e6692767b70'),
      u('1544636331-e26879cd4d9b'),
      u('1588258219511-64eb629cb833'),
    ],
    location: 'Rome, Italy',
    url: as24(12, 'ferrari', 'roma'),
    specs: { engine: '3.9L V8 Twin-Turbo', seats: 4, doors: 2 },
    acceleration: '3.4 S',
    badge: 'limited',
  },
  {
    id: 'mercedes-amg-gt63-2024',
    title: 'Mercedes-AMG GT 63 S',
    make: 'Mercedes',
    model: 'AMG GT 63 S',
    year: 2024,
    price: 450,
    mileage: 6700,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'sport',
    power: 630,
    image: u('1618843479313-40f8afb4b4d8'),
    images: [
      u('1618843479313-40f8afb4b4d8'),
      u('1555215695-3004980ad54e'),
      u('1606664515524-ed2f786a0bd6'),
      u('1614200187524-dc4b892acf16'),
    ],
    location: 'Berlin, Germany',
    url: as24(26, 'mercedes-benz', 'amg-gt-63-s'),
    specs: { engine: '4.0L V8 Biturbo', seats: 4, doors: 4 },
    acceleration: '3.2 S',
  },
  {
    id: 'lamborghini-urus-2023',
    title: 'Lamborghini Urus Performante',
    make: 'Lamborghini',
    model: 'Urus',
    year: 2023,
    price: 950,
    mileage: 4100,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'suv',
    power: 666,
    image: u('1580274455191-1c62238fa333'),
    images: [
      u('1580274455191-1c62238fa333'),
      u('1606016159991-dfe4f2746ad5'),
      u('1533473359331-0135ef1b58bf'),
      u('1555215695-3004980ad54e'),
    ],
    location: 'Milan, Italy',
    url: as24(22, 'lamborghini', 'urus'),
    specs: { engine: '4.0L V8 Twin-Turbo', seats: 5, doors: 5 },
    acceleration: '3.3 S',
    badge: 'limited',
  },
  {
    id: 'audi-e-tron-gt-2024',
    title: 'Audi RS e-tron GT',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 320,
    mileage: 7800,
    fuel: 'electric',
    transmission: 'automatic',
    body: 'sport',
    power: 646,
    image: u('1617788138017-80ad40651399'),
    images: [
      u('1617788138017-80ad40651399'),
      u('1561580125-028ee3bd62eb'),
      u('1614200187524-dc4b892acf16'),
      u('1629897048514-3dd7414fe72a'),
    ],
    location: 'Ingolstadt, Germany',
    url: as24(5, 'audi', 'rs-e-tron-gt'),
    specs: { engine: 'Dual Motor AWD', seats: 5, doors: 4 },
    acceleration: '3.3 S',
    range: '298 MI',
    badge: 'electric',
  },
  {
    id: 'tesla-model-s-2024',
    title: 'Tesla Model S Plaid',
    make: 'Tesla',
    model: 'Model S',
    year: 2024,
    price: 280,
    mileage: 4500,
    fuel: 'electric',
    transmission: 'automatic',
    body: 'sedan',
    power: 1020,
    image: u('1561580125-028ee3bd62eb'),
    images: [
      u('1561580125-028ee3bd62eb'),
      u('1617788138017-80ad40651399'),
      u('1614200187524-dc4b892acf16'),
      u('1560958089-b8a1929cea89'),
    ],
    location: 'Lyon, France',
    url: as24(38, 'tesla', 'model-s'),
    specs: { engine: 'Tri Motor AWD', seats: 5, doors: 4 },
    acceleration: '1.9 S',
    range: '405 MI',
    badge: 'popular',
  },
  {
    id: 'bentley-continental-gt-2023',
    title: 'Bentley Continental GT Speed',
    make: 'Bentley',
    model: 'Continental GT',
    year: 2023,
    price: 1100,
    mileage: 2200,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'convertible',
    power: 659,
    image: u('1563720223523-59d3b3e7d1e5'),
    images: [
      u('1563720223523-59d3b3e7d1e5'),
      u('1567818735868-e71b99932e29'),
      u('1592198084033-aade902d1aae'),
      u('1544636331-e26879cd4d9b'),
    ],
    location: 'London, UK',
    url: as24(6, 'bentley', 'continental-gt'),
    specs: { engine: '6.0L W12 Biturbo', seats: 4, doors: 2 },
    acceleration: '3.7 S',
    badge: 'limited',
  },
  {
    id: 'porsche-taycan-turbo-s-2024',
    title: 'Porsche Taycan Turbo S',
    make: 'Porsche',
    model: 'Taycan',
    year: 2024,
    price: 420,
    mileage: 9100,
    fuel: 'electric',
    transmission: 'automatic',
    body: 'sedan',
    power: 750,
    image: u('1614200187524-dc4b892acf16'),
    images: [
      u('1614200187524-dc4b892acf16'),
      u('1617788138017-80ad40651399'),
      u('1561580125-028ee3bd62eb'),
      u('1555215695-3004980ad54e'),
    ],
    location: 'Frankfurt, Germany',
    url: as24(30, 'porsche', 'taycan'),
    specs: { engine: 'Dual Motor AWD', seats: 5, doors: 4 },
    acceleration: '2.8 S',
    range: '280 MI',
    badge: 'electric',
  },
  {
    id: 'bmw-x5-m-2024',
    title: 'BMW X5 M Competition',
    make: 'BMW',
    model: 'X5 M',
    year: 2024,
    price: 340,
    mileage: 11200,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'suv',
    power: 617,
    image: u('1533473359331-0135ef1b58bf'),
    images: [
      u('1533473359331-0135ef1b58bf'),
      u('1606016159991-dfe4f2746ad5'),
      u('1580274455191-1c62238fa333'),
      u('1555215695-3004980ad54e'),
    ],
    location: 'Zürich, Switzerland',
    url: as24(7, 'bmw', 'x5-m'),
    specs: { engine: '4.4L V8 Biturbo', seats: 5, doors: 5 },
    acceleration: '3.8 S',
  },
  {
    id: 'mercedes-eqs-2023',
    title: 'Mercedes-Benz EQS 580',
    make: 'Mercedes',
    model: 'EQS 580',
    year: 2023,
    price: 310,
    mileage: 14300,
    fuel: 'electric',
    transmission: 'automatic',
    body: 'sedan',
    power: 516,
    image: u('1629897048514-3dd7414fe72a'),
    images: [
      u('1629897048514-3dd7414fe72a'),
      u('1561580125-028ee3bd62eb'),
      u('1617788138017-80ad40651399'),
      u('1614200187524-dc4b892acf16'),
    ],
    location: 'Brussels, Belgium',
    url: as24(26, 'mercedes-benz', 'eqs'),
    specs: { engine: 'Dual Motor AWD', seats: 5, doors: 4 },
    acceleration: '4.1 S',
    range: '340 MI',
    badge: 'electric',
  },
  {
    id: 'maserati-mc20-2023',
    title: 'Maserati MC20 Cielo',
    make: 'Maserati',
    model: 'MC20',
    year: 2023,
    price: 820,
    mileage: 1800,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'convertible',
    power: 630,
    image: u('1567818735868-e71b99932e29'),
    images: [
      u('1567818735868-e71b99932e29'),
      u('1592198084033-aade902d1aae'),
      u('1544636331-e26879cd4d9b'),
      u('1503376780353-7e6692767b70'),
    ],
    location: 'Modena, Italy',
    url: as24(24, 'maserati', 'mc20'),
    specs: { engine: '3.0L V6 Twin-Turbo', seats: 2, doors: 2 },
    acceleration: '2.9 S',
    badge: 'new',
  },
  {
    id: 'audi-rs6-avant-2024',
    title: 'Audi RS6 Avant Performance',
    make: 'Audi',
    model: 'RS6 Avant',
    year: 2024,
    price: 285,
    mileage: 6400,
    fuel: 'hybrid',
    transmission: 'automatic',
    body: 'sedan',
    power: 630,
    image: u('1606664515524-ed2f786a0bd6'),
    images: [
      u('1606664515524-ed2f786a0bd6'),
      u('1555215695-3004980ad54e'),
      u('1618843479313-40f8afb4b4d8'),
      u('1617788138017-80ad40651399'),
    ],
    location: 'Amsterdam, Netherlands',
    url: as24(5, 'audi', 'rs6-avant'),
    specs: { engine: '4.0L V8 TFSI Mild-Hybrid', seats: 5, doors: 5 },
    acceleration: '3.4 S',
  },
  {
    id: 'lamborghini-huracan-evo-2023',
    title: 'Lamborghini Huracán EVO Spyder',
    make: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2023,
    price: 1250,
    mileage: 2100,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'convertible',
    power: 640,
    image: u('1519245659620-e859806a8d3b'),
    images: [
      u('1519245659620-e859806a8d3b'),
      u('1592198084033-aade902d1aae'),
      u('1544636331-e26879cd4d9b'),
      u('1567818735868-e71b99932e29'),
    ],
    location: 'Barcelona, Spain',
    url: as24(22, 'lamborghini', 'huracan'),
    specs: { engine: '5.2L V10 NA', seats: 2, doors: 2 },
    acceleration: '3.1 S',
    badge: 'limited',
  },
  {
    id: 'range-rover-sport-2024',
    title: 'Range Rover Sport P530',
    make: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2024,
    price: 290,
    mileage: 9800,
    fuel: 'petrol',
    transmission: 'automatic',
    body: 'suv',
    power: 530,
    image: u('1606016159991-dfe4f2746ad5'),
    images: [
      u('1606016159991-dfe4f2746ad5'),
      u('1533473359331-0135ef1b58bf'),
      u('1580274455191-1c62238fa333'),
      u('1555215695-3004980ad54e'),
    ],
    location: 'London, UK',
    url: as24(21, 'land-rover', 'range-rover-sport'),
    specs: { engine: '4.4L V8', seats: 5, doors: 5 },
    acceleration: '4.3 S',
    badge: 'popular',
  },
  {
    id: 'ferrari-sf90-stradale-2023',
    title: 'Ferrari SF90 Stradale',
    make: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2023,
    price: 1580,
    mileage: 1400,
    fuel: 'hybrid',
    transmission: 'automatic',
    body: 'supercar',
    power: 986,
    image: u('1588258219511-64eb629cb833'),
    images: [
      u('1588258219511-64eb629cb833'),
      u('1592198084033-aade902d1aae'),
      u('1544636331-e26879cd4d9b'),
      u('1503376780353-7e6692767b70'),
    ],
    location: 'Maranello, Italy',
    url: as24(12, 'ferrari', 'sf90-stradale'),
    specs: { engine: '4.0L V8 + 3 Electric Motors', seats: 2, doors: 2 },
    acceleration: '2.5 S',
    badge: 'limited',
  },
];

export function getCarById(id: string): AS24Listing | undefined {
  return MOCK_CARS.find((car) => car.id === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter & Sort Logic (client-side)
// ─────────────────────────────────────────────────────────────────────────────

export function filterAndSort(cars: AS24Listing[], filters: ShopFilters): AS24Response {
  let results = [...cars];

  // Keyword search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (c) => c.title.toLowerCase().includes(q) || c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q)
    );
  }

  // Make filter
  if (filters.makes.length > 0) {
    results = results.filter((c) => filters.makes.includes(c.make));
  }

  // Body type
  if (filters.bodies.length > 0) {
    results = results.filter((c) => filters.bodies.includes(c.body));
  }

  // Fuel type
  if (filters.fuels.length > 0) {
    results = results.filter((c) => filters.fuels.includes(c.fuel));
  }

  // Transmission
  if (filters.transmission !== 'all') {
    results = results.filter((c) => c.transmission === filters.transmission);
  }

  // Price range
  results = results.filter((c) => c.price >= filters.priceFrom && c.price <= filters.priceTo);

  // Year range
  results = results.filter((c) => c.year >= filters.yearFrom && c.year <= filters.yearTo);

  // Max mileage
  if (filters.mileageTo !== null) {
    results = results.filter((c) => c.mileage <= (filters.mileageTo as number));
  }

  // Sort
  switch (filters.sort) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'year_desc':
      results.sort((a, b) => b.year - a.year);
      break;
    case 'mileage_asc':
      results.sort((a, b) => a.mileage - b.mileage);
      break;
    default:
      results.sort((a, b) => {
        // biome-ignore lint/style/noNestedTernary: DEV
        const score = (c: AS24Listing) => (c.badge === 'limited' ? 2 : c.badge ? 1 : 0);
        return score(b) - score(a);
      });
  }

  const total = results.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = (filters.page - 1) * PAGE_SIZE;
  const listings = results.slice(start, start + PAGE_SIZE);

  return { listings, total, page: filters.page, pageSize: PAGE_SIZE, pages, source: 'mock' };
}

// ─────────────────────────────────────────────────────────────────────────────
// Static reference lists
// ─────────────────────────────────────────────────────────────────────────────

export const MAKES = [
  'Audi',
  'Bentley',
  'BMW',
  'Ferrari',
  'Lamborghini',
  'Land Rover',
  'Maserati',
  'McLaren',
  'Mercedes',
  'Porsche',
  'Tesla',
];

export const BODIES: { value: BodyType; label: string }[] = [
  { value: 'sedan', label: 'Berline' },
  { value: 'suv', label: 'SUV' },
  { value: 'sport', label: 'Coupé Sport' },
  { value: 'supercar', label: 'Supercar' },
  { value: 'convertible', label: 'Cabriolet' },
];

export const FUELS: { value: FuelType; label: string; icon: string }[] = [
  { value: 'electric', label: 'Électrique', icon: '⚡' },
  { value: 'hybrid', label: 'Hybride', icon: '🔋' },
  { value: 'petrol', label: 'Essence', icon: '⛽' },
  { value: 'diesel', label: 'Diesel', icon: '🛢' },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommandé' },
  { value: 'price_asc', label: 'Prix : croissant' },
  { value: 'price_desc', label: 'Prix : décroissant' },
  { value: 'year_desc', label: 'Année : plus récente' },
  { value: 'mileage_asc', label: 'Kilométrage : le plus bas' },
];

export const MILEAGE_OPTIONS: { value: number | null; label: string }[] = [
  { value: null, label: 'Sans limite' },
  { value: 10000, label: '< 10 000 km' },
  { value: 30000, label: '< 30 000 km' },
  { value: 50000, label: '< 50 000 km' },
  { value: 100000, label: '< 100 000 km' },
];

// ─────────────────────────────────────────────────────────────────────────────
// URL ↔ Filter helpers
// ─────────────────────────────────────────────────────────────────────────────

type SearchParamsInput =
  | { get(k: string): string | null; getAll(k: string): string[] }
  | Record<string, string | string[] | undefined>;

function _get(p: SearchParamsInput, key: string): string | null {
  if (typeof (p as { get?: unknown }).get === 'function') return (p as { get(k: string): string | null }).get(key);
  const v = (p as Record<string, string | string[] | undefined>)[key];
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

function _getAll(p: SearchParamsInput, key: string): string[] {
  if (typeof (p as { getAll?: unknown }).getAll === 'function')
    return (p as { getAll(k: string): string[] }).getAll(key);
  const v = (p as Record<string, string | string[] | undefined>)[key];
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

/**
 * Parse URL search params (from server searchParams or useSearchParams())
 * into a validated ShopFilters object. page is always 1 — infinite scroll
 * handles subsequent pages client-side via server action.
 */
export function parseSearchParams(params: SearchParamsInput): ShopFilters {
  const validBodies = BODIES.map((b) => b.value);
  const validFuels = FUELS.map((f) => f.value);
  const validSorts = SORT_OPTIONS.map((s) => s.value);

  const sort = _get(params, 'sort');
  const tx = _get(params, 'transmission');

  return {
    search: _get(params, 'search') ?? DEFAULT_FILTERS.search,
    makes: _getAll(params, 'makes').filter((m) => MAKES.includes(m)),
    bodies: _getAll(params, 'bodies').filter((b) => validBodies.includes(b as BodyType)) as BodyType[],
    fuels: _getAll(params, 'fuels').filter((f) => validFuels.includes(f as FuelType)) as FuelType[],
    transmission: tx === 'automatic' || tx === 'manual' ? tx : 'all',
    priceFrom: Math.max(0, Number(_get(params, 'priceFrom') ?? DEFAULT_FILTERS.priceFrom)),
    priceTo: Math.min(5000, Number(_get(params, 'priceTo') ?? DEFAULT_FILTERS.priceTo)),
    yearFrom: Number(_get(params, 'yearFrom') ?? DEFAULT_FILTERS.yearFrom),
    yearTo: Number(_get(params, 'yearTo') ?? DEFAULT_FILTERS.yearTo),
    mileageTo: _get(params, 'mileageTo') ? Number(_get(params, 'mileageTo')) : null,
    sort: (sort && validSorts.includes(sort as SortOption) ? sort : DEFAULT_FILTERS.sort) as SortOption,
    page: 1,
  };
}

/**
 * Serialize ShopFilters to URLSearchParams for browser navigation.
 * Only includes non-default values to keep URLs clean.
 */
export function filtersToParams(filters: ShopFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.search) p.set('search', filters.search);
  filters.makes.forEach((m) => p.append('makes', m));
  filters.bodies.forEach((b) => p.append('bodies', b));
  filters.fuels.forEach((f) => p.append('fuels', f));
  if (filters.transmission !== 'all') p.set('transmission', filters.transmission);
  if (filters.priceFrom > 0) p.set('priceFrom', String(filters.priceFrom));
  if (filters.priceTo < 5000) p.set('priceTo', String(filters.priceTo));
  if (filters.yearFrom !== DEFAULT_FILTERS.yearFrom) p.set('yearFrom', String(filters.yearFrom));
  if (filters.yearTo !== DEFAULT_FILTERS.yearTo) p.set('yearTo', String(filters.yearTo));
  if (filters.mileageTo !== null) p.set('mileageTo', String(filters.mileageTo));
  if (filters.sort !== DEFAULT_FILTERS.sort) p.set('sort', filters.sort);
  return p;
}

/**
 * Async car fetcher — server-only.
 *
 * Priority order:
 *  1. AS24 Dealer API  — when AS24_CLIENT_ID + AS24_CLIENT_SECRET are set
 *  2. Custom proxy URL — when CARS_API_URL is set (legacy / BYO proxy)
 *  3. Local mock data  — always available as a fallback
 */
export async function fetchCars(filters: ShopFilters, page = 1): Promise<AS24Response> {
  // 1. Real AutoScout24 Dealer API
  if (process.env.AS24_CLIENT_ID && process.env.AS24_CLIENT_SECRET) {
    try {
      const { searchVehicles } = await import('./as24/client');
      return await searchVehicles(filters, page);
    } catch (err) {
      console.error('[fetchCars] AS24 API error, falling back:', err);
    }
  }

  // 2. Legacy custom proxy (e.g. a BYO scraping server)
  const apiUrl = process.env.CARS_API_URL;
  if (apiUrl) {
    const params = filtersToParams(filters);
    params.set('page', String(page));
    const res = await fetch(`${apiUrl}?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) return res.json() as Promise<AS24Response>;
  }

  // 3. Mock data fallback
  return filterAndSort(MOCK_CARS, { ...filters, page });
}

/** Returns active filter count for the badge on mobile filter button */
export function countActiveFilters(f: ShopFilters): number {
  let n = 0;
  if (f.search) n++;
  if (f.makes.length) n += f.makes.length;
  if (f.bodies.length) n += f.bodies.length;
  if (f.fuels.length) n += f.fuels.length;
  if (f.transmission !== 'all') n++;
  if (f.priceFrom > 0 || f.priceTo < 5000) n++;
  if (f.yearFrom > 2018 || f.yearTo < 2025) n++;
  if (f.mileageTo !== null) n++;
  return n;
}
