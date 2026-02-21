'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, Menu, X } from 'lucide-react'
import { siteContent } from '@/data/content'
import styles from './Navbar.module.css'

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { nav } = siteContent

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/" className={styles.logo}>
                        {nav.logo}
                    </Link>
                </motion.div>

                <ul className={styles.links}>
                    {nav.links.map((link) => (
                        <li key={link.label} className={styles.linkWrapper}>
                            <Link
                                href={link.href}
                                className={`${styles.link} ${link.active ? styles.linkActive : ''}`}
                            >
                                {link.label}
                                <motion.div
                                    className={styles.underline}
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3, ease: "circOut" }}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={styles.icons}>
                    <button className={styles.iconBtn} aria-label="Search">
                        <Search size={19} strokeWidth={1.5} />
                    </button>
                    <button className={styles.iconBtn} aria-label="Account">
                        <User size={19} strokeWidth={1.5} />
                    </button>

                    <button
                        className={styles.hamburger}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <ul className={styles.mobileLinks}>
                            {nav.links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} onClick={() => setMobileOpen(false)}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}