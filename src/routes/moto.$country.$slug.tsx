import { createFileRoute } from '@tanstack/react-router';
import MotoDetail from '@/pages/MotoDetail';
import { notFound } from '@tanstack/react-router';
import { findMotoEntry } from '@/data/catalogMoto';

export const Route = createFileRoute('/moto/$country/$slug')({
  loader: ({ params }) => {
    if (!findMotoEntry(params.country, params.slug)) throw notFound();
  },
  component: () => <MotoDetail />,
});
