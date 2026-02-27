'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function ThemeProvider({ children, nonce }: { children: ReactNode, nonce: string }) {
  return (
    <NextThemeProvider attribute="data-theme"
                       defaultTheme="system" // On propose 'system' par défaut
                       enableSystem={true}    // On autorise la détection de l'OS
                       disableTransitionOnChange={false}
                       nonce={nonce}>
      {children}
    </NextThemeProvider>
  );
}
