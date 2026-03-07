import { ArrowLeft, Fuel, Gauge, Settings, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import type { CarDetailSectionProps } from '@/components/sections/carDetail/types';
import { BADGE_CONFIG, BODY_LABELS, FUEL_LABELS } from '@/components/shop/carcard/data';
import CarGallery from '@/components/shop/cargallery/CarGallery';
import styles from './CarDetailSection.module.css';

export default function CarDetailSection({ car }: CarDetailSectionProps) {
  const badge = car.badge ? BADGE_CONFIG[car.badge] : null;
  const fuelIcon = car.fuel === 'electric' || car.fuel === 'hybrid' ? <Zap size={14} /> : <Fuel size={14} />;
  const images = car.images ?? [car.image];

  const galleryBadges = (
    <>
      <span className={styles.bodyBadge}>{BODY_LABELS[car.body] ?? car.body}</span>
      {badge && <span className={`${styles.badge} ${styles[badge.className]}`}>{badge.label}</span>}
      <span className={styles.fuelChip}>
        {fuelIcon}
        {FUEL_LABELS[car.fuel]}
      </span>
    </>
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/shop" className={styles.breadcrumbLink}>
          <ArrowLeft size={14} />
          <span>Véhicules</span>
        </Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{car.title}</span>
      </div>

      {/* Gallery */}
      <div className={styles.galleryWrap}>
        <CarGallery images={images} title={car.title} priority badges={galleryBadges} />
      </div>

      {/* Detail */}
      <section className={styles.detailSection}>
        <div className={styles.layout}>
          {/* Left: info */}
          <div className={styles.infoCol}>
            <div className={styles.meta}>
              <span className={styles.year}>{car.year}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.location}>{car.location}</span>
            </div>

            <h1 className={styles.title}>{car.title}</h1>

            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Fuel size={16} />
                </span>
                <span className={styles.specLabel}>Carburant</span>
                <span className={styles.specValue}>{FUEL_LABELS[car.fuel]}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Gauge size={16} />
                </span>
                <span className={styles.specLabel}>Puissance</span>
                <span className={styles.specValue}>{car.power} HP</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Zap size={16} />
                </span>
                <span className={styles.specLabel}>0–100 km/h</span>
                <span className={styles.specValue}>{car.acceleration ?? '—'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Settings size={16} />
                </span>
                <span className={styles.specLabel}>Transmission</span>
                <span className={styles.specValue}>
                  {car.transmission === 'automatic' ? 'Automatique' : 'Manuelle'}
                </span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Users size={16} />
                </span>
                <span className={styles.specLabel}>Places</span>
                <span className={styles.specValue}>{car.specs.seats}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Gauge size={16} />
                </span>
                <span className={styles.specLabel}>Moteur</span>
                <span className={styles.specValue}>{car.specs.engine}</span>
              </div>
              {car.range && (
                <div className={styles.specItem}>
                  <span className={styles.specIcon}>
                    <Zap size={16} />
                  </span>
                  <span className={styles.specLabel}>Autonomie</span>
                  <span className={styles.specValue}>{car.range}</span>
                </div>
              )}
              <div className={styles.specItem}>
                <span className={styles.specIcon}>
                  <Gauge size={16} />
                </span>
                <span className={styles.specLabel}>Kilométrage</span>
                <span className={styles.specValue}>{car.mileage.toLocaleString('fr-FR')} km</span>
              </div>
            </div>
          </div>

          {/* Right: price + CTA */}
          <aside className={styles.ctaCol}>
            <div className={styles.ctaCard}>
              <div className={styles.priceRow}>
                <span className={styles.price}>€{car.price}</span>
                <span className={styles.perDay}>/ jour</span>
              </div>

              <a href={car.url} target="_blank" rel="noopener noreferrer" className={styles.reserveBtn}>
                Réserver ↗
              </a>

              <Link href="/contact" className={styles.contactLink}>
                Nous contacter
              </Link>

              <p className={styles.ctaNote}>Sans frais cachés · Livraison disponible</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
