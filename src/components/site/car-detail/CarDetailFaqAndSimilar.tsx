import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { CatalogEntry } from '@/data/catalogCars';
import { CarContent } from '@/lib/carContent';

const countryGenitive: Record<string, string> = {
  Китай: 'Китая',
  Япония: 'Японии',
  Корея: 'Кореи',
  Европа: 'Европы',
  США: 'США',
  ОАЭ: 'ОАЭ',
};

interface CarDetailFaqAndSimilarProps {
  fullName: string;
  content: CarContent;
  countryName: string;
  similarModels: CatalogEntry[];
}

const CarDetailFaqAndSimilar = ({
  fullName,
  content,
  countryName,
  similarModels,
}: CarDetailFaqAndSimilarProps) => {
  return (
    <>
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
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">
                    {e.variant.bodyType} · {e.variant.specs.power}
                  </div>
                  <div className="text-xs text-primary font-bold mt-1">{e.variant.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetailFaqAndSimilar;
