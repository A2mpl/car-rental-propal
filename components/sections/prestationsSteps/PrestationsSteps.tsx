'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import { STEPS, sectionVariants } from './data';
import styles from './PrestationsSteps.module.css';

export default function PrestationsSteps() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className={styles.section} aria-label="Comment ça marche">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionLabel>Processus</SectionLabel>
          <h2 className={styles.heading}>
            <em>Comment</em> ça marche
          </h2>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepBar}>
                <motion.span
                  className={styles.num}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.08 + i * 0.16 }}
                >
                  {step.number}
                </motion.span>

                <motion.div
                  className={styles.stepLine}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.14 + i * 0.16 }}
                  style={{ originX: 0 }}
                  aria-hidden
                />

                <motion.h3
                  className={styles.title}
                  initial={{ opacity: 0, x: 14 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.26 + i * 0.16 }}
                >
                  {step.title}
                </motion.h3>
              </div>

              <motion.p
                className={styles.desc}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.32 + i * 0.16 }}
              >
                {step.desc}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
