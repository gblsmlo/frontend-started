"use client";

import { useCallback, useEffect, useState } from "react";
import { articlePostService } from "../services/article-post.service";
import type { ArticlePost } from "../types/article-post.type";

interface UseArticlePostReturn {
  article: ArticlePost | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useArticlePost(slug: string): UseArticlePostReturn {
  const [article, setArticle] = useState<ArticlePost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await articlePostService.fetchArticleBySlug(slug);
      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch article");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const refetch = useCallback(() => {
    fetchArticle();
  }, [fetchArticle]);

  return {
    article,
    isLoading,
    error,
    refetch,
  };
}
