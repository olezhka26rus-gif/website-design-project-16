import { CatalogEntry } from '@/data/catalogCars';
import { carEngines, EngineOption } from '@/data/carEngines';
import { sourceOptionsFor } from '@/data/sourcing';
import { koreaMarketPrices, MARKET_YEAR_CURVE } from '@/data/marketPrices';
import {
  calcTotalCost,
  CostBreakdown,
  CountryCalcKey,
  engineCm3FromSpec,
  powerFromSpec,
  priceFromSpec,
} from '@/lib/customs';

/* ============================================================
   Цена автомобиля под ключ в зависимости от года выпуска,
   двигателя, комплектации и пробега. Оценка рыночная:
   базовая цена из каталога корректируется коэффициентами.
   ============================================================ */

export const PRICE_YEAR = 2026;
export const MIN_YEAR = 2020;

export type Trim = 'min' | 'max';

export const MILEAGE_OPTIONS = [20, 50, 100] as const;
export type Mileage = (typeof MILEAGE_OPTIONS)[number];

export interface EngineVariant {
  label: string;
  hp: number;
  cm3: number;
}

export interface PriceConfig {
  year: number;
  engine: number;
  trim: Trim;
  mileage: Mileage;
}

export interface PriceResult {
  config: PriceConfig;
  carPrice: number;
  country: string;
  cost: CostBreakdown;
  ageLabel: string;
}

/** Реальное удешевление по годам (по объявлениям Encar) */
const yearCurve = (year: number) =>
  MARKET_YEAR_CURVE[Math.max(MIN_YEAR, Math.min(PRICE_YEAR, year))] ?? 1;

/** Есть ли у модели реальные цены рынка */
export const hasMarketData = (entry: CatalogEntry) => Boolean(koreaMarketPrices[entry.variant.model]);

/** Каждые 10 тыс. км сверх 20 тыс. снижают цену на 1,5% */
const mileageFactor = (km: number) => Math.max(0.8, 1 - 0.0015 * (km - 20));

const TRIM_MAX_FACTOR = 1.25;

const roundPrice = (n: number) => Math.round(n / 10000) * 10000;

/** Возрастная категория для таможни: до 3 лет, 3–5 лет, старше 5 лет */
export const customsAge = (year: number): 'new' | 'mid' | 'old' => {
  const age = PRICE_YEAR - year;
  if (age < 3) return 'new';
  if (age <= 5) return 'mid';
  return 'old';
};

export const customsAgeLabel = (year: number): string =>
  ({ new: 'до 3 лет', mid: '3–5 лет', old: 'старше 5 лет' })[customsAge(year)];

export const enginesFor = (entry: CatalogEntry): EngineVariant[] => {
  const v = entry.variant;
  const own: EngineOption = [v.specs.engine, powerFromSpec(v.specs.power)];
  const list = carEngines[v.model]?.[1] ?? [own];
  const withOwn = list.some(([l, hp]) => l === own[0] && hp === own[1]) ? list : [own, ...list];
  return withOwn
    .map(([label, hp]) => ({ label, hp, cm3: engineCm3FromSpec(label) }))
    .sort((a, b) => a.hp - b.hp);
};

export const yearsFor = (entry: CatalogEntry): number[] => {
  const start = Math.max(MIN_YEAR, carEngines[entry.variant.model]?.[0] ?? MIN_YEAR);
  const years: number[] = [];
  for (let y = start; y <= PRICE_YEAR; y++) years.push(y);
  return years;
};

/** Индекс двигателя из каталога — с него страница открывается по умолчанию */
export const defaultEngineIndex = (entry: CatalogEntry): number => {
  const engines = enginesFor(entry);
  const hp = powerFromSpec(entry.variant.specs.power);
  const i = engines.findIndex((e) => e.label === entry.variant.specs.engine && e.hp === hp);
  return i >= 0 ? i : 0;
};

export interface CountryPrice {
  country: string;
  carPrice: number;
  cost: CostBreakdown;
}

/** Расчёт под ключ по каждой стране вывоза, от самой выгодной */
export const pricesByCountry = (entry: CatalogEntry, config: PriceConfig): CountryPrice[] => {
  const base = priceFromSpec(entry.variant.price);
  if (!base) return [];

  const engines = enginesFor(entry);
  const engine = engines[config.engine] ?? engines[0];
  const baseHp = powerFromSpec(entry.variant.specs.power) || engine.hp;
  const catalogYear = Number(entry.variant.specs.year) || PRICE_YEAR;

  const market = koreaMarketPrices[entry.variant.model];
  const options = sourceOptionsFor(entry);
  let marketPrice: number;

  if (market) {
    // Цена из реальных объявлений Кореи переводится в цену основного рынка каталога
    const koreaFactor = options.find((o) => o.country === 'korea')?.priceFactor ?? 1;
    const engineFactor = Math.min(1.4, Math.max(0.85, Math.pow(engine.hp / baseHp, 0.2)));
    const trimPrice = config.trim === 'max' ? market.hi : market.lo;
    marketPrice =
      (trimPrice / koreaFactor) * yearCurve(config.year) * engineFactor * mileageFactor(config.mileage);
  } else {
    const engineFactor = Math.min(1.8, Math.max(0.8, Math.pow(engine.hp / baseHp, 0.35)));
    const ageFactor = yearCurve(config.year) / yearCurve(catalogYear);
    const trimFactor = config.trim === 'max' ? TRIM_MAX_FACTOR : 1;
    marketPrice = base * engineFactor * ageFactor * trimFactor * mileageFactor(config.mileage);
  }

  // Электромобили: пошлина считается от стоимости независимо от возраста
  const age = engine.cm3 > 0 ? customsAge(config.year) : 'new';

  return options
    .map((opt) => {
      const carPrice = roundPrice(marketPrice * opt.priceFactor);
      const cost = calcTotalCost(carPrice, age, engine.cm3, engine.hp, opt.country as CountryCalcKey);
      return { country: opt.country, carPrice, cost };
    })
    .sort((a, b) => a.cost.total - b.cost.total);
};

export const priceCar = (entry: CatalogEntry, config: PriceConfig): PriceResult | null => {
  const best = pricesByCountry(entry, config)[0];
  if (!best) return null;
  return { config, ...best, ageLabel: customsAgeLabel(config.year) };
};

/** Вариант по умолчанию: год и двигатель из каталога, базовая комплектация, пробег 20 тыс. км */
export const defaultConfig = (entry: CatalogEntry): PriceConfig => ({
  year: Math.max(MIN_YEAR, Number(entry.variant.specs.year) || PRICE_YEAR),
  engine: defaultEngineIndex(entry),
  trim: 'min',
  mileage: 20,
});

/** Все варианты по годам, двигателям и комплектациям при заданном пробеге */
const allConfigs = (entry: CatalogEntry, mileage: Mileage): PriceConfig[] => {
  const engines = enginesFor(entry);
  return yearsFor(entry).flatMap((year) =>
    engines.flatMap((_, engine) =>
      (['min', 'max'] as Trim[]).map((trim) => ({ year, engine, trim, mileage }))
    )
  );
};

/** Самый доступный вариант: базовая комплектация, пробег около 100 тыс. км */
export const cheapestPrice = (entry: CatalogEntry): PriceResult | null =>
  allConfigs(entry, 100).reduce<PriceResult | null>((min, cfg) => {
    if (cfg.trim === 'max') return min;
    const r = priceCar(entry, cfg);
    return r && (!min || r.cost.total < min.cost.total) ? r : min;
  }, null);

/** Самый дорогой вариант: свежий год, топовая комплектация, малый пробег */
export const topPrice = (entry: CatalogEntry): PriceResult | null =>
  allConfigs(entry, 20).reduce<PriceResult | null>((max, cfg) => {
    if (cfg.trim === 'min') return max;
    const r = priceCar(entry, cfg);
    return r && (!max || r.cost.total > max.cost.total) ? r : max;
  }, null);

/** Подпись для карточек каталога: самая доступная цена под ключ */
export const cardPriceLabel = (entry: CatalogEntry): { price: string; note: string } | null => {
  const r = cheapestPrice(entry);
  if (!r) return null;
  return {
    price: `от ${r.cost.total.toLocaleString('ru-RU')} ₽`,
    note: `под ключ, ${r.config.year} г., базовая`,
  };
};
