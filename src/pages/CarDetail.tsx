import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CountryFlag from '@/components/site/CountryFlag';
import LeadFormModal from '@/components/site/LeadFormModal';
import Calculator from '@/components/site/Calculator';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { findCatalogEntry, catalogEntriesByCountry, CountryKey, CarVariant } from '@/data/catalogCars';
import { trackGoal, goals } from '@/lib/analytics';
import NotFound from './NotFound';

const countryGenitive: Record<string, string> = {
  Китай: 'Китая',
  Япония: 'Японии',
  Корея: 'Кореи',
  Европа: 'Европы',
  США: 'США',
  ОАЭ: 'ОАЭ',
};

const SPEC_ROWS: { key: keyof CarVariant['specs']; label: string; icon: string }[] = [
  { key: 'engine', label: 'Двигатель', icon: 'Fuel' },
  { key: 'power', label: 'Мощность', icon: 'Gauge' },
  { key: 'drive', label: 'Привод', icon: 'MoveHorizontal' },
  { key: 'transmission', label: 'Коробка', icon: 'Cog' },
  { key: 'year', label: 'Год выпуска', icon: 'Calendar' },
  { key: 'consumption', label: 'Расход', icon: 'Droplet' },
];

const WHY_ORDER_ITEMS = [
  'подбор автомобиля под ваш бюджет',
  'проверка по базам и истории эксплуатации',
  'фото- и видеоотчёт перед покупкой',
  'организация выкупа',
  'международная доставка',
  'таможенное оформление',
  'помощь с получением ЭПТС',
  'доставка до вашего города',
];

const CarDetail = () => {
  const { country, slug } = useParams();
  const entry = country && slug ? findCatalogEntry(country, slug) : undefined;
  const [leadOpen, setLeadOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  if (!entry) return <NotFound />;

  const { model, variant, countryName } = entry;
  const countryGen = countryGenitive[countryName] ?? countryName;
  const fullName = variant.model.toLowerCase().startsWith(model.brand.toLowerCase())
    ? variant.model
    : `${model.brand} ${variant.model}`;
  const pageUrl = `https://rlogistik.ru/catalog/${entry.country}/${entry.slug}`;
  const otherVariants = model.variants.filter((v) => v.model !== variant.model);
  const similarModels = catalogEntriesByCountry(entry.country as CountryKey)
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{variant.model} на заказ из {countryGen} — характеристики и цена | Регион Логистик</title>
        <meta
          name="description"
          content={`${variant.model} (${variant.bodyType}) под заказ из ${countryGen}: ${variant.specs.engine}, ${variant.specs.power}. Ориентировочная цена под ключ ${variant.price}. Подбор, проверка и доставка в Россию.`}
        />
        <meta
          name="keywords"
          content={`${variant.model}, купить ${variant.model}, ${variant.model} из ${countryGen}, ${variant.model} цена, заказать ${variant.model}, Регион Логистик`}
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${variant.model} на заказ из ${countryGen} | Регион Логистик`} />
        <meta
          property="og:description"
          content={`${variant.bodyType}, ${variant.specs.engine}, ${variant.specs.power}. Цена под ключ ${variant.price}.`}
        />
        <meta property="og:image" content={variant.sideImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="ru_RU" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: variant.model,
            image: variant.sideImage,
            description: `${variant.model} (${variant.bodyType}) под заказ из ${countryGen}. ${variant.specs.engine}, ${variant.specs.power}, ${variant.specs.drive} привод, ${variant.specs.transmission}.`,
            brand: { '@type': 'Brand', name: model.brand },
            offers: {
              '@type': 'Offer',
              price: variant.price.replace(/[^\d]/g, ''),
              priceCurrency: 'RUB',
              availability: 'https://schema.org/PreOrder',
              url: pageUrl,
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rlogistik.ru/' },
              { '@type': 'ListItem', position: 2, name: 'Каталог', item: 'https://rlogistik.ru/catalog' },
              { '@type': 'ListItem', position: 3, name: countryName, item: `https://rlogistik.ru/catalog?country=${entry.country}` },
              { '@type': 'ListItem', position: 4, name: variant.model, item: pageUrl },
            ],
          })}
        </script>
      </Helmet>

      <Header />

      <main className="container py-12 max-w-4xl">
        <Link to="/catalog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <Icon name="ArrowLeft" size={16} />
          Весь каталог
        </Link>

        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <CountryFlag country={entry.country as CountryKey} className="w-5 h-auto rounded-[2px]" />
          {countryName} · {variant.bodyType}
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl mb-6 leading-tight">
          {variant.model}
        </h1>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <div className="rounded-2xl overflow-hidden bg-secondary h-64 sm:h-72">
              <img
                src={variant.sideImage}
                alt={variant.model}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 text-sm">
              {SPEC_ROWS.map((row) => (
                <div key={row.key} className="flex items-center gap-2 text-muted-foreground">
                  <Icon name={row.icon} size={15} className="shrink-0" />
                  <span>
                    {row.label}: <span className="text-foreground font-medium">{variant.specs[row.key]}</span>
                  </span>
                </div>
              ))}
            </div>

            {otherVariants.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Другие кузова {model.brand}</div>
                <div className="flex flex-wrap gap-2">
                  {otherVariants.map((v) => (
                    <Link
                      key={v.model}
                      to={`/catalog/${entry.country}/${v.model.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-white text-foreground/80 hover:border-primary transition-colors"
                    >
                      {v.model}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-3xl font-display font-extrabold text-primary">{variant.price}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Ориентировочная цена под ключ с учётом доставки и таможенного оформления
            </p>

            <p className="text-sm text-foreground/80 leading-relaxed mt-5">
              {fullName} доступна для заказа из Китая, Японии, Южной Кореи, Европы, США, ОАЭ и других стран.
              Мы подберём автомобиль под ваш бюджет и требования, проверим историю эксплуатации, техническое состояние и документы,
              после чего организуем покупку, доставку и таможенное оформление под ключ до вашего города.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-secondary/60 flex items-start gap-2 text-xs text-muted-foreground">
              <Icon name="ImageOff" size={16} className="shrink-0 mt-0.5" />
              Фото ориентировочное. Точные фото и комплектацию подбираемого автомобиля пришлём после подбора.
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full min-h-12 h-auto py-3 font-semibold text-base hover-lift whitespace-normal text-center leading-snug"
                onClick={() => {
                  trackGoal(goals.CTA_BUTTON_CLICK, { label: `Получить расчёт на ${variant.model}` });
                  setLeadOpen(true);
                }}
              >
                Получить расчёт на {variant.model}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 font-semibold text-base"
                onClick={() => {
                  trackGoal(goals.CTA_BUTTON_CLICK, { label: `Калькулятор (${variant.model})` });
                  setCalcOpen(true);
                }}
              >
                <Icon name="Calculator" size={18} />
                Рассчитать растаможку
              </Button>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="Lock" size={13} />
                Ваши данные защищены и не передаются третьим лицам
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-secondary/50">
          <h2 className="font-display font-bold text-xl mb-4">
            Почему стоит заказать {fullName} через Регион Логистик
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {WHY_ORDER_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                <Icon name="CheckCircle2" size={16} className="text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {similarModels.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-xl mb-4">Похожие модели из {countryGenitive[countryName] ?? countryName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarModels.map((e) => (
                <Link
                  key={e.slug}
                  to={`/catalog/${e.country}/${e.slug}`}
                  className="group rounded-xl border border-border overflow-hidden hover-lift bg-white flex flex-col"
                >
                  <div className="h-28 bg-secondary overflow-hidden">
                    <img src={e.variant.sideImage} alt={e.variant.model} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-sm truncate">{e.variant.model}</div>
                    <div className="text-xs text-primary font-bold mt-1">{e.variant.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      <LeadFormModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        source={`catalog:${entry.country}/${entry.slug}`}
        defaultCar={`${variant.model} (${variant.bodyType})`}
      />
      <Calculator open={calcOpen} onOpenChange={setCalcOpen} />
    </div>
  );
};

export default CarDetail;