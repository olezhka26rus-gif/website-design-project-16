import { CatalogEntry, CountryKey } from '@/data/catalogCars';
import {
  calcTotalCost,
  engineCm3FromSpec,
  powerFromSpec,
  priceFromSpec,
  CostBreakdown,
  CountryCalcKey,
} from '@/lib/customs';

export const countryNameRu: Record<CountryKey, string> = {
  china: 'Китай',
  japan: 'Япония',
  korea: 'Корея',
  europe: 'Европа',
  usa: 'США',
  uae: 'ОАЭ',
};

export const countryGen: Record<CountryKey, string> = {
  china: 'Китая',
  japan: 'Японии',
  korea: 'Кореи',
  europe: 'Европы',
  usa: 'США',
  uae: 'ОАЭ',
};

export const deliveryWeeksByCountry: Record<CountryKey, string> = {
  china: '4–6 недель',
  japan: '5–8 недель',
  korea: '4–7 недель',
  europe: '6–9 недель',
  usa: '8–12 недель',
  uae: '5–8 недель',
};

export const deliveryRouteByCountry: Record<CountryKey, string> = {
  china: 'автовозом через Забайкальск или морем через Владивосток',
  japan: 'морем через порт Владивостока',
  korea: 'морем через порт Владивостока',
  europe: 'автовозом через Белоруссию или страны Балтии',
  usa: 'морем через Владивосток или Новороссийск',
  uae: 'морем через Новороссийск или Владивосток',
};

/**
 * Поправка к закупочной цене автомобиля в зависимости от рынка.
 * Один и тот же автомобиль на разных рынках стоит по-разному:
 * Корея и ОАЭ дешевле по прайсу, Европа дороже, Япония — аукционные цены.
 */
const marketPriceFactor: Record<CountryKey, number> = {
  china: 1.0,
  japan: 1.02,
  korea: 0.95,
  europe: 1.12,
  usa: 1.05,
  uae: 1.08,
};

/**
 * Откуда реально можно привезти автомобиль конкретной марки.
 * Первый элемент — основной рынок (тот, что указан в каталоге),
 * остальные — альтернативные маршруты поставки.
 */
const brandMarkets: Record<string, CountryKey[]> = {
  Zeekr: ['china'],
  'Li Auto': ['china'],
  Chery: ['china'],
  BYD: ['china'],
  Geely: ['china'],
  Haval: ['china'],
  'GAC Trumpchi': ['china'],
  GAC: ['china'],
  Changan: ['china'],
  Jetta: ['china'],
  'Lynk & Co': ['china'],
  Voyah: ['china'],

  Toyota: ['japan', 'korea', 'uae', 'china'],
  Lexus: ['japan', 'korea', 'uae'],
  Honda: ['japan', 'china'],
  Nissan: ['japan', 'uae', 'china'],
  Mazda: ['japan'],
  Mitsubishi: ['japan'],
  Subaru: ['japan', 'usa'],
  Suzuki: ['japan'],

  Kia: ['korea', 'china'],
  Hyundai: ['korea', 'china'],
  Genesis: ['korea', 'usa'],
  SsangYong: ['korea'],

  BMW: ['europe', 'china', 'usa', 'uae', 'korea'],
  'Mercedes-Benz': ['europe', 'china', 'usa', 'uae', 'korea'],
  'Mercedes-Maybach': ['uae', 'europe'],
  Audi: ['europe', 'china', 'korea'],
  Volkswagen: ['europe', 'china'],
  Skoda: ['europe', 'china'],
  Mini: ['europe', 'china'],
  Porsche: ['europe', 'uae', 'usa', 'china'],
  'Range Rover': ['europe', 'uae', 'usa'],
  'Rolls-Royce': ['uae', 'europe'],
  Bentley: ['uae', 'europe'],
  Ferrari: ['uae', 'europe'],
  Lamborghini: ['uae', 'europe'],

  Tesla: ['usa', 'china', 'europe'],
  Jeep: ['usa', 'europe'],
  Ford: ['usa', 'uae'],
  Cadillac: ['usa', 'uae'],
  Chevrolet: ['usa', 'korea', 'uae'],
  Ram: ['usa', 'uae'],
  Dodge: ['usa', 'uae'],
};

export interface SourcingOption {
  country: CountryKey;
  countryName: string;
  price: number;
  cost: CostBreakdown;
  weeks: string;
  route: string;
  isPrimary: boolean;
  isCheapest: boolean;
}

/** Округляем до 10 тысяч — цены ориентировочные, «хвосты» выглядят неправдоподобно */
const roundPrice = (n: number) => Math.round(n / 10000) * 10000;

/**
 * Считает варианты поставки автомобиля из разных стран.
 * Возвращает список, отсортированный по итоговой цене под ключ.
 */
export const buildSourcingOptions = (entry: CatalogEntry): SourcingOption[] => {
  const v = entry.variant;
  const basePrice = priceFromSpec(v.price);
  if (!basePrice) return [];

  const cm3 = engineCm3FromSpec(v.specs.engine);
  const hp = powerFromSpec(v.specs.power);
  const primary = entry.country as CountryKey;

  const markets = brandMarkets[entry.model.brand] ?? [primary];
  const list = markets.includes(primary) ? markets : [primary, ...markets];

  const baseFactor = marketPriceFactor[primary] ?? 1;

  const options = list.map((country) => {
    const factor = (marketPriceFactor[country] ?? 1) / baseFactor;
    const price = country === primary ? basePrice : roundPrice(basePrice * factor);
    return {
      country,
      countryName: countryNameRu[country],
      price,
      cost: calcTotalCost(price, 'new', cm3, hp, country as CountryCalcKey),
      weeks: deliveryWeeksByCountry[country],
      route: deliveryRouteByCountry[country],
      isPrimary: country === primary,
      isCheapest: false,
    };
  });

  options.sort((a, b) => a.cost.total - b.cost.total);
  if (options.length) options[0].isCheapest = true;

  return options;
};

/** Самый выгодный вариант поставки */
export const cheapestOption = (options: SourcingOption[]): SourcingOption | null =>
  options.length ? options[0] : null;
