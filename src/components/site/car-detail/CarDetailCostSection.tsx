import CountryFlag from '@/components/site/CountryFlag';
import Icon from '@/components/ui/icon';
import { CatalogEntry, CountryKey } from '@/data/catalogCars';
import { CarContent, countryPrepositional } from '@/lib/carContent';
import { formatRub, SERVICE_FEE_TOOLTIP } from '@/lib/customs';

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

interface CarDetailCostSectionProps {
  entry: CatalogEntry;
  variant: { specs: { year: string; power: string } };
  countryName: string;
  countryGen: string;
  fullName: string;
  content: CarContent;
}

const CarDetailCostSection = ({
  entry,
  variant,
  countryName,
  countryGen,
  fullName,
  content,
}: CarDetailCostSectionProps) => {
  return (
    <>
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
            {content.cm3 ? ` и объёмом ${content.cm3} см³` : ''}
            {content.best ? ` по самому выгодному маршруту — из ${content.best.countryGen}` : ''}. Курс и
            ставки могут измениться.
          </p>

          <div className="rounded-2xl border border-border overflow-hidden max-w-2xl">
            {[
              {
                label: `Стоимость автомобиля в ${
                  countryPrepositional[content.best?.country ?? entry.country] ?? countryName
                }`,
                value: content.cost.price,
              },
              { label: 'Таможенная пошлина', value: content.cost.duty },
              { label: 'Утилизационный сбор', value: content.cost.utilFee },
              { label: 'Таможенный сбор за оформление', value: content.cost.clearanceFee },
              {
                label: `Доставка из ${content.best?.countryGen ?? countryGen}`,
                value: content.cost.delivery,
              },
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

          {content.quotes.length > 1 && (
            <div className="mt-8">
              <h3 className="font-display font-bold text-lg mb-2">
                Откуда выгоднее везти {fullName}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
                Один и тот же автомобиль продаётся на разных рынках. Мы считаем стоимость под ключ
                по каждому маршруту и предлагаем самый выгодный.
              </p>

              <div className="rounded-2xl border border-border overflow-hidden max-w-3xl">
                <div className="hidden sm:grid grid-cols-[1.2fr_1fr_1fr_1.1fr] gap-3 px-4 py-2.5 bg-secondary/60 text-xs font-semibold text-muted-foreground">
                  <span>Страна вывоза</span>
                  <span>Цена авто</span>
                  <span>Под ключ</span>
                  <span>Срок доставки</span>
                </div>
                {content.quotes.map((q, i) => (
                  <div
                    key={q.country}
                    className={`grid grid-cols-2 sm:grid-cols-[1.2fr_1fr_1fr_1.1fr] gap-x-3 gap-y-1 px-4 py-3 text-sm ${
                      i > 0 ? 'border-t border-border' : ''
                    } ${q.isBest ? 'bg-primary/5' : ''}`}
                  >
                    <span className="font-semibold flex items-center gap-1.5 col-span-2 sm:col-span-1">
                      <CountryFlag
                        country={q.country as CountryKey}
                        className="w-5 h-auto rounded-[2px]"
                      />
                      {q.countryName}
                      {q.isBest && (
                        <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                          выгодно
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      <span className="sm:hidden text-xs">Цена авто: </span>
                      {formatRub(q.carPrice)}
                    </span>
                    <span className={q.isBest ? 'font-bold text-primary' : 'font-semibold'}>
                      <span className="sm:hidden text-xs font-normal text-muted-foreground">
                        Под ключ:{' '}
                      </span>
                      {formatRub(q.total)}
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm col-span-2 sm:col-span-1">
                      {q.weeks}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-3 max-w-3xl">
                Наличие конкретной комплектации на рынке уточняем перед выкупом. Если в выгодной
                стране нужной машины нет, подберём ближайший вариант и пересчитаем стоимость.
              </p>
            </div>
          )}
        </section>
      )}

      <section className="mt-14">
        <h2 className="font-display font-bold text-xl mb-4">
          Доставка {fullName}
          {content.quotes.length > 1 ? ': откуда везём' : ` из ${countryGen}`}
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
    </>
  );
};

export default CarDetailCostSection;
