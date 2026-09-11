import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import LeadFormModal from '@/components/site/LeadFormModal';
import Calculator from '@/components/site/Calculator';
import CarDetailSeo from '@/components/site/car-detail/CarDetailSeo';
import CarDetailHero from '@/components/site/car-detail/CarDetailHero';
import CarDetailCostSection from '@/components/site/car-detail/CarDetailCostSection';
import CarDetailFaqAndSimilar from '@/components/site/car-detail/CarDetailFaqAndSimilar';
import { findCatalogEntry, catalogEntriesByCountry, CountryKey } from '@/data/catalogCars';
import { brandRu, modelRu, brandExtraAliases } from '@/data/carAliases';
import { buildCarContent } from '@/lib/carContent';
import NotFoundSeo from './NotFoundSeo';

const countryGenitive: Record<string, string> = {
  Китай: 'Китая',
  Япония: 'Японии',
  Корея: 'Кореи',
  Европа: 'Европы',
  США: 'США',
  ОАЭ: 'ОАЭ',
};

const CarDetail = () => {
  const { country, slug } = useParams();
  const entry = country && slug ? findCatalogEntry(country, slug) : undefined;
  const [leadOpen, setLeadOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  if (!entry) return <NotFoundSeo />;

  // Устаревший адрес — уводим на актуальный, чтобы не плодить дубли
  if (slug !== entry.slug) {
    return <Navigate to={`/catalog/${entry.country}/${entry.slug}`} replace />;
  }

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
  ].filter((part): part is string => Boolean(part));
  const content = buildCarContent(entry);
  const otherVariants = model.variants.filter((v) => v.model !== variant.model);
  const similarModels = catalogEntriesByCountry(entry.country as CountryKey)
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <CarDetailSeo
        entry={entry}
        model={model}
        variant={variant}
        countryName={countryName}
        countryGen={countryGen}
        content={content}
        pageUrl={pageUrl}
        absoluteImage={absoluteImage}
        ruKeywordParts={ruKeywordParts}
      />

      <Header />

      <main className="container py-12 max-w-4xl">
        <CarDetailHero
          entry={entry}
          model={model}
          variant={variant}
          countryName={countryName}
          content={content}
          otherVariants={otherVariants}
          onLeadOpen={() => setLeadOpen(true)}
          onCalcOpen={() => setCalcOpen(true)}
        />

        <CarDetailCostSection
          entry={entry}
          variant={variant}
          countryName={countryName}
          countryGen={countryGen}
          fullName={fullName}
          content={content}
        />

        <CarDetailFaqAndSimilar
          fullName={fullName}
          content={content}
          countryName={countryName}
          similarModels={similarModels}
        />
      </main>

      <Footer />

      <LeadFormModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        source={`catalog:${entry.country}/${entry.slug}`}
        defaultCar={`${variant.model} (${variant.bodyType})`}
      />
      <Calculator open={calcOpen} onOpenChange={setCalcOpen} presetEntry={entry} />
    </div>
  );
};

export default CarDetail;