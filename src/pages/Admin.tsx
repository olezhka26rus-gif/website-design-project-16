import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import func2url from '@/func2url.json';

interface Lead {
  id: number;
  name: string;
  phone: string;
  car: string;
  source: string;
  created_at: string;
}

const STORAGE_KEY = 'admin_password';

const Admin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState(localStorage.getItem(STORAGE_KEY) || '');
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch(func2url.leads, {
        headers: { 'X-Admin-Password': pwd },
      });
      if (res.status === 401) {
        toast({ title: 'Неверный пароль', variant: 'destructive' });
        setAuthed(false);
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setAuthed(true);
      localStorage.setItem(STORAGE_KEY, pwd);
    } catch {
      toast({ title: 'Ошибка загрузки заявок', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) fetchLeads(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(password);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/40 px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <h1 className="font-display font-bold text-xl mb-6 text-center">Вход в админку</h1>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 mb-4"
          />
          <Button type="submit" className="w-full h-12 font-semibold" disabled={loading}>
            {loading ? 'Проверяем...' : 'Войти'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="font-display font-extrabold text-2xl">Заявки клиентов</h1>
          <Button
            variant="outline"
            onClick={() => fetchLeads(password)}
            disabled={loading}
          >
            <Icon name="RefreshCw" size={16} />
            Обновить
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Автомобиль</TableHead>
                <TableHead>Источник</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                    Пока нет заявок
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString('ru-RU')}
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                        {lead.phone}
                      </a>
                    </TableCell>
                    <TableCell>{lead.car || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{lead.source}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
