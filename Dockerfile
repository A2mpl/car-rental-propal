# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — deps
# Installe toutes les dépendances (dev incluses) pour le build.
# Le cache npm ci est invalidé uniquement si package-lock.json change.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — builder
# Compile l'application. Les variables NEXT_PUBLIC_* sont baked dans le bundle
# client à la compilation → elles doivent être passées en --build-arg.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Variables publiques baked à la compilation (optionnel — fallback dans lib/site.ts)
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3 — runner
# Image minimale : contient uniquement le serveur standalone Next.js.
# Avec output: 'standalone', Next.js trace les dépendances réellement utilisées
# → node_modules réduit de ~500 MB à ~50 MB dans l'image finale.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Utilisateur non-root — bonne pratique de sécurité
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Fichiers publics (servis directement par le serveur standalone)
COPY --from=builder /app/public ./public

# Sortie standalone + assets statiques
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static  ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
