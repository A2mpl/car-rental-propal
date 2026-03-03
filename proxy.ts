import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  // ── Content Security Policy ─────────────────────────────────────────────────
  // script-src: 'strict-dynamic' → scripts chargés par un script noncé héritent
  //   automatiquement de la confiance (chunks Next.js couverts sans les lister).
  //   'unsafe-eval' requis en dev uniquement : React utilise eval() pour reconstruire
  //   les stack serveur côté navigateur (débogage). Absent de prod.
  // style-src: 'unsafe-inline' requis pour framer-motion (inline style attrs)
  //   et les injections CSS de Next.js.
  // img-src: CarCard utilise <Image unoptimized> → le browser charge les URLs
  //   directement (Unsplash, futurs CDNs AS24). https: couvre tous les cas ;
  //   les images ne peuvent pas exécuter de code → règle sans risque.
  // font-src: next/font/google auto-héberge les polices → 'self' suffit.
  // upgrade-insecure-requests: force HTTP → HTTPS au niveau navigateur.

    // TODO: remplacer :     img-src 'self' data: blob:;
  // ───────────────────────────────────────────────────────────────────────────
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''};
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
