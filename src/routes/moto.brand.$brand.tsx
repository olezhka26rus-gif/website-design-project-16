import { createFileRoute } from '@tanstack/react-router';
import MotoCollection from '@/pages/MotoCollection';
import { notFound } from '@tanstack/react-router';
import { findMotoBrand } from '@/data/catalogMoto';

export const Route = createFileRoute('/moto/brand/$brand')({
  loader: ({ params }) => {
    if (!findMotoBrand(params.brand)) throw notFound();
  },
  component: () => <MotoCollection mode="brand" />,
});
