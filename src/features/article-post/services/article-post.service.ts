import type {
  ArticlePost,
  ArticlePostFilters,
} from "../types/article-post.type";

export class ArticlePostService {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }

  async fetchArticleBySlug(slug: string): Promise<ArticlePost> {
    const response = await fetch(`${this.baseUrl}/posts/${slug}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    return response.json();
  }

  async fetchArticles(filters?: ArticlePostFilters): Promise<ArticlePost[]> {
    const params = new URLSearchParams();

    if (filters?.tag) params.append("tag", filters.tag);
    if (filters?.authorId) params.append("authorId", filters.authorId);
    if (filters?.fromDate) params.append("from", filters.fromDate);
    if (filters?.toDate) params.append("to", filters.toDate);

    const response = await fetch(`${this.baseUrl}/posts?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    return response.json();
  }

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  formatArticleContent(content: string): string {
    // Basic markdown-like formatting
    return content
      .replace(
        /#{3}\s(.+)/g,
        '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>',
      )
      .replace(
        /#{2}\s(.+)/g,
        '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>',
      )
      .replace(
        /#{1}\s(.+)/g,
        '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>',
      )
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(
        /`(.+?)`/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>',
      )
      .split("\n\n")
      .map((paragraph) => `<p class="mb-4 leading-relaxed">${paragraph}</p>`)
      .join("");
  }

  extractExcerpt(content: string, maxLength: number = 150): string {
    const plainText = content.replace(/[#*`[\]]/g, "");
    if (plainText.length <= maxLength) return plainText;
    return `${plainText.substring(0, maxLength).trim()}...`;
  }
}

// Export singleton instance for common use
export const articlePostService = new ArticlePostService();
