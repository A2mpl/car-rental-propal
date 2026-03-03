'use client';

import type { BezierDefinition, Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import { useActionState, useEffect, useRef, useState } from 'react';
import { type ContactState, submitContact } from '@/app/(main)/contact/actions';
import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';
import styles from './ContactForm.module.css';

// Constante locale — ne peut pas être exportée depuis un fichier 'use server'
const INITIAL_CONTACT_STATE: ContactState = { status: 'idle' };

// ── Animation ─────────────────────────────────────────────────────────────────

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: luxeEase } },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxeEase, delay: 0.15 } },
};

// ── Constants ─────────────────────────────────────────────────────────────────

const SUBJECTS = [
  'Demande de location',
  'Question sur un véhicule',
  'Tarifs et disponibilités',
  'Service après-vente',
  'Partenariat',
  'Autre',
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // useActionState — validation serveur + état du formulaire (React 19 / Next.js 16)
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_CONTACT_STATE);

  // showForm passe à false dès qu'une soumission réussit.
  // On track l'objet state (pas uniquement state.status) pour que deux soumissions
  // réussies consécutives déclenchent bien l'écran de succès la seconde fois.
  const [showForm, setShowForm] = useState(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — track object ref
  useEffect(() => {
    if (state.status === 'success') setShowForm(false);
  }, [state]);

  // formKey remonte le <form> pour vider les champs après "envoyer un autre message"
  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setShowForm(true);
    setFormKey((k) => k + 1);
  };

  // Retourne l'erreur de champ uniquement en état 'error'
  const err = (field: 'firstName' | 'lastName' | 'email' | 'subject' | 'message') =>
    state.status === 'error' ? state.errors[field] : undefined;

  // Erreur générique (ex: exception serveur) = status error sans erreurs de champ
  const hasGenericError = state.status === 'error' && Object.keys(state.errors).length === 0;

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Formulaire de contact">
      <div className={styles.container}>
        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionLabel>Contact</SectionLabel>
          <h1 className={styles.heading}>Parlons-en</h1>
          <p className={styles.subtitle}>
            Une question sur nos véhicules, une demande de location ou simplement envie d'en savoir plus ?
            Notre équipe est là pour vous.
          </p>
        </motion.div>

        {/* ── Success ── */}
        {!showForm ? (
          <div className={styles.success}>
            <div className={styles.successIcon} aria-hidden="true">
              ✓
            </div>
            <h2 className={styles.successHeading}>Message envoyé !</h2>
            <p className={styles.successBody}>
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <div className={styles.resetBtnWrapper}>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Envoyer un autre message
              </Button>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <motion.form
            key={formKey}
            className={styles.form}
            action={formAction}
            noValidate
            variants={formVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Prénom + Nom */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="firstName" className={styles.fieldLabel}>
                  Prénom *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  aria-required="true"
                  aria-invalid={!!err('firstName')}
                  aria-describedby={err('firstName') ? 'firstName-error' : undefined}
                  className={`${styles.input} ${err('firstName') ? styles.inputError : ''}`}
                  placeholder="Jean"
                />
                {err('firstName') && (
                  <span id="firstName-error" className={styles.error} role="alert">
                    {err('firstName')}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName" className={styles.fieldLabel}>
                  Nom *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  aria-required="true"
                  aria-invalid={!!err('lastName')}
                  aria-describedby={err('lastName') ? 'lastName-error' : undefined}
                  className={`${styles.input} ${err('lastName') ? styles.inputError : ''}`}
                  placeholder="Dupont"
                />
                {err('lastName') && (
                  <span id="lastName-error" className={styles.error} role="alert">
                    {err('lastName')}
                  </span>
                )}
              </div>
            </div>

            {/* Email + Téléphone */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.fieldLabel}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!err('email')}
                  aria-describedby={err('email') ? 'email-error' : undefined}
                  className={`${styles.input} ${err('email') ? styles.inputError : ''}`}
                  placeholder="jean@exemple.fr"
                />
                {err('email') && (
                  <span id="email-error" className={styles.error} role="alert">
                    {err('email')}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.fieldLabel}>
                  Téléphone <span className={styles.optional}>(optionnel)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={styles.input}
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
            </div>

            {/* Objet */}
            <div className={styles.field}>
              <label htmlFor="subject" className={styles.fieldLabel}>
                Objet *
              </label>
              <select
                id="subject"
                name="subject"
                aria-required="true"
                aria-invalid={!!err('subject')}
                aria-describedby={err('subject') ? 'subject-error' : undefined}
                className={`${styles.select} ${err('subject') ? styles.inputError : ''}`}
              >
                <option value="">Choisir un objet…</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {err('subject') && (
                <span id="subject-error" className={styles.error} role="alert">
                  {err('subject')}
                </span>
              )}
            </div>

            {/* Message */}
            <div className={styles.field}>
              <label htmlFor="message" className={styles.fieldLabel}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                aria-required="true"
                aria-invalid={!!err('message')}
                aria-describedby={err('message') ? 'message-error' : undefined}
                className={`${styles.textarea} ${err('message') ? styles.inputError : ''}`}
                placeholder="Décrivez votre demande…"
              />
              {err('message') && (
                <span id="message-error" className={styles.error} role="alert">
                  {err('message')}
                </span>
              )}
            </div>

            {/* Bannière d'erreur générique (exception serveur) */}
            {hasGenericError && (
              <p className={styles.errorBanner} role="alert" aria-live="polite">
                Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.
              </p>
            )}

            <div className={styles.submitRow}>
              <Button type="submit" size="md" disabled={isPending}>
                {isPending ? 'Envoi en cours…' : 'Envoyer le message'}
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
