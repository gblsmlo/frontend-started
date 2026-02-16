import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NewsCard } from "../components/news-card.component";
import { NewsFeedService } from "../services/news-feed.service";
import type { NewsArticle } from "../types/news-feed.types";

const mockArticle: NewsArticle = {
  id: "1",
  title: "Test Article",
  summary: "This is a test summary",
  category: "Test",
  publishedAt: "2023-10-01T00:00:00Z",
};

describe("NewsCard", () => {
  it("renders article title", () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  it("renders article category badge", () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders article summary", () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText("This is a test summary")).toBeInTheDocument();
  });
});

describe("NewsFeedService", () => {
  it("filters articles by category", () => {
    const service = new NewsFeedService();
    const articles: NewsArticle[] = [
      { ...mockArticle, id: "1", category: "Tech" },
      { ...mockArticle, id: "2", category: "Sports" },
      { ...mockArticle, id: "3", category: "Tech" },
    ];

    const techArticles = service.filterByCategory(articles, "Tech");

    expect(techArticles).toHaveLength(2);
    expect(techArticles.every((article) => article.category === "Tech")).toBe(
      true,
    );
  });

  it("sorts articles by date in descending order", () => {
    const service = new NewsFeedService();
    const articles: NewsArticle[] = [
      { ...mockArticle, id: "1", publishedAt: "2023-10-01T00:00:00Z" },
      { ...mockArticle, id: "2", publishedAt: "2023-10-03T00:00:00Z" },
      { ...mockArticle, id: "3", publishedAt: "2023-10-02T00:00:00Z" },
    ];

    const sorted = service.sortByDate(articles, "desc");

    expect(sorted[0].id).toBe("2");
    expect(sorted[2].id).toBe("1");
  });

  it("searches articles by query", () => {
    const service = new NewsFeedService();
    const articles: NewsArticle[] = [
      { ...mockArticle, id: "1", title: "JavaScript News" },
      { ...mockArticle, id: "2", title: "Python Guide" },
      { ...mockArticle, id: "3", title: "JavaScript Tips" },
    ];

    const results = service.searchNews("javascript", articles);

    expect(results).toHaveLength(2);
  });
});
