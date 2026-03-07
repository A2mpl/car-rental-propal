'use client';

import type { AccordionItemProps } from '@/components/ui/accordion/types';
import styles from './AccordionItem.module.css';

export default function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className={styles.item}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className={styles.trigger}>
        <span className={styles.question}>{question}</span>
        <span className={[styles.chevron, isOpen ? styles.chevronOpen : ''].join(' ')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>AccordionItemIcon</title>
            <path
              d="M3 5.5L8 10.5L13 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className={[styles.answerWrap, isOpen ? styles.answerWrapOpen : ''].join(' ')} aria-hidden={!isOpen}>
        <div className={styles.answerInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}
