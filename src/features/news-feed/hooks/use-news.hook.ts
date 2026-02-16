"use client";

import { useCallback, useEffect, useState } from "react";
import { newsFeedService } from "../services/news-feed.service";
import type { NewsFeedFilters, NewsFeedState } from "../types/news-feed.types";

export function useNews(filters?: NewsFeedFilters) {
  const [state, setState] = useState<NewsFeedState>({
    articles: [],
    isLoading: true,
    error: null,
  });

  const fetchNews = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const articles = await newsFeedService.fetchNews(filters);
      setState({ articles, isLoading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch news",
      }));
    }
  }, [filters]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    ...state,
    refetch: fetchNews,
  };
}
