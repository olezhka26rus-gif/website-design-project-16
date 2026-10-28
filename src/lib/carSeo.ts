import { catalogEntries, type CatalogEntry } from '@/data/catalogCars';
import type { CarContent } from '@/lib/carContent';
import { modelRu } from '@/data/carAliases';
import { countryGenitive } from '@/lib/carContent';

const TITLE_MAX = 70;
const DESC_MAX = 165;

export const formatShort = (rub: number): string =>
  rub >= 1_000_000
    ? `${String(Number((rub / 1_000_000).toFixed(2))).replace('.', ',')} млн ₽`
    : `${Math.round(rub / 1000)} тыс. ₽`;

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

const joinCountries = (list: string[]) =>
  list.length <= 1 ? list.join('') : `${list.slice(0, -1).join(', ')} и ${list[list.length - 1]}`;

const pickLongest = (candidates: string[], max: number) => {
  const fit = candidates.filter((c) => c.length <= max);
  return fit.length ? fit.reduce((a, b) => (b.length > a.length ? b : a)) : pick(candidates, max);
};

const pick = (candidates: string[], max: number) =>
  candidates.find((c) => c.length <= max) ?? candidates.reduce((a, b) => (b.length < a.length ? b : a));

export interface CarSeo {
  title: string;
  description: string;
}

export interface CarHeading {
  h1: string;
  subtitle: string;
}

/**
 * H1 страницы автомобиля: тот же ключ, что в title («модель + под ключ + выгодная страна»),
 * но без цены и в форме «Купить …», чтобы не дублировать title слово в слово.
 */
export const buildCarHeading = (entry: CatalogEntry, content: CarContent): CarHeading => {
  const model = entry.variant.model;
  const best = content.best;
  const catalogGen = countryGenitive[entry.country] ?? entry.countryName;
  if (!best) return { h1: `Купить ${model} под ключ из ${catalogGen}`, subtitle: '' };

  const second = content.quotes[1];
  const sameModelElsewhere = catalogEntries.some(
    (e) => e.variant.model === model && e.country !== entry.country,
  );
  const h1 = sameModelElsewhere
    ? `Купить ${model} под ключ из ${best.countryGen} — версия рынка ${catalogGen}`
    : `Купить ${model} под ключ из ${best.countryGen}`;
  const subtitle = second
    ? `Выгоднее всего везти из ${best.countryGen} — от ${formatShort(best.total)}, из ${second.countryGen} — от ${formatShort(second.total)}. Сравнили ${content.quotes.length} ${content.quotes.length < 5 ? 'страны' : 'стран'} вывоза.`
    : `Цена под ключ из ${best.countryGen} — от ${formatShort(best.total)} с растаможкой и доставкой.`;
  return { h1, subtitle };
};

/**
 * Заголовок и описание страницы автомобиля под коммерческие запросы
 * «купить <модель> из <страны> под ключ», «<модель> цена».
 * Цены и страны берутся из таблицы «Откуда выгоднее везти».
 */
export const buildCarSeo = (entry: CatalogEntry, content: CarContent): CarSeo => {
  const v = entry.variant;
  const model = v.model;
  const ru = modelRu[model];
  const quotes = content.quotes;
  const best = content.best;
  const catalogGen = countryGenitive[entry.country] ?? entry.countryName;

  if (!best) {
    return {
      title: pick([`Купить ${model}${ru ? ` (${ru})` : ''} из ${catalogGen} под ключ — цена`, `${model} из ${catalogGen} под ключ`], TITLE_MAX),
      description: `${model} из ${catalogGen} под заказ: ${v.bodyType.toLowerCase()}, ${v.specs.power}. Подбор, проверка, растаможка и доставка в Россию.`,
    };
  }

  const price = formatShort(best.total);
  const gens = quotes.map((q) => q.countryGen);
  const names: string[] = [];
  for (const n of [model + (ru ? ` (${ru})` : ''), model]) if (!names.includes(n)) names.push(n);

  const titles: string[] = [];
  for (const name of names) {
    for (let k = Math.min(3, gens.length); k >= 1; k--) {
      const from = joinCountries(gens.slice(0, k));
      titles.push(`${name} из ${from} под ключ — цена от ${price}`);
    }
  }
  titles.push(`${model} из ${best.countryGen} — от ${price}`);
  const title = pick(titles, TITLE_MAX);

  const engine = /^электро/i.test(v.specs.engine) ? 'электро' : v.specs.engine;
  const specs = `${v.bodyType.toLowerCase()}, ${engine}, ${v.specs.power.replace(/\.$/, '')}`;
  const second = quotes[1];
  const lead = second
    ? `${model} под ключ из ${best.countryGen} — от ${price}, из ${second.countryGen} — от ${formatShort(second.total)}.`
    : `${model} под ключ из ${best.countryGen} — от ${price} с растаможкой и доставкой.`;
  const leadShort = `${model} под ключ из ${best.countryGen} от ${price}.`;
  const pros = content.equipment.pros.map((p) => capitalize(p.replace(/\.$/, '')));
  const cta = 'Расчёт за 15 минут.';
  const term = `Доставка ${best.weeks}.`;

  const descs: string[] = [];
  for (const l of [lead, leadShort]) {
    for (const pro of pros) {
      descs.push(`${l} ${capitalize(specs)}. ${pro}. ${term}`);
      descs.push(`${l} ${pro}. ${term} ${cta}`);
      descs.push(`${l} ${pro}. ${term}`);
    }
    descs.push(`${l} ${capitalize(specs)}. ${term} ${cta}`);
  }
  const withSecond = descs.filter((d) => d.startsWith(lead));
  const description = withSecond.some((d) => d.length <= DESC_MAX && d.length >= 130)
    ? pickLongest(withSecond, DESC_MAX)
    : pickLongest(descs, DESC_MAX);

  return { title, description };
};