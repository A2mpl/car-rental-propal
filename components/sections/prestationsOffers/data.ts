import type { BezierDefinition, Variants } from 'framer-motion';
import type { Offer } from './types';

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: luxeEase } },
};

export const gridVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: luxeEase, delay: 0.12 } },
};

export const OFFERS: Offer[] = [
  {
    id: 'day',
    label: 'Journée',
    subtitle: 'Parfait pour une occasion spéciale',
    duration: '24 heures',
    price: 'À partir de 149€',
    priceValue: 149,
    included: ['Kilométrage illimité', 'Assurance tous risques', 'Assistance 24h/24', 'Livraison Bordeaux centre'],
    excluded: ['Carburant', 'Conducteur additionnel (+30€)'],
    highlight: false,
  },
  {
    id: 'weekend',
    label: 'Weekend',
    subtitle: 'Le choix le plus populaire',
    duration: 'Vendredi → Lundi',
    price: 'À partir de 349€',
    priceValue: 349,
    included: [
      'Kilométrage illimité',
      'Assurance tous risques',
      'Assistance 24h/24',
      'Livraison Bordeaux & Gironde',
      'GPS inclus',
    ],
    excluded: ['Carburant'],
    highlight: true,
  },
  {
    id: 'week',
    label: 'Semaine',
    subtitle: "Pour vivre l'expérience à fond",
    duration: '7 jours',
    price: 'À partir de 990€',
    priceValue: 990,
    included: [
      'Kilométrage illimité',
      'Assurance tous risques',
      'Assistance 24h/24',
      'Livraison partout en Aquitaine',
      'GPS + siège enfant inclus',
      'Nettoyage offert',
    ],
    excluded: ['Carburant'],
    highlight: false,
  },
];
