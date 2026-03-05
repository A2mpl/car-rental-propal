'use client';

import { motion, useInView } from 'framer-motion';
import { useActionState, useEffect, useRef, useState } from 'react';
import {  submitContact } from '@/app/(main)/contact/actions';
import Button from '@/components/ui/button/Button';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './ContactForm.module.css';
import {formVariants, headerVariants, INITIAL_CONTACT_STATE, SUBJECTS} from "@/components/sections/contactForm/data";

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_CONTACT_STATE);

  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    if (state.status === 'success') setShowForm(false);
  }, [state]);

  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setShowForm(true);
    setFormKey((k) => k + 1);
  };

  const err = (field: 'firstName' | 'lastName' | 'email' | 'subject' | 'message') =>
    state.status === 'error' ? state.errors[field] : undefined;

  const hasGenericError = state.status === 'error' && Object.keys(state.errors).length === 0;

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Formulaire de contact">
      <div className={styles.container}>
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
          <motion.form
            key={formKey}
            className={styles.form}
            action={formAction}
            noValidate
            variants={formVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
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
