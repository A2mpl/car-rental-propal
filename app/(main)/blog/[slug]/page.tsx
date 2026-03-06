import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleContent from '@/components/sections/blogArticleContent/BlogArticleContent';
import BlogArticleHeader from '@/components/sections/blogArticleHeader/BlogArticleHeader';
import BlogRelated from '@/components/sections/blogRelated/BlogRelated';
import { BLOG_ARTICLES, getBlogArticleBySlug } from '@/data/blog';
import { siteName, siteUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: [
      article.category.toLowerCase(),
      'location voiture bordeaux',
      'voiture premium bordeaux',
      article.title.toLowerCase().split(' ').slice(0, 4).join(' '),
    ],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${article.title} | ${siteName}`,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      url: `${siteUrl}/blog/${slug}`,
      images: article.image ? [{ url: article.image, width: 1200, height: 675, alt: article.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) notFound();

  const related = BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: 'fr-FR',
    author: { '@type': 'Organization', name: siteName, url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/img_4.png` },
    },
    ...(article.image && { image: { '@type': 'ImageObject', url: article.image, width: 1200, height: 675 } }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${article.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structuré
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <BlogArticleHeader article={article} />
        <BlogArticleContent article={article} />
        {related.length > 0 && <BlogRelated articles={related} />}
      </main>
    </>
  );
}
