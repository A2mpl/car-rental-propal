import type { Metadata } from 'next';
import { Archivo, Saira } from 'next/font/google';
import './globals.css';

const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
  display: 'swap',
});

/**
 * Police display — Archivo 900 italic = visuellement identique à Archivo Black
 * mais avec le support italic natif (Archivo_Black ne propose pas d'italic).
 * Pour tester une autre fonte : changer l'import + variable, puis globals.css.
 * Exemples : Playfair_Display, Cormorant_Garamond, Oswald
 */
const archivo = Archivo({
  weight: ['900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Timeless — Location de Voitures Électriques',
  description: 'La façon moderne de voyager avec la location de voitures électriques à portée de main !',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${saira.variable} ${archivo.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
