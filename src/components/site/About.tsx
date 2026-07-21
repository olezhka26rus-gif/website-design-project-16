const facts = [
  { value: '2022', label: 'Год основания компании' },
  { value: '500+', label: 'Доставленных автомобилей' },
  { value: '5+', label: 'Стран доставки' },
  { value: '15 мин', label: 'Среднее время ответа' },
];

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container grid lg:grid-cols-[1.3fr,1fr] gap-10 items-center">
        <div>
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            О компании
          </p>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-4 leading-tight">
            Region Logistik — надёжный партнёр в подборе автомобилей из-за рубежа
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Компания «Регион Логистик» уже много лет успешно предоставляет полный комплекс услуг
            по подбору, таможенному оформлению и доставке автомобилей из любых стран мира в Россию.
            Мы работаем с клиентами по всей стране, предлагая лучшие условия, минимальные сроки
            и максимальную надёжность.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Наша команда берёт на себя все этапы сделки — от поиска и проверки автомобиля до
            растаможки и передачи ключей клиенту, — чтобы покупка машины из-за рубежа была простой,
            прозрачной и без лишних рисков.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-border p-5 text-center hover-lift">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-primary">{f.value}</div>
              <div className="text-xs text-muted-foreground mt-1.5 leading-snug">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;