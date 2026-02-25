export interface Car {
  id: string;
  number: string; // Display number: "01", "02", …
  name: string;
  brand: string;
  category: 'sedan' | 'suv' | 'sport' | 'supercar';
  fuel: 'electric' | 'hybrid';
  image: string;
  specs: {
    range: string; // e.g. "358 MI"
    acceleration: string; // e.g. "3.1 S"
    power: string; // e.g. "670 HP"
  };
  specLabels: {
    range: string; // e.g. "Range (EPA est.)"
    acceleration: string; // e.g. "0-60 mph"
    power: string; // e.g. "peak power"
  };
  description: string;
  featured?: boolean;
}

export const cars: Car[] = [
  {
    id: 'tesla-model-3',
    number: '01',
    name: 'TESLA MODEL 3',
    brand: 'Tesla',
    category: 'sedan',
    fuel: 'electric',
    // data-todo="real-image"
    image: '/images/cars/tesla-model-3.png',
    specs: {
      range: '358 MI',
      acceleration: '3.1 S',
      power: '670 HP',
    },
    specLabels: {
      range: 'Autonomie (EPA est.)',
      acceleration: '0-100 km/h',
      power: 'puissance max',
    },
    description:
      'Plate-forme à double moteur à transmission intégrale avec couple instantané sur chaque essieu. La Model 3 redéfinit ce qu\'une berline électrique peut être — un équilibre parfait de performance, d\'autonomie et de design minimaliste.',
    featured: true,
  },
  {
    id: 'tesla-model-s',
    number: '02',
    name: 'TESLA MODEL S',
    brand: 'Tesla',
    category: 'sedan',
    fuel: 'electric',
    // data-todo="real-image"
    image: '/images/cars/tesla-model-s.png',
    specs: {
      range: '405 MI',
      acceleration: '1.9 S',
      power: '1020 HP',
    },
    specLabels: {
      range: 'Autonomie (EPA est.)',
      acceleration: '0-100 km/h',
      power: 'puissance max',
    },
    description:
      'Groupe motopropulseur tri-moteur Plaid avec un quart de mile en moins de 9,2 secondes. La Model S Plaid est la voiture de série la plus rapide jamais construite, enveloppée dans une carrosserie de berline exécutive raffinée.',
    featured: false,
  },
  {
    id: 'tesla-model-x',
    number: '03',
    name: 'TESLA MODEL X',
    brand: 'Tesla',
    category: 'suv',
    fuel: 'electric',
    // data-todo="real-image"
    image: '/images/cars/tesla-model-x.png',
    specs: {
      range: '348 MI',
      acceleration: '2.5 S',
      power: '1020 HP',
    },
    specLabels: {
      range: 'Autonomie (EPA est.)',
      acceleration: '0-100 km/h',
      power: 'puissance max',
    },
    description:
      'Le SUV le plus sûr et le plus rapide jamais construit. Les portes Falcon Wing, un pare-brise panoramique et les performances Plaid s\'associent pour offrir un SUV électrique sans équivalent sur la route.',
    featured: false,
  },
];
