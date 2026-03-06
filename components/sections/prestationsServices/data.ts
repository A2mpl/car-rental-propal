import type { BezierDefinition, Variants } from 'framer-motion';
import { Car, MapPin, Phone, Shield, Star, Wrench } from 'lucide-react';
import type { ServiceItem } from './types';

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxeEase } },
};

export const gridVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: luxeEase, delay: 0.14 } },
};

export const SERVICES: ServiceItem[] = [
  {
    icon: Shield,
    label: 'Assurance Tous Risques',
    desc: 'Couverture complète incluse dans chaque offre sans franchise cachée.',
  },
  {
    icon: MapPin,
    label: 'Livraison à Domicile',
    desc: 'Nous livrons le véhicule où vous le souhaitez à Bordeaux et en Gironde.',
  },
  {
    icon: Phone,
    label: 'Assistance 24h/24',
    desc: 'Notre équipe est disponible à tout moment pour vous aider en cas de besoin.',
  },
  {
    icon: Star,
    label: 'Véhicules Premium',
    desc: 'Flotte entretenue, récente, contrôlée et prête à rouler avant chaque remise.',
  },
  {
    icon: Wrench,
    label: 'Entretien Garanti',
    desc: 'Chaque véhicule passe par un contrôle complet avant chaque location.',
  },
  {
    icon: Car,
    label: 'Large Sélection',
    desc: 'Plus de 18 véhicules sport, électriques et luxe disponibles sur Bordeaux.',
  },
];
