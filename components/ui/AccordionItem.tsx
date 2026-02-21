'use client'

import { useRef, useEffect, useState } from 'react'
import styles from './AccordionItem.module.css'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export default function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [answer])

  return (
    <div className={styles.item}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={styles.trigger}
      >
        <span className={styles.question}>{question}</span>
        <span className={[styles.chevron, isOpen ? styles.chevronOpen : ''].join(' ')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        className={styles.answerWrap}
        style={{ height: isOpen ? `${contentHeight}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className={styles.answerInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  )
}
