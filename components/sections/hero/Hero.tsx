'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/ui/search/SearchBar';
import styles from './Hero.module.css';
import {barVariants, contentVariants} from "@/components/sections/hero/data";

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-label="Hero">
      <div className={styles.imageContainer}>
        <Image
          src="/images/img_4.png"
          alt="Véhicule de luxe"
          fill
          priority
          className={styles.image}
          fetchPriority="high"
          sizes="(max-width: 1600px) 100vw, 1600px"
        />
        <div className={styles.overlay} />

        <motion.div className={styles.textContent} variants={contentVariants} initial="initial" animate="animate">
          <h1 className={styles.title}>Trouvez le véhicule de vos rêves</h1>
          <p className={styles.subtitle}>Votre courtier de confiance pour chaque trajet.</p>

          <Link href="/shop" className={styles.mobileButton}>
            Explorer le Shop
          </Link>
        </motion.div>

        <motion.div className={styles.searchContainer} variants={barVariants} initial="initial" animate="animate">
          <div className={styles.searchBarWrapper}>
            <SearchBar />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
