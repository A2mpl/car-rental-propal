'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import styles from './HowItWorks.module.css';
import Image from "next/image";

interface Step {
    number: string;
    title: string;
    desc: string;
    image: string;
}

const steps: Step[] = [
    {
        number: '01',
        title: 'Obtenir une Estimation',
        desc: 'Soumettez les informations de votre véhicule en ligne et recevez une estimation compétitive sous 24 heures.',
        image: '/images/img_2.png',
    },
    {
        number: '02',
        title: 'Inspection du Véhicule',
        desc: "Nos spécialistes effectuent une évaluation approfondie à votre convenance — à domicile ou dans notre showroom.",
        image: '/images/img_3.png',
    },
    {
        number: '03',
        title: 'Recevoir le Paiement',
        desc: "Acceptez l'offre et recevez un paiement sécurisé sous 48 heures. Nous gérons toutes les démarches administratives.",
        image: '/images/img_1.png',
    },
];

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // 1. Animation du Header
        gsap.fromTo(
            '.header-anim',
            { opacity: 0, y: 28 }, // Repris de ta valeur d'origine (28)
            {
                opacity: 1,
                y: 0,
                duration: 0.85, // Repris de ta durée d'origine
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.header-anim',
                    start: 'top 88%',
                },
            }
        );

        // 2. Animation éditoriale des étapes
        const stepRows = gsap.utils.toArray<HTMLElement>('.step-row');

        stepRows.forEach((row) => {
            const imageWrapper = row.querySelector('.image-wrapper');
            const image = row.querySelector('.step-image');
            const contents = row.querySelectorAll('.content-anim');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            });

            tl.fromTo(
                imageWrapper,
                { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
                {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    duration: 1.2,
                    ease: 'power4.inOut',
                }
            )
                .fromTo(
                    image,
                    { scale: 1.15 },
                    { scale: 1, duration: 1.2, ease: 'power3.out' },
                    '<'
                )
                .fromTo(
                    contents,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
                    '-=0.6'
                );
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.section} aria-label="Comment ça marche">
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={`${styles.label} header-anim`}>Comment ça marche</span>
                    <h2 className={`${styles.heading} header-anim`}>TROIS ÉTAPES SIMPLES</h2>
                    <p className={`${styles.subtitle} header-anim`}>
                        De l&apos;estimation au paiement, notre processus irréprochable
                        garantit une expérience sans accroc, à la hauteur de votre véhicule.
                    </p>
                </div>

                <div className={styles.stepsContainer}>
                    {steps.map((step) => {
                        return (
                            <div key={step.number} className={`${styles.stepRow} step-row`}>
                                <div className={styles.imageCol}>
                                    <div className={`${styles.imageWrapper} image-wrapper`}>
                                        <Image
                                            src={step.image}
                                            alt={`Étape ${step.number} - ${step.title}`}
                                            className={`${styles.image} step-image`}
                                            fill
                                            sizes="(max-width: 991px) 100vw, 50vw"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                <div className={styles.contentCol}>
                                    <div className={styles.contentInner}>
                                        <div className={`${styles.stepNumber} content-anim`}>{step.number}</div>
                                        <h3 className={`${styles.cardTitle} content-anim`}>{step.title}</h3>
                                        <p className={`${styles.cardDesc} content-anim`}>{step.desc}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}