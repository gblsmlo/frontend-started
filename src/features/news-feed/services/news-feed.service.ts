import type { NewsArticle, NewsFeedFilters } from "../types/news-feed.types";

export class NewsFeedService {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }

  async fetchNews(filters?: NewsFeedFilters): Promise<NewsArticle[]> {
    const params = new URLSearchParams();

    if (filters?.category) params.append("category", filters.category);
    if (filters?.fromDate) params.append("from", filters.fromDate);
    if (filters?.toDate) params.append("to", filters.toDate);
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await fetch(`${this.baseUrl}/news?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    return response.json();
  }

  async fetchNewsById(id: string): Promise<NewsArticle> {
    const response = await fetch(`${this.baseUrl}/news/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    return response.json();
  }

  searchNews(query: string, articles: NewsArticle[]): NewsArticle[] {
    const lowerQuery = query.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.summary.toLowerCase().includes(lowerQuery),
    );
  }

  filterByCategory(articles: NewsArticle[], category: string): NewsArticle[] {
    return articles.filter((article) => article.category === category);
  }

  sortByDate(
    articles: NewsArticle[],
    order: "asc" | "desc" = "desc",
  ): NewsArticle[] {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
  }
}

// Export singleton instance for common use
export const newsFeedService = new NewsFeedService();
