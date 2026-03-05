import type { BezierDefinition, Variants } from 'framer-motion';
import type { ContactState } from '@/app/(main)/contact/actions';

export const SUBJECTS = [
  'Demande de location',
  'Question sur un véhicule',
  'Tarifs et disponibilités',
  'Service après-vente',
  'Partenariat',
  'Autre',
] as const;

export const INITIAL_CONTACT_STATE: ContactState = { status: 'idle' };

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: luxeEase } },
};

export const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxeEase, delay: 0.15 } },
};
