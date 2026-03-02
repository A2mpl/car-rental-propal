import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Archivo, Saira } from 'next/font/google';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://timeless-cars.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Timeless — Location de Voitures Électriques',
    template: '%s | Timeless',
  },
  description:
    'Votre courtier de confiance pour la location de voitures électriques premium. Large sélection, prix transparents, livraison à domicile.',
  keywords: [
    'location voiture électrique',
    'voiture électrique',
    'Tesla location',
    'location véhicule premium',
    'courtier automobile',
    'location voiture luxe',
  ],
  authors: [{ name: 'Timeless' }],
  creator: 'Timeless',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Timeless',
    title: 'Timeless — Location de Voitures Électriques',
    description:
      'Votre courtier de confiance pour la location de voitures électriques premium. Large sélection, prix transparents, livraison à domicile.',
    images: [
      {
        url: '/images/img_4.png',
        width: 1200,
        height: 630,
        alt: 'Timeless — Location de Voitures Électriques Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timeless — Location de Voitures Électriques',
    description:
      'Votre courtier de confiance pour la location de voitures électriques premium. Large sélection, prix transparents, livraison à domicile.',
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
  name: 'Timeless',
  description:
    'Courtier automobile spécialisé dans la location de voitures électriques premium. Large sélection, prix transparents, livraison à domicile.',
  url: siteUrl,
  logo: `${siteUrl}/images/img_4.png`,
  sameAs: [],
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  inLanguage: 'fr-FR',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? '';

  return (
    <html lang="fr" className={`${saira.variable} ${archivo.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider nonce={nonce}>{children}</ThemeProvider>
        <script
          nonce={nonce}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structuré
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
