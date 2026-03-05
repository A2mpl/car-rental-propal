import type { Metadata } from 'next';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import { siteName } from '@/lib/site';
import styles from './Privacy.module.css';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: `Mentions légales de ${siteName}, courtier automobile à Bordeaux — éditeur, hébergement, propriété intellectuelle et données personnelles.`,
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <SectionLabel>Légal</SectionLabel>
            <h1 className={styles.heading}>Mentions Légales</h1>
            <p className={styles.updated}>Dernière mise à jour : 1er mars 2026</p>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Éditeur du site</h2>
              <p>
                Le site <strong>timeless-cars.fr</strong> est édité par :
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>Raison sociale :</strong> Timeless SAS
                </li>
                <li>
                  <strong>Siège social :</strong> [Adresse à compléter], France
                </li>
                <li>
                  <strong>SIRET :</strong> [Numéro à compléter]
                </li>
                <li>
                  <strong>Capital social :</strong> [Montant à compléter] €
                </li>
                <li>
                  <strong>Directeur de la publication :</strong> [Nom à compléter]
                </li>
                <li>
                  <strong>Contact :</strong>{' '}
                  <a href="mailto:contact@timeless-cars.fr" className={styles.link}>
                    contact@timeless-cars.fr
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Hébergement</h2>
              <p>Le site est hébergé par :</p>
              <ul className={styles.list}>
                <li>
                  <strong>Hébergeur :</strong> Vercel Inc.
                </li>
                <li>
                  <strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis
                </li>
                <li>
                  <strong>Site web :</strong>{' '}
                  <a href="https://vercel.com" className={styles.link} target="_blank" rel="noopener noreferrer">
                    vercel.com
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Propriété intellectuelle</h2>
              <p>
                L'ensemble des éléments constituant ce site (textes, images, graphismes, logo, icônes, sons, logiciels…)
                est la propriété exclusive de Timeless SAS ou de ses partenaires. Toute reproduction, représentation,
                modification, publication ou adaptation, totale ou partielle, des éléments du site, quel que soit le
                moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient est
                considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles
                L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Données personnelles (RGPD)</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) n° 2016/679 du 27 avril 2016 et à
                la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de
                rectification, d'effacement, de portabilité et d'opposition au traitement de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits ou pour toute question relative au traitement de vos données, vous pouvez
                contacter notre délégué à la protection des données à l'adresse suivante :{' '}
                <a href="mailto:privacy@timeless-cars.fr" className={styles.link}>
                  privacy@timeless-cars.fr
                </a>
                .
              </p>
              <p>
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de
                l'Informatique et des Libertés) —{' '}
                <a href="https://www.cnil.fr" className={styles.link} target="_blank" rel="noopener noreferrer">
                  www.cnil.fr
                </a>
                .
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Cookies</h2>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de traçage
                publicitaire n'est déposé sans votre consentement explicite. Vous pouvez à tout moment modifier vos
                préférences en matière de cookies via les paramètres de votre navigateur.
              </p>
              <p>
                Pour en savoir plus sur la gestion des cookies, consultez le site de la CNIL :{' '}
                <a
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cnil.fr/fr/cookies-et-autres-traceurs
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
