import { newsFeedService } from "../services/news-feed.service";
import type { NewsArticle, NewsFeedFilters } from "../types/news-feed.types";

export async function fetchNews(
  filters?: NewsFeedFilters,
): Promise<NewsArticle[]> {
  return newsFeedService.fetchNews(filters);
}

export async function fetchNewsById(id: string): Promise<NewsArticle> {
  return newsFeedService.fetchNewsById(id);
}
