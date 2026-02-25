/**
 * AutoScout24 integration layer — public surface.
 *
 * Import from here rather than from individual submodules so internal
 * reorganisation stays transparent to consumers.
 */

export { searchVehicles } from './client';
export { adaptVehicle, adaptSearchResponse } from './adapter';
export { buildAS24Params } from './params';
export type {
  AS24Token,
  AS24RawListing,
  AS24RawSearchResponse,
  AS24RawVehicle,
  AS24FuelCode,
  AS24BodyCode,
  AS24GearCode,
} from './types';
