export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'COMMENT LOUER UNE VOITURE ÉLECTRIQUE ?',
    answer:
      'Parcourez notre flotte sur la page NOS MODÈLES, sélectionnez le véhicule de votre choix, choisissez vos dates de location et remplissez le formulaire de réservation. Vous pouvez également utiliser notre application mobile disponible sur Google Play et l\'App Store. Un permis de conduire valide et une carte de crédit sont requis au moment de la réservation.',
  },
  {
    id: 'faq-2',
    question: 'COMMENT VÉRIFIER LE STATUT DE MA RÉSERVATION ?',
    answer:
      'Après avoir finalisé votre réservation, vous recevrez un e-mail de confirmation contenant votre code de réservation unique. Vous pouvez suivre le statut en temps réel de votre réservation en saisissant ce code dans la section « Suivre ma réservation » de l\'application ou sur notre site web dans le menu MES RÉSERVATIONS.',
    defaultOpen: true,
  },
  {
    id: 'faq-3',
    question: 'COMMENT MODIFIER UNE RÉSERVATION ?',
    answer:
      'Les modifications d\'une réservation existante — date de prise en charge, date de retour ou choix du véhicule — peuvent être effectuées jusqu\'à 24 heures avant l\'heure de prise en charge prévue. Connectez-vous à votre compte, accédez à MES RÉSERVATIONS, sélectionnez la réservation à modifier et suivez le processus de modification.',
  },
  {
    id: 'faq-4',
    question: 'COMMENT ANNULER UNE RÉSERVATION ?',
    answer:
      'Les annulations effectuées plus de 48 heures avant la prise en charge sont intégralement remboursées. Les annulations dans les 48 heures peuvent faire l\'objet d\'une retenue d\'un jour. Pour annuler, accédez à MES RÉSERVATIONS, sélectionnez votre réservation et appuyez sur ANNULER LA COMMANDE. Vous recevrez une confirmation d\'annulation et les détails du remboursement par e-mail.',
  },
  {
    id: 'faq-5',
    question: 'QUE FAIRE EN CAS D\'ÉCHEC DE PAIEMENT SUR TIMELESS ?',
    answer:
      'Si votre commande échoue lors du paiement, vérifiez que votre moyen de paiement est valide et que vos informations de facturation sont correctes. Aucun débit ne sera appliqué pour une commande échouée. Si le problème persiste, contactez notre équipe d\'assistance via la page CONTACT ou appelez notre assistance disponible 24h/24 — nous résoudrons le problème et confirmerons votre réservation dans les plus brefs délais.',
  },
];
