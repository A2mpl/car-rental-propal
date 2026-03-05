'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? (isDark ? 'Activer le mode clair' : 'Activer le mode sombre') : 'Changer de thème'}
    >
      {mounted && (
        <span key={isDark ? 'sun' : 'moon'} className={styles.icon}>
          {isDark ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
        </span>
      )}
    </button>
  );
}
