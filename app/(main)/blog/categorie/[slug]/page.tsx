import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogCategoryArticles from '@/components/sections/blogCategoryArticles/BlogCategoryArticles';
import BlogCategoryHeader from '@/components/sections/blogCategoryHeader/BlogCategoryHeader';
import { BLOG_ARTICLES } from '@/data/blog';
import { BLOG_CATEGORY_SLUGS, getBlogCategory } from '@/data/blogCategories';
import { siteName, siteUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} — Blog | ${siteName}`,
    description: category.description,
    alternates: { canonical: `/blog/categorie/${slug}` },
    openGraph: {
      title: `${category.name} | Blog ${siteName}`,
      description: category.description,
      url: `${siteUrl}/blog/categorie/${slug}`,
      images: [
        {
          url: '/images/img_2.png',
          width: 1200,
          height: 630,
          alt: `${category.name} — Blog ${siteName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Blog ${siteName}`,
      description: category.description,
      images: ['/images/img_2.png'],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  const articles = BLOG_ARTICLES.filter((a) => category.categories.includes(a.category)).sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <main>
      <BlogCategoryHeader category={category} count={articles.length} />
      <BlogCategoryArticles articles={articles} categoryName={category.name} />
    </main>
  );
}
