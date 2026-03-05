'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { headerVariants, listVariants } from '@/components/sections/faq/data';
import type { FAQItem } from '@/components/sections/faq/types';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import SectionHeader from '@/components/ui/sectionheader/SectionHeader';
import { siteContent } from '@/data/content';
import { faqItems } from '@/data/faq';
import styles from './Faq.module.css';

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
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionHeader
            label="FAQ"
            heading={faq.heading[0]}
            subtitle="Tout ce que vous devez savoir sur nos services. Vous ne trouvez pas ce que vous cherchez ? Contactez-nous."
          />
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
      </div>
    </section>
  );
}
