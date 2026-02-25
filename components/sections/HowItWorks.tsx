'use client';
import type { BezierDefinition, Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ClipboardCheck, ScanEye, Wallet } from 'lucide-react';
import { useRef } from 'react';
import styles from './HowItWorks.module.css';

interface Step {
  number: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Obtenir une Estimation',
    desc: 'Soumettez les informations de votre véhicule en ligne et recevez une estimation compétitive sous 24 heures.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Inspection du Véhicule',
    desc: 'Nos spécialistes effectuent une évaluation approfondie à votre convenance — à domicile ou dans notre showroom.',
    icon: ScanEye,
  },
  {
    number: '03',
    title: 'Recevoir le Paiement',
    desc: 'Acceptez l\'offre et recevez un paiement sécurisé sous 48 heures. Nous gérons toutes les démarches administratives et les transferts.',
    icon: Wallet,
  },
];

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxeEase,
      delay: i * 0.15,
    },
  }),
};

const progressVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: luxeEase,
      delay: 0.3 + i * 0.15,
    },
  }),
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: luxeEase },
  },
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Comment ça marche">
        {/*<GhostText text="PROCESSUS" />*/}

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.label}>Comment ça marche</span>
          <h2 className={styles.heading}>
            TROIS ÉTAPES SIMPLES
          </h2>
          <p className={styles.subtitle}>
            De l&apos;estimation au paiement, notre processus irréprochable garantit une expérience sans accroc, à la hauteur de votre véhicule.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {steps.map((step: Step, i: number) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className={styles.cardWrapper}>
                <motion.div
                  className={styles.card}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardNumber}>{step.number}</span>
                      <div className={styles.cardIcon}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{step.title}</h3>
                      <p className={styles.cardDesc}>{step.desc}</p>
                    </div>
                  </div>

                  <div className={styles.cardGlow} aria-hidden="true" />
                </motion.div>

                {i < steps.length - 1 && (
                  <div className={styles.progressTrack}>
                    <motion.div
                      className={styles.progressFill}
                      custom={i}
                      variants={progressVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
