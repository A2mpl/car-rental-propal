export type VehicleType = 'Électrique' | 'Sport' | 'SUV' | 'Cabriolet';

export interface ModelInfo {
  name: string;
  types: VehicleType[];
}

export interface BrandInfo {
  models: ModelInfo[];
}

export interface Filters {
  type: string;
  brand: string;
  model: string;
  price: string;
}
