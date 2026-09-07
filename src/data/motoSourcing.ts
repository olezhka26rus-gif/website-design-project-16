import { MotoEntry, MotoCountryKey } from '@/data/catalogMoto';

export interface MotoSourceOption {
  country: MotoCountryKey;
  priceFactor: number;
}

/** Группы марок по «домашнему» рынку */
const motoBrandOrigin: Record<string, 'jp' | 'eu' | 'us'> = {
  Honda: 'jp',
  Yamaha: 'jp',
  Suzuki: 'jp',
  Kawasaki: 'jp',
  BMW: 'eu',
  Ducati: 'eu',
  KTM: 'eu',
  Husqvarna: 'eu',
  'Harley-Davidson': 'us',
};

/** Доступные рынки закупки по происхождению марки */
const motoMarketsByOrigin: Record<string, MotoSourceOption[]> = {
  jp: [
    { country: 'japan', priceFactor: 1.0 },
    { country: 'usa', priceFactor: 1.08 },
  ],
  eu: [
    { country: 'europe', priceFactor: 1.0 },
    { country: 'usa', priceFactor: 1.06 },
  ],
  us: [
    { country: 'usa', priceFactor: 1.0 },
    { country: 'europe', priceFactor: 1.07 },
  ],
};

/** Возвращает список стран, откуда реально можно привезти этот мотоцикл */
export const motoSourceOptionsFor = (entry: MotoEntry): MotoSourceOption[] => {
  const brand = entry.model.brand;
  const origin = motoBrandOrigin[brand];
  const base = motoMarketsByOrigin[origin] ?? [{ country: entry.country, priceFactor: 1.0 }];

  let list = base.slice();

  if (!list.some((o) => o.country === entry.country)) {
    list.unshift({ country: entry.country, priceFactor: 1.0 });
  }

  const anchor = list.find((o) => o.country === entry.country)!.priceFactor;
  list = list.map((o) => ({ ...o, priceFactor: o.priceFactor / anchor }));

  return [
    list.find((o) => o.country === entry.country)!,
    ...list.filter((o) => o.country !== entry.country),
  ];
};
