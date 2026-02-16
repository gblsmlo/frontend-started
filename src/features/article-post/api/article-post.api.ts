import { articlePostService } from "../services/article-post.service";
import type {
  ArticlePost,
  ArticlePostFilters,
} from "../types/article-post.type";

export async function fetchArticleBySlug(slug: string): Promise<ArticlePost> {
  return articlePostService.fetchArticleBySlug(slug);
}

export async function fetchArticles(
  filters?: ArticlePostFilters,
): Promise<ArticlePost[]> {
  return articlePostService.fetchArticles(filters);
}
