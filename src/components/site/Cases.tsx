const cases = [
  {
    name: 'BMW X5 2023',
    spec: '3.0d xDrive M Sport',
    country: '🇰🇷 Корея',
    priceAbroad: '4 150 000 ₽',
    priceRu: '5 450 000 ₽',
    ourPrice: '4 590 000 ₽',
    save: '860 000 ₽',
    days: '32 дня',
  },
  {
    name: 'Toyota Land Cruiser 300 2022',
    spec: '3.3d AT',
    country: '🇯🇵 Япония',
    priceAbroad: '5 250 000 ₽',
    priceRu: '6 950 000 ₽',
    ourPrice: '5 850 000 ₽',
    save: '1 100 000 ₽',
    days: '38 дней',
  },
  {
    name: 'Kia Carnival 2023',
    spec: '2.2d Signature',
    country: '🇰🇷 Корея',
    priceAbroad: '3 050 000 ₽',
    priceRu: '4 100 000 ₽',
    ourPrice: '3 520 000 ₽',
    save: '580 000 ₽',
    days: '27 дней',
  },
];

const Row = ({ label, value, accent }: { label: string; value: string; accent?: 'red' | 'green' }) => (
  <div className="flex items-center justify-between py-1.5 text-sm border-b border-border/60 last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span
      className={
        accent === 'red'
          ? 'font-display font-bold text-primary'
          : accent === 'green'
          ? 'font-display font-bold text-green-600'
          : 'font-semibold'
      }
    >
      {value}
    </span>
  </div>
);

const Cases = () => {
  return (
    <section id="cases" className="py-16 bg-secondary/50">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Последние доставленные автомобили</h2>
          <a href="#cta" className="text-primary text-sm font-semibold hover:underline">Смотреть все кейсы</a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <div key={c.name} className="rounded-2xl bg-white border border-border p-6 hover-lift">
              <h3 className="font-display font-bold text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.spec}</p>
              <div className="h-32 rounded-xl bg-secondary flex items-center justify-center text-5xl mb-4">🚗</div>
              <Row label="Страна:" value={c.country} />
              <Row label="Цена за рубежом:" value={c.priceAbroad} />
              <Row label="Цена в России:" value={c.priceRu} />
              <Row label="Наша цена:" value={c.ourPrice} accent="red" />
              <Row label="Экономия:" value={c.save} accent="green" />
              <Row label="Срок доставки:" value={c.days} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
