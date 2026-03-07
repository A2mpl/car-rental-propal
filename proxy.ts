import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  // ── Content Security Policy ─────────────────────────────────────────────────
  // script-src: 'strict-dynamic' → scripts chargés par un script noncé héritent
  //   automatiquement de la confiance (chunks Next.js couverts sans les lister).
  //   'unsafe-inline' & https:/http: → ignorés par les navigateurs supportant
  //   nonces/'strict-dynamic', mais permettent la rétrocompat avec les vieux
  //   navigateurs qui ne comprennent pas ces mécanismes modernes.
  //   'unsafe-eval' requis en dev uniquement (React rebuild des stacks serveur).
  // style-src: 'unsafe-inline' requis pour framer-motion (inline style attrs)
  //   et les injections CSS de Next.js.
  // img-src: Next.js Image optimise les URLs Unsplash via /_next/image.
  //   https: couvre tous les CDNs externes sans risque (les images n'exécutent pas de code).
  // font-src: next/font auto-héberge les polices → 'self' suffit.
  // upgrade-insecure-requests: force HTTP → HTTPS au niveau navigateur.
  // ───────────────────────────────────────────────────────────────────────────
  // En dev, on retire 'strict-dynamic' car il désactive les sources host-based (http:)
  // ce qui bloque les chunks Turbopack chargés sans nonce (loading.tsx, etc.).
  // En prod, strict-dynamic + nonce = CSP stricte sans liste blanche d'URLs.
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' http: https:`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const csp = `
    default-src 'self';
    script-src ${scriptSrc};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self';
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Nonce transmis aux Server Components via header de requête interne
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Header CSP sur la réponse (visible par le navigateur)
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    {
      /*
       * Appliqué à toutes les routes sauf :
       * - api            (routes API — CSP inutile sur les réponses JSON)
       * - _next/static   (fichiers statiques)
       * - _next/image    (optimisation d'images)
       * - favicon.ico, sitemap.xml, robots.txt (métadonnées)
       */
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
