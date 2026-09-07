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

/* ============================================================
   Растаможка мотоциклов (товарная позиция 8711).
   В отличие от легковых авто: пошлина считается только в евро
   за см³ рабочего объёма (без варианта «% от стоимости»),
   утилизационный сбор — фиксированный и в разы меньше автомобильного,
   таможенный сбор за оформление — минимальная ставка.
   ============================================================ */

/** Ставка пошлины, €/см³, по объёму двигателя — для мотоциклов не старше 3 лет */
const motoDutyTiersNew = [
  { maxCm3: 500, eurPerCm3: 0.5 },
  { maxCm3: 800, eurPerCm3: 1.0 },
  { maxCm3: Infinity, eurPerCm3: 1.5 },
];

/** Для мотоциклов старше 3 лет ставка выше */
const motoDutyTiersOld = [
  { maxCm3: 500, eurPerCm3: 0.8 },
  { maxCm3: 800, eurPerCm3: 1.5 },
  { maxCm3: Infinity, eurPerCm3: 2.0 },
];

/** Утилизационный сбор для мотоциклов — фиксированная минимальная сумма (база 2000 ₽) */
export const MOTO_UTIL_FEE_NEW = 2000;
export const MOTO_UTIL_FEE_OLD = 3400;

/** Таможенный сбор за оформление мотоцикла — минимальная ставка по шкале */
export const MOTO_CLEARANCE_FEE = 1067;

/** Доставка мотоцикла дешевле автомобильной — меньше объём и вес в контейнере */
export const motoDeliveryByCountry: Record<'japan' | 'europe' | 'usa', number> = {
  japan: 90000,
  europe: 110000,
  usa: 150000,
};

/** Услуги компании по мотоциклу — меньше автомобильных, но включают тот же набор работ */
export const MOTO_SERVICE_FEE = 120000;

export interface MotoCostBreakdown {
  price: number;
  duty: number;
  utilFee: number;
  clearanceFee: number;
  delivery: number;
  service: number;
  total: number;
}

export const calcMotoDuty = (age: 'new' | 'old', engineCm3: number): number => {
  const tiers = age === 'new' ? motoDutyTiersNew : motoDutyTiersOld;
  const tier = findTier(tiers, engineCm3, 'maxCm3');
  return Math.round(engineCm3 * tier.eurPerCm3 * EUR_RATE);
};

export const calcMotoTotalCost = (
  priceRub: number,
  age: 'new' | 'old',
  engineCm3: number,
  country: 'japan' | 'europe' | 'usa'
): MotoCostBreakdown => {
  const duty = calcMotoDuty(age, engineCm3);
  const utilFee = age === 'new' ? MOTO_UTIL_FEE_NEW : MOTO_UTIL_FEE_OLD;
  const clearanceFee = MOTO_CLEARANCE_FEE;
  const delivery = motoDeliveryByCountry[country] ?? 100000;
  return {
    price: priceRub,
    duty,
    utilFee,
    clearanceFee,
    delivery,
    service: MOTO_SERVICE_FEE,
    total: priceRub + duty + utilFee + clearanceFee + delivery + MOTO_SERVICE_FEE,
  };
};

/** Достаёт объём двигателя мотоцикла в см³ из строки вида «0.65 л» */
export const motoEngineCm3FromSpec = (engine: string): number => {
  const m = engine.match(/(\d+[.,]\d+)\s*л/);
  if (!m) return 0;
  return Math.round(parseFloat(m[1].replace(',', '.')) * 1000);
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