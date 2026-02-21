'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {ClipboardCheck, ScanEye, Wallet} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Variants, BezierDefinition } from 'framer-motion'
import GhostText from '@/components/ui/GhostText'
import styles from './HowItWorks.module.css'

interface Step {
    number: string
    title: string
    desc: string
    icon: LucideIcon
}

const steps: Step[] = [
    {
        number: '01',
        title: 'Get a Quote',
        desc: 'Submit your vehicle details online and receive a competitive market valuation within 24 hours.',
        icon: ClipboardCheck,
    },
    {
        number: '02',
        title: 'Vehicle Inspection',
        desc: 'Our specialists conduct a thorough assessment at your convenience — at home or at our showroom.',
        icon: ScanEye,
    },
    {
        number: '03',
        title: 'Get Paid',
        desc: 'Accept the offer and receive secure payment within 48 hours. We handle all paperwork and transfers.',
        icon: Wallet,
    },
]

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1]

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: luxeEase,
            delay: i * 0.15,
        },
    }),
}

const progressVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: (i: number) => ({
        scaleX: 1,
        transition: {
            duration: 0.8,
            ease: luxeEase,
            delay: 0.3 + i * 0.15,
        },
    }),
}

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: luxeEase },
    },
}

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-label="How It Works"
        >
            <GhostText text="PROCESS" />

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <span className={styles.label}>How It Works</span>
                    <h2 className={styles.heading}>
                        THREE SIMPLE STEPS<br />TO SELL YOUR CAR
                    </h2>
                    <p className={styles.subtitle}>
                        From valuation to payment, our white-glove process ensures
                        a seamless experience worthy of your vehicle.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {steps.map((step: Step, i: number) => {
                        const Icon = step.icon
                        return (
                            <div key={step.number} className={styles.cardWrapper}>
                                <motion.div
                                    className={styles.card}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={isInView ? 'visible' : 'hidden'}
                                >
                                    <div className={styles.cardInner}>
                                        <div className={styles.cardTop}>
                                            <span className={styles.cardNumber}>{step.number}</span>
                                            <div className={styles.cardIcon}>
                                                <Icon size={20} strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardTitle}>{step.title}</h3>
                                            <p className={styles.cardDesc}>{step.desc}</p>
                                        </div>
                                    </div>

                                    <div className={styles.cardGlow} aria-hidden="true" />
                                </motion.div>

                                {i < steps.length - 1 && (
                                    <div className={styles.progressTrack}>
                                        <motion.div
                                            className={styles.progressFill}
                                            custom={i}
                                            variants={progressVariants}
                                            initial="hidden"
                                            animate={isInView ? 'visible' : 'hidden'}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}