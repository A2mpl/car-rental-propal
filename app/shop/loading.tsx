import Navbar from '@/components/layout/Navbar';
import styles from './shop.module.css';

/**
 * Next.js App Router loading segment — displayed automatically while the
 * async ShopPage server component is streaming its response (e.g. during
 * filter changes that trigger a full server re-render).
 */
export default function ShopLoading() {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrap}>
        {/* Sidebar placeholder */}
        <div className={styles.sidebarPlaceholder} />

        {/* Grid skeleton */}
        <main className={styles.main}>
          <div className={styles.skeletonHeader}>
            <div className={styles.skeletonLine} style={{ width: 220, height: 36 }} />
            <div className={styles.skeletonLine} style={{ width: 140, height: 14 }} />
          </div>
          <div className={styles.skeletonSortBar} />
          <div className={styles.grid}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonLine} style={{ width: '35%' }} />
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLine} style={{ width: '60%' }} />
                  <div className={styles.skeletonLine} style={{ width: '45%' }} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
