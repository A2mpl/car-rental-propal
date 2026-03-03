import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Archivo, Saira } from 'next/font/google';
import { siteName, siteUrl } from '@/lib/site';
import ThemeProvider from '@/components/layout/ThemeProvider';
import './globals.css';

const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
  display: 'swap',
});

/**
 * Police display — Archivo 900 italic = visuellement identique à Archivo Black
 * mais avec le support italic natif (Archivo_Black ne propose pas d'italic).
 * Pour tester une autre fonte : changer l'import + variable, puis globals.css.
 * Exemples : Playfair_Display, Cormorant_Garamond, Oswald
 */
const archivo = Archivo({
  weight: ['900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Courtier Automobile à Bordeaux | Voitures Sport, Moto & Électrique`,
    template: `%s | ${siteName} Bordeaux`,
  },
  description:
    'Courtier automobile à Bordeaux — BMW, Audi, Porsche, Ferrari, Mercedes, Tesla électrique, motos et véhicules premium. Sélection exclusive, prix transparents, livraison en Gironde.',
  keywords: [
    'courtier automobile bordeaux',
    'courtier voiture bordeaux',
    'voiture sport bordeaux',
    'BMW bordeaux',
    'Audi bordeaux',
    'Porsche bordeaux',
    'Ferrari bordeaux',
    'Mercedes bordeaux',
    'voiture électrique bordeaux',
    'Tesla bordeaux',
    'moto bordeaux',
    'courtier moto bordeaux',
    'achat voiture sport bordeaux',
    'véhicule premium bordeaux',
    'voiture luxe bordeaux',
    'courtier automobile gironde',
    'voiture sport gironde',
    'achat moto bordeaux',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: `${siteName} Bordeaux`,
    title: `${siteName} — Courtier Automobile à Bordeaux | Voitures Sport, Moto & Électrique`,
    description:
      'Courtier automobile à Bordeaux — BMW, Audi, Porsche, Ferrari, Tesla électrique, motos et véhicules premium. Sélection exclusive, prix transparents, livraison en Gironde.',
    images: [
      {
        url: '/images/img_4.png',
        width: 1200,
        height: 630,
        alt: `${siteName} — Courtier Automobile à Bordeaux, voitures sport et motos premium`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Courtier Automobile à Bordeaux`,
    description:
      'BMW, Audi, Porsche, Ferrari, Tesla électrique, motos — votre courtier automobile à Bordeaux. Prix transparents, livraison en Gironde.',
    images: ['/images/img_4.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: siteName,
  description: `Courtier automobile à Bordeaux spécialisé dans les voitures sport, premium et électriques ainsi que les motos. BMW, Audi, Porsche, Ferrari, Mercedes, Tesla — sélection exclusive, prix transparents.`,
  url: siteUrl,
  logo: `${siteUrl}/images/img_4.png`,
  image: `${siteUrl}/images/img_4.png`,
  telephone: '',
  email: `contact@timeless-cars.fr`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bordeaux',
    addressRegion: 'Nouvelle-Aquitaine',
    postalCode: '33000',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.8378,
    longitude: -0.5792,
  },
  areaServed: [
    { '@type': 'City', name: 'Bordeaux' },
    { '@type': 'AdministrativeArea', name: 'Gironde' },
    { '@type': 'AdministrativeArea', name: 'Nouvelle-Aquitaine' },
  ],
  sameAs: [],
  inLanguage: 'fr-FR',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? '';

  return (
    <html lang="fr" className={`${saira.variable} ${archivo.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider nonce={nonce}>{children}</ThemeProvider>
        {/* Pas de nonce ici : type="application/ld+json" est un data script,
            il n'est pas exécuté en JS → script-src ne s'y applique pas.
            Ajouter nonce provoquerait un mismatch d'hydratation (le browser
            masque l'attribut nonce dans le DOM après parsing). */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structuré
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
