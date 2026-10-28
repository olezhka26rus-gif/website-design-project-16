import { createFileRoute } from '@tanstack/react-router';
import CatalogCollection from '@/pages/CatalogCollection';
import { notFound } from '@tanstack/react-router';
import { countryNames } from '@/data/catalogCars';

export const Route = createFileRoute('/catalog/$country/')({
  loader: ({ params }) => {
    if (!(params.country in countryNames)) throw notFound();
  },
  component: () => <CatalogCollection mode="country" />,
});
