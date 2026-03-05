import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80"
                alt="Voiture de luxe prête pour la consignation"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                className={styles.img}
                unoptimized
              />
            </div>
          </div>

          <div className={styles.headingSide}>
            <h2 className={styles.heading}>VENDEZ VOTRE VOITURE EN TOUTE CONFIANCE</h2>
            <p className={styles.intro}>
              Que vous souhaitiez passer à un modèle supérieur ou simplement vous séparer de votre véhicule, nous
              proposons l&apos;expérience de vente la plus fluide et la plus premium pour les véhicules haut de gamme.
              Pas d&apos;annonces, pas de négociations — juste un prix juste et un service irréprochable.
            </p>
            <Button href="/sell">
              Obtenir une Estimation
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
