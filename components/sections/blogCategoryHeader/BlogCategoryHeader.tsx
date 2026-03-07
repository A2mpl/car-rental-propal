import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import type { BlogCategory } from '@/data/blogCategories';
import styles from './BlogCategoryHeader.module.css';

interface Props {
  category: BlogCategory;
  count: number;
}

export default function BlogCategoryHeader({ category, count }: Props) {
  return (
    <header className={styles.header}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
        <div className={styles.breadcrumbInner}>
          <Link href="/blog" className={styles.breadcrumbLink}>
            <ArrowLeft size={14} aria-hidden />
            <span>Blog</span>
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <span className={styles.breadcrumbCurrent}>{category.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <SectionLabel>Catégorie</SectionLabel>
          <h1 className={styles.heading}>{category.name}</h1>
          <p className={styles.description}>{category.description}</p>
          <span className={styles.count}>
            {count} article{count !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </header>
  );
}
