import { CountryKey, countryNames } from '@/data/catalogCars';

export interface MotoSpecs {
  engine: string;
  power: string;
  drive: string;
  transmission: string;
  year: string;
  consumption: string;
}

export interface MotoVariant {
  model: string;
  bodyType: string;
  price: string;
  sideImage: string;
  frontImage: string;
  specs: MotoSpecs;
}

export interface MotoModel {
  brand: string;
  variants: MotoVariant[];
}

/** Страны-источники для мотоциклов: японские, европейские и американские марки */
export type MotoCountryKey = 'japan' | 'europe' | 'usa';

const img = (slug: string, kind: 'side' | 'front') => `/moto/${slug}-${kind}.webp`;

export const motoByCountry: Record<MotoCountryKey, MotoModel[]> = {
  japan: [
    {
      brand: 'Honda',
      variants: [
        { model: 'Honda CB500 Hornet', bodyType: 'Нейкед', price: 'от 650 000 ₽', sideImage: img('honda-cb500-hornet', 'side'), frontImage: img('honda-cb500-hornet', 'front'), specs: { engine: '0.5 л', power: '47 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '3.5 л/100км' } },
        { model: 'Honda CB650R', bodyType: 'Нейкед', price: 'от 950 000 ₽', sideImage: img('honda-cb650r', 'side'), frontImage: img('honda-cb650r', 'front'), specs: { engine: '0.65 л', power: '95 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.5 л/100км' } },
        { model: 'Honda CB750 Hornet', bodyType: 'Нейкед', price: 'от 1 050 000 ₽', sideImage: img('honda-cb750-hornet', 'side'), frontImage: img('honda-cb750-hornet', 'front'), specs: { engine: '0.76 л', power: '91 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.0 л/100км' } },
        { model: 'Honda CB1000 Hornet', bodyType: 'Нейкед', price: 'от 1 450 000 ₽', sideImage: img('honda-cb1000-hornet', 'side'), frontImage: img('honda-cb1000-hornet', 'front'), specs: { engine: '1.0 л', power: '150 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.5 л/100км' } },
        { model: 'Honda CB1000F', bodyType: 'Нейкед', price: 'от 1 550 000 ₽', sideImage: img('honda-cb1000f', 'side'), frontImage: img('honda-cb1000f', 'front'), specs: { engine: '1.0 л', power: '155 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.5 л/100км' } },
        { model: 'Honda CBR500R', bodyType: 'Спортбайк', price: 'от 680 000 ₽', sideImage: img('honda-cbr500r', 'side'), frontImage: img('honda-cbr500r', 'front'), specs: { engine: '0.47 л', power: '48 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '3.3 л/100км' } },
        { model: 'Honda CBR600RR', bodyType: 'Спортбайк', price: 'от 1 400 000 ₽', sideImage: img('honda-cbr600rr', 'side'), frontImage: img('honda-cbr600rr', 'front'), specs: { engine: '0.6 л', power: '121 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '6.0 л/100км' } },
        { model: 'Honda CBR650R', bodyType: 'Спортбайк', price: 'от 1 000 000 ₽', sideImage: img('honda-cbr650r', 'side'), frontImage: img('honda-cbr650r', 'front'), specs: { engine: '0.65 л', power: '95 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.7 л/100км' } },
        { model: 'Honda CBR1000RR-R Fireblade', bodyType: 'Супербайк', price: 'от 2 400 000 ₽', sideImage: img('honda-cbr1000rr-r-fireblade', 'side'), frontImage: img('honda-cbr1000rr-r-fireblade', 'front'), specs: { engine: '1.0 л', power: '217 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '6.8 л/100км' } },
        { model: 'Honda NT1100', bodyType: 'Турер', price: 'от 1 500 000 ₽', sideImage: img('honda-nt1100', 'side'), frontImage: img('honda-nt1100', 'front'), specs: { engine: '1.08 л', power: '102 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.9 л/100км' } },
        { model: 'Honda Gold Wing', bodyType: 'Турер', price: 'от 3 400 000 ₽', sideImage: img('honda-gold-wing', 'side'), frontImage: img('honda-gold-wing', 'front'), specs: { engine: '1.83 л', power: '125 л.с.', drive: 'Кардан', transmission: 'Робот', year: '2024', consumption: '5.7 л/100км' } },
        { model: 'Honda Rebel 500', bodyType: 'Круизер', price: 'от 700 000 ₽', sideImage: img('honda-rebel-500', 'side'), frontImage: img('honda-rebel-500', 'front'), specs: { engine: '0.47 л', power: '46 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '3.2 л/100км' } },
        { model: 'Honda Rebel 1100', bodyType: 'Круизер', price: 'от 1 250 000 ₽', sideImage: img('honda-rebel-1100', 'side'), frontImage: img('honda-rebel-1100', 'front'), specs: { engine: '1.08 л', power: '87 л.с.', drive: 'Кардан', transmission: 'Механика', year: '2024', consumption: '4.5 л/100км' } },
        { model: 'Honda CRF1100L Africa Twin', bodyType: 'Адвенчер', price: 'от 1 900 000 ₽', sideImage: img('honda-crf1100l-africa-twin', 'side'), frontImage: img('honda-crf1100l-africa-twin', 'front'), specs: { engine: '1.08 л', power: '102 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.0 л/100км' } },
        { model: 'Honda PCX', bodyType: 'Скутер', price: 'от 380 000 ₽', sideImage: img('honda-pcx', 'side'), frontImage: img('honda-pcx', 'front'), specs: { engine: '0.124 л', power: '12 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '2.1 л/100км' } },
        { model: 'Honda Forza 350', bodyType: 'Скутер', price: 'от 600 000 ₽', sideImage: img('honda-forza-350', 'side'), frontImage: img('honda-forza-350', 'front'), specs: { engine: '0.33 л', power: '29 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '3.0 л/100км' } },
        { model: 'Honda Forza 750', bodyType: 'Скутер', price: 'от 950 000 ₽', sideImage: img('honda-forza-750', 'side'), frontImage: img('honda-forza-750', 'front'), specs: { engine: '0.75 л', power: '58 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '4.5 л/100км' } },
        { model: 'Honda ADV160', bodyType: 'Скутер', price: 'от 420 000 ₽', sideImage: img('honda-adv160', 'side'), frontImage: img('honda-adv160', 'front'), specs: { engine: '0.156 л', power: '16 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '2.3 л/100км' } },
      ],
    },
    {
      brand: 'Yamaha',
      variants: [
        { model: 'Yamaha XJ6', bodyType: 'Нейкед', price: 'от 550 000 ₽', sideImage: img('yamaha-xj6', 'side'), frontImage: img('yamaha-xj6', 'front'), specs: { engine: '0.6 л', power: '78 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '5.0 л/100км' } },
        { model: 'Yamaha FZ6', bodyType: 'Нейкед', price: 'от 600 000 ₽', sideImage: img('yamaha-fz6', 'side'), frontImage: img('yamaha-fz6', 'front'), specs: { engine: '0.6 л', power: '98 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '5.5 л/100км' } },
        { model: 'Yamaha FZ1', bodyType: 'Нейкед', price: 'от 900 000 ₽', sideImage: img('yamaha-fz1', 'side'), frontImage: img('yamaha-fz1', 'front'), specs: { engine: '1.0 л', power: '150 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '6.5 л/100км' } },
        { model: 'Yamaha MT-07', bodyType: 'Нейкед', price: 'от 850 000 ₽', sideImage: img('yamaha-mt-07', 'side'), frontImage: img('yamaha-mt-07', 'front'), specs: { engine: '0.69 л', power: '73 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.0 л/100км' } },
        { model: 'Yamaha MT-09', bodyType: 'Нейкед', price: 'от 1 200 000 ₽', sideImage: img('yamaha-mt-09', 'side'), frontImage: img('yamaha-mt-09', 'front'), specs: { engine: '0.89 л', power: '119 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.0 л/100км' } },
        { model: 'Yamaha MT-10', bodyType: 'Нейкед', price: 'от 1 750 000 ₽', sideImage: img('yamaha-mt-10', 'side'), frontImage: img('yamaha-mt-10', 'front'), specs: { engine: '1.0 л', power: '165 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '6.5 л/100км' } },
        { model: 'Yamaha YZF-R3', bodyType: 'Спортбайк', price: 'от 700 000 ₽', sideImage: img('yamaha-yzf-r3', 'side'), frontImage: img('yamaha-yzf-r3', 'front'), specs: { engine: '0.32 л', power: '42 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '3.5 л/100км' } },
        { model: 'Yamaha YZF-R6', bodyType: 'Спортбайк', price: 'от 1 550 000 ₽', sideImage: img('yamaha-yzf-r6', 'side'), frontImage: img('yamaha-yzf-r6', 'front'), specs: { engine: '0.6 л', power: '118 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '6.2 л/100км' } },
        { model: 'Yamaha YZF-R1', bodyType: 'Супербайк', price: 'от 2 300 000 ₽', sideImage: img('yamaha-yzf-r1', 'side'), frontImage: img('yamaha-yzf-r1', 'front'), specs: { engine: '1.0 л', power: '200 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '7.0 л/100км' } },
        { model: 'Yamaha Tracer 7', bodyType: 'Турер', price: 'от 1 000 000 ₽', sideImage: img('yamaha-tracer-7', 'side'), frontImage: img('yamaha-tracer-7', 'front'), specs: { engine: '0.69 л', power: '73 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.2 л/100км' } },
        { model: 'Yamaha Tracer 9', bodyType: 'Турер', price: 'от 1 500 000 ₽', sideImage: img('yamaha-tracer-9', 'side'), frontImage: img('yamaha-tracer-9', 'front'), specs: { engine: '0.89 л', power: '119 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.2 л/100км' } },
        { model: 'Yamaha FJR1300', bodyType: 'Турер', price: 'от 1 800 000 ₽', sideImage: img('yamaha-fjr1300', 'side'), frontImage: img('yamaha-fjr1300', 'front'), specs: { engine: '1.3 л', power: '141 л.с.', drive: 'Кардан', transmission: 'Механика', year: '2023', consumption: '6.0 л/100км' } },
        { model: 'Yamaha XT1200Z Super Tenere', bodyType: 'Адвенчер', price: 'от 1 700 000 ₽', sideImage: img('yamaha-xt1200z-super-tenere', 'side'), frontImage: img('yamaha-xt1200z-super-tenere', 'front'), specs: { engine: '1.2 л', power: '112 л.с.', drive: 'Кардан', transmission: 'Механика', year: '2023', consumption: '5.8 л/100км' } },
        { model: 'Yamaha Bolt', bodyType: 'Круизер', price: 'от 850 000 ₽', sideImage: img('yamaha-bolt', 'side'), frontImage: img('yamaha-bolt', 'front'), specs: { engine: '0.94 л', power: '54 л.с.', drive: 'Ремень', transmission: 'Механика', year: '2023', consumption: '4.5 л/100км' } },
        { model: 'Yamaha Tenere 700', bodyType: 'Адвенчер', price: 'от 1 100 000 ₽', sideImage: img('yamaha-tenere-700', 'side'), frontImage: img('yamaha-tenere-700', 'front'), specs: { engine: '0.69 л', power: '72 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.3 л/100км' } },
        { model: 'Yamaha NMAX', bodyType: 'Скутер', price: 'от 400 000 ₽', sideImage: img('yamaha-nmax', 'side'), frontImage: img('yamaha-nmax', 'front'), specs: { engine: '0.155 л', power: '15 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '2.1 л/100км' } },
        { model: 'Yamaha XMAX 300', bodyType: 'Скутер', price: 'от 650 000 ₽', sideImage: img('yamaha-xmax-300', 'side'), frontImage: img('yamaha-xmax-300', 'front'), specs: { engine: '0.29 л', power: '28 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '3.0 л/100км' } },
        { model: 'Yamaha TMAX', bodyType: 'Скутер', price: 'от 1 350 000 ₽', sideImage: img('yamaha-tmax', 'side'), frontImage: img('yamaha-tmax', 'front'), specs: { engine: '0.56 л', power: '47 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '4.8 л/100км' } },
      ],
    },
    {
      brand: 'Suzuki',
      variants: [
        { model: 'Suzuki GSX-S750', bodyType: 'Нейкед', price: 'от 950 000 ₽', sideImage: img('suzuki-gsx-s750', 'side'), frontImage: img('suzuki-gsx-s750', 'front'), specs: { engine: '0.75 л', power: '114 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '5.5 л/100км' } },
        { model: 'Suzuki GSX-S1000', bodyType: 'Нейкед', price: 'от 1 300 000 ₽', sideImage: img('suzuki-gsx-s1000', 'side'), frontImage: img('suzuki-gsx-s1000', 'front'), specs: { engine: '1.0 л', power: '152 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '6.0 л/100км' } },
        { model: 'Suzuki GSX-R600', bodyType: 'Спортбайк', price: 'от 1 250 000 ₽', sideImage: img('suzuki-gsx-r600', 'side'), frontImage: img('suzuki-gsx-r600', 'front'), specs: { engine: '0.6 л', power: '124 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '6.3 л/100км' } },
        { model: 'Suzuki GSX-R750', bodyType: 'Спортбайк', price: 'от 1 350 000 ₽', sideImage: img('suzuki-gsx-r750', 'side'), frontImage: img('suzuki-gsx-r750', 'front'), specs: { engine: '0.75 л', power: '150 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '6.5 л/100км' } },
        { model: 'Suzuki GSX-R1000', bodyType: 'Супербайк', price: 'от 1 950 000 ₽', sideImage: img('suzuki-gsx-r1000', 'side'), frontImage: img('suzuki-gsx-r1000', 'front'), specs: { engine: '1.0 л', power: '202 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '7.0 л/100км' } },
        { model: 'Suzuki V-Strom 650', bodyType: 'Адвенчер', price: 'от 950 000 ₽', sideImage: img('suzuki-v-strom-650', 'side'), frontImage: img('suzuki-v-strom-650', 'front'), specs: { engine: '0.65 л', power: '71 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.3 л/100км' } },
        { model: 'Suzuki V-Strom 1050', bodyType: 'Адвенчер', price: 'от 1 600 000 ₽', sideImage: img('suzuki-v-strom-1050', 'side'), frontImage: img('suzuki-v-strom-1050', 'front'), specs: { engine: '1.04 л', power: '107 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.5 л/100км' } },
        { model: 'Suzuki Boulevard', bodyType: 'Круизер', price: 'от 1 500 000 ₽', sideImage: img('suzuki-boulevard', 'side'), frontImage: img('suzuki-boulevard', 'front'), specs: { engine: '1.78 л', power: '127 л.с.', drive: 'Ремень', transmission: 'Механика', year: '2023', consumption: '6.0 л/100км' } },
        { model: 'Suzuki Burgman 400', bodyType: 'Скутер', price: 'от 650 000 ₽', sideImage: img('suzuki-burgman-400', 'side'), frontImage: img('suzuki-burgman-400', 'front'), specs: { engine: '0.4 л', power: '34 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '3.5 л/100км' } },
        { model: 'Suzuki Burgman 650', bodyType: 'Скутер', price: 'от 1 100 000 ₽', sideImage: img('suzuki-burgman-650', 'side'), frontImage: img('suzuki-burgman-650', 'front'), specs: { engine: '0.64 л', power: '54 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '4.7 л/100км' } },
      ],
    },
    {
      brand: 'Kawasaki',
      variants: [
        { model: 'Kawasaki Ninja 400', bodyType: 'Спортбайк', price: 'от 600 000 ₽', sideImage: img('kawasaki-ninja-400', 'side'), frontImage: img('kawasaki-ninja-400', 'front'), specs: { engine: '0.4 л', power: '45 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '3.5 л/100км' } },
        { model: 'Kawasaki Ninja 650', bodyType: 'Спортбайк', price: 'от 850 000 ₽', sideImage: img('kawasaki-ninja-650', 'side'), frontImage: img('kawasaki-ninja-650', 'front'), specs: { engine: '0.65 л', power: '68 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.2 л/100км' } },
        { model: 'Kawasaki Ninja ZX-6R', bodyType: 'Спортбайк', price: 'от 1 500 000 ₽', sideImage: img('kawasaki-ninja-zx-6r', 'side'), frontImage: img('kawasaki-ninja-zx-6r', 'front'), specs: { engine: '0.64 л', power: '129 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '6.3 л/100км' } },
        { model: 'Kawasaki Ninja ZX-10R', bodyType: 'Супербайк', price: 'от 2 200 000 ₽', sideImage: img('kawasaki-ninja-zx-10r', 'side'), frontImage: img('kawasaki-ninja-zx-10r', 'front'), specs: { engine: '1.0 л', power: '203 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '7.2 л/100км' } },
        { model: 'Kawasaki Versys 650', bodyType: 'Адвенчер', price: 'от 950 000 ₽', sideImage: img('kawasaki-versys-650', 'side'), frontImage: img('kawasaki-versys-650', 'front'), specs: { engine: '0.65 л', power: '67 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.3 л/100км' } },
        { model: 'Kawasaki Versys 1000', bodyType: 'Адвенчер', price: 'от 1 650 000 ₽', sideImage: img('kawasaki-versys-1000', 'side'), frontImage: img('kawasaki-versys-1000', 'front'), specs: { engine: '1.04 л', power: '120 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.7 л/100км' } },
        { model: 'Kawasaki Vulcan S', bodyType: 'Круизер', price: 'от 800 000 ₽', sideImage: img('kawasaki-vulcan-s', 'side'), frontImage: img('kawasaki-vulcan-s', 'front'), specs: { engine: '0.65 л', power: '61 л.с.', drive: 'Ремень', transmission: 'Механика', year: '2023', consumption: '4.0 л/100км' } },
        { model: 'Kawasaki KLR650', bodyType: 'Адвенчер', price: 'от 750 000 ₽', sideImage: img('kawasaki-klr650', 'side'), frontImage: img('kawasaki-klr650', 'front'), specs: { engine: '0.65 л', power: '40 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2023', consumption: '3.8 л/100км' } },
      ],
    },
  ],

  europe: [
    {
      brand: 'Ducati',
      variants: [
        { model: 'Ducati Monster', bodyType: 'Нейкед', price: 'от 1 300 000 ₽', sideImage: img('ducati-monster', 'side'), frontImage: img('ducati-monster', 'front'), specs: { engine: '0.94 л', power: '111 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '5.3 л/100км' } },
      ],
    },
    {
      brand: 'BMW',
      variants: [
        { model: 'BMW R 1250 GS', bodyType: 'Адвенчер', price: 'от 2 400 000 ₽', sideImage: img('bmw-r-1250-gs', 'side'), frontImage: img('bmw-r-1250-gs', 'front'), specs: { engine: '1.25 л', power: '136 л.с.', drive: 'Кардан', transmission: 'Механика', year: '2024', consumption: '5.3 л/100км' } },
        { model: 'BMW R 1300 GS', bodyType: 'Адвенчер', price: 'от 2 700 000 ₽', sideImage: img('bmw-r-1300-gs', 'side'), frontImage: img('bmw-r-1300-gs', 'front'), specs: { engine: '1.3 л', power: '145 л.с.', drive: 'Кардан', transmission: 'Механика', year: '2024', consumption: '5.5 л/100км' } },
        { model: 'BMW R 18', bodyType: 'Круизер', price: 'от 2 300 000 ₽', sideImage: img('bmw-r-18', 'side'), frontImage: img('bmw-r-18', 'front'), specs: { engine: '1.8 л', power: '91 л.с.', drive: 'Кардан', transmission: 'Механика', year: '2024', consumption: '6.0 л/100км' } },
        { model: 'BMW C 400 GT', bodyType: 'Скутер', price: 'от 900 000 ₽', sideImage: img('bmw-c-400-gt', 'side'), frontImage: img('bmw-c-400-gt', 'front'), specs: { engine: '0.35 л', power: '34 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '3.2 л/100км' } },
        { model: 'BMW C 650 GT', bodyType: 'Скутер', price: 'от 1 400 000 ₽', sideImage: img('bmw-c-650-gt', 'side'), frontImage: img('bmw-c-650-gt', 'front'), specs: { engine: '0.65 л', power: '60 л.с.', drive: 'Ремень', transmission: 'Автомат', year: '2024', consumption: '4.6 л/100км' } },
      ],
    },
    {
      brand: 'KTM',
      variants: [
        { model: 'KTM 690 Enduro R', bodyType: 'Эндуро', price: 'от 1 150 000 ₽', sideImage: img('ktm-690-enduro-r', 'side'), frontImage: img('ktm-690-enduro-r', 'front'), specs: { engine: '0.69 л', power: '74 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.0 л/100км' } },
      ],
    },
    {
      brand: 'Husqvarna',
      variants: [
        { model: 'Husqvarna 701 Enduro', bodyType: 'Эндуро', price: 'от 1 200 000 ₽', sideImage: img('husqvarna-701-enduro', 'side'), frontImage: img('husqvarna-701-enduro', 'front'), specs: { engine: '0.69 л', power: '74 л.с.', drive: 'Цепь', transmission: 'Механика', year: '2024', consumption: '4.0 л/100км' } },
      ],
    },
  ],

  usa: [
    {
      brand: 'Harley-Davidson',
      variants: [
        { model: 'Harley-Davidson Sportster', bodyType: 'Круизер', price: 'от 1 500 000 ₽', sideImage: img('harley-davidson-sportster', 'side'), frontImage: img('harley-davidson-sportster', 'front'), specs: { engine: '1.25 л', power: '121 л.с.', drive: 'Ремень', transmission: 'Механика', year: '2024', consumption: '5.5 л/100км' } },
        { model: 'Harley-Davidson Iron 883', bodyType: 'Круизер', price: 'от 1 100 000 ₽', sideImage: img('harley-davidson-iron-883', 'side'), frontImage: img('harley-davidson-iron-883', 'front'), specs: { engine: '0.88 л', power: '50 л.с.', drive: 'Ремень', transmission: 'Механика', year: '2023', consumption: '4.8 л/100км' } },
        { model: 'Harley-Davidson Softail', bodyType: 'Круизер', price: 'от 2 100 000 ₽', sideImage: img('harley-davidson-softail', 'side'), frontImage: img('harley-davidson-softail', 'front'), specs: { engine: '1.87 л', power: '101 л.с.', drive: 'Ремень', transmission: 'Механика', year: '2024', consumption: '6.2 л/100км' } },
      ],
    },
  ],
};

const translitMap: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

const translit = (text: string): string => text.replace(/[а-яё]/g, (ch) => translitMap[ch] ?? ch);

const toSlug = (text: string): string =>
  translit(text.toLowerCase().trim())
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export interface MotoEntry {
  country: MotoCountryKey;
  countryName: string;
  slug: string;
  model: MotoModel;
  variant: MotoVariant;
  searchIndex: string;
}

export const motoEntries: MotoEntry[] = (Object.keys(motoByCountry) as MotoCountryKey[]).flatMap((country) =>
  motoByCountry[country].flatMap((model) =>
    model.variants.map((variant) => ({
      country,
      countryName: countryNames[country as CountryKey],
      slug: toSlug(variant.model),
      model,
      variant,
      searchIndex: `${model.brand} ${variant.model}`.toLowerCase(),
    }))
  )
);

export const findMotoEntry = (country: string, slug: string): MotoEntry | undefined =>
  motoEntries.find((e) => e.country === country && e.slug === slug);

export const motoEntriesByCountry = (country: MotoCountryKey): MotoEntry[] =>
  motoEntries.filter((e) => e.country === country);

export const motoBrandSlug = (brand: string): string => toSlug(brand);

export const motoBrands: { brand: string; slug: string; entries: MotoEntry[] }[] = (() => {
  const map = new Map<string, MotoEntry[]>();
  for (const e of motoEntries) {
    const list = map.get(e.model.brand) ?? [];
    list.push(e);
    map.set(e.model.brand, list);
  }
  return Array.from(map.entries())
    .map(([brand, entries]) => ({ brand, slug: toSlug(brand), entries }))
    .sort((a, b) => b.entries.length - a.entries.length);
})();

export const findMotoBrand = (slug: string) => motoBrands.find((b) => b.slug === slug);

export const motoBodyTypes: string[] = Array.from(new Set(motoEntries.map((e) => e.variant.bodyType)));
