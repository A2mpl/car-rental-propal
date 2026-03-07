export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  /** Valeurs du champ `category` dans BlogArticle qui appartiennent à cette catégorie */
  categories: string[];
}

export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  essais: {
    slug: 'essais',
    name: 'Essais & Avis',
    description:
      'Comparatifs détaillés et avis experts sur les meilleurs véhicules premium disponibles à la location à Bordeaux.',
    categories: ['Comparatif', 'Véhicule'],
  },
  guides: {
    slug: 'guides',
    name: "Guides d'Importation",
    description:
      'Nos guides pratiques pour louer un véhicule premium en toute sérénité — conditions, tarifs, assurances.',
    categories: ['Guide'],
  },
  fiscalite: {
    slug: 'fiscalite',
    name: 'Fiscalité & Malus',
    description:
      'Tout comprendre sur la fiscalité automobile, le malus écologique et les avantages fiscaux de la location longue durée.',
    categories: ['Fiscalité'],
  },
  electrique: {
    slug: 'electrique',
    name: 'Transition Électrique',
    description:
      "L'actualité des voitures électriques et hybrides premium : autonomie, recharge et performances comparées.",
    categories: ['Électrique'],
  },
  marche: {
    slug: 'marche',
    name: 'Analyse du Marché',
    description: 'Analyses et tendances du marché automobile premium en France et en Europe.',
    categories: ['Marché'],
  },
  lifestyle: {
    slug: 'lifestyle',
    name: 'Lifestyle & Évènements',
    description:
      "Mariages, événements corporatifs, road trips — nos conseils pour faire de chaque occasion un moment d'exception.",
    categories: ['Événement', 'Circuit'],
  },
  tendances: {
    slug: 'tendances',
    name: 'Tendances du Marché',
    description:
      "Les grandes tendances qui façonnent l'automobile premium de demain : design, technologie, motorisation.",
    categories: ['Tendances'],
  },
};

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES[slug];
}

export const BLOG_CATEGORY_SLUGS = Object.keys(BLOG_CATEGORIES);
