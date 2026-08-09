import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SITE = 'https://rlogistik.ru';

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const countryGen = {
  china: 'Китая',
  japan: 'Японии',
  korea: 'Кореи',
  europe: 'Европы',
  usa: 'США',
  uae: 'ОАЭ',
};

const CATEGORY_BY_BODY = {
  'Внедорожник': 101,
  'Кроссовер': 101,
  'Седан': 102,
  'Хэтчбек': 103,
  'Лифтбек': 104,
  'Универсал': 105,
  'Минивэн': 106,
  'Купе': 107,
  'Пикап': 108,
  'Кабриолет': 109,
  'Фургон': 110,
};

const CATEGORIES = [
  [11, 'Легковой автомобиль', null],
  [101, 'Внедорожник', 11],
  [102, 'Седан', 11],
  [103, 'Хэтчбек', 11],
  [104, 'Лифтбек', 11],
  [105, 'Универсал', 11],
  [106, 'Минивэн', 11],
  [107, 'Купе', 11],
  [108, 'Пикап', 11],
  [109, 'Кабриолет', 11],
  [110, 'Фургон', 11],
];

const TRANSMISSION = {
  'Автомат': 'Автоматическая',
  'Автоматическая': 'Автоматическая',
  'Механика': 'Механическая',
  'Механическая': 'Механическая',
  'Робот': 'Робот',
  'Вариатор': 'Вариатор',
};

const DRIVE = { 'Полный': 'Полный', 'Передний': 'Передний', 'Задний': 'Задний' };

function fuelOf(engine = '') {
  const s = engine.toLowerCase();
  if (s.includes('электро')) return 'Электро';
  if (s.includes('гибрид') || s.includes('e-power')) return 'Гибрид';
  if (s.includes('дизель')) return 'Дизель';
  return 'Бензин';
}

function litersOf(engine = '') {
  const m = engine.match(/(\d+[.,]\d+)\s*л/);
  return m ? m[1].replace(',', '.') : null;
}

function turboOf(engine = '') {
  if (/turbo/i.test(engine)) return 'Турбированный';
  if (/электро/i.test(engine)) return null;
  return 'Атмосферный';
}

function hpOf(power = '') {
  const m = power.match(/(\d+)/);
  return m ? m[1] : null;
}

function priceOf(price = '') {
  const digits = price.replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
}

async function loadData() {
  const outdir = join(ROOT, 'node_modules', '.feedgen');
  mkdirSync(outdir, { recursive: true });
  const entry = join(outdir, 'entry.mjs');
  writeFileSync(
    entry,
    `export { catalogEntries, catalogBrands, countryNames } from '${join(ROOT, 'src/data/catalogCars.ts').replace(/\\/g, '/')}';`
  );
  const outfile = join(outdir, 'data.mjs');
  await esbuild({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    logLevel: 'silent',
    alias: { '@': join(ROOT, 'src') },
  });
  return import(`file://${outfile}?t=${Date.now()}`);
}

function pictureFor(entry, kind) {
  const rel = `/vehicles/${entry.country}-${entry.slug}-${kind}.webp`;
  return existsSync(join(PUBLIC, rel.slice(1))) ? `${SITE}${rel}` : null;
}

function buildFeed({ catalogEntries, catalogBrands }) {
  const usedPictures = new Set();
  const sets = [];
  const offers = [];
  const setIdsByEntry = new Map();

  for (const b of catalogBrands) {
    if (b.entries.length < 4) continue;
    sets.push({
      id: `brand-${b.slug}`,
      name: `${b.brand} на заказ из-за рубежа`,
      url: `${SITE}/catalog/brand/${b.slug}`,
    });
    for (const e of b.entries) {
      const key = `${e.country}/${e.slug}`;
      const list = setIdsByEntry.get(key) ?? [];
      list.push(`brand-${b.slug}`);
      setIdsByEntry.set(key, list);
    }
  }

  const byCountry = new Map();
  for (const e of catalogEntries) {
    const list = byCountry.get(e.country) ?? [];
    list.push(e);
    byCountry.set(e.country, list);
  }

  for (const [country, list] of byCountry) {
    if (list.length < 4) continue;
    const gen = countryGen[country] || country;
    sets.push({
      id: `country-${country}`,
      name: `Автомобили из ${gen} на заказ`,
      url: `${SITE}/catalog/${country}`,
    });
    for (const e of list) {
      const key = `${e.country}/${e.slug}`;
      const arr = setIdsByEntry.get(key) ?? [];
      arr.push(`country-${country}`);
      setIdsByEntry.set(key, arr);
    }
  }

  const skipped = [];

  for (const e of catalogEntries) {
    const v = e.variant;
    const key = `${e.country}/${e.slug}`;
    const setIds = setIdsByEntry.get(key);
    if (!setIds || !setIds.length) {
      skipped.push(`${key} — не входит ни в один сет`);
      continue;
    }

    const pics = [];
    for (const kind of ['front', 'side']) {
      const p = pictureFor(e, kind);
      if (p && !usedPictures.has(p)) {
        usedPictures.add(p);
        pics.push(p);
      }
    }
    if (!pics.length) {
      skipped.push(`${key} — нет уникального изображения`);
      continue;
    }

    const price = priceOf(v.price);
    if (!price) {
      skipped.push(`${key} — не разобрана цена «${v.price}»`);
      continue;
    }

    const gen = countryGen[e.country] || e.countryName;
    const categoryId = CATEGORY_BY_BODY[v.bodyType] || 11;
    const fullName = v.model.toLowerCase().startsWith(e.model.brand.toLowerCase())
      ? v.model
      : `${e.model.brand} ${v.model}`;

    const params = [];
    params.push(['Конверсия', String(Math.max(1, Math.round(pics.length * 2)))]);
    if (v.specs.year) params.push(['Год создания', v.specs.year]);
    params.push(['Пробег', '0']);
    const liters = litersOf(v.specs.engine);
    if (liters) params.push(['Двигатель, литры', liters]);
    const hp = hpOf(v.specs.power);
    if (hp) params.push(['Двигатель, л.с.', hp]);
    const turbo = turboOf(v.specs.engine);
    if (turbo) params.push(['Двигатель, тип', turbo]);
    params.push(['Топливо', fuelOf(v.specs.engine)]);
    const tr = TRANSMISSION[v.specs.transmission];
    if (tr) params.push(['Коробка передач', tr]);
    const dr = DRIVE[v.specs.drive];
    if (dr) params.push(['Привод', dr]);
    params.push(['Состояние', 'Не требует ремонта']);
    params.push(['Размещено дилером', 'false']);

    offers.push({
      id: `${e.country}-${e.slug}`,
      name: `${fullName} (${v.bodyType}) под заказ из ${gen}`,
      vendor: e.model.brand,
      url: `${SITE}/catalog/${e.country}/${e.slug}`,
      price,
      categoryId,
      setIds,
      pics,
      description:
        `${fullName} — ${v.bodyType.toLowerCase()}, ${v.specs.year} год, новый автомобиль под заказ из ${gen}. ` +
        `Двигатель ${v.specs.engine}, мощность ${v.specs.power}, ${v.specs.transmission.toLowerCase()}, ` +
        `${v.specs.drive.toLowerCase()} привод. Ориентировочная цена под ключ ${v.price}. ` +
        `Подбор, проверка, выкуп, доставка и таможенное оформление компанией Регион Логистик.`,
      params,
    });
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const usedCategoryIds = new Set(offers.map((o) => o.categoryId));
  const categoriesXml = CATEGORIES.filter(
    ([id]) => usedCategoryIds.has(id) || id === 11
  )
    .map(([id, name, parent]) =>
      parent
        ? `      <category id="${id}" parentId="${parent}">${esc(name)}</category>`
        : `      <category id="${id}">${esc(name)}</category>`
    )
    .join('\n');

  const setsXml = sets
    .map(
      (s) => `      <set id="${esc(s.id)}">
        <name>${esc(s.name)}</name>
        <url>${esc(s.url)}</url>
      </set>`
    )
    .join('\n');

  const offersXml = offers
    .map((o) => {
      const picsXml = o.pics.map((p) => `        <picture>${esc(p)}</picture>`).join('\n');
      const paramsXml = o.params
        .map(([n, val]) => `        <param name="${esc(n)}">${esc(val)}</param>`)
        .join('\n');
      return `      <offer id="${esc(o.id)}">
        <name>${esc(o.name)}</name>
        <vendor>${esc(o.vendor)}</vendor>
        <url>${esc(o.url)}</url>
        <price>${o.price}</price>
        <currencyId>RUR</currencyId>
        <categoryId>${o.categoryId}</categoryId>
        <set-ids>${esc(o.setIds.join(','))}</set-ids>
${picsXml}
        <description>${esc(o.description)}</description>
${paramsXml}
      </offer>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${date}">
  <shop>
    <name>Регион Логистик</name>
    <company>ООО «РегионЛогистик»</company>
    <url>${SITE}/</url>
    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>
    <categories>
${categoriesXml}
    </categories>
    <sets>
${setsXml}
    </sets>
    <offers>
${offersXml}
    </offers>
  </shop>
</yml_catalog>
`;

  return { xml, sets, offers, skipped };
}

const data = await loadData();
const { xml, sets, offers, skipped } = buildFeed(data);

writeFileSync(join(PUBLIC, 'yandex-feed.yml'), xml, 'utf-8');

const perSet = new Map();
for (const o of offers) for (const s of o.setIds) perSet.set(s, (perSet.get(s) || 0) + 1);
const small = [...perSet.entries()].filter(([, n]) => n < 4);

console.log(`Фид собран: ${offers.length} предложений, ${sets.length} сетов`);
if (small.length) console.log('ВНИМАНИЕ, сеты с <4 предложениями:', small);
if (skipped.length) {
  console.log(`Пропущено предложений: ${skipped.length}`);
  skipped.slice(0, 20).forEach((s) => console.log('  -', s));
}
