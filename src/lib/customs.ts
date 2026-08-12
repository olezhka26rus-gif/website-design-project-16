/* ============================================================
   Ставки и курс валют — обновляются вручную по мере изменений
   законодательства РФ (ФТС, Постановления Правительства).
   Единый источник для калькулятора и страниц каталога.
   ============================================================ */

export const EUR_RATE = 90;

const newCarDutyTiers = [
  { maxEur: 8500, percent: 0.54, minPerCm3: 2.5 },
  { maxEur: 16700, percent: 0.48, minPerCm3: 3.5 },
  { maxEur: 42300, percent: 0.48, minPerCm3: 5.5 },
  { maxEur: 84500, percent: 0.48, minPerCm3: 7.5 },
  { maxEur: 169000, percent: 0.48, minPerCm3: 15 },
  { maxEur: Infinity, percent: 0.48, minPerCm3: 20 },
];

const midCarDutyTiers = [
  { maxCm3: 1000, ratePerCm3: 1.5 },
  { maxCm3: 1500, ratePerCm3: 1.7 },
  { maxCm3: 1800, ratePerCm3: 2.5 },
  { maxCm3: 2300, ratePerCm3: 2.7 },
  { maxCm3: 3000, ratePerCm3: 3.0 },
  { maxCm3: Infinity, ratePerCm3: 3.6 },
];

const oldCarDutyTiers = [
  { maxCm3: 1000, ratePerCm3: 3.0 },
  { maxCm3: 1500, ratePerCm3: 3.2 },
  { maxCm3: 1800, ratePerCm3: 3.5 },
  { maxCm3: 2300, ratePerCm3: 4.8 },
  { maxCm3: 3000, ratePerCm3: 5.0 },
  { maxCm3: Infinity, ratePerCm3: 5.7 },
];

const UTIL_BASE = 20000;
const utilFlat = { new: 3400, old: 5200 };

const utilCoefTiers = [
  { maxPower: 200, new: 6.1, old: 9.6 },
  { maxPower: 300, new: 15, old: 21 },
  { maxPower: Infinity, new: 30, old: 42 },
];

const clearanceFeeTiers = [
  { maxPrice: 200000, fee: 1231 },
  { maxPrice: 450000, fee: 2462 },
  { maxPrice: 1200000, fee: 4924 },
  { maxPrice: 2700000, fee: 13541 },
  { maxPrice: 4200000, fee: 18465 },
  { maxPrice: 5500000, fee: 21344 },
  { maxPrice: 10000000, fee: 49240 },
  { maxPrice: Infinity, fee: 73860 },
];

export type CountryCalcKey = 'china' | 'japan' | 'korea' | 'europe' | 'usa' | 'uae';

export const deliveryByCountry: Record<CountryCalcKey, number> = {
  china: 180000,
  japan: 220000,
  korea: 160000,
  europe: 260000,
  usa: 320000,
  uae: 150000,
};

export const SERVICE_FEE = 250000;

export const SERVICE_FEE_TOOLTIP =
  'Комплексное сопровождение включает: подбор автомобиля, проверку истории и состояния, участие в торгах (при необходимости), организацию выкупа, взаимодействие с иностранными партнёрами, контроль логистики, сопровождение таможенного оформления и поддержку клиента до получения автомобиля.';

const findTier = <T extends { maxEur?: number; maxCm3?: number; maxPrice?: number; maxPower?: number }>(
  tiers: T[],
  value: number,
  key: 'maxEur' | 'maxCm3' | 'maxPrice' | 'maxPower'
): T => tiers.find((t) => value <= (t[key] as number))! ?? tiers[tiers.length - 1];

export const calcDuty = (priceRub: number, age: string, engineCm3: number) => {
  if (age === 'new') {
    const priceEur = priceRub / EUR_RATE;
    const tier = findTier(newCarDutyTiers, priceEur, 'maxEur');
    const byPercent = priceRub * tier.percent;
    const byVolume = engineCm3 * tier.minPerCm3 * EUR_RATE;
    return Math.round(Math.max(byPercent, byVolume));
  }
  const tiers = age === 'mid' ? midCarDutyTiers : oldCarDutyTiers;
  const tier = findTier(tiers, engineCm3, 'maxCm3');
  return Math.round(engineCm3 * tier.ratePerCm3 * EUR_RATE);
};

export const calcUtilFee = (age: string, power: number) => {
  const isNew = age === 'new';
  if (power <= 160) return isNew ? utilFlat.new : utilFlat.old;
  const tier = findTier(utilCoefTiers, power, 'maxPower');
  return Math.round(UTIL_BASE * (isNew ? tier.new : tier.old));
};

export const calcClearanceFee = (priceRub: number) =>
  findTier(clearanceFeeTiers, priceRub, 'maxPrice').fee;

export interface CostBreakdown {
  price: number;
  duty: number;
  utilFee: number;
  clearanceFee: number;
  delivery: number;
  service: number;
  total: number;
}

export const calcTotalCost = (
  priceRub: number,
  age: string,
  engineCm3: number,
  power: number,
  country: CountryCalcKey
): CostBreakdown => {
  const duty = calcDuty(priceRub, age, engineCm3);
  const utilFee = calcUtilFee(age, power);
  const clearanceFee = calcClearanceFee(priceRub);
  const delivery = deliveryByCountry[country] ?? 200000;
  return {
    price: priceRub,
    duty,
    utilFee,
    clearanceFee,
    delivery,
    service: SERVICE_FEE,
    total: priceRub + duty + utilFee + clearanceFee + delivery + SERVICE_FEE,
  };
};

export const formatRub = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

/** Достаёт объём двигателя в см³ из строки вида «2.0 л Turbo». Для электро — 0 */
export const engineCm3FromSpec = (engine: string): number => {
  const m = engine.match(/(\d+[.,]\d+)\s*л/);
  if (!m) return 0;
  return Math.round(parseFloat(m[1].replace(',', '.')) * 1000);
};

/** Достаёт число л.с. из строки вида «544 л.с.» */
export const powerFromSpec = (power: string): number => {
  const m = power.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
};

/** Достаёт число рублей из строки вида «от 3 100 000 ₽» */
export const priceFromSpec = (price: string): number => {
  const digits = price.replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
};
