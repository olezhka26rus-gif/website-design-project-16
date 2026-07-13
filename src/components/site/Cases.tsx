import CountryFlag, { CountryCode } from '@/components/site/CountryFlag';

const cases: {
  name: string;
  spec: string;
  countryCode: CountryCode;
  countryName: string;
  priceAbroad: string;
  priceRu: string;
  ourPrice: string;
  save: string;
  days: string;
  image: string;
}[] = [
  {
    name: 'BMW X5 2023',
    spec: '3.0d xDrive M Sport',
    countryCode: 'korea',
    countryName: 'Корея',
    priceAbroad: '4 150 000 ₽',
    priceRu: '5 450 000 ₽',
    ourPrice: '4 590 000 ₽',
    save: '860 000 ₽',
    days: '32 дня',
    image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/590da637-8a4a-4754-9ede-b1ee7ca2dfc9.jpg',
  },
  {
    name: 'Toyota Land Cruiser 300 2022',
    spec: '3.3d AT',
    countryCode: 'japan',
    countryName: 'Япония',
    priceAbroad: '5 250 000 ₽',
    priceRu: '6 950 000 ₽',
    ourPrice: '5 850 000 ₽',
    save: '1 100 000 ₽',
    days: '38 дней',
    image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/b5fe642a-2903-467c-b8b0-032f07f52454.jpg',
  },
  {
    name: 'Kia Carnival 2023',
    spec: '2.2d Signature',
    countryCode: 'korea',
    countryName: 'Корея',
    priceAbroad: '3 050 000 ₽',
    priceRu: '4 100 000 ₽',
    ourPrice: '3 520 000 ₽',
    save: '580 000 ₽',
    days: '27 дней',
    image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/04c0f0c9-ec17-4107-8109-5cd348666493.jpg',
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
        <div className="mb-8">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Последние доставленные автомобили</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <div key={c.name} className="rounded-2xl bg-white border border-border p-6 hover-lift">
              <h3 className="font-display font-bold text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.spec}</p>
              <div className="h-32 rounded-xl bg-secondary overflow-hidden mb-4">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex items-center justify-between py-1.5 text-sm border-b border-border/60">
                <span className="text-muted-foreground">Страна:</span>
                <span className="font-semibold flex items-center gap-1.5">
                  <CountryFlag country={c.countryCode} className="w-5 h-auto rounded-[2px]" />
                  {c.countryName}
                </span>
              </div>
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