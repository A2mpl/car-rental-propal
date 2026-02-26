'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="data-theme" defaultTheme="light" disableTransitionOnChange={false}>
      {children}
    </NextThemeProvider>
  );
}
