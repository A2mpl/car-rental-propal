import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  const { evChargers } = siteContent;

  const premiumWhiteHalo = '0 20px 40px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)';
  const premiumGreenHalo = '0 15px 45px rgba(62, 99, 86, 0.10), 0 4px 12px rgba(62, 99, 86, 0.06)';

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
            <div
              className={`${styles.imgCell} ${styles.imgLarge}`}
              style={{ boxShadow: premiumWhiteHalo, borderRadius: '32px', overflow: 'hidden' }}
            >
              <Image
                src="/images/img_2.png"
                alt={evChargers.images[0].alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 48px), 40vw"
                className={styles.img}
              />
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
                    color: 'var(--text-on-dark)',
                    fontSize: '28px',
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'bold',
                  }}
                >
                  Véhicules Premium
                </h3>
                <p
                  style={{
                    color: 'var(--text-on-dark)',
                    fontSize: '14px',
                    fontWeight: '500',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    marginTop: '6px',
                  }}
                >
                  Nos meilleurs véhicules disponibles
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/shop?bodies=sport&bodies=supercar"
            className={styles.imgCardLink}
            aria-label="Voir les voitures sport et supercar"
          >
            <div
              className={`${styles.imgCell} ${styles.imgSmallB}`}
              style={{ borderRadius: '24px', boxShadow: premiumWhiteHalo, overflow: 'hidden' }}
            >
              <Image
                src="/images/img_1.png"
                alt={evChargers.images[2].alt}
                fill
                sizes="(max-width: 1023px) calc(50vw - 28px), 33vw"
                className={styles.img}
              />
            </div>
          </Link>

          <div
            className={`${styles.imgCell} ${styles.imgSmallA}`}
            style={{
              backgroundColor: 'var(--card-stat-bg)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: premiumGreenHalo,
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <h3 className={styles.nbClients}>900+</h3>
            <span
              style={{
                color: 'var(--text-on-dark)',
                fontWeight: '800',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '10px',
              }}
            >
              Clients Satisfaits
            </span>
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
