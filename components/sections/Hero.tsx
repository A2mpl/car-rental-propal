'use client';

import { type BezierDefinition, motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import styles from './Hero.module.css';

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

const contentVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxeEase } },
};

const barVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxeEase, delay: 0.2 } },
};

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-label="Hero">
      {/* ── Container principal (Plus large) ── */}
      <div className={styles.imageContainer}>
        <Image
          src="/images/img_4.png" /* Remplace par ton image */
          alt="Véhicule de luxe"
          fill
          priority
          className={styles.image}
          fetchPriority="high"
          sizes="(max-width: 1600px) 100vw, 1600px"
        />
        <div className={styles.overlay} />

        {/* ── Texte & Bouton Mobile ── */}
        <motion.div className={styles.textContent} variants={contentVariants} initial="initial" animate="animate">
          <h1 className={styles.title}>Trouvez le véhicule de vos rêves</h1>
          <p className={styles.subtitle}>Votre courtier de confiance pour chaque trajet.</p>

          {/* 🔴 NOUVEAU : Bouton visible uniquement sur mobile */}
          <Link href="/shop" className={styles.mobileButton}>
            Explorer le Shop
          </Link>
        </motion.div>

        {/* ── Barre de recherche (Visible uniquement sur Desktop) ── */}
        <motion.div className={styles.searchContainer} variants={barVariants} initial="initial" animate="animate">
          <div className={styles.searchBarWrapper}>
            <SearchBar />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
