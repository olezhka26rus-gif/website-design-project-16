import { useState, useEffect } from 'react';
import CountryFlag from '@/components/site/CountryFlag';
import CarDetailModal, { CarData } from '@/components/site/CarDetailModal';
import Icon from '@/components/ui/icon';

type CountryKey = 'china' | 'japan' | 'korea' | 'europe' | 'usa';

const hashToCountry: Record<string, CountryKey> = {
  '#catalog-china': 'china',
  '#catalog-japan': 'japan',
  '#catalog-korea': 'korea',
  '#catalog-europe': 'europe',
  '#catalog-usa': 'usa',
};

const countryTabs: { key: CountryKey; label: string }[] = [
  { key: 'china', label: 'Китай' },
  { key: 'japan', label: 'Япония' },
  { key: 'korea', label: 'Корея' },
  { key: 'europe', label: 'Европа' },
  { key: 'usa', label: 'США' },
];

const carsByCountry: Record<CountryKey, CarData[]> = {
  china: [
    { brand: 'Zeekr', price: 'от 3 100 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/77a26a5d-d563-4e46-9087-377f55e708e6.jpg', bodyTypes: ['Седан', 'Лифтбек'] },
    { brand: 'Li Auto', price: 'от 3 700 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/0e95ac3e-1053-41ee-8b20-347a5bbf7076.jpg', bodyTypes: ['Внедорожник'] },
    { brand: 'Chery', price: 'от 2 100 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/73f0d3a6-23b9-4f72-98fc-635ab445468e.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'BYD', price: 'от 2 600 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/4a481116-b313-44ca-ad8b-32a392be3f47.jpg', bodyTypes: ['Седан', 'Кроссовер', 'Универсал'] },
    { brand: 'Geely', price: 'от 2 800 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/92891ec2-ca45-4404-9bc8-7b46962eabfc.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'Haval', price: 'от 2 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/45c13f81-2b74-44fd-9302-0dc774f0cfbb.jpg', bodyTypes: ['Внедорожник', 'Кроссовер'] },
  ],
  japan: [
    { brand: 'Toyota', price: 'от 2 400 000 ₽', image: '/cars/toyota.jpg', bodyTypes: ['Седан', 'Кроссовер', 'Универсал'] },
    { brand: 'Lexus', price: 'от 3 500 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/99f513a9-be1d-46d9-8eee-435c3ad7da04.jpg', bodyTypes: ['Седан', 'Внедорожник'] },
    { brand: 'Honda', price: 'от 2 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/1f488e25-78fa-4130-a29e-a7d143e660b9.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'Nissan', price: 'от 2 100 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/f048ca99-a510-4e04-9a05-41e2673ba93c.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'Mazda', price: 'от 2 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/89f8334c-fb32-4622-924b-a4202771176a.jpg', bodyTypes: ['Седан', 'Хэтчбек'] },
    { brand: 'Mitsubishi', price: 'от 1 900 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/f563d2a0-2788-45b3-a74c-effae63719d9.jpg', bodyTypes: ['Внедорожник', 'Кроссовер'] },
  ],
  korea: [
    { brand: 'Kia', price: 'от 1 800 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/2649f099-f695-459c-80bf-83b335aaeb64.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'Hyundai', price: 'от 1 700 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ee9d1a81-88f7-4783-bfef-c37a16736161.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'Genesis', price: 'от 4 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/5f9c8a64-c8b2-42f1-bfa6-26110ecb5e81.jpg', bodyTypes: ['Седан', 'Внедорожник'] },
    { brand: 'SsangYong', price: 'от 1 900 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/bc4dd6f4-230a-4923-a8f9-d713dce1f9a8.jpg', bodyTypes: ['Внедорожник'] },
    { brand: 'Kia Sorento', price: 'от 2 600 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/c62b95c6-900c-48ca-9231-6051c4bdc66e.jpg', bodyTypes: ['Внедорожник'] },
    { brand: 'Hyundai Palisade', price: 'от 3 400 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/bd6cc2f0-407c-4563-8a83-5357ff1f7f90.jpg', bodyTypes: ['Внедорожник'] },
  ],
  europe: [
    { brand: 'BMW', price: 'от 3 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/3e8c520d-1270-4f3a-9563-eadb0bfb702d.jpg', bodyTypes: ['Седан', 'Универсал', 'Кроссовер'] },
    { brand: 'Mercedes-Benz', price: 'от 3 600 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/a78b34f6-d658-417e-b5b7-d3a59af6a0c6.jpg', bodyTypes: ['Седан', 'Купе', 'Внедорожник'] },
    { brand: 'Audi', price: 'от 3 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ff120423-e044-4f41-87ea-faa13c46589b.jpg', bodyTypes: ['Седан', 'Универсал', 'Кроссовер'] },
    { brand: 'Volkswagen', price: 'от 2 300 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/e2421106-0bc0-41cb-b8c5-7e8783dc61da.jpg', bodyTypes: ['Седан', 'Хэтчбек', 'Кроссовер'] },
    { brand: 'Porsche', price: 'от 6 500 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/e1248a5a-9605-47ca-8330-d0505ddce2da.jpg', bodyTypes: ['Купе', 'Внедорожник'] },
    { brand: 'Range Rover', price: 'от 5 800 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ed494a44-e81f-44f2-8dd0-cfb1cb9d0c4a.jpg', bodyTypes: ['Внедорожник'] },
  ],
  usa: [
    { brand: 'Tesla', price: 'от 4 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/f876eab7-9ae5-46a2-b855-62d4830ccd62.jpg', bodyTypes: ['Седан', 'Кроссовер'] },
    { brand: 'Jeep', price: 'от 3 300 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/5b288ec1-e4f4-4f78-b1cc-b002ea38f5dd.jpg', bodyTypes: ['Внедорожник'] },
    { brand: 'Ford', price: 'от 2 900 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/b5fa3e71-014c-48dd-8ba1-31011cfa47fa.jpg', bodyTypes: ['Пикап', 'Внедорожник'] },
    { brand: 'Cadillac', price: 'от 5 500 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/e7efa74e-3329-46df-94b5-ac9b4f88e2a1.jpg', bodyTypes: ['Седан', 'Внедорожник'] },
    { brand: 'Chevrolet', price: 'от 4 300 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/287e8e21-c70f-4330-bc6c-2949e3d26451.jpg', bodyTypes: ['Пикап', 'Внедорожник'] },
    { brand: 'Dodge', price: 'от 3 600 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ba6d9370-1953-471f-93ea-c13b43eb9eba.jpg', bodyTypes: ['Седан', 'Купе'] },
  ],
};

const Catalog = () => {
  const [active, setActive] = useState<CountryKey>('japan');
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const cars = carsByCountry[active];

  const openCar = (car: CarData) => {
    setSelectedCar(car);
    setDetailOpen(true);
  };

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
        <div className="mb-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Популярные автомобили</h2>
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
              <CountryFlag country={tab.key} className="inline-block w-5 h-auto rounded-[2px] mr-1.5 -mt-0.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in">
          {cars.map((car) => (
            <div
              key={car.brand}
              onClick={() => openCar(car)}
              className="group rounded-xl border border-border overflow-hidden text-center hover-lift bg-white cursor-pointer"
            >
              <div className="relative h-40 bg-secondary overflow-hidden">
                <img
                  src={car.image}
                  alt={car.brand}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    Смотреть
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm truncate">{car.brand}</div>
                <div className="text-xs text-muted-foreground mt-1">{car.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarDetailModal car={selectedCar} open={detailOpen} onOpenChange={setDetailOpen} />
    </section>
  );
};

export default Catalog;