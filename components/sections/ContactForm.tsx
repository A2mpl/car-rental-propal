'use client';

import type { BezierDefinition, Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './ContactForm.module.css';

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: luxeEase } },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxeEase, delay: 0.15 } },
};

const SUBJECTS = [
  'Demande de location',
  'Question sur un véhicule',
  'Tarifs et disponibilités',
  'Service après-vente',
  'Partenariat',
  'Autre',
] as const;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!form.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!form.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!form.subject) newErrors.subject = 'Veuillez choisir un objet';
    if (!form.message.trim()) newErrors.message = 'Message requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setStatus('success');
      setForm(INITIAL_STATE);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.success}>
            <div className={styles.successIcon} aria-hidden="true">✓</div>
            <h2 className={styles.successHeading}>Message envoyé !</h2>
            <p className={styles.successBody}>
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => setStatus('idle')}
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </section>
    );
  }

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
          <span className={styles.label}>Contact</span>
          <h1 className={styles.heading}>Parlons-en</h1>
          <p className={styles.subtitle}>
            Une question sur nos véhicules, une demande de location ou simplement envie d'en savoir plus ?
            Notre équipe est là pour vous.
          </p>
        </motion.div>

        {/* ── Form ── */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          variants={formVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >

          {/* Prénom + Nom */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.fieldLabel}>Prénom *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jean"
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.fieldLabel}>Nom *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                value={form.lastName}
                onChange={handleChange}
                placeholder="Dupont"
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>

          {/* Email + Téléphone */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.fieldLabel}>Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                value={form.email}
                onChange={handleChange}
                placeholder="jean@exemple.fr"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.fieldLabel}>Téléphone <span className={styles.optional}>(optionnel)</span></label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={styles.input}
                value={form.phone}
                onChange={handleChange}
                placeholder="+33 6 00 00 00 00"
              />
            </div>
          </div>

          {/* Objet */}
          <div className={styles.field}>
            <label htmlFor="subject" className={styles.fieldLabel}>Objet *</label>
            <select
              id="subject"
              name="subject"
              className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
              value={form.subject}
              onChange={handleChange}
            >
              <option value="">Choisir un objet…</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.subject && <span className={styles.error}>{errors.subject}</span>}
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label htmlFor="message" className={styles.fieldLabel}>Message *</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              value={form.message}
              onChange={handleChange}
              placeholder="Décrivez votre demande…"
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>

          {status === 'error' && (
            <p className={styles.errorBanner}>
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.
            </p>
          )}

          <div className={styles.submitRow}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>
          </div>

        </motion.form>
      </div>
    </section>
  );
}
