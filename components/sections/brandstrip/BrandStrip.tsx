'use client';

import { motion } from 'framer-motion';
import { LOGOS, scrollTransition } from '@/components/sections/brandstrip/data';
import styles from './BrandStrip.module.css';

export default function BrandStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.track}>
          <motion.div
            className={styles.strip}
            animate={scrollTransition.animate}
            transition={scrollTransition.transition}
          >
            {[...LOGOS, ...LOGOS, ...LOGOS].map((Logo, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: DEV
                key={index}
                className={styles.logo}
              >
                <Logo />
              </div>
            ))}
          </motion.div>
        </div>

        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />
      </div>
    </section>
  );
}
