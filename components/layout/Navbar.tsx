'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/toggle/ThemeToggle';
import { siteContent } from '@/data/content';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { nav } = siteContent;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          {nav.logo}
        </Link>

        <ul className={styles.links}>
          {nav.links.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <li key={link.label} className={styles.linkWrapper}>
                <Link href={link.href} className={`${styles.link} ${isActive ? styles.linkActive : ''}`}>
                  {link.label}
                  <div className={styles.underline} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.icons}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobileMenuInner}>
          <ul className={styles.mobileLinks}>
            {nav.links.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={isActive ? styles.mobileLinkActive : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
