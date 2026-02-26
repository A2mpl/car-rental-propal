/**
 * AutoScout24 integration layer — public surface.
 *
 * Import from here rather than from individual submodules so internal
 * reorganisation stays transparent to consumers.
 */


// biome-ignore lint/performance/noBarrelFile: DEV
export  { adaptSearchResponse, adaptVehicle } from './adapter';
export { searchVehicles } from './client';
export { buildAS24Params } from './params';
export type {
  AS24BodyCode,
  AS24FuelCode,
  AS24GearCode,
  AS24RawListing,
  AS24RawSearchResponse,
  AS24RawVehicle,
  AS24Token,
} from './types';
