import { VEHICLE_DATA } from '@/components/ui/search/data';
import type { Filters, VehicleType } from '@/components/ui/search/types';

export function getFilteredBrands(selectedType: string): string[] {
  const brands = Object.entries(VEHICLE_DATA)
    .filter(([, info]) => {
      if (selectedType === 'Tous') return true;
      return info.models.some((m) => m.types.includes(selectedType as VehicleType));
    })
    .map(([brand]) => brand);
  return ['Toutes marques', ...brands];
}

export function getFilteredModels(selectedType: string, selectedBrand: string): string[] {
  let models: string[] = [];

  if (selectedBrand !== 'Toutes marques') {
    const brandData = VEHICLE_DATA[selectedBrand];
    if (brandData) {
      models = brandData.models
        .filter((m) => selectedType === 'Tous' || m.types.includes(selectedType as VehicleType))
        .map((m) => m.name);
    }
  } else {
    models = Object.values(VEHICLE_DATA).flatMap((info) =>
      info.models
        .filter((m) => selectedType === 'Tous' || m.types.includes(selectedType as VehicleType))
        .map((m) => m.name)
    );
  }

  return ['Tous modèles', ...models];
}

export function buildShopParams(filters: Filters): URLSearchParams {
  const p = new URLSearchParams();

  switch (filters.type) {
    case 'Électrique':
      p.append('fuels', 'electric');
      break;
    case 'Sport':
      p.append('bodies', 'sport');
      p.append('bodies', 'supercar');
      break;
    case 'SUV':
      p.append('bodies', 'suv');
      break;
    case 'Cabriolet':
      p.append('bodies', 'convertible');
      break;
    default:
      break;
  }

  if (filters.brand !== 'Toutes marques') p.append('makes', filters.brand);
  if (filters.model !== 'Tous modèles') p.set('search', filters.model);

  if (filters.price === '< €200/jour') {
    p.set('priceTo', '200');
  } else if (filters.price === '€200–500/jour') {
    p.set('priceFrom', '200');
    p.set('priceTo', '500');
  } else if (filters.price === '> €500/jour') {
    p.set('priceFrom', '500');
  }

  return p;
}
