import type { BezierDefinition, Variants } from 'framer-motion';
import type { PrestationStep } from './types';

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: luxeEase } },
};

export const STEPS: PrestationStep[] = [
  {
    number: '01',
    title: 'Choisissez votre véhicule',
    desc: 'Parcourez notre catalogue et sélectionnez la voiture qui correspond à votre envie et votre budget.',
  },
  {
    number: '02',
    title: 'Réservez en ligne',
    desc: 'Choisissez vos dates, confirmez votre offre et recevez une confirmation immédiate par email.',
  },
  {
    number: '03',
    title: "Profitez de l'expérience",
    desc: "Nous livrons le véhicule à votre adresse. Il ne vous reste plus qu'à prendre la route.",
  },
];
