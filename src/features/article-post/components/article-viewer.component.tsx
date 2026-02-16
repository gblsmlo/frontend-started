"use client";

import Image from "next/image";
import { useArticlePost } from "../hooks/use-article-post.hook";
import { articlePostService } from "../services/article-post.service";

interface ArticleViewerProps {
  slug: string;
}

export function ArticleViewer({ slug }: ArticleViewerProps) {
  const { article, isLoading, error, refetch } = useArticlePost(slug);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-red-500">Error: {error}</p>
        <button
          type="button"
          onClick={refetch}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">Article not found</p>
      </div>
    );
  }

  // Format content for display - currently using paragraph splitting approach
  void articlePostService.formatArticleContent(article.content);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        {article.coverImage && (
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            {article.author.avatar && (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span>{article.author.name}</span>
          </div>

          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <span>{article.readingTime} min read</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {article.content.split("\n\n").map((paragraph, index) => (
          <p key={`${article.slug}-${index}`} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-8 border-t pt-6">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
