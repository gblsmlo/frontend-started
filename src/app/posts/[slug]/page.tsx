import { ArticleViewer } from "@/features/article-post";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <ArticleViewer slug={slug} />
    </main>
  );
}
