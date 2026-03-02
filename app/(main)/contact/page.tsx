import type { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez l'équipe Timeless pour toute question sur nos véhicules électriques premium.",
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
