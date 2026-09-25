import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import func2url from '@/func2url.json';
import { trackGoal, goals } from '@/lib/analytics';

const SESSION_KEY = 'promo_popup_shown';

const PromoPopup = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleScroll = () => {
      if (triggeredRef.current) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.5) {
        triggeredRef.current = true;
        sessionStorage.setItem(SESSION_KEY, '1');
        setOpen(true);
        trackGoal(goals.PROMO_POPUP_SHOWN);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[\d\s+()-]{10,}$/.test(phone)) {
      setError('Укажите телефон');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Консультация с сайта', phone, car: '', source: 'promo_popup' }),
      });
      setSent(true);
      trackGoal(goals.PROMO_POPUP_SUBMIT);
      toast({
        title: 'Заявка отправлена!',
        description: 'Перезвоним вам в течение 15 минут.',
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Бесплатная консультация</DialogTitle>
          <DialogDescription>
            Оставьте номер телефона — специалист бесплатно проконсультирует по подбору и доставке автомобиля.
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Телефон / WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
                autoFocus
              />
              {error && <p className="text-primary text-xs mt-1">{error}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full h-12 font-semibold text-base" disabled={loading}>
              {loading ? 'Отправляем...' : 'Получить консультацию'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                политикой конфиденциальности
              </a>
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

export default PromoPopup;
