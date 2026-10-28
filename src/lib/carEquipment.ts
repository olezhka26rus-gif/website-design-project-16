import { CatalogEntry } from '@/data/catalogCars';
import { brandOrigin } from '@/data/sourcing';
import { powerFromSpec, priceFromSpec } from '@/lib/customs';

/* ============================================================
   Комплектации, достоинства и недостатки автомобиля.
   Собираются из класса модели (цена), типа силовой установки,
   кузова, привода и происхождения марки.
   ============================================================ */

type Segment = 'budget' | 'mid' | 'premium' | 'lux';
type Powertrain = 'ev' | 'phev' | 'hybrid' | 'diesel' | 'petrol';

export interface CarEquipment {
  base: string[];
  full: string[];
  pros: string[];
  cons: string[];
}

const segmentOf = (price: number): Segment => {
  if (price >= 9_000_000) return 'lux';
  if (price >= 3_500_000) return 'premium';
  if (price >= 1_900_000) return 'mid';
  return 'budget';
};

const powertrainOf = (engine: string): Powertrain => {
  const s = engine.toLowerCase();
  if (s.includes('электро')) return 'ev';
  if (/turbo гибрид/.test(s) || s.includes('phev')) return 'phev';
  if (s.includes('гибрид') || s.includes('e-power')) return 'hybrid';
  if (s.includes('дизель')) return 'diesel';
  return 'petrol';
};

const BASE: Record<Segment, string[]> = {
  budget: [
    'фронтальные и боковые подушки безопасности',
    'ABS, ESP и система помощи при старте в гору',
    'кондиционер',
    'мультимедиа с экраном 8–10″, Bluetooth и USB',
    'электростеклоподъёмники и электрозеркала',
    'тканевый салон, стальные или 16″ легкосплавные диски',
  ],
  mid: [
    'шесть подушек безопасности, ABS и ESP',
    'климат-контроль',
    'мультимедиа с экраном 10–12″, Apple CarPlay / Android Auto',
    'камера заднего вида и парктроники',
    'светодиодные фары, 17″ легкосплавные диски',
    'круиз-контроль, подогрев передних сидений',
  ],
  premium: [
    'двухзонный климат-контроль',
    'кожаный салон, электрорегулировки и подогрев передних сидений',
    'цифровая приборная панель и мультимедиа 12″',
    'светодиодная оптика, 18–19″ диски',
    'адаптивный круиз-контроль и помощь в удержании полосы',
    'бесключевой доступ и электропривод багажника',
  ],
  lux: [
    'кожаный салон премиум-класса с вентиляцией и массажем',
    'многозонный климат-контроль',
    'пневмоподвеска с адаптивными амортизаторами',
    'матричная светодиодная оптика',
    'полный пакет систем помощи водителю',
    'премиальная аудиосистема, бесключевой доступ',
  ],
};

const FULL: Record<Segment, string[]> = {
  budget: [
    'климат-контроль и подогрев передних сидений',
    'камера заднего вида или кругового обзора',
    'светодиодные фары и 17–18″ диски',
    'комбинированный или кожаный салон',
    'бесключевой доступ и запуск кнопкой',
    'адаптивный круиз-контроль и экстренное торможение',
  ],
  mid: [
    'кожаный салон с вентиляцией передних сидений',
    'камеры кругового обзора 360°',
    'панорамная крыша',
    'адаптивный круиз-контроль с удержанием полосы',
    'проекция на лобовое стекло, беспроводная зарядка',
    'премиальная аудиосистема, 19″ диски',
  ],
  premium: [
    'пневмоподвеска или адаптивные амортизаторы',
    'вентиляция и массаж сидений, подогрев второго ряда',
    'матричные фары, проекционный дисплей',
    'камеры 360° и автопарковка',
    'премиальная аудиосистема, панорамная крыша',
    '20–21″ диски, спортивный или люксовый пакет оформления',
  ],
  lux: [
    'индивидуальная отделка салона и редкие цвета',
    'задние места бизнес-класса с отдельным климатом и экранами',
    'подруливающая задняя ось',
    'ночное видение и расширенный автопилот',
    'керамические тормоза или спортивный выхлоп',
    '22″ диски, эксклюзивные пакеты производителя',
  ],
};

const PT_FULL: Partial<Record<Powertrain, string>> = {
  ev: 'батарея увеличенной ёмкости и полный привод с двумя моторами',
  phev: 'увеличенная батарея с запасом хода на электричестве и полный привод',
  hybrid: 'полный привод E-Four и расширенный пакет электроники',
};

const prosFor = (entry: CatalogEntry, seg: Segment, pt: Powertrain, hp: number): string[] => {
  const v = entry.variant;
  const origin = brandOrigin[entry.model.brand];
  const list: string[] = [];

  if (pt === 'ev') list.push('низкая стоимость поездки и почти нет затрат на ТО');
  if (pt === 'phev') list.push('в городе можно ездить на электричестве, на трассе — без ограничений по запасу хода');
  if (pt === 'hybrid') list.push('низкий расход топлива в городе');
  if (pt === 'diesel') list.push('высокий крутящий момент и экономичность на трассе');
  if (hp >= 300) list.push(`мощный двигатель ${v.specs.power} — уверенный разгон и обгоны`);

  if (v.specs.drive === 'Полный') list.push('полный привод — уверенность зимой и на бездорожье');
  if (['Внедорожник', 'Кроссовер'].includes(v.bodyType)) list.push('высокий дорожный просвет и посадка');
  if (v.bodyType === 'Минивэн') list.push('просторный салон на 7–8 мест');
  if (v.bodyType === 'Универсал' || v.bodyType === 'Лифтбек') list.push('большой и удобный багажник');
  if (v.bodyType === 'Седан') list.push('тихий салон и плавный ход');
  if (v.bodyType === 'Пикап') list.push('грузовая платформа и рамная конструкция');

  if (origin === 'cn') list.push('богатое оснащение уже в базовой версии', 'современная мультимедиа с крупными экранами');
  if (origin === 'jp') list.push('высокая надёжность и ресурс агрегатов', 'хорошая ликвидность на вторичном рынке');
  if (origin === 'kr') list.push('выгодное соотношение цены и оснащения', 'доступные запчасти и обслуживание');
  if (origin === 'eu') list.push('отличная управляемость и шумоизоляция', 'качественные материалы отделки');
  if (origin === 'us') list.push('большие габариты и просторный салон');
  if (origin === 'lux' || seg === 'lux') list.push('статус и эксклюзивность');

  return Array.from(new Set(list)).slice(0, 5);
};

const consFor = (entry: CatalogEntry, seg: Segment, pt: Powertrain, hp: number): string[] => {
  const v = entry.variant;
  const origin = brandOrigin[entry.model.brand];
  const list: string[] = [];

  if (pt === 'ev') list.push('зимой запас хода снижается на 20–30%', 'нужна доступная зарядка дома или рядом');
  if (pt === 'phev') list.push('сложная силовая установка — нужен сервис с опытом гибридов');
  if (pt === 'diesel') list.push('требователен к качеству топлива');
  if (hp > 250) list.push(`мощность ${hp} л.с. — высокий утильсбор и транспортный налог`);
  else if (hp > 160) list.push('мощность выше 160 л.с. — выше утильсбор и транспортный налог');

  if (origin === 'cn') list.push('ниже остаточная стоимость при перепродаже', 'меню и сервисы иногда требуют русификации');
  if (origin === 'eu' || origin === 'lux' || seg === 'premium' || seg === 'lux')
    list.push('дорогое обслуживание и запчасти');
  if (origin === 'us') list.push('высокий расход топлива', 'запчасти часто приходится заказывать');
  if (origin === 'jp' && entry.country === 'japan') list.push('часть машин для внутреннего рынка Японии с правым рулём');
  if (origin === 'kr') list.push('шумоизоляция скромнее, чем у европейских конкурентов');
  if (v.bodyType === 'Купе') list.push('тесный задний ряд и небольшой багажник');
  if (['Внедорожник', 'Пикап'].includes(v.bodyType)) list.push('крупные габариты — сложнее парковаться в городе');

  return Array.from(new Set(list)).slice(0, 4);
};

export const buildCarEquipment = (entry: CatalogEntry): CarEquipment => {
  const v = entry.variant;
  const seg = segmentOf(priceFromSpec(v.price));
  const pt = powertrainOf(v.specs.engine);
  const hp = powerFromSpec(v.specs.power);

  const full = [...FULL[seg]];
  const extra = PT_FULL[pt];
  if (extra) full.unshift(extra);
  else if (v.specs.drive !== 'Полный' && ['Кроссовер', 'Внедорожник', 'Седан'].includes(v.bodyType))
    full.unshift('полный привод (если предусмотрен для модели)');

  return {
    base: BASE[seg],
    full: full.slice(0, 6),
    pros: prosFor(entry, seg, pt, hp),
    cons: consFor(entry, seg, pt, hp),
  };
};
