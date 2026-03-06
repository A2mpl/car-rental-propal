import Link from 'next/link';
import type { BlogArticle } from '@/data/blog';
import styles from './BlogArticleContent.module.css';

interface Props {
  article: Pick<BlogArticle, 'content'>;
}

export default function BlogArticleContent({ article }: Props) {
  return (
    <div className={styles.wrapper}>
      <article
        className={styles.content}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted content from data/blog.ts
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <aside className={styles.ctaBlock}>
        <p className={styles.ctaText}>Prêt à vivre l&apos;expérience ?</p>
        <Link href="/shop" className={styles.ctaBtn}>
          Voir nos véhicules disponibles →
        </Link>
      </aside>
    </div>
  );
}
