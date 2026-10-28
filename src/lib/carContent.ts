import { CatalogEntry } from '@/data/catalogCars';
import { pricesByCountry, defaultConfig, cheapestConfig, customsAge, enginesFor, PriceConfig } from '@/lib/carPricing';
import { buildCarEquipment, CarEquipment } from '@/lib/carEquipment';
import {
  engineCm3FromSpec,
  powerFromSpec,
  priceFromSpec,
  formatRub,
  CostBreakdown,
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
  /** Вариант, по которому посчитана минимальная цена */
  minConfig: PriceConfig;
  minYear: number;
  minEngine: string;
  equipment: CarEquipment;
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

  // Все цены на странице считаем по самому доступному варианту
  const minConfig = cheapestConfig(entry) ?? defaultConfig(entry);
  const minEngineVariant = enginesFor(entry)[minConfig.engine];
  const minEngine = minEngineVariant
    ? `${minEngineVariant.label}, ${minEngineVariant.hp} л.с.`
    : `${v.specs.engine}, ${v.specs.power}`;
  const minHp = minEngineVariant?.hp ?? hp;
  const minCm3 = minEngineVariant?.cm3 ?? cm3;
  const byCountry = pricesByCountry(entry, minConfig);
  const variantLabel = `автомобиль ${minConfig.year} года, базовая комплектация, двигатель ${minEngine}, пробег до ${minConfig.mileage} тыс. км`;

  const quotes: SourceQuote[] = byCountry.map((p, i) => ({
    country: p.country,
    countryGen: countryGenitive[p.country] ?? p.country,
    countryName: countryLabel[p.country] ?? p.country,
    carPrice: p.carPrice,
    total: p.cost.total,
    weeks: deliveryWeeks[p.country] ?? '6–10 недель',
    route: deliveryRoute[p.country] ?? 'морем и автовозом',
    isBest: i === 0,
    isCatalog: p.country === country,
  }));

  const best = quotes[0] ?? null;

  // Основной расчёт показываем по самому выгодному маршруту
  const cost = byCountry[0]?.cost ?? null;
  const bestGen = best?.countryGen ?? gen;
  const equipment = buildCarEquipment(entry);

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
      : `Расход топлива — ${v.specs.consumption}.`) +
    ` Модель выпускается в нескольких комплектациях: базовая уже закрывает повседневные задачи, ` +
    `а полная добавляет комфорт и системы помощи водителю. Ниже — что входит в каждую из них, ` +
    `а также сильные и слабые стороны ${fullName}, которые стоит учесть перед покупкой.`;

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
    ? `Для самого доступного варианта (${variantLabel.replace(/^автомобиль /, '')}) при стоимости автомобиля ${formatRub(cost.price)} расчёт под ключ выглядит так: ` +
      `таможенная пошлина ${formatRub(cost.duty)}, утилизационный сбор ${formatRub(cost.utilFee)}, ` +
      `таможенный сбор за оформление ${formatRub(cost.clearanceFee)}, доставка из ${bestGen} ${formatRub(cost.delivery)} ` +
      `и услуги компании ${formatRub(cost.service)}. Итого ориентировочно ${formatRub(cost.total)} до вашего города.`
    : `Точную стоимость под ключ с пошлиной, утильсбором и доставкой рассчитает менеджер.`;

  const minAge = customsAge(minConfig.year);
  const faq: CarFaqItem[] = [];

  faq.push({
    q: `Сколько стоит ${fullName} под ключ в России?`,
    a: cost
      ? `Минимально — около ${formatRub(cost.total)} под ключ: это ${variantLabel}, доставка из ${bestGen}. ` +
        `В сумму входят стоимость автомобиля ${formatRub(cost.price)}, пошлина ${formatRub(cost.duty)}, ` +
        `утилизационный сбор ${formatRub(cost.utilFee)}, доставка и услуги компании. ` +
        `Более свежие машины и полные комплектации дороже — цены по годам смотрите в таблице выше.`
      : `Стоимость зависит от года, комплектации, курса валют и города доставки — расчёт делает менеджер.`,
  });

  faq.push({
    q: `Что входит в базовую и полную комплектацию ${fullName}?`,
    a: `В базовой: ${equipment.base.slice(0, 4).join(', ')}. ` +
      `В полной дополнительно: ${equipment.full.slice(0, 4).join(', ')}. ` +
      `Точный набор опций зависит от года и рынка — перед покупкой присылаем полный список по конкретной машине.`,
  });

  faq.push({
    q: `Какой год ${fullName} выгоднее везти?`,
    a: cost
      ? minAge === 'mid'
        ? `Самыми выгодными по итоговой цене обычно получаются машины ${minConfig.year} года — им от 3 до 5 лет, и пошлина считается только по объёму двигателя. ` +
          `Автомобили младше 3 лет растаможиваются по стоимости, поэтому заметно дороже под ключ.`
        : `Для ${fullName} минимальная итоговая цена получается у машин ${minConfig.year} года. ` +
          `Машины от 3 до 5 лет обычно растаможиваются дешевле новых — сравните варианты в таблице цен по годам.`
      : `Выгоднее всего обычно машины от 3 до 5 лет — для них пошлина ниже, чем для новых.`,
  });

  faq.push({
    q: `Из каких стран можно привезти ${fullName}?`,
    a:
      quotes.length > 1
        ? `${fullName} продаётся на нескольких рынках, поэтому мы возим её из следующих стран: ${quotes
            .map((q) => q.countryGen)
            .join(', ')}. Страна влияет на цену, комплектацию и срок доставки. ` +
          `Для самого доступного варианта выгоднее всего из ${bestQ.countryGen} — около ${formatRub(bestQ.total)} под ключ.`
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
      ? `Для автомобиля ${minConfig.year} года мощностью ${minHp} л.с. утилизационный сбор составит около ${formatRub(cost.utilFee)}. ` +
        `Ставка зависит от мощности и возраста: до 160 л.с. действует льготная сумма, выше — повышающие коэффициенты.`
      : `Ставка зависит от мощности двигателя и возраста автомобиля.`,
  });

  faq.push({
    q: electric
      ? `Как растаможить электромобиль ${fullName}?`
      : `Какая пошлина на ${fullName}?`,
    a: cost
      ? electric || !minCm3
        ? `Для электромобилей пошлина считается от стоимости, объём двигателя не учитывается. ` +
          `При цене ${formatRub(cost.price)} пошлина составит около ${formatRub(cost.duty)}, плюс утилизационный сбор ${formatRub(cost.utilFee)}.`
        : `Для машины ${minConfig.year} года с объёмом ${minCm3} см³ и стоимостью ${formatRub(cost.price)} пошлина составит около ${formatRub(cost.duty)}. ` +
          (minAge === 'new'
            ? `Для машин до 3 лет берётся большая из двух величин: процент от стоимости или ставка за кубический сантиметр.`
            : `Для машин старше 3 лет пошлина считается только от объёма двигателя, поэтому она заметно ниже, чем у новых.`)
      : `Пошлина зависит от объёма двигателя, стоимости и возраста автомобиля.`,
  });

  faq.push({
    q: `Какие плюсы и минусы у ${fullName}?`,
    a: `Плюсы: ${equipment.pros.slice(0, 3).join(', ')}. Минусы: ${equipment.cons.slice(0, 3).join(', ')}.`,
  });

  faq.push({
    q: `Можно ли заказать ${fullName} в другой комплектации или цвете?`,
    a: `Да. Мы подбираем автомобиль под ваш бюджет и требования: год, комплектация, цвет кузова и салона, пакеты опций. ` +
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
    minConfig,
    minYear: minConfig.year,
    minEngine,
    equipment,
    intro: tidy(intro),
    aboutModel: tidy(aboutModel),
    aboutDelivery: tidy(aboutDelivery),
    aboutCustoms: tidy(aboutCustoms),
    faq: faq.map((f) => ({ q: tidy(f.q), a: tidy(f.a) })),
  };
};
