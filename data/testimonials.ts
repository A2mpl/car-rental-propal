// data/testimonials.ts
// Product Manager note: companies "CHANAT LTD" and "TECON CYPRUS LTD" are confirmed from design.
// Third company is a plausible addition consistent with the B2B fleet rental tone.
// Avatar images are placeholders — developer: add data-todo="real-avatar" to every <img> element.
// Testimonials section uses a static carousel — data-todo="testimonials-carousel" on the wrapper.

import { siteName } from '@/lib/site';

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'James Hartley',
    company: 'Chanat Ltd',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    text: `${siteName} a complètement changé la façon dont notre équipe aborde les déplacements professionnels. La Tesla Model 3 que nous avons louée était impeccable, le processus de réservation a pris moins de cinq minutes, et la conduite silencieuse a rendu chaque trajet aussi agréable qu'un voyage en première classe.`,
  },
  {
    id: 'testimonial-2',
    name: 'Andreea Panayi',
    company: 'Tecon Cyprus Ltd',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    text: `En tant qu'entreprise engagée dans la réduction de son empreinte carbone, s'associer à ${siteName} pour notre flotte de véhicules de direction était une décision évidente. Les véhicules sont toujours impeccables, la livraison est ponctuelle, et leur localisateur de bornes de recharge nous a économisé d'innombrables heures.`,
  },
  {
    id: 'testimonial-3',
    name: 'Marcus Delacroix',
    company: 'Nordvolt Ventures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    text: `Nous avons organisé une semaine complète de transferts clients avec la flotte ${siteName} et les retours de nos invités ont été exceptionnels. Les voitures sont modernes, les intérieurs sont irréprochables, et l'application facilite la gestion de plusieurs réservations sans effort.`,
  },
  {
    id: 'testimonial-4',
    name: 'Sophie Laurent',
    company: 'Meridian Capital',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    text: `Le niveau de professionnalisme de ${siteName} est sans égal. De la première consultation à la livraison finale, chaque détail a été géré avec précision. Nos clients ont été profondément impressionnés par la qualité des véhicules.`,
  },
  {
    id: 'testimonial-5',
    name: 'Oliver Chen',
    company: 'Apex Automotive Group',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    text: `Vendre ma Porsche 911 via ${siteName} a été la transaction la plus fluide que j'aie jamais connue. Évaluation juste, zéro tracas, et le paiement est arrivé en moins de 48 heures. C'est ainsi que la vente de voitures de luxe devrait fonctionner.`,
  },
  {
    id: 'testimonial-6',
    name: 'Elena Vasquez',
    company: 'Riviera Holdings',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
    text: `Je cherchais un courtier de confiance depuis des années. ${siteName} a dépassé toutes mes attentes — tarification transparente, service irréprochable, et une sélection soignée qui s'adresse aux vrais connaisseurs de l'automobile.`,
  },
];
