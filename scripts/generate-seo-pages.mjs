import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SITE = 'https://rlogistik.ru';
const DEFAULT_IMAGE = `${SITE}/logo-mark.png`;

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const abs = (u = '') => (u.startsWith('http') ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`);

const countryGen = {
  china: 'Китая',
  japan: 'Японии',
  korea: 'Кореи',
  europe: 'Европы',
  usa: 'США',
  uae: 'ОАЭ',
};

async function loadData() {
  const outdir = join(ROOT, 'node_modules', '.seogen');
  mkdirSync(outdir, { recursive: true });
  const entry = join(outdir, 'entry.mjs');
  writeFileSync(
    entry,
    `export { catalogEntries, catalogBrands } from '${join(ROOT, 'src/data/catalogCars.ts').replace(/\\/g, '/')}';
export { articles } from '${join(ROOT, 'src/data/articles.ts').replace(/\\/g, '/')}';`
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

function specList(specs) {
  return [
    ['Двигатель', specs.engine],
    ['Мощность', specs.power],
    ['Привод', specs.drive],
    ['Коробка передач', specs.transmission],
    ['Год', specs.year],
    ['Расход', specs.consumption],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`)
    .join('');
}

function plural(n, one, few, many) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return many;
  if (m10 === 1) return one;
  if (m10 >= 2 && m10 <= 4) return few;
  return many;
}

function carGrid(entries) {
  return `<ul>${entries
    .map(
      (e) =>
        `<li><a href="/catalog/${e.country}/${e.slug}">${esc(e.variant.model)} (${esc(
          e.variant.bodyType
        )}, ${esc(e.countryName)}) — ${esc(e.variant.price)}</a></li>`
    )
    .join('')}</ul>`;
}

function buildRoutes({ catalogEntries, catalogBrands, articles }) {
  const routes = [];

  const byCountry = {};
  for (const e of catalogEntries) (byCountry[e.country] ??= []).push(e);

  for (const [country, list] of Object.entries(byCountry)) {
    const gen = countryGen[country] || country;
    routes.push({
      path: `/catalog/${country}`,
      title: `Автомобили из ${gen} на заказ — ${list.length} ${plural(list.length, 'модель', 'модели', 'моделей')} и цены | Регион Логистик`,
      description: `${list.length} ${plural(list.length, 'модель', 'модели', 'моделей')} автомобилей из ${gen} под заказ: характеристики, ориентировочные цены под ключ, подбор и доставка в Россию компанией Регион Логистик.`,
      keywords: `авто из ${gen}, автомобили из ${gen}, купить авто из ${gen}, заказать машину из ${gen}, авто из ${gen} цена, Регион Логистик`,
      image: abs(list[0].variant.frontImage),
      ogType: 'website',
      body: `<h1>Автомобили из ${esc(gen)} на заказ</h1>
<p>Подбираем и привозим автомобили из ${esc(gen)} под ключ: проверка, выкуп, доставка, растаможка и постановка на учёт. В каталоге ${list.length} ${plural(list.length, 'модель', 'модели', 'моделей')} с ориентировочными ценами.</p>
${carGrid(list)}
<p><a href="/catalog">Весь каталог автомобилей</a></p>`,
    });
  }

  for (const b of catalogBrands) {
    if (b.entries.length < 4) continue;
    routes.push({
      path: `/catalog/brand/${b.slug}`,
      title: `${b.brand} на заказ из-за рубежа — ${b.entries.length} ${plural(b.entries.length, 'модель', 'модели', 'моделей')} и цены | Регион Логистик`,
      description: `${b.entries.length} ${plural(b.entries.length, 'модель', 'модели', 'моделей')} ${b.brand} под заказ: характеристики, ориентировочные цены под ключ, подбор и доставка в Россию компанией Регион Логистик.`,
      keywords: `${b.brand}, ${b.brand} на заказ, купить ${b.brand}, ${b.brand} цена, Регион Логистик`,
      image: abs(b.entries[0].variant.frontImage),
      ogType: 'website',
      body: `<h1>${esc(b.brand)} на заказ из-за рубежа</h1>
<p>Привозим автомобили ${esc(b.brand)} под ключ из Китая, Японии, Кореи, Европы, США и ОАЭ. В каталоге ${b.entries.length} ${plural(b.entries.length, 'модель', 'модели', 'моделей')} с характеристиками и ориентировочной ценой.</p>
${carGrid(b.entries)}
<p><a href="/catalog">Весь каталог автомобилей</a></p>`,
    });
  }

  routes.push({
    path: '/catalog',
    title: 'Каталог автомобилей на заказ из-за рубежа | Регион Логистик (Region Logistik)',
    description: `Каталог из ${catalogEntries.length}+ моделей автомобилей на заказ из Китая, Японии, Кореи, Европы, США и ОАЭ — характеристики, ориентировочные цены и расчёт стоимости под ключ.`,
    keywords:
      'каталог автомобилей на заказ, авто из Китая, авто из Японии, авто из Кореи, авто из Европы, авто из США, авто из ОАЭ, купить авто под заказ, Регион Логистик',
    image: DEFAULT_IMAGE,
    ogType: 'website',
    body: `<h1>Каталог автомобилей на заказ</h1>
<p>Более ${catalogEntries.length} моделей из Китая, Японии, Кореи, Европы, США и ОАЭ — с характеристиками и ориентировочной ценой под ключ.</p>
<ul>${catalogEntries
      .map(
        (e) =>
          `<li><a href="/catalog/${e.country}/${e.slug}">${esc(e.variant.model)} (${esc(
            e.variant.bodyType
          )}, ${esc(e.countryName)}) — ${esc(e.variant.price)}</a></li>`
      )
      .join('')}</ul>`,
  });

  for (const e of catalogEntries) {
    const v = e.variant;
    const gen = countryGen[e.country] || e.countryName;
    routes.push({
      path: `/catalog/${e.country}/${e.slug}`,
      title: `${v.model} на заказ из ${gen} — характеристики и цена | Регион Логистик`,
      description: `${v.model} (${v.bodyType}) под заказ из ${gen}: ${v.specs.engine}, ${v.specs.power}. Ориентировочная цена под ключ ${v.price}. Подбор, проверка и доставка в Россию.`,
      keywords: `${v.model}, купить ${v.model}, ${v.model} из ${gen}, ${v.model} цена, заказать ${v.model}, Регион Логистик`,
      image: abs(v.frontImage),
      ogType: 'product',
      body: `<h1>${esc(v.model)} на заказ из ${esc(gen)}</h1>
<p>${esc(v.model)} (${esc(v.bodyType)}) под заказ из ${esc(gen)}. Ориентировочная цена под ключ ${esc(v.price)}.</p>
<img src="${esc(abs(v.frontImage))}" alt="${esc(v.model)}" width="640" height="480">
<h2>Характеристики</h2>
<ul>${specList(v.specs)}</ul>
<p>Марка: ${esc(e.model.brand)}. Страна: ${esc(e.countryName)}. Тип кузова: ${esc(v.bodyType)}.</p>
<p>Подбор, проверка, доставка и растаможка под ключ компанией Регион Логистик.</p>
<p><a href="/catalog">Весь каталог автомобилей</a></p>`,
    });
  }

  routes.push({
    path: '/blog',
    title: 'Блог о доставке автомобилей из-за рубежа | Регион Логистик (Region Logistik)',
    description:
      'Полезные статьи о растаможке, доставке, проверке автомобилей из Китая, Японии, Кореи, Европы, США и ОАЭ, а также инструкция по калькулятору стоимости авто.',
    keywords:
      'блог о доставке авто, растаможка авто статьи, калькулятор стоимости авто, доставка авто из-за рубежа, Регион Логистик',
    image: DEFAULT_IMAGE,
    ogType: 'website',
    body: `<h1>Блог о доставке автомобилей из-за рубежа</h1>
<ul>${articles
      .map((a) => `<li><a href="/blog/${a.slug}">${esc(a.title)}</a> — ${esc(a.description)}</li>`)
      .join('')}</ul>`,
  });

  for (const a of articles) {
    routes.push({
      path: `/blog/${a.slug}`,
      title: `${a.title} | Регион Логистик (Region Logistik)`,
      description: a.description,
      keywords: a.keywords || '',
      image: abs(a.cover),
      ogType: 'article',
      body: `<article><h1>${esc(a.title)}</h1>
<p>${esc(a.description)}</p>
<img src="${esc(abs(a.cover))}" alt="${esc(a.title)}" width="640" height="360">
${a.content
        .map((b) => `${b.heading ? `<h2>${esc(b.heading)}</h2>` : ''}<p>${esc(b.text)}</p>`)
        .join('')}
${
  a.faq && a.faq.length
    ? `<h2>Частые вопросы</h2>${a.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}`
    : ''
}
<p><a href="/blog">Все статьи блога</a></p></article>`,
    });
  }

  return routes;
}

const BOOT = `<script>
(function () {
  try {
    fetch('/index.html', { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('link[rel="stylesheet"], link[rel="modulepreload"]').forEach(function (l) {
          document.head.appendChild(l.cloneNode(true));
        });
        doc.querySelectorAll('script[type="module"]').forEach(function (s) {
          var n = document.createElement('script');
          n.type = 'module';
          if (s.src) { n.src = s.src; } else { n.textContent = s.textContent; }
          document.body.appendChild(n);
        });
      })
      .catch(function () { window.location.replace('/'); });
  } catch (e) { window.location.replace('/'); }
})();
</script>`;

function renderPage(template, route) {
  const canonical = `${SITE}${route.path}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(route.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${esc(route.description)}">`
  );
  html = route.keywords
    ? html.replace(
        /<meta\s+name="keywords"[^>]*>/i,
        `<meta name="keywords" content="${esc(route.keywords)}">`
      )
    : html.replace(/<meta\s+name="keywords"[^>]*>/i, '');

  const metaMap = [
    [/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${esc(canonical)}">`],
    [/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${esc(route.title)}">`],
    [
      /<meta\s+property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${esc(route.description)}">`,
    ],
    [/<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${esc(route.image)}">`],
    [/<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${esc(route.ogType)}">`],
    [
      /<meta\s+name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${esc(route.title)}">`,
    ],
    [
      /<meta\s+name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${esc(route.description)}">`,
    ],
    [
      /<meta\s+name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${esc(route.image)}">`,
    ],
  ];
  for (const [re, val] of metaMap) html = html.replace(re, val);

  html = html.replace('</head>', `    <link rel="canonical" href="${esc(canonical)}">\n  </head>`);

  html = html.replace(
    /<script type="module" src="[^"]*"><\/script>/i,
    ''
  );

  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root"><div id="seo-prerender">${route.body}</div></div>\n${BOOT}`
  );

  return html;
}

const template = readFileSync(join(ROOT, 'index.html'), 'utf-8');
const data = await loadData();
const routes = buildRoutes(data);

for (const dir of ['catalog', 'blog']) {
  const p = join(PUBLIC, dir);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

for (const route of routes) {
  const target = join(PUBLIC, route.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderPage(template, route), 'utf-8');
}

console.log(`Generated ${routes.length} static SEO pages`);