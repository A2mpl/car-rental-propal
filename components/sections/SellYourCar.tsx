import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import GhostText from '@/components/ui/GhostText'
import Button from '@/components/ui/Button'
import styles from './SellYourCar.module.css'

export default function SellYourCar() {
    return (
        <section className={styles.section} aria-label="Sell Your Car">
            <GhostText text="SELL NOW" />

            <div className={styles.container}>
                <div className={styles.topRow}>
                    <div className={styles.imageSide}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80"
                                alt="Luxury car ready for consignment"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                                className={styles.img}
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className={styles.headingSide}>
                        <h2 className={styles.heading}>
                            SELL YOUR<br />CAR WITH<br />CONFIDENCE
                        </h2>
                        <p className={styles.intro}>
                            Whether you&apos;re upgrading or simply letting go, we offer the most
                            seamless and premium selling experience for high-end vehicles.
                            No listings, no haggling — just a fair price and white-glove service.
                        </p>
                        <Button href="/sell">
                            Get Your Valuation
                            <ArrowRight size={16} aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}