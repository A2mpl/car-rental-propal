import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CarDetailSection from '@/components/sections/carDetail/CarDetailSection';
import { getCarById, MOCK_CARS } from '@/lib/autoscout24';
import { siteName, siteUrl } from '@/lib/site';
import styles from './CarDetail.module.css';

type Props = { params: Promise<{ id: string }> };

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

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structuré
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <CarDetailSection car={car} />
      </main>
    </>
  );
}
