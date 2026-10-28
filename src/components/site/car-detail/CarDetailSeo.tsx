import { Helmet } from '@/lib/helmet';
import { CatalogEntry, CarModel, CarVariant } from '@/data/catalogCars';
import { CarContent } from '@/lib/carContent';
import { formatRub } from '@/lib/customs';
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
  const priceFrom = content.cost ? `от ${formatRub(content.cost.total)}` : variant.price;
  const titleFull = `${variant.model}${ruName ? ` (${ruName})` : ''} из ${countryGen} под ключ — цена ${priceFrom}`;
  const seoTitle = titleFull.length <= 75 ? titleFull : `${variant.model} из ${countryGen} под ключ — цена ${priceFrom}`;
  const bodyLower = variant.bodyType.toLowerCase();
  const engineLower = /^электро/i.test(variant.specs.engine) ? 'электро' : variant.specs.engine;
  const specs = `${bodyLower}, ${engineLower}, ${variant.specs.power.replace(/\.$/, '')}`;
  const bestGen = content.best?.countryGen;
  const route = bestGen && bestGen !== countryGen ? `, выгоднее всего везти из ${bestGen}` : '';
  const descFull = `Купить ${variant.model} ${content.minYear}–2026 г. под заказ: ${specs}. Цена под ключ ${priceFrom} с пошлиной и доставкой${route}. Срок ${content.best?.weeks ?? '4–8 недель'}.`;
  const seoDescription = content.cost
    ? descFull.length <= 165
      ? descFull
      : `Купить ${variant.model} ${content.minYear}–2026 г. под заказ: ${specs}. Цена под ключ ${priceFrom}${route}.`
    : `Купить ${variant.model} из ${countryGen}: ${specs}. Подбор, проверка и доставка в Россию под ключ.`;
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