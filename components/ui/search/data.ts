import type { BrandInfo } from '@/components/ui/search/types';

export const VEHICLE_DATA: Record<string, BrandInfo> = {
  Audi: {
    models: [
      { name: 'RS6', types: ['Sport'] },
      { name: 'Q8', types: ['SUV'] },
      { name: 'e-tron GT', types: ['Électrique', 'Sport'] },
      { name: 'R8 Spyder', types: ['Sport', 'Cabriolet'] },
    ],
  },
  BMW: {
    models: [
      { name: 'M3', types: ['Sport'] },
      { name: 'M4 Cabriolet', types: ['Sport', 'Cabriolet'] },
      { name: 'X5', types: ['SUV'] },
      { name: 'iX', types: ['Électrique', 'SUV'] },
      { name: 'i4', types: ['Électrique', 'Sport'] },
    ],
  },
  Ferrari: {
    models: [
      { name: '296 GTB', types: ['Sport'] },
      { name: 'SF90 Stradale', types: ['Sport'] },
      { name: 'Roma Spider', types: ['Sport', 'Cabriolet'] },
      { name: 'Purosangue', types: ['SUV'] },
    ],
  },
  Lamborghini: {
    models: [
      { name: 'Huracán', types: ['Sport'] },
      { name: 'Huracán Spyder', types: ['Sport', 'Cabriolet'] },
      { name: 'Urus', types: ['SUV'] },
      { name: 'Revuelto', types: ['Sport'] },
    ],
  },
  McLaren: {
    models: [
      { name: '720S', types: ['Sport'] },
      { name: '720S Spider', types: ['Sport', 'Cabriolet'] },
      { name: 'Artura', types: ['Sport'] },
    ],
  },
  Mercedes: {
    models: [
      { name: 'AMG GT', types: ['Sport'] },
      { name: 'AMG GT Roadster', types: ['Sport', 'Cabriolet'] },
      { name: 'GLE Coupé', types: ['SUV'] },
      { name: 'EQS', types: ['Électrique'] },
      { name: 'Classe G', types: ['SUV'] },
    ],
  },
  Porsche: {
    models: [
      { name: '911 GT3', types: ['Sport'] },
      { name: '911 Cabriolet', types: ['Sport', 'Cabriolet'] },
      { name: 'Cayenne', types: ['SUV'] },
      { name: 'Taycan', types: ['Électrique', 'Sport'] },
      { name: '718 Boxster', types: ['Sport', 'Cabriolet'] },
    ],
  },
  Tesla: {
    models: [
      { name: 'Model 3', types: ['Électrique'] },
      { name: 'Model S', types: ['Électrique'] },
      { name: 'Model X', types: ['Électrique', 'SUV'] },
      { name: 'Model Y', types: ['Électrique', 'SUV'] },
    ],
  },
};

export const ALL_TYPES: string[] = ['Tous', 'Électrique', 'Sport', 'SUV', 'Cabriolet'];
export const ALL_PRICES: string[] = ['Tous les prix', '< €200/jour', '€200–500/jour', '> €500/jour'];

export const FIELD_KEYS = ['type', 'brand', 'model', 'price'] as const;
export type FieldKey = (typeof FIELD_KEYS)[number];

export const LABELS: Record<FieldKey, string> = {
  type: 'Type',
  brand: 'Marque',
  model: 'Modèle',
  price: 'Prix',
};
