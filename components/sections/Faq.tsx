'use client';

import type { BezierDefinition, Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import AccordionItem from '@/components/ui/AccordionItem';
import Button from '@/components/ui/Button';
import { siteContent } from '@/data/content';
import { faqItems } from '@/data/faq';
import styles from './Faq.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
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

const listVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxeEase, delay: 0.15 },
  },
};

export default function Faq() {
  const { faq } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const defaultOpenIndex: number = faqItems.findIndex((item: FAQItem) => item.defaultOpen === true);
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const handleToggle = (index: number): void => {
    setOpenIndex((prev: number) => (prev === index ? -1 : index));
  };

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Questions fréquentes">
        {/*<GhostText text={faq.ghostText} />*/}

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.label}>FAQ</span>
            <h2 className={styles.heading}>
              {faq.heading}
            </h2>
          <p className={styles.subtitle}>
            Tout ce que vous devez savoir sur nos services. Vous ne trouvez pas ce que vous cherchez ? Contactez-nous.
          </p>
        </motion.div>

        <motion.ul
          className={styles.accordion}
          aria-label="Accordéon FAQ"
          variants={listVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {faqItems.map((item: FAQItem, index: number) => (
            <li key={item.id}>
              <AccordionItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </li>
          ))}
        </motion.ul>

        <motion.div
          className={styles.ctaRow}
          variants={listVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Button href={faq.seeFaq.href} size="sm">
            {faq.seeFaq.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
