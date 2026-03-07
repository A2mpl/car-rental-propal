import { PRESTATIONS_HERO } from '@/components/sections/prestationsHero/data';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './PrestationsHero.module.css';

export default function PrestationsHero() {
  return (
    <section className={styles.section} aria-label="Présentation des prestations">
      <div className={styles.inner}>
        <SectionLabel>{PRESTATIONS_HERO.label}</SectionLabel>
        <h1 className={styles.heading}>
          {PRESTATIONS_HERO.heading} <em>{PRESTATIONS_HERO.headingEmphasis}</em>
        </h1>
        <p className={styles.sub}>{PRESTATIONS_HERO.sub}</p>
      </div>
    </section>
  );
}
