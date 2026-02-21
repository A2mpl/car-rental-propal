export interface Car {
  id: string;
  number: string;                // Display number: "01", "02", …
  name: string;
  brand: string;
  category: 'sedan' | 'suv' | 'sport' | 'supercar';
  fuel: 'electric' | 'hybrid';
  image: string;
  specs: {
    range: string;               // e.g. "358 MI"
    acceleration: string;        // e.g. "3.1 S"
    power: string;               // e.g. "670 HP"
  };
  specLabels: {
    range: string;               // e.g. "Range (EPA est.)"
    acceleration: string;        // e.g. "0-60 mph"
    power: string;               // e.g. "peak power"
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
      range: 'Range (EPA est.)',
      acceleration: '0-60 mph',
      power: 'peak power',
    },
    description:
      'Dual Motor All-Wheel Drive platform with instant torque on every axle. The Model 3 redefines what an electric sedan can be — a perfect balance of performance, range, and minimalist design.',
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
      range: 'Range (EPA est.)',
      acceleration: '0-60 mph',
      power: 'peak power',
    },
    description:
      'Plaid tri-motor powertrain with a quarter-mile in under 9.2 seconds. The Model S Plaid is the quickest accelerating production car ever built, wrapped in a refined executive sedan body.',
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
      range: 'Range (EPA est.)',
      acceleration: '0-60 mph',
      power: 'peak power',
    },
    description:
      'The safest, quickest SUV ever built. Falcon Wing doors, a panoramic windshield, and Plaid performance combine to deliver an electric SUV unlike anything else on the road.',
    featured: false,
  },
];
