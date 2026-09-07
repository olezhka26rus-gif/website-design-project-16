import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Icon from '@/components/ui/icon';
import { motoEntries, MotoCountryKey } from '@/data/catalogMoto';

const countryFlagEmoji: Record<MotoCountryKey, string> = {
  japan: '🇯🇵',
  europe: '🇪🇺',
  usa: '🇺🇸',
};

const countryLabel: Record<MotoCountryKey, string> = {
  japan: 'Япония',
  europe: 'Европа',
  usa: 'США',
};

const countryTabs: { key: MotoCountryKey | 'all'; label: string }[] = [
  { key: 'all', label: 'Все страны' },
  { key: 'japan', label: 'Япония' },
  { key: 'europe', label: 'Европа' },
  { key: 'usa', label: 'США' },
];

const MotoCatalog = () => {
  const [active, setActive] = useState<MotoCountryKey | 'all'>('all');

  const entries = useMemo(
    () => (active === 'all' ? motoEntries : motoEntries.filter((e) => e.country === active)),
    [active]
  );

  const pageUrl = 'https://rlogistik.ru/moto';

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Каталог мотоциклов на заказ из-за рубежа | Регион Логистик (Region Logistik)</title>
        <meta
          name="description"
          content={`Каталог из ${motoEntries.length} моделей мотоциклов на заказ из Японии, Европы и США — характеристики, ориентировочные цены и расчёт стоимости под ключ.`}
        />
        <meta
          name="keywords"
          content="каталог мотоциклов на заказ, мотоцикл из Японии, мотоцикл из Европы, мотоцикл из США, купить мотоцикл под заказ, растаможка мотоцикла, Регион Логистик"
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Каталог мотоциклов на заказ из-за рубежа | Регион Логистик" />
        <meta
          property="og:description"
          content={`${motoEntries.length} моделей мотоциклов на заказ из Японии, Европы и США с характеристиками и ориентировочными ценами.`}
        />
        <meta property="og:image" content="https://rlogistik.ru/og-cover.jpg" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Каталог мотоциклов на заказ из-за рубежа | Регион Логистик" />
        <meta name="twitter:image" content="https://rlogistik.ru/og-cover.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rlogistik.ru/' },
              { '@type': 'ListItem', position: 2, name: 'Мотоциклы', item: pageUrl },
            ],
          })}
        </script>
      </Helmet>

      <Header />

      <main className="container py-16">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl mb-3">
          Каталог мотоциклов на заказ
        </h1>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          {motoEntries.length} моделей из Японии, Европы и США — с характеристиками и ориентировочной ценой
          под ключ. Точную стоимость и фото уточняйте у менеджера.
        </p>

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
              {tab.key !== 'all' && <span className="mr-1.5">{countryFlagEmoji[tab.key]}</span>}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {entries.map((e) => (
            <Link
              key={`${e.country}-${e.slug}`}
              to={`/moto/${e.country}/${e.slug}`}
              className="group rounded-xl border border-border overflow-hidden hover-lift bg-white flex flex-col"
            >
              <div className="relative h-36 bg-secondary overflow-hidden">
                <img
                  src={e.variant.sideImage}
                  alt={e.variant.model}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-white/90 rounded-full px-1.5 py-0.5 text-xs">
                  {countryFlagEmoji[e.country]}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <div className="font-semibold text-sm truncate">{e.variant.model}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {e.variant.bodyType} · {e.countryName}
                </div>
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
                <div className="text-[11px] text-muted-foreground">цена мотоцикла без доставки</div>
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
                  to={`/moto/${t.key}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-border bg-white hover:border-primary transition-colors"
                >
                  <span>{countryFlagEmoji[t.key as MotoCountryKey]}</span>
                  Мотоциклы из {countryLabel[t.key as MotoCountryKey]}
                </Link>
              ))}
          </div>
        </section>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/50 flex items-center gap-3">
          <Icon name="Info" size={18} className="text-primary shrink-0" />
          <p className="font-display font-semibold">
            Не нашли нужную модель? Мы подберём и привезём любой мотоцикл на заказ.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MotoCatalog;
