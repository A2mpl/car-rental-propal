# car-rental-propal

Site vitrine de courtage automobile — Next.js 16 App Router, React 19, TypeScript.

---

## Stack

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router, Server Actions, standalone output) |
| React | 19.2.3 | UI (useActionState, form actions) |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | v4 | Styles utilitaires |
| CSS Modules | — | Styles scopés par composant |
| Framer Motion | ^12 | Animations (package `motion`) |
| GSAP | ^3 | Animations avancées |
| next-themes | ^0.4 | Dark / light mode |
| Biome | 2.0.6 | Lint + format (remplace ESLint + Prettier) |

---

## Prérequis

- **Node.js** ≥ 22 (LTS recommandé)
- **npm** ≥ 10 (inclus avec Node.js 22)

---

## Installation

```bash
git clone <repo-url>
cd car-rental-propal
npm install
```

### Variables d'environnement

```bash
cp .env.local.example .env.local
```

Éditer `.env.local` :

```env
# Nom de marque (baked dans le bundle client au build)
NEXT_PUBLIC_SITE_NAME=Timeless
NEXT_PUBLIC_SITE_URL=https://timeless-cars.fr

# API AutoScout24 — optionnel, l'app utilise des données mock si absent
AS24_CLIENT_ID=your_client_id
AS24_CLIENT_SECRET=your_client_secret
AS24_MARKET=FR

# Email destinataire du formulaire de contact (configurer l'envoi dans actions.ts)
# CONTACT_EMAIL=contact@timeless-cars.fr
```

---

## Commandes de développement

```bash
# Serveur de développement (Turbopack)
npm run dev

# Vérification types TypeScript
npm run typecheck

# Lint (Biome)
npm run lint

# Lint + format (auto-fix)
npm run check:fix

# Build de production
npm run build

# Serveur de production (après build)
npm run start
```

---

## Architecture des pages

```
app/
├── layout.tsx                   # Layout racine — metadata, JSON-LD, CSP nonce
│
├── (main)/                      # Groupe de routes avec Navbar + Footer
│   ├── layout.tsx               # Layout partagé : <Navbar> + <CtaFooter>
│   │
│   ├── page.tsx                 # / — Page d'accueil
│   │                            #   Hero → BrandStrip → WhyUs → HowItWorks
│   │                            #   → SellYourCar → Testimonials → Faq
│   │
│   ├── shop/
│   │   ├── page.tsx             # /shop — Catalogue véhicules (SSR + filtres URL)
│   │   ├── ShopClient.tsx       # Orchestrateur client (filtres + grille)
│   │   ├── ShopControls.tsx     # Barre de recherche + tri
│   │   ├── PaginatedCarGrid.tsx # Grille paginée
│   │   ├── InfiniteCarGrid.tsx  # Grille scroll infini
│   │   ├── actions.ts           # Server Actions (filtres)
│   │   └── loading.tsx          # Skeleton Suspense
│   │
│   ├── contact/
│   │   ├── page.tsx             # /contact — Page formulaire de contact
│   │   └── actions.ts           # Server Action submitContact (validation serveur)
│   │
│   └── privacy/
│       └── page.tsx             # /privacy — Mentions légales (noindex)
│
├── api/
│   └── cars/
│       └── route.ts             # GET /api/cars — AutoScout24 ou données mock
│
├── sitemap.ts                   # Sitemap XML dynamique
└── robots.ts                    # robots.txt
```

---

## Architecture des composants

```
components/
│
├── layout/
│   ├── Navbar.tsx               # Navigation principale + ThemeToggle
│   └── ThemeProvider.tsx        # Fournisseur dark/light mode (next-themes)
│
├── sections/                    # Sections de page (utilisées dans page.tsx)
│   ├── Hero.tsx                 # Section hero avec CTA
│   ├── BrandStrip.tsx           # Défilement logos marques (BMW, Audi, Porsche…)
│   ├── WhyUs.tsx                # Avantages différenciants
│   ├── HowItWorks.tsx           # Processus en étapes
│   ├── SellYourCar.tsx          # CTA vente de véhicule
│   ├── Testimonials.tsx         # Carousel avis clients
│   ├── Faq.tsx                  # Accordéon FAQ
│   ├── ContactForm.tsx          # Formulaire de contact (useActionState)
│   ├── CtaFooter.tsx            # Footer avec CTA + colonnes de navigation
│   └── icons/                  # Logos SVG marques (Audi, BMW, Ferrari…)
│
├── shop/
│   ├── CarCard.tsx              # Carte véhicule (photo, prix, specs)
│   └── FilterSidebar.tsx        # Filtres (marque, carburant, prix…)
│
└── ui/                          # Composants atomiques réutilisables
    ├── Button.tsx               # Bouton (variants: primary, ghost ; href ou onClick)
    ├── SectionLabel.tsx         # Label de section (ex: "Contact")
    ├── SectionHeader.tsx        # En-tête de section (titre + sous-titre)
    ├── AccordionItem.tsx        # Item accordéon (utilisé dans Faq)
    ├── SearchBar.tsx            # Barre de recherche
    ├── GhostText.tsx            # Texte fantôme décoratif
    └── ThemeToggle.tsx          # Bouton bascule dark/light
```

---

## Données et intégration API

```
lib/
├── site.ts                      # Source de vérité : siteName + siteUrl (env vars)
├── autoscout24.ts               # Types, données mock, filter/sort, parseSearchParams
└── as24/
    ├── client.ts                # Client OAuth2 AutoScout24 (token + cache)
    ├── adapter.ts               # Adaptateur réponse AS24 → type interne
    ├── params.ts                # Construction des query params AS24
    ├── types.ts                 # Types AS24 API
    └── index.ts                 # Point d'entrée

data/
├── cars.ts                      # Données mock véhicules (fallback sans API)
├── content.ts                   # Contenu texte du site (headings, footer nav…)
├── faq.ts                       # Questions / réponses FAQ
└── testimonials.ts              # Témoignages clients
```

**Comportement de l'API véhicules :**
- Si `AS24_CLIENT_ID` est défini → appel à l'API AutoScout24 réelle
- Sinon → fallback sur les données mock de `data/cars.ts`

---

## Sécurité

| Mécanisme | Fichier | Détail |
|---|---|---|
| CSP avec nonces | `proxy.ts` | Généré par requête, `strict-dynamic`, `unsafe-eval` en dev uniquement |
| Headers statiques | `next.config.ts` | HSTS, X-Frame-Options, CORP, nosniff, Referrer-Policy |
| Validation formulaire | `contact/actions.ts` | Validation serveur avant tout envoi |
| Secrets hors bundle | `.env.local` | `AS24_*` sans préfixe `NEXT_PUBLIC_` → serveur uniquement |
| Utilisateur non-root | `Dockerfile` | UID/GID 1001 dans le conteneur |

---

## Docker — Build et déploiement

### Prérequis

- Docker ≥ 24

### Comprendre les deux types de variables

| Type | Exemple | Quand injecter |
|---|---|---|
| **Build-time** (baked dans le JS client) | `NEXT_PUBLIC_SITE_NAME` | `--build-arg` au `docker build` |
| **Runtime** (lues côté serveur) | `AS24_CLIENT_ID`, `CONTACT_EMAIL` | `-e` au `docker run` |

### Build de l'image

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_NAME=Timeless \
  --build-arg NEXT_PUBLIC_SITE_URL=https://timeless-cars.fr \
  -t timeless-cars:latest \
  .
```

### Lancer le conteneur

```bash
docker run -d \
  -p 3000:3000 \
  -e AS24_CLIENT_ID=your_client_id \
  -e AS24_CLIENT_SECRET=your_client_secret \
  -e AS24_MARKET=FR \
  -e CONTACT_EMAIL=contact@timeless-cars.fr \
  --name timeless-cars \
  timeless-cars:latest
```

L'app est disponible sur `http://localhost:3000`.

### Avec Docker Compose (recommandé en production)

```yaml
# compose.yml
services:
  web:
    image: timeless-cars:latest
    build:
      context: .
      args:
        NEXT_PUBLIC_SITE_NAME: Timeless
        NEXT_PUBLIC_SITE_URL: https://timeless-cars.fr
    ports:
      - "3000:3000"
    environment:
      AS24_CLIENT_ID: ${AS24_CLIENT_ID}
      AS24_CLIENT_SECRET: ${AS24_CLIENT_SECRET}
      AS24_MARKET: FR
      CONTACT_EMAIL: ${CONTACT_EMAIL}
    restart: unless-stopped
```

```bash
# Build + démarrage
docker compose up -d --build

# Logs
docker compose logs -f web

# Arrêt
docker compose down
```

### Commandes utiles

```bash
# Inspecter l'image (vérifier la taille finale ~50 MB)
docker image ls timeless-cars

# Ouvrir un shell dans le conteneur
docker exec -it timeless-cars sh

# Arrêter / supprimer le conteneur
docker stop timeless-cars && docker rm timeless-cars
```

---

## Modifier le nom de marque

Le nom **Timeless** est centralisé dans `lib/site.ts` via la variable `NEXT_PUBLIC_SITE_NAME`.

Pour le changer sans toucher au code :

```bash
# En dev
echo "NEXT_PUBLIC_SITE_NAME=NouveauNom" >> .env.local

# En Docker
docker build --build-arg NEXT_PUBLIC_SITE_NAME=NouveauNom ...
```

Tous les titres, metadata, JSON-LD, footer et témoignages se mettent à jour automatiquement.
