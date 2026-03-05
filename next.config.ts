import type { NextConfig } from 'next';

// ─────────────────────────────────────────────────────────────────────────────
// Le CSP est géré par middleware.ts (nonces par requête).
// Ces headers statiques complètent la couverture pour les navigateurs anciens
// et les directives qui n'ont pas besoin de nonce.
// ─────────────────────────────────────────────────────────────────────────────
const securityHeaders = [
  // ── Clickjacking — redondant avec frame-ancestors CSP, mais gardé pour
  //    les navigateurs anciens qui ne lisent pas le CSP ─────────────────────
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // ── HTTPS enforcement ─────────────────────────────────────────────────────
  // Déployer en staging sans preload d'abord, puis augmenter max-age.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // ── Cross-origin isolation ────────────────────────────────────────────────
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  // ── MIME sniffing ─────────────────────────────────────────────────────────
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // ── Referrer ─────────────────────────────────────────────────────────────
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // ── Permissions navigateur ────────────────────────────────────────────────
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  // Génère un serveur Node.js auto-suffisant dans .next/standalone/
  // → image Docker ~10× plus légère (pas de node_modules complet dans le runner)
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
