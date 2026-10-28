import { createFileRoute } from '@tanstack/react-router';
import CatalogCollection from '@/pages/CatalogCollection';
import { notFound } from '@tanstack/react-router';
import { findBrand } from '@/data/catalogCars';

export const Route = createFileRoute('/catalog/brand/$brand')({
  loader: ({ params }) => {
    if (!findBrand(params.brand)) throw notFound();
  },
  component: () => <CatalogCollection mode="brand" />,
});
