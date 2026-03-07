import type { BlogArticle } from '@/data/blog';

export interface BlogCategoryArticlesProps {
  articles: BlogArticle[];
  categoryName: string;
}
