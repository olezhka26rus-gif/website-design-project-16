import { useMemo, useState } from 'react';
import { CatalogEntry } from '@/data/catalogCars';
import { formatRub } from '@/lib/customs';
import {
  enginesFor,
  yearsFor,
  priceCar,
  customsAgeLabel,
  defaultEngineIndex,
  MILEAGE_OPTIONS,
  hasMarketData,
  Mileage,
} from '@/lib/carPricing';
import { countryGenitive } from '@/lib/carContent';
import { marketPrices, MARKET_DATE, MARKET_SOURCE_NAMES } from '@/data/marketPrices';

interface CarPriceTableProps {
  entry: CatalogEntry;
  fullName: string;
}

const mileageLabel = (km: Mileage) => `${km} тыс. км`;

const CarPriceTable = ({ entry, fullName }: CarPriceTableProps) => {
  const engines = useMemo(() => enginesFor(entry), [entry]);
  const years = useMemo(() => yearsFor(entry), [entry]);
  const [engine, setEngine] = useState(() => defaultEngineIndex(entry));
  const [mileage, setMileage] = useState<Mileage>(20);

  const rows = years
    .map((year) => ({
      year,
      min: priceCar(entry, { year, engine, trim: 'min', mileage }),
      max: priceCar(entry, { year, engine, trim: 'max', mileage }),
    }))
    .reverse();

  if (!rows.some((r) => r.min)) return null;

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
      active
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-white text-foreground/80 border-border hover:border-primary'
    }`;

  return (
    <section className="mt-14">
      <h2 className="font-display font-bold text-xl mb-2">
        Цены на {fullName} под ключ по годам
      </h2>
      <p className="text-sm text-muted-foreground mb-5 max-w-3xl">
        Ориентировочная стоимость под ключ до вашего города с пошлиной, утильсбором, доставкой и
        услугами компании. Выберите двигатель и пробег — цены пересчитаются.
      </p>

      {engines.length > 1 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Двигатель</div>
          <div className="flex flex-wrap gap-2">
            {engines.map((e, i) => (
              <button
                key={`${e.label}-${e.hp}`}
                type="button"
                onClick={() => setEngine(i)}
                className={chip(engine === i)}
              >
                {e.label} · {e.hp} л.с.
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <div className="text-xs font-semibold text-muted-foreground mb-2">Пробег</div>
        <div className="flex flex-wrap gap-2">
          {MILEAGE_OPTIONS.map((km) => (
            <button key={km} type="button" onClick={() => setMileage(km)} className={chip(mileage === km)}>
              {km === 20 ? 'от 20 тыс. км' : `до ${mileageLabel(km)}`}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden max-w-3xl">
        <div className="grid grid-cols-[0.8fr_1fr_1fr] gap-3 px-4 py-2.5 bg-secondary/60 text-xs font-semibold text-muted-foreground">
          <span>Год выпуска</span>
          <span>Базовая комплектация</span>
          <span>Максимальная комплектация</span>
        </div>
        {rows.map((r, i) =>
          r.min && r.max ? (
            <div
              key={r.year}
              className={`grid grid-cols-[0.8fr_1fr_1fr] gap-3 px-4 py-3 text-sm ${
                i > 0 ? 'border-t border-border' : ''
              }`}
            >
              <div>
                <div className="font-semibold">{r.year}</div>
                <div className="text-[11px] text-muted-foreground">
                  {engines[engine]?.cm3 ? `пошлина ${customsAgeLabel(r.year)}` : 'электро'}
                </div>
              </div>
              <div>
                <div className="font-bold text-primary whitespace-nowrap">≈ {formatRub(r.min.cost.total)}</div>
                <div className="text-[11px] text-muted-foreground">
                  авто {formatRub(r.min.carPrice)} · из {countryGenitive[r.min.country] ?? r.min.country}
                </div>
              </div>
              <div>
                <div className="font-bold text-primary whitespace-nowrap">≈ {formatRub(r.max.cost.total)}</div>
                <div className="text-[11px] text-muted-foreground">
                  авто {formatRub(r.max.carPrice)} · из {countryGenitive[r.max.country] ?? r.max.country}
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-3 max-w-3xl">
        {hasMarketData(entry)
          ? (() => {
              const m = marketPrices[entry.variant.model];
              const src = MARKET_SOURCE_NAMES[m.src];
              return m.n > 0
                ? `Цены основаны на ${m.n} реальных объявлениях о продаже ${fullName} на ${src} (данные на ${MARKET_DATE}). `
                : `Цены основаны на актуальных ценах дилеров на ${src} (данные на ${MARKET_DATE}). `;
            })()
          : 'Цены основаны на средней рыночной стоимости модели за рубежом. '}
        Мы учли год выпуска, двигатель, комплектацию и пробег, а валюту перевели в рубли по курсу ЦБ.
        Машины от 3 до 5 лет обычно выходят выгоднее: пошлина на них ниже, чем на новые.
        Точную сумму по выбранному автомобилю менеджер назовёт после подбора.
      </p>
    </section>
  );
};

export default CarPriceTable;
