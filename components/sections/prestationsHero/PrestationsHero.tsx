import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './PrestationsHero.module.css';

export default function PrestationsHero() {
  return (
    <section className={styles.section} aria-label="Présentation des prestations">
      <div className={styles.inner}>
        <SectionLabel>Nos Offres</SectionLabel>
        <h1 className={styles.heading}>
          Location <em>Premium</em>
        </h1>
        <p className={styles.sub}>
          Des formules flexibles pour vivre l&apos;expérience des voitures d&apos;exception, sans compromis. Assurance,
          livraison et assistance incluses.
        </p>
      </div>
    </section>
  );
}
