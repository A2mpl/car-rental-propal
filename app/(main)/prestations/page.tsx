import type { Metadata } from 'next';
import PrestationsHero from '@/components/sections/prestationsHero/PrestationsHero';
import { OFFERS } from '@/components/sections/prestationsOffers/data';
import PrestationsOffers from '@/components/sections/prestationsOffers/PrestationsOffers';
import PrestationsServices from '@/components/sections/prestationsServices/PrestationsServices';
import PrestationsSteps from '@/components/sections/prestationsSteps/PrestationsSteps';
import { siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Prestations — Location Voiture Premium Bordeaux',
  description:
    'Location voiture premium à Bordeaux : journée à partir de 149€, weekend 349€, semaine 990€. Assurance tous risques, livraison à domicile et assistance 24h/24 incluses.',
  keywords: [
    'location voiture premium bordeaux',
    'location voiture luxe bordeaux',
    'location journée voiture sport bordeaux',
    'location weekend voiture luxe bordeaux',
    'location longue durée voiture premium',
    'assurance location voiture bordeaux',
    'livraison voiture bordeaux',
    'location ferrari bordeaux',
    'location porsche bordeaux',
    'location lamborghini bordeaux',
    'location voiture gironde',
  ],
  alternates: { canonical: '/prestations' },
  openGraph: {
    title: `Location Voiture Premium Bordeaux — Journée, Weekend, Semaine | ${siteName}`,
    description:
      'Formules flexibles à partir de 149€/jour. Ferrari, Porsche, Lamborghini, Tesla — assurance et livraison incluses à Bordeaux.',
    url: `${siteUrl}/prestations`,
    images: [
      { url: '/images/img_2.png', width: 1200, height: 630, alt: `Location voiture premium Bordeaux — ${siteName}` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location Voiture Premium Bordeaux — Journée, Weekend, Semaine',
    description: 'Ferrari, Porsche, Lamborghini à partir de 149€/jour. Assurance et livraison incluses à Bordeaux.',
    images: ['/images/img_2.png'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Location Voiture Premium Bordeaux',
  description:
    'Service de location de voitures premium et de luxe à Bordeaux — Ferrari, Porsche, Lamborghini, Tesla, BMW. Formules journée, weekend et semaine avec assurance et livraison incluses.',
  provider: {
    '@type': 'LocalBusiness',
    name: siteName,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bordeaux',
      addressRegion: 'Nouvelle-Aquitaine',
      postalCode: '33000',
      addressCountry: 'FR',
    },
  },
  areaServed: [
    { '@type': 'City', name: 'Bordeaux' },
    { '@type': 'AdministrativeArea', name: 'Gironde' },
  ],
  offers: OFFERS.map((offer) => ({
    '@type': 'Offer',
    name: `Location ${offer.label}`,
    description: offer.subtitle,
    price: offer.priceValue,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  })),
  serviceType: 'Car Rental',
  inLanguage: 'fr-FR',
};

export default function PrestationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structuré
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <PrestationsHero />
        <PrestationsOffers />
        <PrestationsServices />
        <PrestationsSteps />
      </main>
    </>
  );
}
