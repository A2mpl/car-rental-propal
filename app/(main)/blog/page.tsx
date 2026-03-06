import type { Metadata } from 'next';
import BlogGrid from '@/components/sections/blogGrid/BlogGrid';
import BlogHero from '@/components/sections/blogHero/BlogHero';
import { BLOG_ARTICLES } from '@/data/blog';
import { siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog — Guides & Conseils Location Voiture Premium Bordeaux',
  description:
    "Guides, comparatifs et conseils sur la location de voitures premium à Bordeaux. Ferrari, Porsche, Tesla, BMW — tout savoir avant de réserver votre prochain véhicule d'exception.",
  keywords: [
    'blog location voiture bordeaux',
    'guide ferrari bordeaux',
    'comparatif voiture sport bordeaux',
    'tesla bordeaux location guide',
    'voiture luxe mariage bordeaux',
    'louer porsche bordeaux',
    'location lamborghini bordeaux guide',
    'voiture électrique location bordeaux',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `Blog — Guides Location Voiture Premium | ${siteName}`,
    description: 'Guides et comparatifs sur la location de voitures premium à Bordeaux. Ferrari, Porsche, Tesla, BMW.',
    url: `${siteUrl}/blog`,
    images: [
      {
        url: '/images/img_2.png',
        width: 1200,
        height: 630,
        alt: `Blog ${siteName} — Guides voitures premium Bordeaux`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Guides Location Voiture Premium Bordeaux',
    description: 'Ferrari, Porsche, Tesla, BMW — guides et conseils pour louer votre prochain véhicule premium.',
    images: ['/images/img_2.png'],
  },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  const sorted = [...BLOG_ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main>
      <BlogHero article={sorted[0]}/>
      <BlogGrid articles={sorted} />
    </main>
  );
}
