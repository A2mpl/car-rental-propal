import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Modèles',
  description:
    'Découvrez notre gamme de véhicules électriques premium : Tesla, BMW, Audi et plus encore. Chaque modèle sélectionné pour sa performance et son confort.',
  openGraph: {
    title: 'Nos Modèles — Voitures Électriques Premium | Timeless',
    description:
      'Découvrez notre gamme de véhicules électriques premium : Tesla, BMW, Audi et plus encore. Chaque modèle sélectionné pour sa performance et son confort.',
  },
  alternates: {
    canonical: '/models',
  },
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-2xl text-[#888888]">Modèles — bientôt disponible</p>
    </div>
  );
}
