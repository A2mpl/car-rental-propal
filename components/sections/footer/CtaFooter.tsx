import { NavCol } from '@/components/sections/footer/NavCol';
import type { FooterLink } from '@/components/sections/footer/types';
import Button from '@/components/ui/button/Button';
import { siteContent } from '@/data/content';
import { siteName } from '@/lib/site';
import styles from './CtaFooter.module.css';

export default function CtaFooter() {
  const { ctaFooter } = siteContent;

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.ctaSide}>
            <h2 className={styles.heading}>{ctaFooter.heading}</h2>
            <p className={styles.body}>{ctaFooter.body}</p>
            <div className={styles.ctaBtnWrapper}>
              <Button href={ctaFooter.ctaBtn.href} size="sm">
                {ctaFooter.ctaBtn.label}
              </Button>
            </div>
          </div>

          <nav className={styles.navArea} aria-label="Footer navigation">
            <div className={styles.columns}>
              {ctaFooter.navColumns.map((col, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: DEV
                <NavCol key={i} links={col as readonly FooterLink[]} />
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>{ctaFooter.copyright}</p>
          <p className={styles.tagline}>Electric. Minimal. {siteName}.</p>
        </div>
      </div>
    </footer>
  );
}
