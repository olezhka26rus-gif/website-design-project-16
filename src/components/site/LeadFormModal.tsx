import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import func2url from '@/func2url.json';

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  defaultCar?: string;
}

const LeadFormModal = ({ open, onOpenChange, source = 'blog', defaultCar = '' }: LeadFormModalProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', car: defaultCar });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (open) setForm((f) => ({ ...f, car: defaultCar }));
  }, [open, defaultCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Укажите имя';
    if (!/^[\d\s+()-]{10,}$/.test(form.phone)) next.phone = 'Укажите телефон';
    if (!consent) next.consent = 'Необходимо согласие на обработку данных';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      setSent(true);
      toast({
        title: 'Заявка отправлена!',
        description: 'Свяжемся с вами в течение 15 минут.',
      });
    } catch {
      toast({
        title: 'Ошибка отправки',
        description: 'Попробуйте позвонить нам напрямую.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setSent(false);
        setForm({ name: '', phone: '', car: '' });
        setErrors({});
        setConsent(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Получить расчёт</DialogTitle>
          <DialogDescription>
            Оставьте контакты — рассчитаем стоимость доставки вашего автомобиля под ключ.
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12"
              />
              {errors.name && <p className="text-primary text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input
                placeholder="Телефон / WhatsApp"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-12"
              />
              {errors.phone && <p className="text-primary text-xs mt-1">{errors.phone}</p>}
            </div>
            <Input
              placeholder="Интересующий автомобиль"
              value={form.car}
              onChange={(e) => setForm({ ...form, car: e.target.value })}
              className="h-12"
            />
            <div>
              <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-0.5"
                />
                <span>
                  Я согласен с{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                    политикой конфиденциальности
                  </a>{' '}
                  и даю согласие на обработку персональных данных
                </span>
              </label>
              {errors.consent && <p className="text-primary text-xs mt-1">{errors.consent}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full h-12 font-semibold text-base" disabled={loading}>
              {loading ? 'Отправляем...' : 'Получить расчёт'}
            </Button>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon name="Lock" size={13} />
              Ваши данные защищены и не передаются третьим лицам
            </p>
          </form>
        ) : (
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Check" size={24} className="text-primary" />
            </div>
            <p className="font-display font-semibold text-lg">Заявка принята!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Наш менеджер свяжется с вами в течение 15 минут.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;