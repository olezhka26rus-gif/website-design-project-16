import { createFileRoute } from '@tanstack/react-router';
import MotoCollection from '@/pages/MotoCollection';
import { notFound } from '@tanstack/react-router';
import { motoByCountry } from '@/data/catalogMoto';

export const Route = createFileRoute('/moto/$country/')({
  loader: ({ params }) => {
    if (!(params.country in motoByCountry)) throw notFound();
  },
  component: () => <MotoCollection mode="country" />,
});
