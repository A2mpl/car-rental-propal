import Image from 'next/image';
import Link from 'next/link';
import type { BlogHeroProps } from '@/components/sections/blogHero/types';
import styles from './BlogHero.module.css';

export default function BlogHero({ article }: BlogHeroProps) {
  return (
    <section className={styles.section} aria-label="Article à la une">
      <Link href={`/blog/${article.slug}`} className={styles.link}>
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={styles.image}
            sizes="100vw"
            priority
            fetchPriority="high"
            loading="eager"
          />
        )}
        <div className={styles.overlay} aria-hidden />
        <div className={styles.textBlock}>
          <span className={styles.label}>{article.category}</span>
          <h1 className={styles.heading}>{article.title}</h1>
          <span className={styles.readMore}>Lire l&apos;article →</span>
        </div>
      </Link>
    </section>
  );
}
