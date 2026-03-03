// ── Source de vérité du nom de marque et de l'URL du site ────────────────────
//
// Pour changer le nom : mettre à jour NEXT_PUBLIC_SITE_NAME dans .env.local.
// Le fallback 'Timeless' sera utilisé si la variable n'est pas définie.
//
// TODO: renseigner NEXT_PUBLIC_SITE_NAME en production quand le nom est arrêté.
// ─────────────────────────────────────────────────────────────────────────────

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Timeless';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://timeless-cars.fr';
