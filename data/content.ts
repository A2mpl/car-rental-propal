export const siteContent = {
  nav: {
    logo: 'TIMELESS',
    links: [
      { label: 'HOME', href: '/', active: true },
      { label: 'SHOP', href: '/shop', active: false },
      { label: 'OUR MODELS', href: '/models', active: false, hasDropdown: true },
      { label: 'FIND US', href: '/find-us', active: false },
    ],
  },

  hero: {
    ghostText: 'ELECTRIC',
    heading: ['MODERN WAY TO', 'TRAVEL WITH', 'ELECTRIC CAR RENT', 'IN YOUR DEVICE!'],
    carImage: '/images/tesla-model-3.png',
    carImageAlt: 'Tesla Model 3 front-facing on a dark background',
  },

  featuredCar: {
    learnMore: {
      label: 'LEARN MORE',
      href: '/models',
    },
    prevAriaLabel: 'Previous car',
    nextAriaLabel: 'Next car',
  },

  evChargers: {
    ghostText: 'WHY',
    heading: 'WHY CHOOSING US',
    subheading: 'Everything you need to find your car',
    bullets: [
      'Wide selection of premium and exotic vehicles',
      'Best prices — fair, transparent, no hidden fees',
      'Expert service — white-glove delivery to your door',
    ],
    learnMore: {
      label: 'LEARN MORE',
      href: '/ev-chargers',
    },
    images: [
      {
        alt: 'Tesla charging port closeup, dramatic dark lighting',
      },
      {
        alt: 'Electric car alloy wheel closeup',
      },
      {
        alt: 'Red brake caliper detail on dark background',
      },
    ],
  },

  faq: {
    ghostText: 'QUESTIONS',
    heading: ['ANSWERS TO', 'A FEW GOOD QUESTIONS'],
    seeFaq: {
      label: 'SEE Faq',
      href: '/faq',
    },
  },

  testimonials: {
    ghostText: 'OUR CLIENTS',
    prevAriaLabel: 'Previous testimonial',
    nextAriaLabel: 'Next testimonial',
  },

  ctaFooter: {
    heading: 'GET READY TO BE ECO-CHIC?',
    body: 'Join thousands of drivers who have already made the switch to electric. Rent a Timeless vehicle today and experience the future of mobility — zero emissions, full performance.',
    navColumns: [
      [
        { label: 'PRIVACY AND LEGAL', href: '/privacy' },
        { label: 'VEHICLE RECALLS', href: '/recalls' },
        { label: 'CONTACT', href: '/contact' },
        {
          label: 'CAREERS',
          href: '/careers',
          badge: { text: 'New!', color: 'green' },
        },
      ],
      [
        { label: 'NEWS', href: '/news' },
        { label: 'ENGAGE', href: '/engage' },
        { label: 'LOCATION', href: '/find-us' },
      ],
    ],
    copyright: 'Timeless © 2022',
  },
} as const;
