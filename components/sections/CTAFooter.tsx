import { siteContent } from '@/data/content'
import styles from './CTAFooter.module.css'

interface FooterLink {
  readonly label: string
  readonly href: string
  readonly badge?: { readonly text: string; readonly color: string }
}

function NavCol({ links }: { links: readonly FooterLink[] }) {
  return (
    <ul className={styles.col}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className={styles.navLink}>
            {link.label}
            {link.badge && (
              <span className={styles.badge} aria-label={`${link.badge.text} — new`}>
                {link.badge.text}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function CTAFooter() {
  const { ctaFooter } = siteContent

  const col0 = ctaFooter.navColumns[0] as readonly FooterLink[]
  const col1 = ctaFooter.navColumns[1] as readonly FooterLink[]

  const col1Items = col0.slice(0, 2)
  const col2Items = col1.slice(0, 2)
  const col3Items = [col0[2], col1[2]] as readonly FooterLink[]
  const col4Items = col0.slice(3) as readonly FooterLink[]

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.ctaSide}>
            <h2 className={styles.heading}>{ctaFooter.heading}</h2>
            <p className={styles.body}>{ctaFooter.body}</p>
          </div>

          <nav className={styles.navArea} aria-label="Footer navigation">
            <div className={styles.columns}>
              <NavCol links={col1Items} />
              <NavCol links={col2Items} />
              <NavCol links={col3Items} />
              <NavCol links={col4Items} />
            </div>
          </nav>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>{ctaFooter.copyright}</p>
          <p className={styles.tagline}>Electric. Minimal. Timeless.</p>
        </div>
      </div>
    </footer>
  )
}
