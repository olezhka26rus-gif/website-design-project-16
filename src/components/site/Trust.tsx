import Icon from '@/components/ui/icon';

const items = [
  { icon: 'FileSearch', title: 'Проверяем историю автомобиля', text: 'Отчёты по всем базам и аукционам' },
  { icon: 'Scale', title: 'Юридическая чистота', text: 'Проверяем документы и историю владения' },
  { icon: 'BadgeDollarSign', title: 'Фиксируем стоимость в договоре', text: 'Никаких скрытых платежей и доплат' },
  { icon: 'MapPin', title: 'Контролируем доставку', text: 'Вы всегда знаете, где находится ваш авто' },
  { icon: 'FileCheck2', title: 'Помогаем с документами', text: 'Оформление ЭПТС, СБКТС, сертификация' },
  { icon: 'Headset', title: 'Всегда на связи', text: 'Персональный менеджер 24/7' },
];

const Trust = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-10">Почему нам доверяют</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-border p-6 hover-lift">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={item.icon} size={22} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-base mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
