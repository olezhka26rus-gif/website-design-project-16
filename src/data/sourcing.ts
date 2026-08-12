import { CountryKey, CatalogEntry } from '@/data/catalogCars';

/* ============================================================
   Рынки закупки: один и тот же автомобиль можно купить в разных
   странах. Страна в каталоге — основной рынок, но не единственный.

   priceFactor — поправка к базовой цене автомобиля на этом рынке
   относительно основного рынка (1.0). Ставки консервативные:
   отражают реальную разницу цен, а не «покупку за копейки».
   ============================================================ */

export interface SourceOption {
  country: CountryKey;
  priceFactor: number;
}

/** Группы марок по «домашнему» рынку */
const brandOrigin: Record<string, 'cn' | 'jp' | 'kr' | 'eu' | 'us' | 'lux'> = {
  Zeekr: 'cn',
  Geely: 'cn',
  BYD: 'cn',
  Haval: 'cn',
  Chery: 'cn',
  'Li Auto': 'cn',
  'GAC Trumpchi': 'cn',
  GAC: 'cn',
  Changan: 'cn',
  Jetta: 'cn',
  'Lynk & Co': 'cn',
  Voyah: 'cn',

  Toyota: 'jp',
  Honda: 'jp',
  Nissan: 'jp',
  Mazda: 'jp',
  Mitsubishi: 'jp',
  Lexus: 'jp',
  Subaru: 'jp',
  Suzuki: 'jp',

  Kia: 'kr',
  Hyundai: 'kr',
  Genesis: 'kr',
  SsangYong: 'kr',
  'Kia Sorento': 'kr',
  'Hyundai Palisade': 'kr',

  'Mercedes-Benz': 'eu',
  BMW: 'eu',
  Audi: 'eu',
  Volkswagen: 'eu',
  Skoda: 'eu',
  Porsche: 'eu',
  Mini: 'eu',
  'Range Rover': 'eu',

  Chevrolet: 'us',
  Ford: 'us',
  Dodge: 'us',
  Jeep: 'us',
  Ram: 'us',
  Tesla: 'us',
  Cadillac: 'us',

  'Rolls-Royce': 'lux',
  Bentley: 'lux',
  Ferrari: 'lux',
  Lamborghini: 'lux',
  'Mercedes-Maybach': 'lux',
};

/**
 * Марки, у которых есть локальное производство или официальный рынок в Китае.
 * Только для них Китай — реальный канал закупки.
 */
const availableInChina = new Set([
  'Volkswagen',
  'Audi',
  'BMW',
  'Mercedes-Benz',
  'Skoda',
  'Toyota',
  'Honda',
  'Nissan',
  'Mazda',
  'Kia',
  'Hyundai',
  'Ford',
  'Chevrolet',
  'Tesla',
  'Jetta',
]);

/** Марки, которые реально встречаются на рынке ОАЭ */
const availableInUae = new Set([
  'Toyota',
  'Nissan',
  'Lexus',
  'Mitsubishi',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Porsche',
  'Range Rover',
  'Cadillac',
  'Chevrolet',
  'Ford',
  'Dodge',
  'Jeep',
  'Ram',
  'Kia',
  'Hyundai',
  'Genesis',
  'Rolls-Royce',
  'Bentley',
  'Ferrari',
  'Lamborghini',
  'Mercedes-Maybach',
  'Tesla',
  // Китайские марки, широко представленные в ОАЭ
  'BYD',
  'Zeekr',
  'Geely',
  'Chery',
  'Changan',
  'Haval',
  'GAC',
  'GAC Trumpchi',
  'Li Auto',
]);

/** Доступные рынки закупки по происхождению марки */
const marketsByOrigin: Record<string, SourceOption[]> = {
  cn: [
    { country: 'china', priceFactor: 1.0 },
    { country: 'uae', priceFactor: 1.1 },
  ],
  jp: [
    { country: 'japan', priceFactor: 1.0 },
    { country: 'korea', priceFactor: 1.05 },
    { country: 'uae', priceFactor: 1.07 },
    { country: 'china', priceFactor: 0.96 },
    { country: 'usa', priceFactor: 1.09 },
  ],
  kr: [
    { country: 'korea', priceFactor: 1.0 },
    { country: 'china', priceFactor: 0.98 },
    { country: 'uae', priceFactor: 1.06 },
    { country: 'usa', priceFactor: 1.1 },
  ],
  eu: [
    { country: 'europe', priceFactor: 1.0 },
    { country: 'china', priceFactor: 0.95 },
    { country: 'korea', priceFactor: 1.05 },
    { country: 'uae', priceFactor: 1.03 },
    { country: 'usa', priceFactor: 1.06 },
  ],
  us: [
    { country: 'usa', priceFactor: 1.0 },
    { country: 'uae', priceFactor: 1.05 },
    { country: 'china', priceFactor: 0.98 },
    { country: 'europe', priceFactor: 1.08 },
  ],
  lux: [
    { country: 'uae', priceFactor: 1.0 },
    { country: 'europe', priceFactor: 1.05 },
    { country: 'usa', priceFactor: 1.07 },
  ],
};

/** Электромобили и свежие китайские модели в Японии/Корее почти не найти */
const isChineseEv = (entry: CatalogEntry) =>
  brandOrigin[entry.model.brand] === 'cn' &&
  /электро|гибрид/i.test(entry.variant.specs.engine);

/**
 * Возвращает список стран, откуда реально можно привезти этот автомобиль.
 * Первым идёт основной рынок из каталога.
 */
export const sourceOptionsFor = (entry: CatalogEntry): SourceOption[] => {
  const brand = entry.model.brand;
  const origin = brandOrigin[brand];
  const base = marketsByOrigin[origin] ?? [{ country: entry.country, priceFactor: 1.0 }];

  let list = base.slice();

  // Китай — только там, где марка реально продаётся или производится
  if (origin !== 'cn' && !availableInChina.has(brand)) {
    list = list.filter((o) => o.country !== 'china');
  }

  // ОАЭ — только для марок, представленных на местном рынке
  if (origin !== 'lux' && !availableInUae.has(brand)) {
    list = list.filter((o) => o.country !== 'uae');
  }

  if (isChineseEv(entry)) {
    list = list.filter((o) => o.country !== 'usa');
  }

  // Страна из каталога всегда доступна и считается базовой ценой
  if (!list.some((o) => o.country === entry.country)) {
    list.unshift({ country: entry.country, priceFactor: 1.0 });
  }

  // Нормализуем: базовая цена каталога соответствует стране каталога
  const anchor = list.find((o) => o.country === entry.country)!.priceFactor;
  list = list.map((o) => ({ ...o, priceFactor: o.priceFactor / anchor }));

  return [
    list.find((o) => o.country === entry.country)!,
    ...list.filter((o) => o.country !== entry.country),
  ];
};
