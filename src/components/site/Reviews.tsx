const reviews = [
  {
    name: 'Александр, г. Краснодар',
    car: 'Toyota Land Cruiser 300',
    text: 'Долго искал живой вариант Land Cruiser 300. Ребята нашли отличный вариант в Японии. Доставили за 35 дней, всё как обещали. Спасибо!',
    date: '12.04.2024',
  },
  {
    name: 'Игорь, г. Ростов-на-Дону',
    car: 'BMW X5',
    text: 'Привезли BMW X5 из Кореи. Автомобиль в идеальном состоянии, без крашеных элементов. Сэкономил больше 800 тыс. рублей. Рекомендую!',
    date: '28.03.2024',
  },
  {
    name: 'Максим, г. Самара',
    car: 'Zeekr 001',
    text: 'Заказывал Zeekr 001 из Китая. Всё на высшем уровне: от подбора до выдачи авто. Постоянно были на связи.',
    date: '10.04.2024',
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="container">
        <div className="mb-8">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Отзывы клиентов</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl">👤</div>
                <div>
                  <div className="font-display font-bold text-sm">{r.name}</div>
                  <div className="text-xs text-primary">{r.car}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.text}</p>
              <div className="text-xs text-muted-foreground">{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;