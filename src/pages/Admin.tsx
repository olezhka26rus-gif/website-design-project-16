import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import func2url from '@/func2url.json';
import LeadCard from '@/components/admin/LeadCard';
import { Lead, LeadStatus, STATUS_META, STATUS_ORDER } from '@/components/admin/leadStatus';

const STORAGE_KEY = 'admin_password';

const Admin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState(localStorage.getItem(STORAGE_KEY) || '');
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');

  const handleReindex = async () => {
    setIndexing(true);
    try {
      const res = await fetch(func2url.indexnow, {
        headers: { 'X-Admin-Password': password },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: 'Отправлено в Яндекс',
          description: `${data.submitted_count} страниц отправлено на переиндексацию через IndexNow`,
        });
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Не удалось отправить', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Ошибка соединения с сервером IndexNow', variant: 'destructive' });
    } finally {
      setIndexing(false);
    }
  };

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

  const patchLead = async (id: number, payload: Record<string, unknown>) => {
    const res = await fetch(func2url.leads, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({ id, ...payload }),
    });
    if (!res.ok) throw new Error('patch failed');
  };

  const handleChangeStatus = async (id: number, status: LeadStatus) => {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await patchLead(id, { status });
    } catch {
      setLeads(prev);
      toast({ title: 'Не удалось сохранить статус', variant: 'destructive' });
    }
  };

  const handleSaveNote = async (id: number, note: string) => {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, note } : l)));
    try {
      await patchLead(id, { note });
      toast({ title: 'Заметка сохранена' });
    } catch {
      setLeads(prev);
      toast({ title: 'Не удалось сохранить заметку', variant: 'destructive' });
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
        <Helmet>
          <title>Вход в админку | Region Logistik</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
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

  const counts = STATUS_ORDER.reduce(
    (acc, s) => ({ ...acc, [s]: leads.filter((l) => l.status === s).length }),
    {} as Record<LeadStatus, number>
  );
  const visible = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <Helmet>
        <title>Заявки клиентов | Region Logistik</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h1 className="font-display font-extrabold text-2xl">Заявки клиентов</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleReindex} disabled={indexing}>
              <Icon name="Zap" size={16} />
              {indexing ? 'Отправляем...' : 'Отправить сайт в Яндекс'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => fetchLeads(password)} disabled={loading}>
              <Icon name="RefreshCw" size={16} />
              Обновить
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filter === 'all'
                ? 'bg-foreground text-background border-foreground'
                : 'bg-white text-foreground/70 border-border hover:border-foreground/30'
            }`}
          >
            Все · {leads.length}
          </button>
          {STATUS_ORDER.map((s) => {
            const m = STATUS_META[s];
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  active ? m.className : 'bg-white text-foreground/70 border-border hover:border-foreground/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                {m.label} · {counts[s]}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border py-16 text-center text-muted-foreground">
            {leads.length === 0 ? 'Пока нет заявок' : 'Нет заявок с этим статусом'}
          </div>
        ) : (
          <div className="grid gap-3">
            {visible.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onChangeStatus={handleChangeStatus}
                onSaveNote={handleSaveNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
