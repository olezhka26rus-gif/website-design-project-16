import { useState, useEffect } from 'react';

type CountryKey = 'china' | 'japan' | 'korea' | 'europe' | 'usa';

const hashToCountry: Record<string, CountryKey> = {
  '#catalog-china': 'china',
  '#catalog-japan': 'japan',
  '#catalog-korea': 'korea',
  '#catalog-europe': 'europe',
  '#catalog-usa': 'usa',
};

const countryTabs: { key: CountryKey; label: string; flag: string }[] = [
  { key: 'china', label: 'Китай', flag: '🇨🇳' },
  { key: 'japan', label: 'Япония', flag: '🇯🇵' },
  { key: 'korea', label: 'Корея', flag: '🇰🇷' },
  { key: 'europe', label: 'Европа', flag: '🇪🇺' },
  { key: 'usa', label: 'США', flag: '🇺🇸' },
];

const carsByCountry: Record<CountryKey, { brand: string; price: string; image: string }[]> = {
  china: [
    { brand: 'Zeekr', price: 'от 3 100 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/77a26a5d-d563-4e46-9087-377f55e708e6.jpg' },
    { brand: 'Li Auto', price: 'от 3 700 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/0e95ac3e-1053-41ee-8b20-347a5bbf7076.jpg' },
    { brand: 'Chery', price: 'от 2 100 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/73f0d3a6-23b9-4f72-98fc-635ab445468e.jpg' },
  ],
  japan: [
    { brand: 'Toyota', price: 'от 2 400 000 ₽', image: '/cars/toyota.jpg' },
    { brand: 'Lexus', price: 'от 3 500 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/99f513a9-be1d-46d9-8eee-435c3ad7da04.jpg' },
    { brand: 'Honda', price: 'от 2 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/1f488e25-78fa-4130-a29e-a7d143e660b9.jpg' },
  ],
  korea: [
    { brand: 'Kia', price: 'от 1 800 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/2649f099-f695-459c-80bf-83b335aaeb64.jpg' },
    { brand: 'Hyundai', price: 'от 1 700 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ee9d1a81-88f7-4783-bfef-c37a16736161.jpg' },
    { brand: 'Genesis', price: 'от 4 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/5f9c8a64-c8b2-42f1-bfa6-26110ecb5e81.jpg' },
  ],
  europe: [
    { brand: 'BMW', price: 'от 3 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/3e8c520d-1270-4f3a-9563-eadb0bfb702d.jpg' },
    { brand: 'Mercedes-Benz', price: 'от 3 600 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/a78b34f6-d658-417e-b5b7-d3a59af6a0c6.jpg' },
    { brand: 'Audi', price: 'от 3 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ff120423-e044-4f41-87ea-faa13c46589b.jpg' },
  ],
  usa: [
    { brand: 'Tesla', price: 'от 4 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/f876eab7-9ae5-46a2-b855-62d4830ccd62.jpg' },
    { brand: 'Jeep', price: 'от 3 300 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/5b288ec1-e4f4-4f78-b1cc-b002ea38f5dd.jpg' },
    { brand: 'Ford', price: 'от 2 900 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/b5fa3e71-014c-48dd-8ba1-31011cfa47fa.jpg' },
  ],
};

const Catalog = () => {
  const [active, setActive] = useState<CountryKey>('japan');
  const cars = carsByCountry[active];

  useEffect(() => {
    const applyHash = () => {
      const country = hashToCountry[window.location.hash];
      if (country) setActive(country);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="container">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Популярные автомобили</h2>
          <a href="#cta" className="text-primary text-sm font-semibold hover:underline">Смотреть все</a>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {countryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                active === tab.key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white text-foreground/80 border-border hover:border-primary'
              }`}
            >
              <span className="mr-1.5">{tab.flag}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-fade-in">
          {cars.map((car) => (
            <div
              key={car.brand}
              className="rounded-xl border border-border overflow-hidden text-center hover-lift bg-white cursor-pointer"
            >
              <div className="h-40 bg-secondary overflow-hidden">
                <img
                  src={car.image}
                  alt={car.brand}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm truncate">{car.brand}</div>
                <div className="text-xs text-muted-foreground mt-1">{car.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;