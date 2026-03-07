import Image from 'next/image';
import Link from 'next/link';
import type { BlogArticle } from '@/data/blog';
import styles from './BlogCategoryArticles.module.css';

interface Props {
  articles: BlogArticle[];
  categoryName: string;
}

export default function BlogCategoryArticles({ articles, categoryName }: Props) {
  if (articles.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Aucun article pour le moment</p>
            <p className={styles.emptyDesc}>
              Nous préparons du contenu sur <em>{categoryName}</em>. Revenez bientôt.
            </p>
            <Link href="/blog" className={styles.emptyLink}>
              ← Voir tous les articles
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label={`Articles — ${categoryName}`}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.card}>
              {article.image && (
                <div className={styles.imageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 36px), calc(33vw - 48px)"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{article.category}</span>
                  <span className={styles.metaDot} aria-hidden>
                    ·
                  </span>
                  <span className={styles.readTime}>{article.readTime} min de lecture</span>
                </div>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.desc}>{article.description}</p>
                <div className={styles.footer}>
                  <time dateTime={article.date} className={styles.date}>
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className={styles.readMore} aria-hidden>
                    Lire →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
