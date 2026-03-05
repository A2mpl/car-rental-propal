'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

  const underlineVariants = {
    initial: { width: 0, opacity: 0 },
    hover: { width: '100%', opacity: 1 },
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/" className={styles.logo}>
            {nav.logo}
          </Link>
        </motion.div>

        <ul className={styles.links}>
          {nav.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label} className={styles.linkWrapper}>
                <motion.div initial="initial" whileHover="hover" animate="initial" className={styles.motionContainer}>
                  <Link href={link.href} className={`${styles.link} ${isActive ? styles.linkActive : ''}`}>
                    {link.label}
                    <motion.div
                      className={styles.underline}
                      variants={underlineVariants}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </Link>
                </motion.div>
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileLinks}>
              {nav.links.map((link) => {
                const isActive = pathname === link.href;
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
