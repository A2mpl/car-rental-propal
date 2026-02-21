'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants, BezierDefinition } from 'framer-motion'
import GhostText from '@/components/ui/GhostText'
import AccordionItem from '@/components/ui/AccordionItem'
import Button from '@/components/ui/Button'
import { faqItems } from '@/data/faq'
import { siteContent } from '@/data/content'
import styles from './FAQ.module.css'

interface FAQItem {
    id: string
    question: string
    answer: string
    defaultOpen?: boolean
}

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1]

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: luxeEase },
    },
}

const listVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: luxeEase, delay: 0.15 },
    },
}

export default function FAQ() {
    const { faq } = siteContent
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    const defaultOpenIndex: number = faqItems.findIndex(
        (item: FAQItem) => item.defaultOpen === true
    )
    const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex)

    const handleToggle = (index: number): void => {
        setOpenIndex((prev: number) => (prev === index ? -1 : index))
    }

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-label="Frequently asked questions"
        >
            <GhostText text={faq.ghostText} />

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <span className={styles.label}>FAQ</span>
                    {faq.heading.map((elem: string, index) => (
                        <h2 key={index} className={styles.heading}>
                            {elem}<br/>
                        </h2>
                    ))}
                    <p className={styles.subtitle}>
                        Everything you need to know about our services.
                        Can&apos;t find what you&apos;re looking for? Get in touch.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.accordion}
                    role="list"
                    aria-label="FAQ accordion"
                    variants={listVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {faqItems.map((item: FAQItem, index: number) => (
                        <div key={item.id} role="listitem">
                            <AccordionItem
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onToggle={() => handleToggle(index)}
                            />
                        </div>
                    ))}
                </motion.div>

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
    )
}