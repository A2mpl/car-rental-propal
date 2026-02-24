'use client'

import { motion } from 'framer-motion';

import BmwLogo from '@/components/sections/icons/BmwLogo'
import PorscheLogo from '@/components/sections/icons/PorscheLogo';
import TeslaLogo from '@/components/sections/icons/TeslaLogo';
import AudiLogo from '@/components/sections/icons/AudiLogo';
import FerrariLogo from '@/components/sections/icons/FerrariLogo';
const LOGO_SIZE = 90;

const LOGOS = [TeslaLogo, AudiLogo, BmwLogo, PorscheLogo, FerrariLogo];

export default function BrandStrip() {
    return (
        <section style={{
        paddingTop: '80px',
        overflow: 'hidden',
        position: 'relative',
            backgroundColor: 'var(--surface)'
    }}>

        <div style={{
            backgroundColor: 'var(--bg)',
            padding: '32px 0',
            position: 'relative',
        }}>
            <div style={{ display: 'flex', width: 'max-content' }}>
                <motion.div
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        duration: 25,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15vw',
                        paddingRight: '15vw'
                    }}
                >
                    {[...LOGOS, ...LOGOS, ...LOGOS].map((Logo, index) => (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: DEV
                            key={index}
                            style={{
                                color: 'var(--text-2)',
                                width: LOGO_SIZE,
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.7,
                            }}
                        >
                            <Logo />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Tes dégradés doivent maintenant être à l'intérieur de ce div gris */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '20vw', height: '100%',
                background: 'linear-gradient(to right, var(--bg) 10%, transparent)', zIndex: 10
            }} />
            <div style={{
                position: 'absolute', top: 0, right: 0, width: '20vw', height: '100%',
                background: 'linear-gradient(to left, var(--bg) 10%, transparent)', zIndex: 10
            }} />
        </div>
    </section>
)
}