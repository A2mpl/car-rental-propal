import Image from 'next/image';
import Link from 'next/link';
import type { BlogArticle } from '@/data/blog';
import styles from './BlogGrid.module.css';

interface Props {
  articles: BlogArticle[];
}

export default function BlogGrid({ articles }: Props) {
  return (
    <section className={styles.section} aria-label="Articles">
      <div className={styles.container}>
        <div className={styles.grid}>
          {articles.map((article, i) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.card}>
              {article.image && (
                <div className={styles.imageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(50vw - 60px), 580px"
                    priority={i === 0}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    loading={i === 0 ? undefined : 'lazy'}
                  />
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{article.category}</span>
                  <span className={styles.dot}>·</span>
                  <time dateTime={article.date} className={styles.date}>
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className={styles.dot}>·</span>
                  <span className={styles.read}>{article.readTime} min</span>
                </div>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.desc}>{article.description}</p>
                <span className={styles.cta}>Lire l&apos;article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
