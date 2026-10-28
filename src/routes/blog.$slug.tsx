import { createFileRoute } from '@tanstack/react-router';
import Article from '@/pages/Article';
import { notFound } from '@tanstack/react-router';
import { articles } from '@/data/articles';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    if (!articles.some((a) => a.slug === params.slug)) throw notFound();
  },
  component: () => <Article />,
});
