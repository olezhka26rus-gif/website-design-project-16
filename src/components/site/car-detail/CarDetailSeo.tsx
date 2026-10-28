import { Helmet } from '@/lib/helmet';
import { CatalogEntry, CarModel, CarVariant } from '@/data/catalogCars';
import { CarContent } from '@/lib/carContent';
import { buildCarSeo } from '@/lib/carSeo';

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
  const { title: seoTitle, description: seoDescription } = buildCarSeo(entry, content);
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