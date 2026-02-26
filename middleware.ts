import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ── Dev mode : pas de CSP strict ─────────────────────────────────────────
  // Turbopack HMR charge des chunks via element.src dynamique (TrustedScriptURL)
  // et React dev build utilise innerHTML sans policy Trusted Types.
  // Ces patterns sont incompatibles avec un CSP à nonces → on laisse passer
  // en local. Lighthouse teste toujours le build de production.
  // ─────────────────────────────────────────────────────────────────────────
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Nonce unique par requête — base64 d'un UUID aléatoire
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // ── Content Security Policy ───────────────────────────────────────────────
  // 'strict-dynamic' : les scripts chargés par un script noncé héritent
  //   automatiquement de la confiance → les chunks Next.js sont couverts.
  // 'unsafe-inline' et 'self' sont conservés en fallback pour anciens navigateurs
  //   (ignorés par les navigateurs supportant strict-dynamic).
  //
  // Note sur require-trusted-types-for : retiré car next-themes injecte un
  //   script de détection de thème via innerHTML sans policy Trusted Types,
  //   ce qui casserait le site en production. C'est un check "Unscored" dans
  //   Lighthouse — il n'impacte pas le score.
  // ─────────────────────────────────────────────────────────────────────────
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: blob: https://images.unsplash.com;
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    object-src 'none';
  `
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Transmission du nonce aux Server Components via header de requête
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
      // Exclut les assets statiques : pas besoin de nonce pour les fichiers
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
