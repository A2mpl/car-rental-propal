'use client';

import { motion, useInView } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import { gridVariants, headerVariants, OFFERS } from './data';
import styles from './PrestationsOffers.module.css';

export default function PrestationsOffers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.section} aria-label="Nos offres de location">
      <div className={styles.container}>
        <motion.div variants={headerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <SectionLabel>Formules</SectionLabel>
          <h2 className={styles.heading}>
            Choisissez votre <em>formule</em>
          </h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {OFFERS.map((offer) => (
            <div key={offer.id} className={`${styles.card} ${offer.highlight ? styles.cardHighlight : ''}`}>
              {offer.highlight && <span className={styles.popularBadge}>Le plus populaire</span>}

              <div className={styles.cardHeader}>
                <span className={styles.label}>{offer.label}</span>
                <p className={styles.subtitle}>{offer.subtitle}</p>
                <div className={styles.duration}>
                  <Clock size={13} aria-hidden="true" />
                  {offer.duration}
                </div>
              </div>

              <p className={styles.price}>{offer.price}</p>

              <ul className={styles.list} aria-label={`Inclus dans la formule ${offer.label}`}>
                {offer.included.map((item) => (
                  <li key={item} className={styles.itemIncl}>
                    <CheckCircle size={14} aria-hidden="true" />
                    {item}
                  </li>
                ))}
                {offer.excluded.map((item) => (
                  <li key={item} className={styles.itemExcl}>
                    <span className={styles.exclIcon} aria-hidden="true">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`${styles.cta} ${offer.highlight ? styles.ctaAccent : ''}`}
                aria-label={`Réserver la formule ${offer.label}`}
              >
                Réserver cette formule
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
