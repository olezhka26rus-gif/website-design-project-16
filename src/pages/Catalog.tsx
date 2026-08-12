import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CountryFlag from '@/components/site/CountryFlag';
import CarSearch from '@/components/site/CarSearch';
import Icon from '@/components/ui/icon';
import { catalogEntries, catalogBrands, CountryKey } from '@/data/catalogCars';
import { brandRu } from '@/data/carAliases';

const countryGenitiveLabel: Record<CountryKey, string> = {
  china: 'Китая',
  japan: 'Японии',
  korea: 'Кореи',
  europe: 'Европы',
  usa: 'США',
  uae: 'ОАЭ',
};

const countryTabs: { key: CountryKey | 'all'; label: string }[] = [
  { key: 'all', label: 'Все страны' },
  { key: 'china', label: 'Китай' },
  { key: 'japan', label: 'Япония' },
  { key: 'korea', label: 'Корея' },
  { key: 'europe', label: 'Европа' },
  { key: 'usa', label: 'США' },
  { key: 'uae', label: 'ОАЭ' },
];

const Catalog = () => {
  const [active, setActive] = useState<CountryKey | 'all'>('all');

  const entries = useMemo(
    () => (active === 'all' ? catalogEntries : catalogEntries.filter((e) => e.country === active)),
    [active]
  );

  const pageUrl = 'https://rlogistik.ru/catalog';

  const topBrandsRu = Array.from(
    new Set(
      catalogEntries
        .map((e) => brandRu[e.model.brand])
        .filter((name): name is string => Boolean(name))
    )
  ).slice(0, 15);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Каталог автомобилей на заказ из-за рубежа | Регион Логистик (Region Logistik)</title>
        <meta
          name="description"
          content={`Каталог из ${catalogEntries.length}+ моделей автомобилей на заказ из Китая, Японии, Кореи, Европы, США и ОАЭ — характеристики, ориентировочные цены и расчёт стоимости под ключ.`}
        />
        <meta
          name="keywords"
          content={[
            'каталог автомобилей на заказ',
            'авто из Китая',
            'авто из Японии',
            'авто из Кореи',
            'авто из Европы',
            'авто из США',
            'авто из ОАЭ',
            'купить авто под заказ',
            ...topBrandsRu.map((name) => `${name} на заказ`),
            'Регион Логистик',
          ].join(', ')}
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Каталог автомобилей на заказ из-за рубежа | Регион Логистик" />
        <meta
          property="og:description"
          content={`Более ${catalogEntries.length} моделей автомобилей на заказ из Китая, Японии, Кореи, Европы, США и ОАЭ с характеристиками и ориентировочными ценами.`}
        />
        <meta property="og:image" content="https://rlogistik.ru/logo-mark.png" />
        <meta property="og:image:width" content="452" />
        <meta property="og:image:height" content="278" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Каталог автомобилей на заказ из-за рубежа | Регион Логистик" />
        <meta
          name="twitter:description"
          content={`Более ${catalogEntries.length} моделей автомобилей на заказ из Китая, Японии, Кореи, Европы, США и ОАЭ с характеристиками и ориентировочными ценами.`}
        />
        <meta name="twitter:image" content="https://rlogistik.ru/logo-mark.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rlogistik.ru/' },
              { '@type': 'ListItem', position: 2, name: 'Каталог', item: pageUrl },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: entries.slice(0, 50).map((e, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://rlogistik.ru/catalog/${e.country}/${e.slug}`,
              name: e.variant.model,
            })),
          })}
        </script>
      </Helmet>

      <Header />

      <main className="container py-16">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl mb-3">
          Каталог автомобилей на заказ
        </h1>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Более {catalogEntries.length} моделей из Китая, Японии, Кореи, Европы, США и ОАЭ — с характеристиками
          и ориентировочной ценой под ключ. Точную стоимость и фото уточняйте у менеджера.
        </p>

        <CarSearch variant="page" className="mb-8 max-w-xl" />

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
              {tab.key !== 'all' && (
                <CountryFlag country={tab.key} className="inline-block w-5 h-auto rounded-[2px] mr-1.5 -mt-0.5" />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {entries.map((e) => (
            <Link
              key={`${e.country}-${e.slug}`}
              to={`/catalog/${e.country}/${e.slug}`}
              className="group rounded-xl border border-border overflow-hidden hover-lift bg-white flex flex-col"
            >
              <div className="relative h-36 bg-secondary overflow-hidden">
                <img
                  src={e.variant.sideImage}
                  alt={e.variant.model}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-white/90 rounded-full p-1">
                  <CountryFlag country={e.country} className="w-4 h-auto rounded-[2px]" />
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <div className="font-semibold text-sm truncate">{e.variant.model}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{e.variant.bodyType} · {e.countryName}</div>
                                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-foreground/70">
                    <Icon name="Gauge" size={11} />
                    {e.variant.specs.power}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-foreground/70">
                    <Icon name="Fuel" size={11} />
                    {e.variant.specs.engine}
                  </span>
                </div>
                <div className="text-sm font-bold text-primary mt-2">{e.variant.price}</div>
                <div className="text-[11px] text-muted-foreground">цена авто без доставки</div>
              </div>
            </Link>
          ))}
        </div>

        {entries.length === 0 && (
          <p className="text-center text-muted-foreground py-16">Модели не найдены</p>
        )}

        <section className="mt-14">
          <h2 className="font-display font-bold text-xl mb-4">Подборки по странам</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {countryTabs
              .filter((t) => t.key !== 'all')
              .map((t) => (
                <Link
                  key={t.key}
                  to={`/catalog/${t.key}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-border bg-white hover:border-primary transition-colors"
                >
                  <CountryFlag country={t.key as CountryKey} className="w-5 h-auto rounded-[2px]" />
                  Авто из {countryGenitiveLabel[t.key as CountryKey]}
                </Link>
              ))}
          </div>

          <h2 className="font-display font-bold text-xl mb-4">Популярные марки</h2>
          <div className="flex flex-wrap gap-2">
            {catalogBrands
              .filter((b) => b.entries.length >= 4)
              .map((b) => (
                <Link
                  key={b.slug}
                  to={`/catalog/brand/${b.slug}`}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-border bg-white hover:border-primary transition-colors"
                >
                  {b.brand} · {b.entries.length}
                </Link>
              ))}
          </div>
        </section>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-semibold text-center sm:text-left flex items-center gap-2">
            <Icon name="Info" size={18} className="text-primary shrink-0" />
            Не нашли нужную модель? Мы подберём и привезём любой автомобиль на заказ.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;