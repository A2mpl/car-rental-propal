import type { BlogArticle } from '@/data/blog';

export interface BlogArticleContentProps {
  article: Pick<BlogArticle, 'content'>;
}
