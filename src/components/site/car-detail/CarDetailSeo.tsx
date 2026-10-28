import { Helmet } from '@/lib/helmet';
import { CatalogEntry, CarModel, CarVariant } from '@/data/catalogCars';
import { CarContent } from '@/lib/carContent';
import { formatRub } from '@/lib/customs';

const formatShort = (rub: number): string =>
  rub >= 1_000_000
    ? `${String(Number((rub / 1_000_000).toFixed(2))).replace('.', ',')} млн ₽`
    : `${Math.round(rub / 1000)} тыс. ₽`;
import { modelRu } from '@/data/carAliases';

interface CarDetailSeoProps {
  entry: CatalogEntry;
  model: CarModel;
  variant: CarVariant;
  countryName: string;
  countryGen: string;
  content: CarContent;
  pageUrl: string;
  absoluteImage: string;
  ruKeywordParts: string[];
}

const CarDetailSeo = ({
  entry,
  model,
  variant,
  countryName,
  countryGen,
  content,
  pageUrl,
  absoluteImage,
  ruKeywordParts,
}: CarDetailSeoProps) => {
  const ruName = modelRu[variant.model];
  const quotes = content.quotes;
  const best = content.best;
  const bestGen = best?.countryGen ?? countryGen;
  const priceFrom = best ? `от ${formatRub(best.total)}` : variant.price;
  const many = quotes.length > 1;
  const nameFull = `${variant.model}${ruName ? ` (${ruName})` : ''}`;
  const countriesWord = `${quotes.length} ${quotes.length < 5 ? 'страны' : 'стран'}`;
  const titleTail = many ? ` — сравнили ${countriesWord}` : '';
  const titleCandidates = best
    ? [
        `${nameFull} под ключ из ${bestGen} от ${formatShort(best.total)}${titleTail}`,
        `${variant.model} под ключ из ${bestGen} от ${formatShort(best.total)}${titleTail}`,
        `${variant.model} из ${bestGen} от ${formatShort(best.total)}${titleTail}`,
        `${variant.model} под ключ из ${bestGen} — цена ${priceFrom}`,
      ]
    : [`${nameFull} из ${countryGen} под ключ — цена ${variant.price}`];
  const seoTitle = titleCandidates.find((t) => t.length <= 75) ?? titleCandidates[titleCandidates.length - 1];
  const bodyLower = variant.bodyType.toLowerCase();
  const engineLower = /^электро/i.test(variant.specs.engine) ? 'электро' : variant.specs.engine;
  const specs = `${bodyLower}, ${engineLower}, ${variant.specs.power.replace(/\.$/, '')}`;
  const compare = quotes.map((q) => `${q.countryName} — от ${formatShort(q.total)}`).join(', ');
  const compareShort = quotes.map((q) => `${q.countryName} ${formatShort(q.total)}`).join(', ');
  const descCandidates = best
    ? many
      ? [
          `Откуда выгоднее везти ${variant.model}: ${compare}. Цена под ключ с пошлиной и доставкой, срок из ${bestGen} ${best.weeks}.`,
          `Откуда выгоднее везти ${variant.model}: ${compare}. Цены под ключ с пошлиной и доставкой.`,
          `Откуда выгоднее везти ${variant.model} под ключ: ${compareShort}. С пошлиной и доставкой.`,
          `${variant.model} под ключ: ${compareShort}`,
          `${variant.model} под ключ дешевле всего из ${bestGen} — от ${formatShort(best.total)}. Сравнили ${countriesWord} вывоза.`,
        ]
      : [
          `Купить ${variant.model} ${content.minYear}–2026 г. из ${bestGen}: ${specs}. Цена под ключ ${priceFrom} с пошлиной и доставкой, срок ${best.weeks}.`,
          `Купить ${variant.model} из ${bestGen}: ${specs}. Цена под ключ ${priceFrom} с пошлиной и доставкой.`,
        ]
    : [`Купить ${variant.model} из ${countryGen}: ${specs}. Подбор, проверка и доставка в Россию под ключ.`];
  const seoDescription = descCandidates.find((d) => d.length <= 170) ?? descCandidates[descCandidates.length - 1];
  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
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
      <meta property="og:title" content={seoTitle} />
      <meta
        property="og:description"
        content={seoDescription}
      />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="ru_RU" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta
        name="twitter:description"
        content={seoDescription}
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
  );
};

export default CarDetailSeo;