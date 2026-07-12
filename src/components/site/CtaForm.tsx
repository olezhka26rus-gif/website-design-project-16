import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const CtaForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', car: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Укажите имя';
    if (!/^[\d\s+()-]{10,}$/.test(form.phone)) next.phone = 'Укажите телефон';
    setErrors(next);
    if (Object.keys(next).length) return;

    toast({
      title: 'Заявка отправлена!',
      description: 'Свяжемся с вами в течение 15 минут.',
    });
    setForm({ name: '', phone: '', car: '' });
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
            <a href="tel:88003016980" className="flex items-center gap-2 font-semibold">
              <Icon name="Phone" size={18} /> 8 (800) 301-69-80
            </a>
            <a href="#" className="flex items-center gap-2 font-semibold">
              <Icon name="MessageCircle" size={18} /> WhatsApp
            </a>
            <a href="#" className="flex items-center gap-2 font-semibold">
              <Icon name="Send" size={18} /> Telegram
            </a>
          </div>
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
            <Button type="submit" size="lg" className="w-full h-12 font-semibold text-base">
              Получить расчёт
            </Button>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon name="Lock" size={13} />
              Ваши данные защищены и не передаются третьим лицам
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CtaForm;
