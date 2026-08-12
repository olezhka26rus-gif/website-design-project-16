import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountryFlag from '@/components/site/CountryFlag';
import CarDetailModal from '@/components/site/CarDetailModal';
import Icon from '@/components/ui/icon';
import { carsByCountry, CountryKey, CarModel, CarVariant } from '@/data/catalogCars';

const hashToCountry: Record<string, CountryKey> = {
  '#catalog-china': 'china',
  '#catalog-japan': 'japan',
  '#catalog-korea': 'korea',
  '#catalog-europe': 'europe',
  '#catalog-usa': 'usa',
  '#catalog-uae': 'uae',
};

const countryTabs: { key: CountryKey; label: string }[] = [
  { key: 'china', label: 'Китай' },
  { key: 'japan', label: 'Япония' },
  { key: 'korea', label: 'Корея' },
  { key: 'europe', label: 'Европа' },
  { key: 'usa', label: 'США' },
  { key: 'uae', label: 'ОАЭ' },
];

const pluralBody = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return 'кузовов';
  if (m10 === 1) return 'кузов';
  if (m10 >= 2 && m10 <= 4) return 'кузова';
  return 'кузовов';
};

const Catalog = () => {
  const [active, setActive] = useState<CountryKey>('japan');
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<CarVariant | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const models = carsByCountry[active];

  const openCar = (model: CarModel, variant: CarVariant) => {
    setSelectedModel(model);
    setSelectedVariant(variant);
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
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Популярные автомобили</h2>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Смотреть весь каталог
            <Icon name="ArrowRight" size={16} />
          </Link>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {models.map((model) => {
            const variant = model.variants[0];
            return (
              <div
                key={model.brand}
                onClick={() => openCar(model, variant)}
                className="group rounded-xl border border-border overflow-hidden hover-lift bg-white cursor-pointer flex flex-col"
              >
                <div className="relative h-40 bg-secondary overflow-hidden shrink-0">
                  <img
                    src={variant.sideImage}
                    alt={`${variant.model} — ${variant.bodyType} на заказ`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      Смотреть
                    </span>
                  </div>
                  {model.variants.length > 1 && (
                    <span className="absolute top-2 right-2 bg-white/90 text-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {model.variants.length} {pluralBody(model.variants.length)}
                    </span>
                  )}
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <div className="font-semibold text-sm truncate">{variant.model}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">
                    {variant.bodyType} · {variant.specs.year}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-foreground/70">
                      <Icon name="Gauge" size={11} />
                      {variant.specs.power}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-foreground/70">
                      <Icon name="Fuel" size={11} />
                      {variant.specs.engine}
                    </span>
                  </div>

                  <div className="mt-auto pt-2.5">
                    <div className="text-sm font-bold text-primary">{variant.price}</div>
                    <div className="text-[11px] text-muted-foreground">цена авто без доставки</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary font-semibold px-6 py-3 hover:bg-primary/5 transition-colors"
          >
            <Icon name="LayoutGrid" size={18} />
            Смотреть весь каталог
          </Link>
        </div>
      </div>

      <CarDetailModal
        carModel={selectedModel}
        initialVariant={selectedVariant}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </section>
  );
};

export default Catalog;