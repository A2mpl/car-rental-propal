import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogArticleHeaderProps } from '@/components/sections/blogArticleHeader/types';
import styles from './BlogArticleHeader.module.css';

export default function BlogArticleHeader({ article }: BlogArticleHeaderProps) {
  return (
    <div className={styles.sectionBlogArticleHeader}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/blog" className={styles.breadcrumbLink}>
          <ArrowLeft size={14} />
          <span>Blog</span>
        </Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{article.category}</span>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.meta}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.metaDot}>·</span>
            <time dateTime={article.date} className={styles.date}>
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className={styles.metaDot}>·</span>
            <span className={styles.readTime}>{article.readTime} min de lecture</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
        </div>
      </header>

      {/* Hero image */}
      {article.image && (
        <div className={styles.heroImageWrap}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={styles.heroImage}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 96px), 1184px"
            priority
            fetchPriority="high"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
}
