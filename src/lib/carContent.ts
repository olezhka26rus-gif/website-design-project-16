import { CatalogEntry } from '@/data/catalogCars';
import { sourceOptionsFor } from '@/data/sourcing';
import {
  calcTotalCost,
  engineCm3FromSpec,
  powerFromSpec,
  priceFromSpec,
  formatRub,
  CostBreakdown,
  CountryCalcKey,
} from '@/lib/customs';

export const countryGenitive: Record<string, string> = {
  china: 'Китая',
  japan: 'Японии',
  korea: 'Кореи',
  europe: 'Европы',
  usa: 'США',
  uae: 'ОАЭ',
};

export const countryPrepositional: Record<string, string> = {
  china: 'Китае',
  japan: 'Японии',
  korea: 'Корее',
  europe: 'Европе',
  usa: 'США',
  uae: 'ОАЭ',
};

const deliveryWeeks: Record<string, string> = {
  china: '4–6 недель',
  japan: '5–8 недель',
  korea: '4–7 недель',
  europe: '6–9 недель',
  usa: '8–12 недель',
  uae: '5–8 недель',
};

const deliveryRoute: Record<string, string> = {
  china: 'автовозом через Забайкальск или морем через Владивосток',
  japan: 'морем через порт Владивостока',
  korea: 'морем через порт Владивостока',
  europe: 'автовозом через Белоруссию или страны Балтии',
  usa: 'морем через Владивосток или Новороссийск',
  uae: 'морем через Новороссийск или Владивосток',
};

const bodyDescription: Record<string, string> = {
  'Седан': 'классический трёхобъёмный кузов с отдельным багажником, тихий салон и уверенная управляемость на трассе',
  'Кроссовер': 'увеличенный дорожный просвет и посадка выше средней при легковой управляемости',
  'Внедорожник': 'высокий клиренс, крепкая подвеска и способность уверенно идти по разбитой дороге',
  'Хэтчбек': 'короткий кузов с задней дверью — удобно в городе и на парковке',
  'Лифтбек': 'силуэт седана с широкой подъёмной дверью багажника',
  'Универсал': 'вытянутая крыша и большой багажник для семьи и длинных поездок',
  'Минивэн': 'просторный салон с высоким потолком, рассчитанный на большую семью',
  'Купе': 'двухдверный кузов со спортивным силуэтом и низкой посадкой',
  'Пикап': 'отдельная грузовая платформа и рамная конструкция',
  'Фургон': 'закрытый грузовой отсек большого объёма',
};

/** Прилагательное в творительном падеже: «с бензиновым двигателем» */
const fuelInstrumental = (engine: string): string => {
  const s = engine.toLowerCase();
  if (s.includes('электро')) return 'электрической';
  if (s.includes('e-power')) return 'гибридной';
  if (s.includes('гибрид')) return 'гибридной';
  if (s.includes('дизель')) return 'дизельным';
  return 'бензиновым';
};

const isElectric = (engine: string) => engine.toLowerCase().includes('электро');

const powerComment = (hp: number): string => {
  if (hp >= 400) return 'очень мощный автомобиль, разгон уверенный в любой ситуации';
  if (hp >= 250) return 'мощности с запасом хватает для трассы и обгонов';
  if (hp >= 150) return 'сбалансированный вариант для города и трассы';
  return 'экономичный вариант, ориентированный на город';
};

const driveComment = (drive: string): string => {
  if (drive === 'Полный') return 'полный привод помогает зимой и на скользкой дороге';
  if (drive === 'Задний') return 'задний привод даёт более спортивную управляемость';
  return 'передний привод экономичнее и предсказуемее в обычных условиях';
};

export interface CarFaqItem {
  q: string;
  a: string;
}

export interface SourceQuote {
  country: string;
  countryGen: string;
  countryName: string;
  carPrice: number;
  total: number;
  weeks: string;
  route: string;
  isBest: boolean;
  isCatalog: boolean;
}

export interface CarContent {
  fullName: string;
  countryGen: string;
  cost: CostBreakdown | null;
  /** Расчёт по каждой стране вывоза, отсортирован от самой выгодной */
  quotes: SourceQuote[];
  /** Самый выгодный вариант под ключ */
  best: SourceQuote | null;
  basePrice: number;
  hp: number;
  cm3: number;
  intro: string;
  aboutModel: string;
  aboutDelivery: string;
  aboutCustoms: string;
  faq: CarFaqItem[];
}

/** Убирает двойные точки и лишние пробелы после сборки фраз из данных */
const tidy = (s: string): string =>
  s
    .replace(/\s+/g, ' ')
    .replace(/\.{2,}/g, '.')
    .replace(/\s+([.,:;])/g, '$1')
    .trim();

export const buildCarContent = (entry: CatalogEntry): CarContent => {
  const { variant: v, model, country } = entry;
  const gen = countryGenitive[country] ?? entry.countryName;
  const prep = countryPrepositional[country] ?? entry.countryName;
  const fullName = v.model.toLowerCase().startsWith(model.brand.toLowerCase())
    ? v.model
    : `${model.brand} ${v.model}`;

  const basePrice = priceFromSpec(v.price);
  const hp = powerFromSpec(v.specs.power);
  const cm3 = engineCm3FromSpec(v.specs.engine);
  const electric = isElectric(v.specs.engine);

  const countryLabel: Record<string, string> = {
    china: 'Китай',
    japan: 'Япония',
    korea: 'Корея',
    europe: 'Европа',
    usa: 'США',
    uae: 'ОАЭ',
  };

  const quotes: SourceQuote[] = basePrice
    ? sourceOptionsFor(entry)
        .map((opt) => {
          const carPrice = Math.round((basePrice * opt.priceFactor) / 10000) * 10000;
          const c = calcTotalCost(carPrice, 'new', cm3, hp, opt.country as CountryCalcKey);
          return {
            country: opt.country,
            countryGen: countryGenitive[opt.country] ?? opt.country,
            countryName: countryLabel[opt.country] ?? opt.country,
            carPrice,
            total: c.total,
            weeks: deliveryWeeks[opt.country] ?? '6–10 недель',
            route: deliveryRoute[opt.country] ?? 'морем и автовозом',
            isBest: false,
            isCatalog: opt.country === country,
          };
        })
        .sort((a, b) => a.total - b.total)
    : [];

  if (quotes.length) quotes[0].isBest = true;
  const best = quotes[0] ?? null;

  // Основной расчёт показываем по самому выгодному маршруту
  const cost = best
    ? calcTotalCost(best.carPrice, 'new', cm3, hp, best.country as CountryCalcKey)
    : null;

  const body = bodyDescription[v.bodyType] ?? 'практичный кузов для повседневных задач';
  const fuel = fuelInstrumental(v.specs.engine);

  const intro =
    `${fullName} ${v.specs.year} года — ${v.bodyType.toLowerCase()} с ${fuel} ` +
    `${electric || /гибрид|e-power/i.test(v.specs.engine) ? 'силовой установкой' : 'двигателем'} ` +
    `${v.specs.engine} мощностью ${v.specs.power}. ` +
    `Привозим этот автомобиль на заказ под ключ: подбор, проверка, выкуп, доставка и растаможка.`;

  const aboutModel =
    `${fullName} — ${v.bodyType.toLowerCase()}: ${body}. Под капотом ${v.specs.power}, ` +
    `${powerComment(hp)}. Коробка — ${v.specs.transmission.toLowerCase()}, ${driveComment(v.specs.drive)}. ` +
    (electric
      ? `Запас хода и расход энергии: ${v.specs.consumption}. Зарядка от бытовой сети и быстрых станций.`
      : `Расход топлива — ${v.specs.consumption}.`);

  const bestQ = quotes[0];
  const bestPrep = bestQ
    ? countryPrepositional[bestQ.country] ?? bestQ.countryName
    : prep;

  const aboutDelivery =
    (quotes.length > 1
      ? `Этот автомобиль продаётся сразу на нескольких рынках, поэтому везти его можно не только из ${gen}. ` +
        `Мы сравниваем стоимость под ключ по каждому маршруту: ${quotes
          .map((q) => q.countryGen)
          .join(', ')}. Сейчас выгоднее всего из ${bestQ.countryGen}. `
      : '') +
    `Автомобиль выкупается ${bestPrep === 'США' ? 'в США' : `в ${bestPrep}`} у проверенного поставщика или на аукционе. ` +
    `Доставка идёт ${bestQ ? bestQ.route : deliveryRoute[country] ?? 'морем и автовозом'} и занимает ориентировочно ` +
    `${bestQ ? bestQ.weeks : deliveryWeeks[country] ?? '6–10 недель'} с момента оплаты. ` +
    `Перед покупкой присылаем фото- и видеоотчёт, проверяем историю и техническое состояние.`;

  const aboutCustoms = cost
    ? `При стоимости автомобиля ${formatRub(cost.price)} расчёт под ключ выглядит так: ` +
      `таможенная пошлина ${formatRub(cost.duty)}, утилизационный сбор ${formatRub(cost.utilFee)}, ` +
      `таможенный сбор за оформление ${formatRub(cost.clearanceFee)}, доставка из ${gen} ${formatRub(cost.delivery)} ` +
      `и услуги компании ${formatRub(cost.service)}. Итого ориентировочно ${formatRub(cost.total)} до вашего города.`
    : `Точную стоимость под ключ с пошлиной, утильсбором и доставкой рассчитает менеджер.`;

  const faq: CarFaqItem[] = [];

  faq.push({
    q: `Сколько стоит ${fullName} под ключ в России?`,
    a: cost
      ? `Ориентировочно ${formatRub(cost.total)} с учётом стоимости автомобиля ${formatRub(cost.price)}, ` +
        `пошлины ${formatRub(cost.duty)}, утилизационного сбора ${formatRub(cost.utilFee)}, доставки из ${gen} и услуг компании. ` +
        `Итоговая сумма зависит от курса валют, комплектации и города доставки.`
      : `Стоимость зависит от комплектации, курса валют и города доставки — расчёт делает менеджер.`,
  });

  faq.push({
    q: `Из каких стран можно привезти ${fullName}?`,
    a:
      quotes.length > 1
        ? `${fullName} продаётся на нескольких рынках, поэтому мы возим её из следующих стран: ${quotes
            .map((q) => q.countryGen)
            .join(', ')}. Страна влияет на цену, комплектацию и срок доставки. ` +
          `По нашему расчёту выгоднее всего из ${bestQ.countryGen} — около ${formatRub(bestQ.total)} под ключ.`
        : `Эту модель мы возим из ${gen} — на других рынках она официально не продаётся.`,
  });

  faq.push({
    q: `Сколько идёт доставка ${fullName}?`,
    a: `Из ${bestQ ? bestQ.countryGen : gen} — ориентировочно ${bestQ ? bestQ.weeks : deliveryWeeks[country] ?? '6–10 недель'} с момента оплаты, маршрут ${bestQ ? bestQ.route : deliveryRoute[country] ?? 'морем и автовозом'}. ` +
      (quotes.length > 1
        ? `Из других стран сроки отличаются: ${quotes
            .slice(1)
            .map((q) => `${q.countryGen} — ${q.weeks}`)
            .join(', ')}. `
        : '') +
      `Сроки могут сдвигаться из-за загрузки портов и погоды.`,
  });

  faq.push({
    q: `Какой утилизационный сбор на ${fullName}?`,
    a: cost
      ? `Для нового автомобиля мощностью ${v.specs.power} утилизационный сбор составит около ${formatRub(cost.utilFee)}. ` +
        `Ставка зависит от мощности и возраста: до 160 л.с. действует льготная сумма, выше — повышающие коэффициенты.`
      : `Ставка зависит от мощности двигателя и возраста автомобиля.`,
  });

  faq.push({
    q: electric
      ? `Как растаможить электромобиль ${fullName}?`
      : `Какая пошлина на ${fullName} с двигателем ${v.specs.engine}?`,
    a: cost
      ? electric
        ? `Для электромобилей пошлина считается от стоимости, объём двигателя не учитывается. ` +
          `При цене ${formatRub(cost.price)} пошлина составит около ${formatRub(cost.duty)}, плюс утилизационный сбор ${formatRub(cost.utilFee)}.`
        : `При объёме ${cm3} см³ и стоимости ${formatRub(cost.price)} пошлина на новый автомобиль составит около ${formatRub(cost.duty)}. ` +
          `Для машин до 3 лет берётся большая из двух величин: процент от стоимости или ставка за кубический сантиметр.`
      : `Пошлина зависит от объёма двигателя, стоимости и возраста автомобиля.`,
  });

  faq.push({
    q: `Можно ли заказать ${fullName} в другой комплектации или цвете?`,
    a: `Да. Мы подбираем автомобиль под ваш бюджет и требования: комплектация, цвет кузова и салона, пакеты опций. ` +
      `Достаточно назвать пожелания — подберём подходящие варианты с фото и ценой.`,
  });

  faq.push({
    q: `Будет ли ЭПТС и постановка на учёт в ГИБДД?`,
    a: `Да. Мы оформляем таможенные документы, помогаем получить электронный ПТС и передаём полный комплект для регистрации в ГИБДД. ` +
      `${fullName} ставится на учёт как обычный автомобиль.`,
  });

  return {
    fullName,
    countryGen: gen,
    cost,
    quotes,
    best,
    basePrice,
    hp,
    cm3,
    intro: tidy(intro),
    aboutModel: tidy(aboutModel),
    aboutDelivery: tidy(aboutDelivery),
    aboutCustoms: tidy(aboutCustoms),
    faq: faq.map((f) => ({ q: tidy(f.q), a: tidy(f.a) })),
  };
};
