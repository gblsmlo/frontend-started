import { beforeEach, describe, expect, it, vi } from "vitest";
import { ArticlePostService } from "../services/article-post.service";
import type { ArticlePost } from "../types/article-post.type";

const mockArticle: ArticlePost = {
  id: "1",
  slug: "test-article",
  title: "Test Article",
  content:
    "This is a test article with enough content to calculate reading time properly.",
  excerpt: "This is a test article...",
  author: {
    id: "1",
    name: "Test Author",
    avatar: "https://example.com/avatar.jpg",
    bio: "Test bio",
  },
  publishedAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  tags: ["test", "article"],
  readingTime: 1,
};

describe("ArticlePostService", () => {
  let service: ArticlePostService;

  beforeEach(() => {
    service = new ArticlePostService();
    global.fetch = vi.fn();
  });

  describe("fetchArticleBySlug", () => {
    it("should fetch article by slug successfully", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockArticle,
      });

      const result = await service.fetchArticleBySlug("test-article");

      expect(result).toEqual(mockArticle);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/posts/test-article"),
      );
    });

    it("should throw error when fetch fails", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(service.fetchArticleBySlug("invalid")).rejects.toThrow(
        "Failed to fetch article: Not Found",
      );
    });
  });

  describe("calculateReadingTime", () => {
    it("should calculate reading time correctly", () => {
      const content = "word ".repeat(400); // 400 words = 2 minutes
      const readingTime = service.calculateReadingTime(content);
      expect(readingTime).toBe(2);
    });

    it("should return at least 1 minute for short content", () => {
      const readingTime = service.calculateReadingTime("Short content");
      expect(readingTime).toBe(1);
    });
  });

  describe("extractExcerpt", () => {
    it("should extract excerpt from content", () => {
      const content = "This is a very long content that should be truncated...";
      const excerpt = service.extractExcerpt(content, 20);
      expect(excerpt).toBe("This is a very long...");
    });

    it("should return full content if shorter than maxLength", () => {
      const content = "Short";
      const excerpt = service.extractExcerpt(content, 100);
      expect(excerpt).toBe("Short");
    });
  });

  describe("formatArticleContent", () => {
    it("should format markdown headers", () => {
      const content = "# Title\n\n## Subtitle\n\n### Section";
      const formatted = service.formatArticleContent(content);
      expect(formatted).toContain("<h1");
      expect(formatted).toContain("<h2");
      expect(formatted).toContain("<h3");
    });

    it("should format bold and italic text", () => {
      const content = "**bold** and *italic*";
      const formatted = service.formatArticleContent(content);
      expect(formatted).toContain("<strong>bold</strong>");
      expect(formatted).toContain("<em>italic</em>");
    });
  });
});
