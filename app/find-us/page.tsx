import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nous Trouver',
  description:
    "Retrouvez Timeless pr\u00e8s de chez vous. Showroom, horaires d'ouverture et itin\u00e9raire pour venir \u00e0 notre rencontre.",
  openGraph: {
    title: 'Nous Trouver | Timeless',
    description:
      "Retrouvez Timeless pr\u00e8s de chez vous. Showroom, horaires d'ouverture et itin\u00e9raire pour venir \u00e0 notre rencontre.",
  },
  alternates: {
    canonical: '/find-us',
  },
};

export default function FindUsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-2xl text-[#888888]">Nous trouver — bientôt disponible</p>
    </div>
  );
}
