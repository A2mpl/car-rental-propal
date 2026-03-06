import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './BlogHero.module.css';

export default function BlogHero() {
  return (
    <section className={styles.section} aria-label="Blog">
      <div className={styles.inner}>
        <SectionLabel>Blog</SectionLabel>
        <h1 className={styles.heading}>
          Guides &amp; <em>Conseils</em>
        </h1>
        <p className={styles.sub}>Tout ce que vous devez savoir sur la location de voitures premium à Bordeaux.</p>
      </div>
    </section>
  );
}
