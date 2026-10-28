import { createFileRoute } from '@tanstack/react-router';
import MotoCatalog from '@/pages/MotoCatalog';

export const Route = createFileRoute('/moto/')({
  component: () => <MotoCatalog />,
});
