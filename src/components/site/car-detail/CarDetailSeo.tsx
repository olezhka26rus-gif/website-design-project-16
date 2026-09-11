import { Helmet } from 'react-helmet-async';
import { CatalogEntry, CarModel, CarVariant } from '@/data/catalogCars';
import { CarContent } from '@/lib/carContent';
import { formatRub } from '@/lib/customs';

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
  return (
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
  );
};

export default CarDetailSeo;
