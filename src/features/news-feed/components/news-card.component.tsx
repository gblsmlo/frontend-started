import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import type { NewsArticle } from "../types/news-feed.types";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{article.title}</CardTitle>
          <Badge variant="secondary">{article.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{article.summary}</p>
        <time className="text-xs text-muted-foreground mt-2 block">
          {new Date(article.publishedAt).toLocaleDateString()}
        </time>
      </CardContent>
    </Card>
  );
}
