export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface ArticlePost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  coverImage?: string;
  readingTime: number;
}

export interface ArticlePostState {
  article: ArticlePost | null;
  isLoading: boolean;
  error: string | null;
}

export interface ArticlePostFilters {
  tag?: string;
  authorId?: string;
  fromDate?: string;
  toDate?: string;
}
