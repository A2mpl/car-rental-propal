import Image from 'next/image';
import Link from 'next/link';
import type { BlogArticle } from '@/data/blog';
import styles from './BlogGrid.module.css';

interface Props {
    articles: BlogArticle[];
}

export default function BlogGrid({ articles }: Props) {
    // On retire le 1er article (Hero) et on garde les 6 suivants (index 1 à 7 exclus)
    const recentArticles = articles.slice(1, 7);

    return (
        <>
        <div className={styles.wrapper}>

            {/* 1. SECTION ÉDITO / INTRO */}
            <section className={styles.introSection}>
                <div className={styles.introGrid}>
                    <div className={styles.introLabel}>
                        <span>DEPUIS 2020</span>
                    </div>
                    <div className={styles.introContent}>
                        <h2 className={styles.introTitle}>
                            Décrypter le marché premium.<br />
                            Sécuriser vos importations.<br />
                            Conduire l&apos;exception.
                        </h2>
                        <p className={styles.introDesc}>
                            Des guides experts et des comparatifs détaillés pour vous accompagner dans la location ou l&apos;achat de votre prochain véhicule de prestige à Bordeaux et partout en Europe.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.categorySection}>
                <div className={styles.categoryGrid}>
                    <Link href="/blog/categorie/essais" className={styles.catImageCard}>
                        <Image src="/images/img_2.png" alt="Essais et Avis" fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 640px" className={styles.catImage} />
                        <div className={styles.catOverlay}>
                            <h3 className={styles.catTitle}>Essais & Avis</h3>
                            <span className={styles.catArrow}>→</span>
                        </div>
                    </Link>

                    <Link href="/blog/categorie/guides" className={styles.catImageCard}>
                        <Image src="/images/img_2.png" alt="Guides d'importation" fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 640px" className={styles.catImage} />
                        <div className={styles.catOverlay}>
                            <h3 className={styles.catTitle}>Guides d&apos;Importation</h3>
                            <span className={styles.catArrow}>→</span>
                        </div>
                    </Link>

                    <div className={styles.catTextCard}>
                        <span className={styles.catTextLabel}>AUTRES THÉMATIQUES</span>
                        <div className={styles.catLinksList}>
                            <Link href="/blog/categorie/fiscalite">Fiscalité & Malus</Link>
                            <Link href="/blog/categorie/electrique">Transition Électrique</Link>
                            <Link href="/blog/categorie/marche">Analyse du Marché</Link>
                            <Link href="/blog/categorie/lifestyle">Lifestyle & Évènements</Link>
                        </div>
                    </div>

                    <Link href="/blog/categorie/tendances" className={styles.catImageCard}>
                        <Image src="/images/img_2.png" alt="Tendances du marché" fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 640px" className={styles.catImage} />
                        <div className={styles.catOverlay}>
                            <h3 className={styles.catTitle}>Tendances du Marché</h3>
                            <span className={styles.catArrow}>→</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
        <section className={styles.latestSection}>
            <div className={styles.latestInner}>
                <div className={styles.latestGrid}>
                    <div className={styles.latestLabel}>
                        <span>DERNIÈRES PUBLICATIONS</span>
                    </div>

                    <div className={styles.latestList}>
                        {recentArticles.map((article) => (
                            <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.articleRow}>
                                <div className={styles.articleImageWrap}>
                                    {article.image && (
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className={styles.articleImage}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    )}
                                </div>

                                <div className={styles.articleContent}>
                                    <h3 className={styles.articleTitle}>{article.title}</h3>
                                    <p className={styles.articleDesc}>{article.description}</p>
                                </div>

                                <div className={styles.articleMeta}>
                                    <time dateTime={article.date}>
                                        {new Date(article.date).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </time>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}