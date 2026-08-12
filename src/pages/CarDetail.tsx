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
import { brandRu, modelRu, brandExtraAliases } from '@/data/carAliases';
import { trackGoal, goals } from '@/lib/analytics';
import { buildCarContent, countryPrepositional } from '@/lib/carContent';
import { formatRub, SERVICE_FEE_TOOLTIP } from '@/lib/customs';
import NotFoundSeo from './NotFoundSeo';

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

  if (!entry) return <NotFoundSeo />;

  const { model, variant, countryName } = entry;
  const countryGen = countryGenitive[countryName] ?? countryName;
  const fullName = variant.model.toLowerCase().startsWith(model.brand.toLowerCase())
    ? variant.model
    : `${model.brand} ${variant.model}`;
  const pageUrl = `https://rlogistik.ru/catalog/${entry.country}/${entry.slug}`;
  const absoluteImage = variant.sideImage.startsWith('http')
    ? variant.sideImage
    : `https://rlogistik.ru${variant.sideImage}`;
  const modelNameRu = modelRu[variant.model];
  const brandNameRu = brandRu[model.brand];
  const brandAliasesRu = brandExtraAliases[model.brand] ?? [];
  const ruKeywordParts = [
    modelNameRu,
    brandNameRu && modelNameRu ? `купить ${brandNameRu} ${modelNameRu.replace(`${brandNameRu} `, '')}` : undefined,
    modelNameRu ? `${modelNameRu} цена` : undefined,
    modelNameRu ? `заказать ${modelNameRu}` : undefined,
    ...brandAliasesRu,
  ].filter(Boolean);
  const content = buildCarContent(entry);
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
          content={
            content.cost
              ? `${variant.model} (${variant.bodyType}, ${variant.specs.year}) под заказ из ${countryGen}: ${variant.specs.engine}, ${variant.specs.power}, ${variant.specs.transmission}. Цена под ключ от ${formatRub(content.cost.total)} с пошлиной, утильсбором и доставкой. Расчёт, сроки и ответы на частые вопросы.`
              : `${variant.model} (${variant.bodyType}) под заказ из ${countryGen}: ${variant.specs.engine}, ${variant.specs.power}. Ориентировочная цена под ключ ${variant.price}. Подбор, проверка и доставка в Россию.`
          }
        />
        <meta
          name="keywords"
          content={[
            variant.model,
            `купить ${variant.model}`,
            `${variant.model} из ${countryGen}`,
            `${variant.model} цена`,
            `заказать ${variant.model}`,
            ...ruKeywordParts,
            'Регион Логистик',
          ].join(', ')}
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${variant.model} на заказ из ${countryGen} | Регион Логистик`} />
        <meta
          property="og:description"
          content={`${variant.bodyType}, ${variant.specs.engine}, ${variant.specs.power}. Цена под ключ ${content.cost ? `от ${formatRub(content.cost.total)}` : variant.price}.`}
        />
        <meta property="og:image" content={absoluteImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${variant.model} на заказ из ${countryGen} | Регион Логистик`} />
        <meta
          name="twitter:description"
          content={`${variant.bodyType}, ${variant.specs.engine}, ${variant.specs.power}. Цена под ключ ${content.cost ? `от ${formatRub(content.cost.total)}` : variant.price}.`}
        />
        <meta name="twitter:image" content={absoluteImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: variant.model,
            image: absoluteImage,
            description: `${variant.model} (${variant.bodyType}) под заказ из ${countryGen}. ${variant.specs.engine}, ${variant.specs.power}, ${variant.specs.drive} привод, ${variant.specs.transmission}.`,
            brand: { '@type': 'Brand', name: model.brand },
            offers: {
              '@type': 'Offer',
              price: content.cost ? String(content.cost.total) : variant.price.replace(/[^\d]/g, ''),
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
              { '@type': 'ListItem', position: 3, name: countryName, item: `https://rlogistik.ru/catalog/${entry.country}` },
              { '@type': 'ListItem', position: 4, name: variant.model, item: pageUrl },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
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
                decoding="async"
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
            {content.cost ? (
              <>
                <div className="text-3xl font-display font-extrabold text-primary">
                  от {formatRub(content.cost.total)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Ориентировочная цена под ключ до вашего города: автомобиль {variant.price}, пошлина,
                  утильсбор, доставка и услуги компании
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl font-display font-extrabold text-primary">{variant.price}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Стоимость автомобиля без учёта доставки и таможенного оформления
                </p>
              </>
            )}

            <p className="text-sm text-foreground/80 leading-relaxed mt-5">{content.intro}</p>

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

        <section className="mt-14">
          <h2 className="font-display font-bold text-xl mb-4">
            {fullName}: что за автомобиль
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">{content.aboutModel}</p>
        </section>

        {content.cost && (
          <section className="mt-14">
            <h2 className="font-display font-bold text-xl mb-2">
              Сколько стоит {fullName} под ключ в России
            </h2>
            <p className="text-sm text-muted-foreground mb-5 max-w-3xl">
              Ориентировочный расчёт по методике ФТС для нового автомобиля {variant.specs.year} года
              мощностью {variant.specs.power}
              {content.cm3 ? ` и объёмом ${content.cm3} см³` : ''}. Курс и ставки могут измениться.
            </p>

            <div className="rounded-2xl border border-border overflow-hidden max-w-2xl">
              {[
                { label: `Стоимость автомобиля в ${countryPrepositional[entry.country] ?? countryName}`, value: content.cost.price },
                { label: 'Таможенная пошлина', value: content.cost.duty },
                { label: 'Утилизационный сбор', value: content.cost.utilFee },
                { label: 'Таможенный сбор за оформление', value: content.cost.clearanceFee },
                { label: `Доставка из ${countryGen}`, value: content.cost.delivery },
                { label: 'Услуги Регион Логистик', value: content.cost.service, hint: SERVICE_FEE_TOOLTIP },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-4 px-4 py-3 text-sm ${
                    i > 0 ? 'border-t border-border' : ''
                  }`}
                >
                  <span className="text-muted-foreground" title={row.hint}>
                    {row.label}
                  </span>
                  <span className="font-semibold whitespace-nowrap">{formatRub(row.value)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 px-4 py-4 bg-secondary/60 border-t border-border">
                <span className="font-display font-bold">Итого под ключ</span>
                <span className="font-display font-extrabold text-lg text-primary whitespace-nowrap">
                  {formatRub(content.cost.total)}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3 max-w-2xl">
              Расчёт ориентировочный и зависит от курса валют, комплектации и города доставки.
              Точную сумму по вашему автомобилю назовёт менеджер.
            </p>
          </section>
        )}

        <section className="mt-14">
          <h2 className="font-display font-bold text-xl mb-4">
            Доставка {fullName} из {countryGen}
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">{content.aboutDelivery}</p>
        </section>

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

        <section className="mt-14">
          <h2 className="font-display font-bold text-xl mb-4">
            Частые вопросы про {fullName}
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden max-w-3xl">
            {content.faq.map((item, i) => (
              <details
                key={item.q}
                className={`group px-4 py-3.5 ${i > 0 ? 'border-t border-border' : ''}`}
              >
                <summary className="flex items-start justify-between gap-3 cursor-pointer list-none font-semibold text-sm">
                  <h3 className="font-semibold text-sm">{item.q}</h3>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="shrink-0 mt-0.5 text-muted-foreground transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2.5">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

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