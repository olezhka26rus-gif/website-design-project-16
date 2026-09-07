import { MotoEntry } from '@/data/catalogMoto';
import { motoSourceOptionsFor } from '@/data/motoSourcing';
import {
  calcMotoTotalCost,
  motoEngineCm3FromSpec,
  priceFromSpec,
  formatRub,
  MotoCostBreakdown,
} from '@/lib/customs';

export const motoCountryGenitive: Record<string, string> = {
  japan: 'Японии',
  europe: 'Европы',
  usa: 'США',
};

export const motoCountryPrepositional: Record<string, string> = {
  japan: 'Японии',
  europe: 'Европе',
  usa: 'США',
};

const motoDeliveryWeeks: Record<string, string> = {
  japan: '4–7 недель',
  europe: '5–8 недель',
  usa: '7–11 недель',
};

const motoDeliveryRoute: Record<string, string> = {
  japan: 'морем через порт Владивостока',
  europe: 'автовозом через Белоруссию или страны Балтии',
  usa: 'морем через Владивосток или Новороссийск',
};

const bodyDescription: Record<string, string> = {
  'Нейкед': 'открытая посадка без обтекателей, простая механика и хороший обзор в городе',
  'Спортбайк': 'низкая посадка, полный обтекатель и максимальная отдача на высоких оборотах',
  'Супербайк': 'предельные для серийного мотоцикла мощность и аэродинамика, трековая геометрия',
  'Турер': 'высокая ветрозащита, удобная посадка и запас мощности для дальних переездов',
  'Адвенчер': 'высокий клиренс, защита картера и способность уверенно идти по грунтовке',
  'Круизер': 'низкая посадка, вытянутая геометрия и спокойный, размеренный характер',
  'Эндуро': 'лёгкий вес, длинноходная подвеска и готовность к бездорожью',
  'Скутер': 'автоматическая трансмиссия, вместительный кофр под сиденьем и лёгкое управление в городе',
};

const powerComment = (hp: number): string => {
  if (hp >= 180) return 'мотоцикл трекового уровня, разгон и тормоза с большим запасом';
  if (hp >= 100) return 'мощности хватает для уверенных обгонов и трассы';
  if (hp >= 50) return 'сбалансированный вариант для города и загородных поездок';
  return 'спокойный и предсказуемый в управлении, подходит для начинающих';
};

export interface MotoFaqItem {
  q: string;
  a: string;
}

export interface MotoSourceQuote {
  country: string;
  countryGen: string;
  countryName: string;
  bikePrice: number;
  total: number;
  weeks: string;
  route: string;
  isBest: boolean;
  isCatalog: boolean;
}

export interface MotoContent {
  fullName: string;
  countryGen: string;
  cost: MotoCostBreakdown | null;
  quotes: MotoSourceQuote[];
  best: MotoSourceQuote | null;
  basePrice: number;
  cm3: number;
  intro: string;
  aboutModel: string;
  aboutDelivery: string;
  faq: MotoFaqItem[];
}

const tidy = (s: string): string =>
  s
    .replace(/\s+/g, ' ')
    .replace(/\.{2,}/g, '.')
    .replace(/\s+([.,:;])/g, '$1')
    .trim();

const countryLabel: Record<string, string> = {
  japan: 'Япония',
  europe: 'Европа',
  usa: 'США',
};

export const buildMotoContent = (entry: MotoEntry): MotoContent => {
  const { variant: v, model, country } = entry;
  const gen = motoCountryGenitive[country] ?? entry.countryName;
  const prep = motoCountryPrepositional[country] ?? entry.countryName;
  const fullName = v.model.toLowerCase().startsWith(model.brand.toLowerCase())
    ? v.model
    : `${model.brand} ${v.model}`;

  const basePrice = priceFromSpec(v.price);
  const cm3 = motoEngineCm3FromSpec(v.specs.engine);
  const hp = Number((v.specs.power.match(/(\d+)/) ?? [])[1] ?? 0);

  const quotes: MotoSourceQuote[] = basePrice
    ? motoSourceOptionsFor(entry)
        .map((opt) => {
          const bikePrice = Math.round((basePrice * opt.priceFactor) / 10000) * 10000;
          const c = calcMotoTotalCost(bikePrice, 'new', cm3, opt.country);
          return {
            country: opt.country,
            countryGen: motoCountryGenitive[opt.country] ?? opt.country,
            countryName: countryLabel[opt.country] ?? opt.country,
            bikePrice,
            total: c.total,
            weeks: motoDeliveryWeeks[opt.country] ?? '5–9 недель',
            route: motoDeliveryRoute[opt.country] ?? 'морем и автовозом',
            isBest: false,
            isCatalog: opt.country === country,
          };
        })
        .sort((a, b) => a.total - b.total)
    : [];

  if (quotes.length) quotes[0].isBest = true;
  const best = quotes[0] ?? null;

  const cost = best ? calcMotoTotalCost(best.bikePrice, 'new', cm3, best.country as 'japan' | 'europe' | 'usa') : null;

  const body = bodyDescription[v.bodyType] ?? 'практичная геометрия для повседневных поездок';

  const intro =
    `${fullName} ${v.specs.year} года — ${v.bodyType.toLowerCase()} с двигателем ${v.specs.engine} ` +
    `мощностью ${v.specs.power}. Привозим этот мотоцикл на заказ под ключ: подбор, проверка, выкуп, доставка и растаможка.`;

  const aboutModel =
    `${fullName} — ${v.bodyType.toLowerCase()}: ${body}. Под капотом ${v.specs.power}, ` +
    `${powerComment(hp)}. Коробка — ${v.specs.transmission.toLowerCase()}, привод — ${v.specs.drive.toLowerCase()}. ` +
    `Расход топлива — ${v.specs.consumption}.`;

  const bestQ = quotes[0];
  const bestPrep = bestQ ? motoCountryPrepositional[bestQ.country] ?? bestQ.countryName : prep;

  const aboutDelivery =
    (quotes.length > 1
      ? `Эту модель продают сразу на нескольких рынках, поэтому везти её можно не только из ${gen}. ` +
        `Мы сравниваем стоимость под ключ по каждому маршруту: ${quotes.map((q) => q.countryGen).join(', ')}. ` +
        `Сейчас выгоднее всего из ${bestQ.countryGen}. `
      : '') +
    `Мотоцикл выкупается ${bestPrep === 'США' ? 'в США' : `в ${bestPrep}`} у проверенного поставщика или на аукционе. ` +
    `Доставка идёт ${bestQ ? bestQ.route : motoDeliveryRoute[country] ?? 'морем и автовозом'} и занимает ориентировочно ` +
    `${bestQ ? bestQ.weeks : motoDeliveryWeeks[country] ?? '5–9 недель'} с момента оплаты. ` +
    `Перед покупкой присылаем фото- и видеоотчёт, проверяем историю и техническое состояние.`;

  const faq: MotoFaqItem[] = [];

  faq.push({
    q: `Сколько стоит ${fullName} под ключ в России?`,
    a: cost
      ? `Ориентировочно ${formatRub(cost.total)} с учётом стоимости мотоцикла ${formatRub(cost.price)}, ` +
        `пошлины ${formatRub(cost.duty)}, утилизационного сбора ${formatRub(cost.utilFee)}, доставки из ${gen} и услуг компании. ` +
        `Итоговая сумма зависит от курса валют и комплектации.`
      : `Стоимость зависит от комплектации, курса валют и города доставки — расчёт делает менеджер.`,
  });

  faq.push({
    q: `Из каких стран можно привезти ${fullName}?`,
    a:
      quotes.length > 1
        ? `${fullName} продаётся на нескольких рынках, поэтому мы возим её из следующих стран: ${quotes
            .map((q) => q.countryGen)
            .join(', ')}. По нашему расчёту выгоднее всего из ${bestQ.countryGen} — около ${formatRub(bestQ.total)} под ключ.`
        : `Эту модель мы возим из ${gen} — на других рынках она официально не продаётся.`,
  });

  faq.push({
    q: `Сколько идёт доставка ${fullName}?`,
    a: `Из ${bestQ ? bestQ.countryGen : gen} — ориентировочно ${bestQ ? bestQ.weeks : motoDeliveryWeeks[country] ?? '5–9 недель'} с момента оплаты, маршрут ${bestQ ? bestQ.route : motoDeliveryRoute[country] ?? 'морем и автовозом'}. ` +
      `Сроки могут сдвигаться из-за загрузки портов и погоды.`,
  });

  faq.push({
    q: `Какая пошлина и утилизационный сбор на ${fullName}?`,
    a: cost
      ? `При объёме двигателя ${cm3} см³ пошлина на новый мотоцикл составит около ${formatRub(cost.duty)}. ` +
        `Утилизационный сбор для мотоциклов фиксированный и небольшой — около ${formatRub(cost.utilFee)}.`
      : `Пошлина зависит от объёма двигателя и возраста мотоцикла.`,
  });

  faq.push({
    q: `Можно ли заказать ${fullName} в другой комплектации или цвете?`,
    a: `Да. Мы подбираем мотоцикл под ваш бюджет и требования: цвет, год выпуска, пробег и комплектация. ` +
      `Достаточно назвать пожелания — подберём подходящие варианты с фото и ценой.`,
  });

  faq.push({
    q: `Будет ли ПТС и постановка на учёт в ГИБДД?`,
    a: `Да. Мы оформляем таможенные документы, помогаем получить ПТС и передаём полный комплект для регистрации в ГИБДД. ` +
      `${fullName} ставится на учёт как обычное мототранспортное средство.`,
  });

  return {
    fullName,
    countryGen: gen,
    cost,
    quotes,
    best,
    basePrice,
    cm3,
    intro: tidy(intro),
    aboutModel: tidy(aboutModel),
    aboutDelivery: tidy(aboutDelivery),
    faq: faq.map((f) => ({ q: tidy(f.q), a: tidy(f.a) })),
  };
};
