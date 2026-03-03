import Button from '@/components/ui/Button';
import { siteContent } from '@/data/content';
import { siteName } from '@/lib/site';
import styles from './CtaFooter.module.css';

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

function NavCol({ links }: { links: readonly FooterLink[] }) {
  return (
    <ul className={styles.col}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

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
                <NavCol key={i} links={col as readonly FooterLink[]} />
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>{ctaFooter.copyright}</p>
          {/* TODO: adapter ce tagline si le nom de marque change */}
          <p className={styles.tagline}>Electric. Minimal. {siteName}.</p>
        </div>
      </div>
    </footer>
  );
}
