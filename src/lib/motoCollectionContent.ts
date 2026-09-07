import { MotoEntry } from '@/data/catalogMoto';
import { buildMotoContent, motoCountryGenitive } from '@/lib/motoContent';
import { formatRub } from '@/lib/customs';

const countryPrepositional: Record<string, string> = {
  japan: 'Японии',
  europe: 'Европе',
  usa: 'США',
};

const countryWhy: Record<string, string> = {
  japan:
    'Япония — родина большинства массовых мотоциклов: Honda, Yamaha, Suzuki и Kawasaki выпускают там свежие модели с честным пробегом и прозрачной аукционной оценкой состояния.',
  europe:
    'Европа даёт доступ к маркам с богатой инженерной историей — BMW, Ducati, KTM — с полной сервисной документацией и заводской комплектацией.',
  usa:
    'США — родной рынок Harley-Davidson и место, где встречаются версии и комплектации, которых нет в Европе и Азии.',
};

const motoDeliveryWeeks: Record<string, string> = {
  japan: '4–7 недель',
  europe: '5–8 недель',
  usa: '7–11 недель',
};

export interface MotoCollectionFaq {
  q: string;
  a: string;
}

export interface MotoCollectionExtra {
  stats: {
    total: number;
    minPrice: number;
    minPriceModel: string;
    minTotal: number;
    minTotalModel: string;
    bodyTypes: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    years: string;
  };
  about: string;
  faq: MotoCollectionFaq[];
}

const pluralModels = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return `${n} моделей`;
  if (m10 === 1) return `${n} модель`;
  if (m10 >= 2 && m10 <= 4) return `${n} модели`;
  return `${n} моделей`;
};

const countBy = (entries: MotoEntry[], pick: (e: MotoEntry) => string) => {
  const map = new Map<string, number>();
  for (const e of entries) {
    const k = pick(e);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const buildMotoCollectionContent = (
  entries: MotoEntry[],
  mode: 'country' | 'brand',
  key: string
): MotoCollectionExtra => {
  const withCost = entries.map((e) => ({ e, c: buildMotoContent(e) }));

  const cheapest = withCost.reduce((min, x) => (x.c.basePrice && x.c.basePrice < min.c.basePrice ? x : min));
  const withTotal = withCost.filter((x) => x.c.cost);
  const cheapestTotal = withTotal.length
    ? withTotal.reduce((min, x) => (x.c.cost!.total < min.c.cost!.total ? x : min), withTotal[0])
    : null;

  const bodyTypes = countBy(entries, (e) => e.variant.bodyType);
  const brands = countBy(entries, (e) => e.model.brand);
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
    years: yearsLabel,
  };

  const bodyList = bodyTypes
    .slice(0, 5)
    .map((b) => `${b.name.toLowerCase()} — ${b.count}`)
    .join(', ');

  let about: string;
  const faq: MotoCollectionFaq[] = [];

  if (mode === 'country') {
    const gen = motoCountryGenitive[key] ?? key;
    const prep = countryPrepositional[key] ?? key;
    const weeks = motoDeliveryWeeks[key] ?? '5–9 недель';

    about =
      `${countryWhy[key] ?? ''} В подборке ${pluralModels(entries.length)} ${years.length > 1 ? `${yearsLabel} годов` : `${yearsLabel} года`} выпуска ` +
      `от ${brands.length} марок. По типам: ${bodyList}.`;

    faq.push({
      q: `Сколько стоит мотоцикл из ${gen} под ключ?`,
      a: stats.minTotal
        ? `Самый доступный вариант в подборке — ${stats.minTotalModel}: около ${formatRub(stats.minTotal)} под ключ. ` +
          `Стоимость самого мотоцикла начинается от ${formatRub(stats.minPrice)}. Итог зависит от модели, комплектации и курса валют.`
        : `Стоимость зависит от модели, комплектации и курса валют — расчёт делает менеджер.`,
    });

    faq.push({
      q: `Сколько идёт доставка мотоцикла из ${gen}?`,
      a: `Ориентировочно ${weeks} с момента оплаты, включая выкуп, оформление документов и транспортировку. ` +
        `Сроки могут сдвигаться из-за загрузки портов, погоды и очередей на таможне.`,
    });

    faq.push({
      q: `Какие мотоциклы можно привезти из ${gen}?`,
      a: `В нашей подборке ${pluralModels(entries.length)}: ${bodyTypes
        .slice(0, 4)
        .map((b) => b.name.toLowerCase())
        .join(', ')}. Марки: ${brands
        .slice(0, 8)
        .map((b) => b.name)
        .join(', ')}. Если нужной модели нет в списке — подберём и привезём под заказ.`,
    });

    faq.push({
      q: `Выгодно ли везти мотоцикл из ${gen}?`,
      a: `Выгода зависит от конкретной модели: чем больше разница между ценой ${prep === 'США' ? 'в США' : `в ${prep}`} и в России, ` +
        `тем ощутимее экономия. Перед покупкой мы считаем полную стоимость под ключ, чтобы вы сравнили её с ценой у российского дилера.`,
    });

    faq.push({
      q: `Дадут ли документы для постановки на учёт в ГИБДД?`,
      a: `Мы передаём полный комплект документов для регистрации: таможенную декларацию, договор и ПТС. ` +
        `Мотоцикл ставится на учёт в обычном порядке.`,
    });
  } else {
    const brandName = key;

    about =
      `В подборке ${pluralModels(entries.length)} ${brandName} ${years.length > 1 ? `${yearsLabel} годов` : `${yearsLabel} года`} выпуска. ` +
      `По типам: ${bodyList}. Подбираем комплектацию под ваш бюджет, проверяем историю и состояние, привозим под ключ с растаможкой.`;

    faq.push({
      q: `Сколько стоит ${brandName} под ключ в России?`,
      a: stats.minTotal
        ? `Самый доступный вариант в подборке — ${stats.minTotalModel}: около ${formatRub(stats.minTotal)} под ключ. ` +
          `Цена самого мотоцикла начинается от ${formatRub(stats.minPrice)}, к ней добавляются пошлина, утилизационный сбор, доставка и услуги компании.`
        : `Стоимость зависит от модели и комплектации — расчёт делает менеджер.`,
    });

    faq.push({
      q: `Какие модели ${brandName} есть в наличии под заказ?`,
      a: `В подборке ${pluralModels(entries.length)}: ${entries
        .slice(0, 10)
        .map((e) => e.variant.model)
        .join(', ')}${entries.length > 10 ? ' и другие' : ''}. Если нужной модели нет — привезём под заказ.`,
    });

    faq.push({
      q: `Чем ваш ${brandName} отличается от мотоцикла у дилера?`,
      a: `Это тот же мотоцикл, но привезённый напрямую из страны продажи, часто в комплектации, которой нет у российских дилеров, ` +
        `и обычно дешевле за счёт отсутствия дилерской наценки. Все таможенные платежи оплачены, документы для ГИБДД передаём полностью.`,
    });
  }

  return { stats, about, faq };
};
