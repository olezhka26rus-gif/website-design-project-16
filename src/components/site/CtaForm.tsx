import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import Calculator from './Calculator';
import VkIcon from '@/components/icons/VkIcon';
import func2url from '@/func2url.json';
import { trackGoal, trackPhoneClick, goals } from '@/lib/analytics';

const CtaForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', car: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calcOpen, setCalcOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

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
        body: JSON.stringify({ ...form, source: 'form' }),
      });
      trackGoal(goals.CTA_FORM_SUBMIT);
      toast({
        title: 'Заявка отправлена!',
        description: 'Свяжемся с вами в течение 15 минут.',
      });
      setForm({ name: '', phone: '', car: '' });
      setConsent(false);
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
    <section id="cta" className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="container py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            Узнайте стоимость автомобиля<br className="hidden sm:block" /> под ключ уже сегодня
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            Оставьте заявку и получите расчёт стоимости вашего автомобиля в течение 15 минут.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <a
              href="tel:+79106926276"
              onClick={() => trackPhoneClick('cta')}
              className="flex items-center gap-2 font-semibold"
            >
              <Icon name="Phone" size={18} /> +7 (910) 692-62-76
            </a>
            <a
              href="https://vk.com/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.VK_CLICK)}
              className="flex items-center gap-2 font-semibold"
            >
              <VkIcon size={18} /> ВКонтакте
            </a>
            <a
              href="https://t.me/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.TELEGRAM_CLICK)}
              className="flex items-center gap-2 font-semibold"
            >
              <Icon name="Send" size={18} /> Telegram
            </a>
            <a
              href="https://wa.me/79106926276"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.WHATSAPP_CLICK)}
              className="flex items-center gap-2 font-semibold"
            >
              <Icon name="MessageCircle" size={18} /> WhatsApp
            </a>
          </div>
          <button
            onClick={() => {
              trackGoal(goals.CALCULATOR_OPEN);
              setCalcOpen(true);
            }}
            className="flex items-center gap-2 mt-6 font-semibold underline underline-offset-4 hover:no-underline"
          >
            <Icon name="Calculator" size={18} />
            Открыть калькулятор стоимости
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 text-foreground shadow-2xl">
          <div className="space-y-4">
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
          </div>
        </form>
      </div>

      <Calculator open={calcOpen} onOpenChange={setCalcOpen} />
    </section>
  );
};

export default CtaForm;