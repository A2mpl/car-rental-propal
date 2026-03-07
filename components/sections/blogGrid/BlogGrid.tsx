import Image from 'next/image';
import Link from 'next/link';
import {
  CATEGORY_IMAGE_CARDS,
  CATEGORY_TEXT_LINKS,
  INTRO_DESC,
  INTRO_LINES,
  SINCE_YEAR,
} from '@/components/sections/blogGrid/data';
import type { BlogGridProps } from '@/components/sections/blogGrid/types';
import styles from './BlogGrid.module.css';

export default function BlogGrid({ articles }: BlogGridProps) {
  // On retire le 1er article (Hero) et on garde les 6 suivants (index 1 à 7 exclus)
  const recentArticles = articles.slice(1, 7);

  return (
    <>
      <div className={styles.wrapper}>
        {/* 1. SECTION ÉDITO / INTRO */}
        <section className={styles.introSection}>
          <div className={styles.introGrid}>
            <div className={styles.introLabel}>
              <span>DEPUIS {SINCE_YEAR}</span>
            </div>
            <div className={styles.introContent}>
              <h2 className={styles.introTitle}>
                {INTRO_LINES[0]}
                <br />
                {INTRO_LINES[1]}
                <br />
                {INTRO_LINES[2]}
              </h2>
              <p className={styles.introDesc}>{INTRO_DESC}</p>
            </div>
          </div>
        </section>

        <section className={styles.categorySection}>
          <div className={styles.categoryGrid}>
            {CATEGORY_IMAGE_CARDS.slice(0, 2).map((cat) => (
              <Link key={cat.slug} href={`/blog/categorie/${cat.slug}`} className={styles.catImageCard}>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 640px"
                  className={styles.catImage}
                  loading="lazy"
                />
                <div className={styles.catOverlay}>
                  <h3 className={styles.catTitle}>{cat.label}</h3>
                  <span className={styles.catArrow}>→</span>
                </div>
              </Link>
            ))}

            <div className={styles.catTextCard}>
              <span className={styles.catTextLabel}>AUTRES THÉMATIQUES</span>
              <div className={styles.catLinksList}>
                {CATEGORY_TEXT_LINKS.map((cat) => (
                  <Link key={cat.slug} href={`/blog/categorie/${cat.slug}`}>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {CATEGORY_IMAGE_CARDS.slice(2).map((cat) => (
              <Link key={cat.slug} href={`/blog/categorie/${cat.slug}`} className={styles.catImageCard}>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 640px"
                  className={styles.catImage}
                  loading="lazy"
                />
                <div className={styles.catOverlay}>
                  <h3 className={styles.catTitle}>{cat.label}</h3>
                  <span className={styles.catArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <section className={styles.latestSection}>
        <div className={styles.latestInner}>
          <div className={styles.latestGrid}>
            <div className={styles.latestLabel}>
              <span>DERNIÈRES PUBLICATIONS</span>
            </div>

            <div className={styles.latestList}>
              {recentArticles.map((article, _) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.articleRow}>
                  <div className={styles.articleImageWrap}>
                    {article.image && (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className={styles.articleImage}
                        sizes="(max-width: 768px) 100vw, 400px"
                        loading="lazy"
                        priority={false}
                      />
                    )}
                  </div>

                  <div className={styles.articleContent}>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleDesc}>{article.description}</p>
                  </div>

                  <div className={styles.articleMeta}>
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
