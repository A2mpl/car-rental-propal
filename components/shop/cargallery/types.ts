import type { ReactNode } from 'react';

export interface CarGalleryProps {
  images: string[];
  title: string;
  /** Pass true when the gallery is the LCP element (above-the-fold) */
  priority?: boolean;
  badges?: ReactNode;
}
