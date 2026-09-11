import { Link } from 'react-router-dom';
import CountryFlag from '@/components/site/CountryFlag';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { CatalogEntry, CountryKey, CarModel, CarVariant } from '@/data/catalogCars';
import { CarContent } from '@/lib/carContent';
import { formatRub } from '@/lib/customs';
import { trackGoal, goals } from '@/lib/analytics';

export const SPEC_ROWS: { key: keyof CarVariant['specs']; label: string; icon: string }[] = [
  { key: 'engine', label: 'Двигатель', icon: 'Fuel' },
  { key: 'power', label: 'Мощность', icon: 'Gauge' },
  { key: 'drive', label: 'Привод', icon: 'MoveHorizontal' },
  { key: 'transmission', label: 'Коробка', icon: 'Cog' },
  { key: 'year', label: 'Год выпуска', icon: 'Calendar' },
  { key: 'consumption', label: 'Расход', icon: 'Droplet' },
];

interface CarDetailHeroProps {
  entry: CatalogEntry;
  model: CarModel;
  variant: CarVariant;
  countryName: string;
  content: CarContent;
  otherVariants: CarVariant[];
  onLeadOpen: () => void;
  onCalcOpen: () => void;
}

const CarDetailHero = ({
  entry,
  model,
  variant,
  countryName,
  content,
  otherVariants,
  onLeadOpen,
  onCalcOpen,
}: CarDetailHeroProps) => {
  return (
    <>
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
            {content.cm3 > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Cylinder" size={15} className="shrink-0" />
                <span>
                  Объём:{' '}
                  <span className="text-foreground font-medium">{content.cm3} см³</span>
                </span>
              </div>
            )}
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
                Ориентировочная цена под ключ до вашего города: автомобиль{' '}
                {formatRub(content.cost.price)}, пошлина, утильсбор, доставка и услуги компании
                {content.best ? ` — по выгодному маршруту из ${content.best.countryGen}` : ''}
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
                onLeadOpen();
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
                onCalcOpen();
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
    </>
  );
};

export default CarDetailHero;
