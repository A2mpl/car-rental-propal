'use client'
import { useState } from 'react'
import {
    AnimatePresence,
    motion,
    type Variants,
    type Transition,
    type BezierDefinition,
} from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import styles from './Hero.module.css'
import GhostText from "@/components/ui/GhostText";

interface CarModel {
    number: string
    name: string
    range: string
    sprint: string
    power: string
    desc: string
    thumb: string
    hero: string
}

const models: CarModel[] = [
    {
        number: '01',
        name: 'Tesla Model 3',
        range: '358 MI',
        sprint: '3.1 S',
        power: '670 HP',
        desc: 'Dual Motor All-Wheel Drive platform has the longest range, and now delivers incredible performance.',
        thumb: '/images/hero-side.png',
        hero: '/images/hero.png',
    },
    {
        number: '02',
        name: 'Tesla Model S',
        range: '405 MI',
        sprint: '1.99 S',
        power: '1020 HP',
        desc: 'The quickest accelerating car in production today. Tri-Motor AWD platform provides instant power.',
        thumb: '/images/mclaren-side.png',
        hero: '/images/mclaren.png',
    },
]

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1]
const exitEase: BezierDefinition = [0.4, 0, 1, 1]


const carVariants: Variants = {
    initial: (dir: number) => ({
        opacity: 0,
        x: dir > 0 ? 40 : -40,
        scale: 1.03,
        filter: 'brightness(0)',
    }),
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'brightness(1)',
        transition: {
            duration: 0.7,
            ease: luxeEase,
            filter: { duration: 0.9, delay: 0.1, ease: luxeEase },
        } as Transition,
    },
    exit: (dir: number) => ({
        opacity: 0,
        x: dir > 0 ? -30 : 30,
        transition: {
            duration: 0.35,
            ease: exitEase,
        } as Transition,
    }),
}

const textSlideVariants: Variants = {
    initial: (dir: number) => ({
        opacity: 0,
        y: dir > 0 ? 12 : -12,
    }),
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: luxeEase, delay: 0.1 } as Transition,
    },
    exit: (dir: number) => ({
        opacity: 0,
        y: dir > 0 ? -12 : 12,
        transition: { duration: 0.2, ease: exitEase } as Transition,
    }),
}

const statsSlideVariants: Variants = {
    initial: (dir: number) => ({
        opacity: 0,
        y: dir > 0 ? 16 : -16,
    }),
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: luxeEase, delay: 0.18 } as Transition,
    },
    exit: (dir: number) => ({
        opacity: 0,
        y: dir > 0 ? -16 : 16,
        transition: { duration: 0.2, ease: exitEase } as Transition,
    }),
}

const thumbVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: luxeEase } as Transition,
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 } as Transition,
    },
}

export default function Hero() {
    const [[current, dir], setCurrent] = useState<[number, number]>([0, 0])
    const model: CarModel = models[current]

    const next = (): void =>
        setCurrent(([i]: [number, number]): [number, number] => [(i + 1) % models.length, 1])
    const prev = (): void =>
        setCurrent(([i]: [number, number]): [number, number] => [(i - 1 + models.length) % models.length, -1])

    return (
        <section className={styles.section}>
            <GhostText text="TIMELESS" />

            <div className={styles.heroMain}>
                <div className={styles.textContent}>
                    <h1 className={styles.heading}>
                        TRAVEL WITH THE BEST CAR,<br />WITH US
                    </h1>
                    <Button href="/models">Explore Fleet</Button>
                </div>

                <div className={styles.carContent}>
                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={current}
                            custom={dir}
                            variants={carVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className={styles.carWrapper}
                        >
                            <div className={styles.glowEffect} />
                            <Image
                                src={model.hero}
                                alt={model.name}
                                fill
                                className={styles.carImg}
                                priority
                                unoptimized
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.bottomBarInner}>
                    <div className={styles.thumbBox}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                variants={thumbVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{ position: 'relative', width: '100%', height: '100%' }}
                            >
                                <Image
                                    src={model.thumb}
                                    alt={model.name}
                                    fill
                                    className={styles.carImg}
                                    unoptimized
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className={styles.metaData}>
                        <div className={styles.titleRow}>
                            <AnimatePresence mode="wait" custom={dir}>
                                <motion.div
                                    key={current}
                                    custom={dir}
                                    variants={textSlideVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className={styles.titleWrap}
                                >
                                    <span className={styles.modelNumber}>{model.number}</span>
                                    <h2 className={styles.modelName}>{model.name}</h2>
                                </motion.div>
                            </AnimatePresence>
                            <div className={styles.arrows}>
                                <button
                                    className={styles.arrowBtn}
                                    onClick={prev}
                                    aria-label="Previous model"
                                    type="button"
                                >
                                    ←
                                </button>
                                <button
                                    className={styles.arrowBtn}
                                    onClick={next}
                                    aria-label="Next model"
                                    type="button"
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.div
                                key={current}
                                custom={dir}
                                variants={statsSlideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={styles.statsRow}
                            >
                                <div className={styles.statsGrid}>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>{model.range}</span>
                                        <span className={styles.statLabel}>Range (EPA est.)</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>{model.sprint}</span>
                                        <span className={styles.statLabel}>0-60 mph</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>{model.power}</span>
                                        <span className={styles.statLabel}>Peak power</span>
                                    </div>
                                </div>
                                <div className={styles.descBox}>
                                    <p>{model.desc}</p>
                                    <button className={styles.learnMore} type="button">
                                        Learn More
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}