export const BADGE_CONFIG = {
  new: { label: 'Nouveau', className: 'badgeNew' },
  popular: { label: 'Populaire', className: 'badgePopular' },
  limited: { label: 'Limité', className: 'badgeLimited' },
  electric: { label: 'Électrique', className: 'badgeElectric' },
} as const;

export const FUEL_LABELS: Record<string, string> = {
  electric: 'Électrique',
  hybrid: 'Hybride',
  petrol: 'Essence',
  diesel: 'Diesel',
};

export const BODY_LABELS: Record<string, string> = {
  sedan: 'Berline',
  suv: 'SUV',
  sport: 'Sport',
  supercar: 'Supercar',
  convertible: 'Cabriolet',
};
