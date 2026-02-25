export const siteContent = {
  nav: {
    logo: 'TIMELESS',
    links: [
      { label: 'ACCUEIL', href: '/', active: true },
      { label: 'BOUTIQUE', href: '/shop', active: false },
      { label: 'NOS MODÈLES', href: '/models', active: false, hasDropdown: true },
      { label: 'NOUS TROUVER', href: '/find-us', active: false },
    ],
  },

  hero: {
    ghostText: 'ÉLECTRIQUE',
    heading: ['LA FAÇON MODERNE DE', 'VOYAGER AVEC', 'UNE VOITURE ÉLECTRIQUE', 'À PORTÉE DE MAIN !'],
    carImage: '/images/tesla-model-3.png',
    carImageAlt: 'Tesla Model 3 face avant sur fond sombre',
  },

  featuredCar: {
    learnMore: {
      label: 'EN SAVOIR PLUS',
      href: '/models',
    },
    prevAriaLabel: 'Voiture précédente',
    nextAriaLabel: 'Voiture suivante',
  },

  evChargers: {
    ghostText: 'POURQUOI',
    heading: 'POURQUOI NOUS CHOISIR',
    subheading: 'Tout ce qu\'il vous faut pour trouver votre véhicule',
    bullets: [
      'Large sélection de véhicules premium et exotiques',
      'Meilleurs prix — justes, transparents, sans frais cachés',
      'Service expert — livraison à domicile avec soin',
    ],
    learnMore: {
      label: 'EN SAVOIR PLUS',
      href: '/ev-chargers',
    },
    images: [
      {
        alt: 'Gros plan sur la prise de charge Tesla, éclairage dramatique',
      },
      {
        alt: 'Gros plan sur une jante de voiture électrique',
      },
      {
        alt: 'Détail d\'étrier de frein rouge sur fond sombre',
      },
    ],
  },

  faq: {
    ghostText: 'QUESTIONS',
    heading: ['RÉPONSES À VOS QUESTIONS'],
    seeFaq: {
      label: 'VOIR LA FAQ',
      href: '/faq',
    },
  },

  testimonials: {
    ghostText: 'NOS CLIENTS',
    prevAriaLabel: 'Témoignage précédent',
    nextAriaLabel: 'Témoignage suivant',
  },

  ctaFooter: {
    heading: 'PRÊT À PASSER AVEC NOUS ?',
    body: 'Rejoignez des milliers de conducteurs qui ont déjà franchi le cap de l\'électrique. Louez un véhicule Timeless dès aujourd\'hui et vivez l\'avenir de la mobilité — zéro émission, performance totale.',
    navColumns: [
      [
        { label: 'MENTIONS LÉGALES', href: '/privacy' },
        { label: 'RAPPELS VÉHICULES', href: '/recalls' },
        { label: 'CONTACT', href: '/contact' },
        {
          label: 'RECRUTEMENT',
          href: '/careers',
        },
      ],
      [
        { label: 'ACTUALITÉS', href: '/news' },
        { label: 'COMMUNAUTÉ', href: '/engage' },
        { label: 'NOUS TROUVER', href: '/find-us' },
      ],
    ],
    copyright: 'Timeless © 2026',
  },
} as const;
