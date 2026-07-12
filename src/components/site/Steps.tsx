import Icon from '@/components/ui/icon';

const steps = [
  { icon: 'FileEdit', title: '1. Заявка', text: 'Вы оставляете заявку на сайте или по телефону' },
  { icon: 'Search', title: '2. Подбор', text: 'Подбираем лучшие варианты под ваш бюджет' },
  { icon: 'ShieldCheck', title: '3. Проверка', text: 'Проверяем автомобиль по всем базам и техсостояние' },
  { icon: 'Handshake', title: '4. Покупка', text: 'Согласовываем и выкупаем автомобиль для вас' },
  { icon: 'Ship', title: '5. Доставка', text: 'Организуем доставку и контролируем каждый этап' },
  { icon: 'Key', title: '6. Получение', text: 'Вы получаете автомобиль и полный пакет документов' },
];

const Steps = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-10">Как мы работаем</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-sm border border-border flex items-center justify-center mb-4">
                <Icon name={step.icon} size={26} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
