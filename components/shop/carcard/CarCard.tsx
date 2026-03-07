import { ArrowRight, Fuel, Gauge, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BADGE_CONFIG, BODY_LABELS, FUEL_LABELS } from '@/components/shop/carcard/data';
import type { CarCardProps } from '@/components/shop/carcard/types';
import styles from './CarCard.module.css';

const FUEL_ICONS: Record<string, ReactNode> = {
  electric: <Zap size={11} />,
  hybrid: <Zap size={11} />,
  petrol: <Fuel size={11} />,
  diesel: <Fuel size={11} />,
};

export default function CarCard({ car, priority = false }: CarCardProps) {
  const badge = car.badge ? BADGE_CONFIG[car.badge] : null;
  const primarySpec = car.range ?? `${car.power} HP`;
  const primaryLabel = car.range ? 'Autonomie' : 'Puissance';

  return (
    <Link href={`/shop/${car.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrap}>
          <Image
            src={car.image}
            alt={car.title}
            fill
            className={styles.image}
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 30px), (max-width: 1280px) calc(50vw - 178px), calc(33vw - 125px)"
            priority={priority}
            fetchPriority={priority ? 'high' : 'auto'}
            loading={priority ? 'eager' : 'lazy'}
          />

          <div className={styles.imageBadges}>
            <span className={styles.bodyBadge}>{BODY_LABELS[car.body] ?? car.body}</span>
            {badge && <span className={`${styles.badge} ${styles[badge.className]}`}>{badge.label}</span>}
          </div>

          <div className={styles.fuelChip}>
            {FUEL_ICONS[car.fuel]}
            <span>{FUEL_LABELS[car.fuel]}</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.year}>{car.year}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.location}>{car.location}</span>
          </div>

          <h2 className={styles.title}>{car.title}</h2>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <Gauge size={13} className={styles.specIcon} />
              <span className={styles.specValue}>{primarySpec}</span>
              <span className={styles.specLabel}>{primaryLabel}</span>
            </div>
            {car.acceleration && (
              <div className={styles.spec}>
                <Zap size={13} className={styles.specIcon} />
                <span className={styles.specValue}>{car.acceleration}</span>
                <span className={styles.specLabel}>0–100 km/h</span>
              </div>
            )}
            <div className={styles.spec}>
              <span className={styles.specValue}>{car.mileage.toLocaleString()} km</span>
              <span className={styles.specLabel}>Kilométrage</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceBlock}>
              <span className={styles.price}>€{car.price}</span>
              <span className={styles.perDay}>/ jour</span>
            </div>
            <span className={styles.viewBtn} aria-hidden="true">
              <span>Voir</span>
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
