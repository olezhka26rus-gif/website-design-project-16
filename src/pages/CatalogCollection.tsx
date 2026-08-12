import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CountryFlag from '@/components/site/CountryFlag';
import Icon from '@/components/ui/icon';
import {
  catalogEntries,
  catalogEntriesByCountry,
  findBrand,
  countryNames,
  CountryKey,
  CatalogEntry,
} from '@/data/catalogCars';
import { brandRu } from '@/data/carAliases';
import { buildCollectionContent } from '@/lib/collectionContent';
import { formatRub } from '@/lib/customs';
import NotFoundSeo from './NotFoundSeo';

const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return many;
  if (m10 === 1) return one;
  if (m10 >= 2 && m10 <= 4) return few;
  return many;
};

const models = (n: number) => `${n} ${plural(n, 'модель', 'модели', 'моделей')}`;

const countryGenitive: Record<string, string> = {
  china: 'Китая',
  japan: 'Японии',
  korea: 'Кореи',
  europe: 'Европы',
  usa: 'США',
  uae: 'ОАЭ',
};

interface CollectionData {
  title: string;
  h1: string;
  description: string;
  keywords: string;
  url: string;
  entries: CatalogEntry[];
  intro: string;
}

const CatalogCollection = ({ mode }: { mode: 'country' | 'brand' }) => {
  const { country, brand } = useParams();

  let data: CollectionData | null = null;

  if (mode === 'country' && country && country in countryNames) {
    const key = country as CountryKey;
    const entries = catalogEntriesByCountry(key);
    const gen = countryGenitive[key] ?? countryNames[key];
    data = {
      title: `Автомобили из ${gen} на заказ — ${models(entries.length)} и цены | Регион Логистик`,
      h1: `Автомобили из ${gen} на заказ`,
      description: `${models(entries.length)} автомобилей из ${gen} под заказ: характеристики, ориентировочные цены под ключ, подбор и доставка в Россию компанией Регион Логистик.`,
      keywords: [
        `авто из ${gen}`,
        `автомобили из ${gen}`,
        `купить авто из ${gen}`,
        `заказать машину из ${gen}`,
        `авто из ${gen} цена`,
        'Регион Логистик',
      ].join(', '),
      url: `https://rlogistik.ru/catalog/${key}`,
      entries,
      intro: `Подбираем и привозим автомобили из ${gen} под ключ: проверка, выкуп, доставка, растаможка и постановка на учёт. В каталоге ${models(entries.length)} с ориентировочными ценами.`,
    };
  }

  if (mode === 'brand' && brand) {
    const found = findBrand(brand);
    if (found) {
      const ru = brandRu[found.brand];
      const nameWithRu = ru ? `${found.brand} (${ru})` : found.brand;
      data = {
        title: `${found.brand} на заказ из-за рубежа — ${models(found.entries.length)} и цены | Регион Логистик`,
        h1: `${found.brand} на заказ из-за рубежа`,
        description: `${models(found.entries.length)} ${nameWithRu} под заказ: характеристики, ориентировочные цены под ключ, подбор и доставка в Россию компанией Регион Логистик.`,
        keywords: [
          found.brand,
          `${found.brand} на заказ`,
          `купить ${found.brand}`,
          `${found.brand} цена`,
          ru ? `${ru} на заказ` : '',
          ru ? `купить ${ru}` : '',
          'Регион Логистик',
        ]
          .filter(Boolean)
          .join(', '),
        url: `https://rlogistik.ru/catalog/brand/${found.slug}`,
        entries: found.entries,
        intro: `Привозим автомобили ${nameWithRu} под ключ из Китая, Японии, Кореи, Европы, США и ОАЭ. В каталоге ${models(found.entries.length)} с характеристиками и ориентировочной ценой.`,
      };
    }
  }

  if (!data) return <NotFoundSeo />;

  const extra = buildCollectionContent(
    data.entries,
    mode,
    mode === 'country' ? (country as string) : findBrand(brand as string)!.brand
  );

  const minPriceEntry = data.entries.reduce((min, e) => {
    const n = Number(e.variant.price.replace(/\D/g, ''));
    const m = Number(min.variant.price.replace(/\D/g, ''));
    return n && n < m ? e : min;
  }, data.entries[0]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <link rel="canonical" href={data.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:url" content={data.url} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://rlogistik.ru/logo-mark.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content="https://rlogistik.ru/logo-mark.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rlogistik.ru/' },
              { '@type': 'ListItem', position: 2, name: 'Каталог', item: 'https://rlogistik.ru/catalog' },
              { '@type': 'ListItem', position: 3, name: data.h1, item: data.url },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: extra.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: data.h1,
            numberOfItems: data.entries.length,
            itemListElement: data.entries.slice(0, 50).map((e, i) => ({
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
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span className="mx-1.5">/</span>
          <Link to="/catalog" className="hover:text-primary">Каталог</Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{data.h1}</span>
        </nav>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl mb-3">{data.h1}</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">{data.intro}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.entries.map((e) => (
            <Link
              key={`${e.country}-${e.slug}`}
              to={`/catalog/${e.country}/${e.slug}`}
              className="group rounded-xl border border-border overflow-hidden hover-lift bg-white flex flex-col"
            >
              <div className="relative h-36 bg-secondary overflow-hidden">
                <img
                  src={e.variant.sideImage}
                  alt={`${e.variant.model} — ${e.variant.bodyType} на заказ`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-white/90 rounded-full p-1">
                  <CountryFlag country={e.country} className="w-4 h-auto rounded-[2px]" />
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
                <div className="text-[11px] text-muted-foreground">цена авто без доставки</div>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-bold text-xl mb-3">{data.h1}: что важно знать</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">{extra.about}</p>
        </section>

        {extra.stats.minTotal > 0 && (
          <section className="mt-10 max-w-3xl">
            <h2 className="font-display font-bold text-xl mb-3">Цены под ключ</h2>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <span className="text-muted-foreground">Самый доступный вариант под ключ</span>
                <span className="font-semibold whitespace-nowrap">
                  {formatRub(extra.stats.minTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm border-t border-border">
                <span className="text-muted-foreground">Это модель</span>
                <span className="font-semibold">{extra.stats.minTotalModel}</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm border-t border-border">
                <span className="text-muted-foreground">Цена автомобиля без доставки, от</span>
                <span className="font-semibold whitespace-nowrap">{formatRub(extra.stats.minPrice)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm border-t border-border">
                <span className="text-muted-foreground">Годы выпуска в подборке</span>
                <span className="font-semibold">{extra.stats.years}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Цены под ключ включают пошлину, утилизационный сбор, доставку и услуги компании.
              Расчёт ориентировочный и зависит от курса валют и комплектации.
            </p>
          </section>
        )}

        <section className="mt-10 max-w-3xl">
          <h2 className="font-display font-bold text-xl mb-4">Частые вопросы</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            {extra.faq.map((item, i) => (
              <details key={item.q} className={`group px-4 py-3.5 ${i > 0 ? 'border-t border-border' : ''}`}>
                <summary className="flex items-start justify-between gap-3 cursor-pointer list-none">
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

        <div className="mt-10 text-sm text-muted-foreground max-w-3xl space-y-2">
          <p>
            Минимальная цена автомобиля в подборке — {minPriceEntry.variant.price} ({minPriceEntry.variant.model}), без доставки и растаможки.
            Всего: {models(data.entries.length)}. Цены ориентировочные, точную стоимость под ключ
            рассчитает менеджер.
          </p>
          <p>
            <Link to="/catalog" className="text-primary hover:underline">
              Весь каталог автомобилей
            </Link>{' '}
            — {models(catalogEntries.length)} из шести стран.
          </p>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/50 flex items-center gap-3">
          <Icon name="Info" size={18} className="text-primary shrink-0" />
          <p className="font-display font-semibold">
            Не нашли нужную модель? Мы подберём и привезём любой автомобиль на заказ.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CatalogCollection;