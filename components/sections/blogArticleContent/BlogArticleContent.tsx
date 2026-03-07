import Link from 'next/link';
import { ARTICLE_CTA } from '@/components/sections/blogArticleContent/data';
import type { BlogArticleContentProps } from '@/components/sections/blogArticleContent/types';
import styles from './BlogArticleContent.module.css';

export default function BlogArticleContent({ article }: BlogArticleContentProps) {
  return (
    <div className={styles.wrapper}>
      <article
        className={styles.content}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted content from data/blog.ts
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <aside className={styles.ctaBlock}>
        <p className={styles.ctaText}>{ARTICLE_CTA.text}</p>
        <Link href={ARTICLE_CTA.linkHref} className={styles.ctaBtn}>
          {ARTICLE_CTA.linkLabel}
        </Link>
      </aside>
    </div>
  );
}
