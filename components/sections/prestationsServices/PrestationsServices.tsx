'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import { gridVariants, SERVICES, sectionVariants } from './data';
import styles from './PrestationsServices.module.css';

export default function PrestationsServices() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.section} aria-label="Services inclus">
      <div className={styles.container}>
        <motion.div variants={sectionVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <SectionLabel>Inclus</SectionLabel>
          <h2 className={styles.heading}>
            Ce qui est <em>toujours inclus</em>
          </h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.label} className={styles.item}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3 className={styles.label}>{service.label}</h3>
                <p className={styles.desc}>{service.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
