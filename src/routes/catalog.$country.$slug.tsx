import { createFileRoute } from '@tanstack/react-router';
import CarDetail from '@/pages/CarDetail';
import { notFound, redirect } from '@tanstack/react-router';
import { findCatalogEntry } from '@/data/catalogCars';

export const Route = createFileRoute('/catalog/$country/$slug')({
  loader: ({ params }) => {
    const entry = findCatalogEntry(params.country, params.slug);
    if (!entry) throw notFound();
    // Устаревший адрес — уводим на актуальный, чтобы не плодить дубли
    if (entry.slug !== params.slug) {
      throw redirect({
        to: '/catalog/$country/$slug',
        params: { country: entry.country, slug: entry.slug },
        statusCode: 301,
        replace: true,
      });
    }
  },
  component: () => <CarDetail />,
});
