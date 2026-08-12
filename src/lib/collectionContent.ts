import { CatalogEntry } from '@/data/catalogCars';
import { buildCarContent, countryGenitive } from '@/lib/carContent';
import { formatRub } from '@/lib/customs';

const countryPrepositional: Record<string, string> = {
  china: 'Китае',
  japan: 'Японии',
  korea: 'Корее',
  europe: 'Европе',
  usa: 'США',
  uae: 'ОАЭ',
};

const countryWhy: Record<string, string> = {
  china:
    'Китай сегодня — главный источник новых автомобилей для России: заводы выпускают свежие модели с богатой комплектацией, а короткое логистическое плечо делает доставку самой быстрой и недорогой.',
  japan:
    'Япония ценится за состояние автомобилей и честные пробеги: машины обслуживают по регламенту, а аукционная система даёт прозрачную оценку состояния по листу с баллами.',
  korea:
    'Корея даёт хороший баланс цены и оснащения: свежие автомобили с гарантийной историей, богатые комплектации и удобная логистика через порт Владивостока.',
  europe:
    'Европа — это автомобили с прозрачной сервисной историей и высоким качеством сборки. Подходит тем, кто хочет конкретную марку в точной комплектации.',
  usa:
    'США дают доступ к моделям, которых официально не было в России: крупные внедорожники, пикапы и мощные версии. История каждой машины проверяется по VIN.',
  uae:
    'ОАЭ — это премиальные автомобили в максимальных комплектациях и без зимней эксплуатации. Часто встречаются редкие версии и очень свежие машины.',
};

const deliveryWeeks: Record<string, string> = {
  china: '4–6 недель',
  japan: '5–8 недель',
  korea: '4–7 недель',
  europe: '6–9 недель',
  usa: '8–12 недель',
  uae: '5–8 недель',
};

export interface CollectionFaq {
  q: string;
  a: string;
}

export interface CollectionExtra {
  stats: {
    total: number;
    minPrice: number;
    minPriceModel: string;
    minTotal: number;
    minTotalModel: string;
    bodyTypes: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    countries: { name: string; count: number }[];
    years: string;
  };
  about: string;
  faq: CollectionFaq[];
}

const pluralModels = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return `${n} моделей`;
  if (m10 === 1) return `${n} модель`;
  if (m10 >= 2 && m10 <= 4) return `${n} модели`;
  return `${n} моделей`;
};

const countBy = (entries: CatalogEntry[], pick: (e: CatalogEntry) => string) => {
  const map = new Map<string, number>();
  for (const e of entries) {
    const k = pick(e);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const buildCollectionContent = (
  entries: CatalogEntry[],
  mode: 'country' | 'brand',
  key: string
): CollectionExtra => {
  const withCost = entries.map((e) => ({ e, c: buildCarContent(e) }));

  const cheapest = withCost.reduce((min, x) =>
    x.c.basePrice && x.c.basePrice < min.c.basePrice ? x : min
  );
  const cheapestTotal = withCost
    .filter((x) => x.c.cost)
    .reduce((min, x) => (x.c.cost!.total < min.c.cost!.total ? x : min), withCost.find((x) => x.c.cost)!);

  const bodyTypes = countBy(entries, (e) => e.variant.bodyType);
  const brands = countBy(entries, (e) => e.model.brand);
  const countries = countBy(entries, (e) => e.countryName);
  const years = Array.from(new Set(entries.map((e) => e.variant.specs.year))).sort();
  const yearsLabel = years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : years[0];

  const stats = {
    total: entries.length,
    minPrice: cheapest.c.basePrice,
    minPriceModel: cheapest.c.fullName,
    minTotal: cheapestTotal?.c.cost?.total ?? 0,
    minTotalModel: cheapestTotal?.c.fullName ?? '',
    bodyTypes,
    brands,
    countries,
    years: yearsLabel,
  };

  const bodyList = bodyTypes
    .slice(0, 5)
    .map((b) => `${b.name.toLowerCase()} — ${b.count}`)
    .join(', ');

  let about: string;
  const faq: CollectionFaq[] = [];

  if (mode === 'country') {
    const gen = countryGenitive[key] ?? key;
    const prep = countryPrepositional[key] ?? key;
    const weeks = deliveryWeeks[key] ?? '6–10 недель';

    about =
      `${countryWhy[key] ?? ''} В подборке ${pluralModels(entries.length)} ${years.length > 1 ? `${yearsLabel} годов` : `${yearsLabel} года`} выпуска ` +
      `от ${brands.length} марок. По типам кузова: ${bodyList}.`;

    faq.push({
      q: `Сколько стоит пригнать авто из ${gen} под ключ?`,
      a: stats.minTotal
        ? `Самый доступный вариант в подборке — ${stats.minTotalModel}: около ${formatRub(stats.minTotal)} под ключ ` +
          `с учётом пошлины, утилизационного сбора, доставки и услуг компании. Стоимость самого автомобиля начинается от ${formatRub(stats.minPrice)}. ` +
          `Итог зависит от модели, комплектации и курса валют.`
        : `Стоимость зависит от модели, комплектации и курса валют — расчёт делает менеджер.`,
    });

    faq.push({
      q: `Сколько идёт доставка автомобиля из ${gen}?`,
      a: `Ориентировочно ${weeks} с момента оплаты, включая выкуп, оформление документов и транспортировку. ` +
        `Сроки могут сдвигаться из-за загрузки портов, погоды и очередей на таможне.`,
    });

    faq.push({
      q: `Какие автомобили можно привезти из ${gen}?`,
      a: `В нашей подборке ${pluralModels(entries.length)}: ${bodyTypes
        .slice(0, 4)
        .map((b) => b.name.toLowerCase())
        .join(', ')}. Марки: ${brands
        .slice(0, 8)
        .map((b) => b.name)
        .join(', ')}. Если нужной модели нет в списке — подберём и привезём под заказ.`,
    });

    faq.push({
      q: `Выгодно ли везти машину из ${gen} в 2026 году?`,
      a: `Выгода зависит от конкретной модели: чем больше разница между ценой ${prep === 'США' ? 'в США' : `в ${prep}`} и в России, ` +
        `тем ощутимее экономия. На итог влияют объём двигателя, мощность и возраст — от них считаются пошлина и утилизационный сбор. ` +
        `Перед покупкой мы считаем полную стоимость под ключ, чтобы вы сравнили её с ценой у российского дилера.`,
    });

    faq.push({
      q: `Дадут ли гарантию и документы для ГИБДД?`,
      a: `Мы передаём полный комплект документов для регистрации: таможенную декларацию, договор и помощь в получении электронного ПТС. ` +
        `Автомобиль ставится на учёт в обычном порядке. Заводская гарантия зависит от марки и страны покупки — уточняем по конкретной машине.`,
    });
  } else {
    const brandName = key;
    const countryList = countries.map((c) => c.name).join(', ');

    about =
      `В подборке ${pluralModels(entries.length)} ${brandName} ${years.length > 1 ? `${yearsLabel} годов` : `${yearsLabel} года`} выпуска. ` +
      `Возим из следующих стран: ${countryList}. По типам кузова: ${bodyList}. ` +
      `Подбираем комплектацию под ваш бюджет, проверяем историю и состояние, привозим под ключ с растаможкой.`;

    faq.push({
      q: `Сколько стоит ${brandName} под ключ в России?`,
      a: stats.minTotal
        ? `Самый доступный вариант в подборке — ${stats.minTotalModel}: около ${formatRub(stats.minTotal)} под ключ. ` +
          `Цена самого автомобиля начинается от ${formatRub(stats.minPrice)}, к ней добавляются пошлина, утилизационный сбор, доставка и услуги компании.`
        : `Стоимость зависит от модели и комплектации — расчёт делает менеджер.`,
    });

    faq.push({
      q: `Из каких стран можно заказать ${brandName}?`,
      a: `Мы возим ${brandName} из следующих стран: ${countryList}. От страны зависят цена, комплектация и срок доставки — ` +
        `подскажем, откуда конкретную модель выгоднее везти.`,
    });

    faq.push({
      q: `Какие модели ${brandName} есть в наличии под заказ?`,
      a: `В подборке ${pluralModels(entries.length)}: ${entries
        .slice(0, 10)
        .map((e) => e.variant.model)
        .join(', ')}${entries.length > 10 ? ' и другие' : ''}. Если нужной модели нет — привезём под заказ.`,
    });

    faq.push({
      q: `Чем ваш ${brandName} отличается от машины у дилера?`,
      a: `Это тот же автомобиль, но привезённый напрямую из страны продажи, часто в комплектации, которой нет у российских дилеров, ` +
        `и обычно дешевле за счёт отсутствия дилерской наценки. Все таможенные платежи оплачены, документы для ГИБДД передаём полностью.`,
    });
  }

  return { stats, about, faq };
};
