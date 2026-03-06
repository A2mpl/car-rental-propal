import { ArrowLeft, Fuel, Gauge, Settings, Users, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BADGE_CONFIG, BODY_LABELS, FUEL_LABELS } from '@/components/shop/carcard/data';
import CarGallery from '@/components/shop/cargallery/CarGallery';
import { getCarById, MOCK_CARS } from '@/lib/autoscout24';
import { siteName, siteUrl } from '@/lib/site';
import styles from './CarDetail.module.css';

type Props = { params: Promise<{ id: string }> };

/** Génère 4 recadrages différents à partir de l'URL Unsplash de base */
function buildImageVariants(baseUrl: string): string[] {
  // Extraire le base sans query string
  const base = baseUrl.split('?')[0];
  return [
    `${base}?w=1200&h=700&fit=crop&crop=center&auto=format&q=82`,
    `${base}?w=1200&h=700&fit=crop&crop=top&auto=format&q=82`,
    `${base}?w=1200&h=700&fit=crop&crop=entropy&auto=format&q=82`,
    `${base}?w=1200&h=700&fit=crop&crop=bottom&auto=format&q=82`,
  ];
}

export function generateStaticParams() {
  return MOCK_CARS.map((car) => ({ id: car.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) return {};
  const desc = `Louez la ${car.title} (${car.year}) à ${car.price}€/jour. ${car.power} HP, ${car.specs.engine}. Livraison à Bordeaux et en Gironde, assurance incluse.`;
  return {
    title: `${car.title} — Location ${car.year} à ${car.price}€/jour`,
    description: desc,
    keywords: [
      `location ${car.make} bordeaux`,
      `louer ${car.title} bordeaux`,
      `${car.make} ${car.model} location`,
      'location voiture premium bordeaux',
      'location voiture luxe bordeaux',
    ],
    alternates: { canonical: `/shop/${id}` },
    openGraph: {
      title: `${car.title} — ${car.price}€/jour | ${siteName}`,
      description: desc,
      url: `${siteUrl}/shop/${id}`,
      images: [{ url: car.image, width: 1200, height: 700, alt: car.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${car.title} — ${car.price}€/jour`,
      description: desc,
      images: [car.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) notFound();

  const badge = car.badge ? BADGE_CONFIG[car.badge] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: car.title,
    description: `Location de ${car.title} (${car.year}). ${car.power} HP, ${car.specs.engine}. Disponible à ${car.location}.`,
    image: car.image,
    brand: { '@type': 'Brand', name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    fuelType: car.fuel,
    driveWheelConfiguration: 'AWD',
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/shop/${car.id}`,
      price: car.price,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: car.price,
        priceCurrency: 'EUR',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },
      },
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: siteName, url: siteUrl },
    },
  };
  const fuelIcon = car.fuel === 'electric' || car.fuel === 'hybrid' ? <Zap size={14} /> : <Fuel size={14} />;
  const images = buildImageVariants(car.image);

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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structuré
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
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

        {/* Detail layout */}
        <div className={styles.layout}>
          {/* Left: info */}
          <div className={styles.infoCol}>
            <div className={styles.meta}>
              <span className={styles.year}>{car.year}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.location}>{car.location}</span>
            </div>

            <h1 className={styles.title}>{car.title}</h1>

            {/* Specs grid */}
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
      </main>
    </>
  );
}
