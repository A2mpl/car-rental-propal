import type { Metadata } from 'next';
import ContactForm from '@/components/sections/contactForm/ContactForm';
import { siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact — Courtier Automobile Bordeaux',
  description: `Contactez ${siteName}, votre courtier automobile à Bordeaux. Voiture sport, BMW, Audi, Porsche, moto — notre équipe vous accompagne dans votre projet véhicule en Gironde.`,
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
