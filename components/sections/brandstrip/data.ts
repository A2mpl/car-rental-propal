import type { ComponentType } from 'react';
import AudiLogo from '@/components/sections/icons/AudiLogo';
import BmwLogo from '@/components/sections/icons/BmwLogo';
import FerrariLogo from '@/components/sections/icons/FerrariLogo';
import PorscheLogo from '@/components/sections/icons/PorscheLogo';
import TeslaLogo from '@/components/sections/icons/TeslaLogo';

export const LOGOS: ComponentType[] = [TeslaLogo, AudiLogo, BmwLogo, PorscheLogo, FerrariLogo];

export const scrollTransition = {
  animate: { x: ['0%', '-33.33%'] },
  transition: {
    duration: 25,
    repeat: Number.POSITIVE_INFINITY,
    ease: 'linear' as const,
  },
};
