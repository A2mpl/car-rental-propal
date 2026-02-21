'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import GhostText from '@/components/ui/GhostText';
import { siteContent } from '@/data/content';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  const { evChargers } = siteContent;

  const premiumWhiteHalo = '0 20px 50px rgba(255, 255, 255, 0.04), 0 0 20px rgba(255, 255, 255, 0.02)';
  const premiumYellowHalo = '0 15px 45px rgba(245, 197, 24, 0.08)';

  return (
    <section className={styles.section} aria-label="EV Chargers">
      <GhostText text={evChargers.ghostText} />

      <div className={styles.container}>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>{evChargers.heading}</h2>
          <button className={styles.arrowBtn} type="button" aria-label="See all chargers">
            <ArrowUpRight size={22} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.imageGrid}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={`${styles.imgCell} ${styles.imgLarge}`}
            style={{ boxShadow: premiumWhiteHalo, borderRadius: '32px' }}
          >
            <Image src="images/img_2.png" alt={evChargers.images[0].alt} fill className={styles.img} unoptimized />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '30px',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 60%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <h3
                style={{
                  color: 'white',
                  fontSize: '28px',
                  margin: 0,
                  fontFamily: 'var(--font-bebas)',
                  fontWeight: 'bold',
                }}
              >
                Premium Cars
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', maxWidth: '200px' }}>
                Top-tier vehicules available
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={`${styles.imgCell} ${styles.imgSmallA}`}
            style={{
              backgroundColor: '#E2E2E2',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: premiumYellowHalo,
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: 'black',
                fontFamily: 'var(--font-bebas)',
                fontSize: '48px',
                fontWeight: '900',
                margin: 0,
                lineHeight: 0.9,
              }}
            >
              900+
            </h3>
            <span
              style={{
                color: 'black',
                fontWeight: '800',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '10px',
              }}
            >
              Satisfied Clients
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className={`${styles.imgCell} ${styles.imgSmallB}`}
            style={{ borderRadius: '24px', boxShadow: premiumWhiteHalo }}
          >
            <Image src="images/img_1.png" alt={evChargers.images[2].alt} fill className={styles.img} unoptimized />
          </motion.div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.textSide}>
            <h3 className={styles.subheading}>{evChargers.subheading}</h3>
            <ul className={styles.bullets}>
              {evChargers.bullets.map((bullet: string) => (
                <li key={bullet} className={styles.bullet}>
                  <div className={styles.check} aria-hidden="true">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <title>CheckIcon</title>
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>{' '}
                  <p className={styles.bulletText}>{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ctaSide}>
            <Button href={evChargers.learnMore.href} size="md">
              {evChargers.learnMore.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
