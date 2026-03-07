import Image from 'next/image';
import Link from 'next/link';
import type { BlogRelatedProps } from '@/components/sections/blogRelated/types';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './BlogRelated.module.css';

export default function BlogRelated({ articles }: BlogRelatedProps) {
  return (
    <section className={styles.section} aria-label="Articles similaires">
      <div className={styles.inner}>
        <SectionLabel>À lire aussi</SectionLabel>
        <h2 className={styles.heading}>Articles similaires</h2>
        <div className={styles.grid}>
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.card}>
              {article.image && (
                <div className={styles.imageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(33vw - 48px), 220px"
                    loading="lazy"
                  />
                </div>
              )}
              <div className={styles.content}>
                <span className={styles.category}>{article.category}</span>
                <h3 className={styles.title}>{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
