import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import func2url from '@/func2url.json';

interface PhoneClick {
  id: number;
  page: string;
  place: string;
  device: string;
  created_at: string;
}

interface Stats {
  today: number;
  week: number;
  total: number;
}

const PLACE_LABELS: Record<string, string> = {
  header: 'Шапка сайта',
  header_mobile: 'Кнопка звонка (моб.)',
  footer: 'Подвал сайта',
  cta: 'Блок «Оставить заявку»',
  contacts_modal: 'Окно контактов',
};

const PhoneClicks = ({ password }: { password: string }) => {
  const { toast } = useToast();
  const [clicks, setClicks] = useState<PhoneClick[]>([]);
  const [stats, setStats] = useState<Stats>({ today: 0, week: 0, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchClicks = async () => {
    setLoading(true);
    try {
      const res = await fetch(func2url['phone-clicks'], {
        headers: { 'X-Admin-Password': password },
      });
      const data = await res.json();
      if (res.ok) {
        setClicks(data.clicks || []);
        setStats(data.stats || { today: 0, week: 0, total: 0 });
      } else {
        toast({ title: 'Ошибка загрузки', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Ошибка соединения', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClicks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div className="grid grid-cols-3 gap-3 flex-1 min-w-[260px]">
          {[
            { label: 'Сегодня', value: stats.today },
            { label: 'За 7 дней', value: stats.week },
            { label: 'Всего', value: stats.total },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4">
              <div className="text-2xl font-display font-extrabold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={fetchClicks} disabled={loading}>
          <Icon name="RefreshCw" size={16} />
          Обновить
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex gap-2">
        <Icon name="Info" size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed">
          Это нажатия на номер телефона на сайте, а не подтверждённые звонки. С мобильного нажатие
          почти всегда означает звонок, с компьютера — что номер просто посмотрели или скопировали.
        </p>
      </div>

      {clicks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border py-16 text-center text-muted-foreground">
          Пока никто не нажимал на номер телефона
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {clicks.map((c, i) => (
            <div
              key={c.id}
              className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-border' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  c.device === 'mobile' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Icon name={c.device === 'mobile' ? 'Smartphone' : 'Monitor'} size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">
                  {PLACE_LABELS[c.place] || c.place || 'Не указано'}
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.page}</div>
              </div>
              <div className="text-xs text-muted-foreground text-right shrink-0">
                {new Date(c.created_at).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneClicks;
