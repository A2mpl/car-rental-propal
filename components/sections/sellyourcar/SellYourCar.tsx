import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { SELL_CONTENT } from '@/components/sections/sellyourcar/data';
import Button from '@/components/ui/button/Button';
import styles from './SellYourCar.module.css';

export default function SellYourCar() {
  return (
    <section className={styles.section} aria-label="Vendre votre voiture">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              <Image
                src={SELL_CONTENT.image}
                alt={SELL_CONTENT.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                className={styles.img}
              />
            </div>
          </div>

          <div className={styles.headingSide}>
            <h2 className={styles.heading}>{SELL_CONTENT.heading}</h2>
            <p className={styles.intro}>{SELL_CONTENT.intro}</p>
            <Button href={SELL_CONTENT.ctaHref}>
              {SELL_CONTENT.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
