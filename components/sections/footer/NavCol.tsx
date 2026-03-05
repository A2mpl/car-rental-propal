import styles from '@/components/sections/footer/CtaFooter.module.css';
import type { FooterLink } from '@/components/sections/footer/types';

export function NavCol({ links }: { links: readonly FooterLink[] }) {
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
