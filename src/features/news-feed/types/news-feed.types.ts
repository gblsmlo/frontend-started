export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  content?: string;
  author?: string;
  imageUrl?: string;
}

export interface NewsFeedState {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
}

export interface NewsFeedFilters {
  category?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
}
