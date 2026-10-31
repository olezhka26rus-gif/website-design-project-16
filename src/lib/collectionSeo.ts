import { catalogEntries, countryNames, type CatalogEntry, type CountryKey } from '@/data/catalogCars';
import { brandRu } from '@/data/carAliases';
import { buildCarContent, countryGenitive, type CarContent } from '@/lib/carContent';
import { formatShort } from '@/lib/carSeo';

const TITLE_MAX = 70;
const DESC_MAX = 165;

const deliveryWeeks: Record<string, string> = {
  china: '4–6 недель',
  japan: '5–8 недель',
  korea: '4–7 недель',
  europe: '6–9 недель',
  usa: '8–12 недель',
  uae: '5–8 недель',
};

const countryHook: Record<string, string> = {
  china: 'Новые машины с богатой комплектацией',
  japan: 'Честные пробеги и аукционные листы',
  korea: 'Свежие машины с гарантийной историей',
  europe: 'Прозрачная сервисная история',
  usa: 'Модели, которых не было в России',
  uae: 'Максимальные комплектации без зимней эксплуатации',
};

const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return `${n} ${many}`;
  if (m10 === 1) return `${n} ${one}`;
  if (m10 >= 2 && m10 <= 4) return `${n} ${few}`;
  return `${n} ${many}`;
};
const models = (n: number) => plural(n, 'модель', 'модели', 'моделей');

const joinList = (list: string[]) =>
  list.length <= 1 ? list.join('') : `${list.slice(0, -1).join(', ')} и ${list[list.length - 1]}`;

const fit = (candidates: string[], max: number) => {
  const ok = candidates.filter((c) => c.length <= max);
  if (ok.length) return ok[0];
  return candidates.reduce((a, b) => (b.length < a.length ? b : a));
};

const fitLongest = (candidates: string[], max: number) => {
  const ok = candidates.filter((c) => c.length <= max);
  if (ok.length) return ok.reduce((a, b) => (b.length > a.length ? b : a));
  return candidates.reduce((a, b) => (b.length < a.length ? b : a));
};

/** Короткое имя модели без марки: «Toyota Camry» → «Camry» */
const shortModel = (e: CatalogEntry) => {
  const m = e.variant.model;
  const b = e.model.brand;
  return m.toLowerCase().startsWith(`${b.toLowerCase()} `) ? m.slice(b.length + 1) : m;
};

export interface CollectionSeo {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  /** Короткое имя для хлебных крошек и подзаголовков */
  label: string;
}

const contentCache = new WeakMap<CatalogEntry, CarContent>();
const contentOf = (e: CatalogEntry) => {
  let c = contentCache.get(e);
  if (!c) {
    c = buildCarContent(e);
    contentCache.set(e, c);
  }
  return c;
};

/**
 * Страница страны: «авто из <страны> под ключ». Цены — из таблиц «Откуда выгоднее везти»
 * по моделям раздела, плюс сколько моделей каталога выгоднее всего везти именно отсюда.
 */
export const buildCountrySeo = (key: CountryKey, entries: CatalogEntry[]): CollectionSeo => {
  const gen = countryGenitive[key] ?? countryNames[key];
  const weeks = deliveryWeeks[key] ?? '6–10 недель';

  const totals = entries
    .map((e) => contentOf(e).quotes.find((q) => q.country === key)?.total ?? contentOf(e).best?.total ?? 0)
    .filter((t) => t > 0);
  const minTotal = totals.length ? Math.min(...totals) : 0;
  const price = minTotal ? formatShort(minTotal) : '';

  const bestHere = catalogEntries.filter((e) => contentOf(e).best?.country === key);
  const brandCount = new Map<string, number>();
  for (const e of entries) brandCount.set(e.model.brand, (brandCount.get(e.model.brand) ?? 0) + 1);
  const topBrands = [...brandCount.entries()].sort((a, b) => b[1] - a[1]).map(([b]) => b);
  const bestModels = [...new Set(bestHere.map((e) => e.variant.model))];

  const n = entries.length;
  const titles = price
    ? [
        `Авто из ${gen} под ключ — ${models(n)}, цены от ${price}`,
        `Авто из ${gen} под ключ — цены от ${price}`,
      ]
    : [`Авто из ${gen} под ключ — ${models(n)} с ценами`];
  const title = fit(titles, TITLE_MAX);

  const hook = countryHook[key] ?? '';
  const bestPart = bestModels.length
    ? `Из ${gen} выгоднее всего везти ${models(bestModels.length)} каталога.`
    : '';
  const brandsPart = (k: number) => `${joinList(topBrands.slice(0, k))}`;
  const descs: string[] = [];
  for (let k = Math.min(4, topBrands.length); k >= 1; k--) {
    descs.push(
      `${brandsPart(k)} из ${gen} под ключ${price ? ` от ${price}` : ''}: ${models(n)} с пошлиной и доставкой. ${hook}. ${bestPart} Срок ${weeks}.`,
      `${brandsPart(k)} из ${gen} под ключ${price ? ` от ${price}` : ''}: ${models(n)} с пошлиной и доставкой. ${hook}. Срок ${weeks}.`,
      `${brandsPart(k)} из ${gen} под ключ${price ? ` от ${price}` : ''}: ${models(n)}. ${hook}. Срок ${weeks}.`,
    );
  }
  const description = fitLongest(descs.map((d) => d.replace(/\s+/g, ' ').trim()), DESC_MAX);

  const h1 = `Купить авто из ${gen} под ключ`;
  const bestNames = bestModels.slice(0, 3);
  const subtitle =
    `${models(n)} с ценами под ключ${price ? ` от ${price}` : ''}, доставка ${weeks}. ` +
    (bestModels.length
      ? `Из ${gen} выгоднее всего везти ${models(bestModels.length)} каталога${bestNames.length ? `, например ${joinList(bestNames)}` : ''}.`
      : `Большинство моделей раздела выгоднее везти из других стран — сравнение есть на странице каждой машины.`);

  return { title, description, h1, subtitle, label: `Авто из ${gen}` };
};

/**
 * Страница марки: «купить <марку> под ключ из <выгодных стран>».
 * Страны и цены — из таблиц «Откуда выгоднее везти» по всем моделям марки.
 */
export const buildBrandSeo = (brand: string, entries: CatalogEntry[]): CollectionSeo => {
  const ru = brandRu[brand];
  const withBest = entries
    .map((e) => ({ e, best: contentOf(e).best }))
    .filter((x): x is { e: CatalogEntry; best: NonNullable<CarContent['best']> } => !!x.best);

  const countryCount = new Map<string, { gen: string; count: number }>();
  for (const x of withBest) {
    const cur = countryCount.get(x.best.country) ?? { gen: x.best.countryGen, count: 0 };
    cur.count++;
    countryCount.set(x.best.country, cur);
  }
  const gens = [...countryCount.values()].sort((a, b) => b.count - a.count).map((c) => c.gen);
  const cheapest = withBest.sort((a, b) => a.best.total - b.best.total)[0];
  const price = cheapest ? formatShort(cheapest.best.total) : '';
  const n = entries.length;
  const names = [...new Set(entries.map(shortModel))];
  const fromAll = gens.length ? gens : [countryGenitive[entries[0]?.country] ?? 'зарубежья'];

  const brandFull = ru ? `${brand} (${ru})` : brand;
  const titles: string[] = [];
  for (const b of ru ? [brandFull, brand] : [brand]) {
    for (let k = Math.min(2, fromAll.length); k >= 1; k--) {
      const from = joinList(fromAll.slice(0, k));
      if (price && n === 1) {
        titles.push(`${b} из ${from} под ключ — комплектации, цены от ${price}`);
        titles.push(`${b} из ${from} под ключ — комплектации и цены`);
      } else if (price) {
        titles.push(`${b} из ${from} под ключ — ${models(n)}, цены от ${price}`);
        titles.push(`${b} из ${from} под ключ — цены от ${price}`);
      } else {
        titles.push(`${b} из ${from} под ключ — ${models(n)} с ценами`);
      }
    }
  }
  const title = fit(titles, TITLE_MAX);

  const cheapestName = cheapest ? shortModel(cheapest.e) : '';
  const weeksOf = (gen: string) => {
    const key = Object.keys(countryGenitive).find((k) => countryGenitive[k] === gen);
    return key ? deliveryWeeks[key] : '';
  };
  const weeks = weeksOf(fromAll[0]);
  const descs: string[] = [];
  for (let k = Math.min(5, names.length); k >= 1; k--) {
    const list = k < names.length ? `${names.slice(0, k).join(', ')} и другие` : joinList(names.slice(0, k));
    const lead =
      n > 1
        ? `${brand} под ключ: ${list} — ${models(n)} с ценами.`
        : `Все комплектации ${entries[0].variant.model} под ключ с пошлиной и доставкой.`;
    const cheap = price
      ? n > 1
        ? `Выгоднее всего везти из ${fromAll[0]}, самая доступная — ${cheapestName} от ${price}.`
        : `Выгоднее всего везти из ${fromAll[0]} — от ${price}.`
      : '';
    descs.push(`${lead} ${cheap} Срок ${weeks}.`);
    descs.push(`${lead} ${cheap}`);
  }
  const description = fitLongest(descs.map((d) => d.replace(/\s+/g, ' ').trim()), DESC_MAX);

  const h1 =
    n > 1
      ? `Купить ${brand} под ключ из ${joinList(fromAll.slice(0, 2))} — ${models(n)} с ценами`
      : `Купить ${brand} под ключ из ${fromAll[0]} — комплектации и цены`;
  const others = gens.slice(1);
  const subtitle = !price
    ? `${models(n)} с характеристиками и ориентировочной ценой.`
    : n > 1
      ? `Цены под ключ с пошлиной и доставкой. Самая доступная — ${cheapestName}: от ${price} при ввозе из ${cheapest.best.countryGen}.` +
        (others.length ? ` Часть моделей выгоднее везти из ${joinList(others)}.` : '')
      : `${entries[0].variant.model} из ${cheapest.best.countryGen} — от ${price} с пошлиной, утильсбором и доставкой.`;

  return { title, description, h1, subtitle, label: brand };
};
