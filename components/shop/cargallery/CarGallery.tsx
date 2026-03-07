'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from './CarGallery.module.css';

interface CarGalleryProps {
  images: string[];
  title: string;
  /** Passer true quand la galerie est l'élément LCP de la page (above-the-fold) */
  priority?: boolean;
  badges?: React.ReactNode;
}

export default function CarGallery({ images, title, priority = false, badges }: CarGalleryProps) {
  const [active, setActive] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === active) return;
      setActive(index);
    },
    [active]
  );

  const prev = useCallback(() => goTo((active - 1 + images.length) % images.length), [active, goTo, images.length]);
  const next = useCallback(() => goTo((active + 1) % images.length), [active, goTo, images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  return (
    <div className={styles.gallery}>
      {/* Main viewer — toutes les slides empilées, CSS opacity */}
      <div className={styles.main}>
        {images.map((src, i) => (
          <div
            key={src}
            className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
            aria-hidden={i !== active}
          >
            <Image
              src={src}
              alt={`${title} — vue ${i + 1}`}
              fill
              className={styles.img}
              // --max-width:1280px, --px:48px, --px-mobile:20px
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 96px), 1184px"
              priority={priority && i === 0}
              fetchPriority={priority && i === 0 ? 'high' : 'auto'}
              loading={priority && i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <div className={styles.overlay} />

        {/* Badges slot */}
        {badges && <div className={styles.badges}>{badges}</div>}

        {/* Counter */}
        <span className={styles.counter}>
          {active + 1} / {images.length}
        </span>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Image précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Image suivante"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label="Sélectionner une image">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Vue ${i + 1}`}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => goTo(i)}
            >
              <Image
                src={src}
                alt={`${title} miniature ${i + 1}`}
                fill
                className={styles.thumbImg}
                sizes="(max-width: 1023px) 88px, 100px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
