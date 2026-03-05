'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { STEPS } from '@/components/sections/howitswork/data';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './HowItWorks.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.header-anim',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.header-anim',
            start: 'top 88%',
          },
        }
      );

      gsap.to('.timeline-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 55%',
          end: 'bottom 55%',
          scrub: 0.5,
        },
      });

      const stepRows = gsap.utils.toArray<HTMLElement>('.step-row');

      stepRows.forEach((row) => {
        const imageWrapper = row.querySelector('.image-wrapper');
        const image = row.querySelector('.step-image');
        const contents = row.querySelectorAll('.content-anim');
        const dash = row.querySelector('.timeline-dash');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            end: 'center 45%',
            scrub: 0.5,
          },
        });

        tl.fromTo(
          imageWrapper,
          { clipPath: 'inset(100% 0% 0% 0% round 32px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 32px)', ease: 'none' }
        )
          .fromTo(image, { scale: 1.15 }, { scale: 1, ease: 'none' }, '<')
          .fromTo(contents, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, ease: 'none' }, '<0.1')
          .fromTo(dash, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, ease: 'none' }, '<0.1');
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.section} aria-label="Comment ça marche">
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel className="header-anim">Comment ça marche</SectionLabel>
          <h2 className={`${styles.heading} header-anim`}>TROIS ÉTAPES SIMPLES</h2>
          <p className={`${styles.subtitle} header-anim`}>
            De l&apos;estimation au paiement, notre processus irréprochable garantit une expérience sans accroc, à la
            hauteur de votre véhicule.
          </p>
        </div>

        <div className={`${styles.stepsContainer} steps-container`}>
          <div className={styles.timeline}>
            <div className={`${styles.timelineProgress} timeline-progress`} />
          </div>

          {STEPS.map((step) => {
            return (
              <div key={step.number} className={`${styles.stepRow} step-row`}>
                <div className={`${styles.timelineDash} timeline-dash`} />

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
