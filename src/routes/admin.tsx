import { createFileRoute } from '@tanstack/react-router';
import Admin from '@/pages/Admin';

export const Route = createFileRoute('/admin')({
  // Пароль админки хранится в localStorage — сервер о сессии не знает,
  // поэтому страница рендерится только в браузере; сервер отдаёт заглушку.
  ssr: false,
  head: () => ({
    meta: [{ title: 'Админка | Region Logistik' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  pendingComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-secondary/40 px-4">
      <p className="text-muted-foreground">Загрузка админки Region Logistik…</p>
    </div>
  ),
  component: () => <Admin />,
});