export interface Offer {
  id: string;
  label: string;
  subtitle: string;
  duration: string;
  price: string;
  /** Prix numérique pour JSON-LD */
  priceValue: number;
  included: readonly string[];
  excluded: readonly string[];
  highlight: boolean;
}
