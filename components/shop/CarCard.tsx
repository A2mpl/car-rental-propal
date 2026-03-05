import { ArrowRight, Fuel, Gauge, Zap } from 'lucide-react';
import Image from 'next/image';
import type { AS24Listing } from '@/lib/autoscout24';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: AS24Listing;
  priority?: boolean;
}

const BADGE_CONFIG = {
  new: { label: 'Nouveau', className: 'badgeNew' },
  popular: { label: 'Populaire', className: 'badgePopular' },
  limited: { label: 'Limité', className: 'badgeLimited' },
  electric: { label: 'Électrique', className: 'badgeElectric' },
} as const;

const FUEL_ICONS: Record<string, React.ReactNode> = {
  electric: <Zap size={11} />,
  hybrid: <Zap size={11} />,
  petrol: <Fuel size={11} />,
  diesel: <Fuel size={11} />,
};

const FUEL_LABELS: Record<string, string> = {
  electric: 'Électrique',
  hybrid: 'Hybride',
  petrol: 'Essence',
  diesel: 'Diesel',
};

const BODY_LABELS: Record<string, string> = {
  sedan: 'Berline',
  suv: 'SUV',
  sport: 'Sport',
  supercar: 'Supercar',
  convertible: 'Cabriolet',
};

export default function CarCard({ car, priority = false }: CarCardProps) {
  const badge = car.badge ? BADGE_CONFIG[car.badge] : null;
  const primarySpec = car.range ?? `${car.power} HP`;
  const primaryLabel = car.range ? 'Autonomie' : 'Puissance';

  return (
    <article className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <Image
          src={car.image}
          alt={car.title}
          fill
          className={styles.image}
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 30px), (max-width: 1280px) calc(50vw - 178px), calc(33vw - 125px)"
          priority={priority}
        />

        {/* Overlay badges */}
        <div className={styles.imageBadges}>
          <span className={styles.bodyBadge}>{BODY_LABELS[car.body] ?? car.body}</span>
          {badge && <span className={`${styles.badge} ${styles[badge.className]}`}>{badge.label}</span>}
        </div>

        {/* Fuel chip */}
        <div className={styles.fuelChip}>
          {FUEL_ICONS[car.fuel]}
          <span>{FUEL_LABELS[car.fuel]}</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Meta row */}
        <div className={styles.meta}>
          <span className={styles.year}>{car.year}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.location}>{car.location}</span>
        </div>

        {/* Title */}
        <h2 className={styles.title}>{car.title}</h2>

        {/* Specs strip */}
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

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>€{car.price}</span>
            <span className={styles.perDay}>/ jour</span>
          </div>
          <a
            href={car.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewBtn}
            aria-label={`Voir ${car.title}`}
          >
            <span>Réserver</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
