import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  const { evChargers } = siteContent;

  return (
    <section className={styles.section} aria-label="EV Chargers">
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>{evChargers.heading}</h2>
          <Link href="/shop" className={styles.arrowBtn} aria-label="Voir tous les véhicules">
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.imageGrid}>
          <Link
            href="/shop?bodies=supercar&bodies=sport&sort=price_desc"
            className={styles.imgCardLink}
            aria-label="Voir les véhicules premium"
          >
            <div className={`${styles.imgCell} ${styles.imgLarge} ${styles.imgLargeInner}`}>
              <Image
                src="/images/img_2.png"
                alt={evChargers.images[0].alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 48px), 40vw"
                className={styles.img}
              />
              <div className={styles.imgOverlay}>
                <h3 className={styles.imgOverlayTitle}>Véhicules Premium</h3>
                <p className={styles.imgOverlaySubtitle}>Nos meilleurs véhicules disponibles</p>
              </div>
            </div>
          </Link>

          <Link
            href="/shop?bodies=sport&bodies=supercar"
            className={styles.imgCardLink}
            aria-label="Voir les voitures sport et supercar"
          >
            <div className={`${styles.imgCell} ${styles.imgSmallB} ${styles.imgSmallBInner}`}>
              <Image
                src="/images/img_1.png"
                alt={evChargers.images[2].alt}
                fill
                sizes="(max-width: 1023px) calc(50vw - 28px), 33vw"
                className={styles.img}
              />
            </div>
          </Link>

          <div className={`${styles.imgCell} ${styles.imgSmallA} ${styles.imgSmallAInner}`}>
            <h3 className={styles.nbClients}>900+</h3>
            <span className={styles.statLabel}>Clients Satisfaits</span>
          </div>
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
        </div>
      </div>
    </section>
  );
}
