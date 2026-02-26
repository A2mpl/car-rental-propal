'use client';
import type { BezierDefinition, Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  text: string;
}

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: luxeEase },
  },
};

const trackVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: luxeEase, delay: 0.2 },
  },
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <svg className={styles.quoteMark} width="24" height="18" viewBox="0 0 32 24" fill="none" aria-hidden="true">
            <path
              d="M0 24V14.4C0 11.73 0.48 9.27 1.44 7.02C2.44 4.77 3.82 2.88 5.58 1.35L9.36 4.05C8.16 5.25 7.22 6.6 6.54 8.1C5.9 9.56 5.54 11.13 5.46 12.81H10.8V24H0ZM18 24V14.4C18 11.73 18.48 9.27 19.44 7.02C20.44 4.77 21.82 2.88 23.58 1.35L27.36 4.05C26.16 5.25 25.22 6.6 24.54 8.1C23.9 9.56 23.54 11.13 23.46 12.81H28.8V24H18Z"
              fill="currentColor"
            />
          </svg>

          <div className={styles.cardAuthor}>
            <div className={styles.avatarWrapper}>
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={32}
                height={32}
                className={styles.avatar}
                unoptimized
              />
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{testimonial.name}</span>
              <span className={styles.authorCompany}>{testimonial.company}</span>
            </div>
          </div>
        </div>

        <p className={styles.cardText}>{testimonial.text}</p>
      </div>

      <div className={styles.cardGlow} aria-hidden="true" />
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const midpoint: number = Math.ceil(testimonials.length / 2);
  const rowOne: Testimonial[] = testimonials.slice(0, midpoint);
  const rowTwo: Testimonial[] = testimonials.slice(midpoint);

  const rowOneDuped: Testimonial[] = [...rowOne, ...rowOne, ...rowOne];
  const rowTwoDuped: Testimonial[] = [...rowTwo, ...rowTwo, ...rowTwo];

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Témoignages clients">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.label}>Témoignages</span>
          <h2 className={styles.heading}>CE QUE DISENT NOS CLIENTS</h2>
          <p className={styles.subtitle}>
            Plébiscité par des collectionneurs avertis et des passionnés d&apos;automobile qui n&apos;acceptent rien de
            moins que l&apos;excellence.
          </p>
        </motion.div>
      </div>

      <motion.div
        className={styles.marqueeWrapper}
        variants={trackVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className={styles.fadeBefore} aria-hidden="true" />
        <div className={styles.fadeAfter} aria-hidden="true" />

        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
            {rowOneDuped.map((t: Testimonial, i: number) => (
              <TestimonialCard key={`r1-${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.scrollRight}`}>
            {rowTwoDuped.map((t: Testimonial, i: number) => (
              <TestimonialCard key={`r2-${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
