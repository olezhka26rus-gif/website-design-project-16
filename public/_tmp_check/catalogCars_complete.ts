export type CountryKey = 'china' | 'japan' | 'korea' | 'europe' | 'usa' | 'uae';

export interface CarSpecs {
  engine: string;
  power: string;
  drive: string;
  transmission: string;
  year: string;
  consumption: string;
}

export interface CarVariant {
  model: string;
  bodyType: string;
  price: string;
  sideImage: string;
  frontImage: string;
  specs: CarSpecs;
}

export interface CarModel {
  brand: string;
  variants: CarVariant[];
}

const CDN = 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files';

export const carsByCountry: Record<CountryKey, CarModel[]> = {

  china: [
    {
      brand: 'Zeekr',
      variants: [
        {
          model: 'Zeekr 007',
          bodyType: 'Седан',
          price: 'от 3 100 000 ₽',
          sideImage: `/vehicles/china-zeekr-007-side.jpg`,
          frontImage: `/vehicles/china-zeekr-007-front.jpg`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '18.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 001',
          bodyType: 'Лифтбек',
          price: 'от 3 400 000 ₽',
          sideImage: `/vehicles/china-zeekr-001-side.jpg`,
          frontImage: `/vehicles/china-zeekr-001-front.jpg`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '19.2 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 8X',
          bodyType: 'Кроссовер',
          price: 'от 4 200 000 ₽',
          sideImage: `/vehicles/china-zeekr-8x-side.jpg`,
          frontImage: `/vehicles/china-zeekr-8x-side.jpg`,
          specs: { engine: 'Электро', power: '490 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '17.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 9X',
          bodyType: 'Внедорожник',
          price: 'от 5 500 000 ₽',
          sideImage: `/vehicles/china-zeekr-9x-side.jpg`,
          frontImage: `/vehicles/china-zeekr-9x-side.jpg`,
          specs: { engine: 'Электро', power: '680 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '19.8 кВт·ч/100км' },
        },
      ],
    },
    {
      brand: 'Li Auto',
      variants: [
        {
          model: 'Li Auto L9',
          bodyType: 'Внедорожник',
          price: 'от 3 700 000 ₽',
          sideImage: `/vehicles/china-li-auto-l9-side.jpg`,
          frontImage: `/vehicles/china-li-auto-l9-front.jpg`,
          specs: { engine: 'Гибрид', power: '449 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '1.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Chery',
      variants: [
        {
          model: 'Chery Arrizo 8',
          bodyType: 'Седан',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/china-chery-arrizo-8-side.jpg`,
          frontImage: `/vehicles/china-chery-arrizo-8-front.jpg`,
          specs: { engine: '1.6 л Turbo', power: '197 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Chery Tiggo 7 Pro',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `/vehicles/china-chery-tiggo-7-pro-side.jpg`,
          frontImage: `/vehicles/china-chery-tiggo-7-pro-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '147 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.8 л/100км' },
        },
      ],
    },
    {
      brand: 'BYD',
      variants: [
        {
          model: 'BYD Han',
          bodyType: 'Седан',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/china-byd-han-side.jpg`,
          frontImage: `/vehicles/china-byd-han-front.jpg`,
          specs: { engine: 'Электро', power: '517 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.9 кВт·ч/100км' },
        },
        {
          model: 'BYD Song Plus',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/china-byd-song-plus-side.jpg`,
          frontImage: `/vehicles/china-byd-song-plus-front.jpg`,
          specs: { engine: 'Гибрид', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '5.3 л/100км' },
        },
        {
          model: 'BYD Qin Wagon',
          bodyType: 'Универсал',
          price: 'от 2 300 000 ₽',
          sideImage: `/vehicles/china-byd-qin-wagon-side.jpg`,
          frontImage: `/vehicles/china-byd-qin-wagon-front.jpg`,
          specs: { engine: 'Гибрид', power: '163 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '4.9 л/100км' },
        },
      ],
    },
    {
      brand: 'Geely',
      variants: [
        {
          model: 'Geely Preface',
          bodyType: 'Седан',
          price: 'от 2 800 000 ₽',
          sideImage: `/vehicles/china-geely-preface-side.jpg`,
          frontImage: `/vehicles/china-geely-preface-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Geely Coolray',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/china-geely-coolray-side.jpg`,
          frontImage: `/vehicles/china-geely-coolray-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.3 л/100км' },
        },
        {
          model: 'Geely Monjaro',
          bodyType: 'Внедорожник',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/china-geely-monjaro-side.jpg`,
          frontImage: `/vehicles/china-geely-monjaro-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '238 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.5 л/100км' },
        },
        {
          model: 'Geely Galaxy Starship 7',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/china-geely-galaxy-starship-7-side.jpg`,
          frontImage: `/vehicles/china-geely-galaxy-starship-7-side.jpg`,
          specs: { engine: 'Гибрид', power: '204 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '4.8 л/100км' },
        },
      ],
    },
    {
      brand: 'Haval',
      variants: [
        {
          model: 'Haval H6',
          bodyType: 'Внедорожник',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/china-haval-h6-side.jpg`,
          frontImage: `/vehicles/china-haval-h6-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Полный', transmission: 'Робот', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Haval Jolion',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/china-haval-jolion-side.jpg`,
          frontImage: `/vehicles/china-haval-jolion-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Haval M6',
          bodyType: 'Кроссовер',
          price: 'от 1 750 000 ₽',
          sideImage: `/vehicles/china-haval-m6-side.jpg`,
          frontImage: `/vehicles/china-haval-m6-side.jpg`,
          specs: { engine: '1.5 л', power: '116 л.с.', drive: 'Передний', transmission: 'Механика', year: '2023', consumption: '7.0 л/100км' },
        },
      ],
    },
    {
      brand: 'GAC Trumpchi',
      variants: [
        {
          model: 'GAC Trumpchi M6 Pro',
          bodyType: 'Минивэн',
          price: 'от 2 400 000 ₽',
          sideImage: `/vehicles/china-gac-trumpchi-m6-pro-side.jpg`,
          frontImage: `/vehicles/china-gac-trumpchi-m6-pro-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
      ],
    },
    {
      brand: 'GAC',
      variants: [
        {
          model: 'GAC S7',
          bodyType: 'Кроссовер',
          price: 'от 2 800 000 ₽',
          sideImage: `/vehicles/china-gac-s7-side.jpg`,
          frontImage: `/vehicles/china-gac-s7-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '265 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.4 л/100км' },
        },
      ],
    },
    {
      brand: 'Changan',
      variants: [
        {
          model: 'Changan Qiyuan A06',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/china-changan-qiyuan-a06-side.jpg`,
          frontImage: `/vehicles/china-changan-qiyuan-a06-side.jpg`,
          specs: { engine: 'Гибрид', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '4.2 л/100км' },
        },
      ],
    },
    {
      brand: 'Jetta',
      variants: [
        {
          model: 'Jetta VS5',
          bodyType: 'Кроссовер',
          price: 'от 1 850 000 ₽',
          sideImage: `/vehicles/china-jetta-vs5-side.jpg`,
          frontImage: `/vehicles/china-jetta-vs5-side.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.1 л/100км' },
        },
      ],
    },
    {
      brand: 'Lynk & Co',
      variants: [
        {
          model: 'Lynk & Co 900',
          bodyType: 'Внедорожник',
          price: 'от 4 500 000 ₽',
          sideImage: `/vehicles/china-lynk-co-900-side.jpg`,
          frontImage: `/vehicles/china-lynk-co-900-side.jpg`,
          specs: { engine: 'Гибрид', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '1.8 л/100км' },
        },
      ],
    },
    {
      brand: 'Voyah',
      variants: [
        {
          model: 'Voyah Taishan',
          bodyType: 'Внедорожник',
          price: 'от 4 800 000 ₽',
          sideImage: `/vehicles/china-voyah-taishan-side.jpg`,
          frontImage: `/vehicles/china-voyah-taishan-side.jpg`,
          specs: { engine: 'Гибрид', power: '449 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '1.6 л/100км' },
        },
      ],
    },
    {
      brand: 'Volkswagen',
      variants: [
        {
          model: 'Volkswagen Passat NMS',
          bodyType: 'Седан',
          price: 'от 2 300 000 ₽',
          sideImage: `/vehicles/china-volkswagen-passat-nms-side.jpg`,
          frontImage: `/vehicles/china-volkswagen-passat-nms-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '186 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.0 л/100км' },
        },
      ],
    },
  ],
  japan: [
    {
      brand: 'Toyota',
      variants: [
        {
          model: 'Toyota Camry',
          bodyType: 'Седан',
          price: 'от 2 400 000 ₽',
          sideImage: `/vehicles/japan-toyota-camry-side.jpg`,
          frontImage: `/vehicles/japan-toyota-camry-front.jpg`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Toyota RAV4',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/japan-toyota-rav4-side.jpg`,
          frontImage: `/vehicles/japan-toyota-rav4-front.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Toyota Corolla Touring',
          bodyType: 'Универсал',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/japan-toyota-corolla-touring-side.jpg`,
          frontImage: `/vehicles/japan-toyota-corolla-touring-front.jpg`,
          specs: { engine: '1.8 л Гибрид', power: '122 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.5 л/100км' },
        },
        {
          model: 'Toyota Corolla',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/japan-toyota-corolla-side.jpg`,
          frontImage: `/vehicles/japan-toyota-corolla-side.jpg`,
          specs: { engine: '1.8 л', power: '140 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.9 л/100км' },
        },
        {
          model: 'Toyota Yaris',
          bodyType: 'Хэтчбек',
          price: 'от 1 700 000 ₽',
          sideImage: `/vehicles/japan-toyota-yaris-side.jpg`,
          frontImage: `/vehicles/japan-toyota-yaris-side.jpg`,
          specs: { engine: '1.5 л', power: '120 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.0 л/100км' },
        },
        {
          model: 'Toyota Highlander',
          bodyType: 'Внедорожник',
          price: 'от 3 500 000 ₽',
          sideImage: `/vehicles/japan-toyota-highlander-side.jpg`,
          frontImage: `/vehicles/japan-toyota-highlander-side.jpg`,
          specs: { engine: '2.4 л Turbo', power: '265 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.3 л/100км' },
        },
        {
          model: 'Toyota Probox',
          bodyType: 'Универсал',
          price: 'от 1 400 000 ₽',
          sideImage: `/vehicles/japan-toyota-probox-side.jpg`,
          frontImage: `/vehicles/japan-toyota-probox-side.jpg`,
          specs: { engine: '1.5 л', power: '99 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '6.2 л/100км' },
        },
        {
          model: 'Toyota Land Cruiser Prado',
          bodyType: 'Внедорожник',
          price: 'от 5 800 000 ₽',
          sideImage: `/vehicles/japan-toyota-land-cruiser-prado-side.jpg`,
          frontImage: `/vehicles/japan-toyota-land-cruiser-prado-side.jpg`,
          specs: { engine: '2.7 л', power: '163 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Toyota bZ3X',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/japan-toyota-bz3x-side.jpg`,
          frontImage: `/vehicles/japan-toyota-bz3x-side.jpg`,
          specs: { engine: 'Электро', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '15.0 кВт·ч/100км' },
        },
        {
          model: 'Toyota Levin',
          bodyType: 'Седан',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/japan-toyota-levin-side.jpg`,
          frontImage: `/vehicles/japan-toyota-levin-side.jpg`,
          specs: { engine: '1.2 л Turbo', power: '116 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.8 л/100км' },
        },
        {
          model: 'Toyota Hilux',
          bodyType: 'Пикап',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/japan-toyota-hilux-side.jpg`,
          frontImage: `/vehicles/japan-toyota-hilux-side.jpg`,
          specs: { engine: '2.8 л Дизель', power: '204 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.9 л/100км' },
        },
      ],
    },
    {
      brand: 'Lexus',
      variants: [
        {
          model: 'Lexus ES',
          bodyType: 'Седан',
          price: 'от 3 500 000 ₽',
          sideImage: `/vehicles/japan-lexus-es-side.jpg`,
          frontImage: `/vehicles/japan-lexus-es-front.jpg`,
          specs: { engine: '2.5 л', power: '203 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Lexus RX',
          bodyType: 'Внедорожник',
          price: 'от 4 100 000 ₽',
          sideImage: `/vehicles/japan-lexus-rx-side.jpg`,
          frontImage: `/vehicles/japan-lexus-rx-front.jpg`,
          specs: { engine: '2.4 л Turbo', power: '275 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Lexus NX',
          bodyType: 'Кроссовер',
          price: 'от 3 800 000 ₽',
          sideImage: `/vehicles/japan-lexus-nx-side.jpg`,
          frontImage: `/vehicles/japan-lexus-nx-side.jpg`,
          specs: { engine: '2.4 л Turbo', power: '279 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.6 л/100км' },
        },
      ],
    },
    {
      brand: 'Honda',
      variants: [
        {
          model: 'Honda Civic',
          bodyType: 'Седан',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/japan-honda-civic-side.jpg`,
          frontImage: `/vehicles/japan-honda-civic-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '182 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Honda CR-V',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/japan-honda-cr-v-side.jpg`,
          frontImage: `/vehicles/japan-honda-cr-v-front.jpg`,
          specs: { engine: '1.5 л Turbo', power: '193 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Honda Stepwgn',
          bodyType: 'Минивэн',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/japan-honda-stepwgn-side.jpg`,
          frontImage: `/vehicles/japan-honda-stepwgn-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Honda Vezel',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/japan-honda-vezel-side.jpg`,
          frontImage: `/vehicles/japan-honda-vezel-side.jpg`,
          specs: { engine: '1.5 л Гибрид', power: '107 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.8 л/100км' },
        },
        {
          model: 'Honda Freed',
          bodyType: 'Минивэн',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/japan-honda-freed-side.jpg`,
          frontImage: `/vehicles/japan-honda-freed-side.jpg`,
          specs: { engine: '1.5 л Гибрид', power: '106 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.4 л/100км' },
        },
        {
          model: 'Honda Fit',
          bodyType: 'Хэтчбек',
          price: 'от 1 500 000 ₽',
          sideImage: `/vehicles/japan-honda-fit-side.jpg`,
          frontImage: `/vehicles/japan-honda-fit-side.jpg`,
          specs: { engine: '1.3 л', power: '98 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.0 л/100км' },
        },
        {
          model: 'Honda XR-V',
          bodyType: 'Кроссовер',
          price: 'от 1 950 000 ₽',
          sideImage: `/vehicles/japan-honda-xr-v-side.jpg`,
          frontImage: `/vehicles/japan-honda-xr-v-side.jpg`,
          specs: { engine: '1.5 л', power: '119 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.1 л/100км' },
        },
        {
          model: 'Honda Crider',
          bodyType: 'Седан',
          price: 'от 1 850 000 ₽',
          sideImage: `/vehicles/japan-honda-crider-side.jpg`,
          frontImage: `/vehicles/japan-honda-crider-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '182 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Nissan',
      variants: [
        {
          model: 'Nissan Altima',
          bodyType: 'Седан',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/japan-nissan-altima-side.jpg`,
          frontImage: `/vehicles/japan-nissan-altima-front.jpg`,
          specs: { engine: '2.5 л', power: '188 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Nissan Qashqai',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `/vehicles/japan-nissan-qashqai-side.jpg`,
          frontImage: `/vehicles/japan-nissan-qashqai-front.jpg`,
          specs: { engine: '1.3 л Turbo', power: '158 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Nissan X-Trail',
          bodyType: 'Внедорожник',
          price: 'от 2 800 000 ₽',
          sideImage: `/vehicles/japan-nissan-x-trail-side.jpg`,
          frontImage: `/vehicles/japan-nissan-x-trail-side.jpg`,
          specs: { engine: '1.5 л Turbo e-Power', power: '204 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '6.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Mazda',
      variants: [
        {
          model: 'Mazda 6',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/japan-mazda-6-side.jpg`,
          frontImage: `/vehicles/japan-mazda-6-front.jpg`,
          specs: { engine: '2.5 л', power: '192 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.1 л/100км' },
        },
        {
          model: 'Mazda 3',
          bodyType: 'Хэтчбек',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/japan-mazda-3-side.jpg`,
          frontImage: `/vehicles/japan-mazda-3-front.jpg`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Mazda CX-5',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/japan-mazda-cx-5-side.jpg`,
          frontImage: `/vehicles/japan-mazda-cx-5-side.jpg`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
        },
        {
          model: 'Mazda CX-30',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/japan-mazda-cx-30-side.jpg`,
          frontImage: `/vehicles/japan-mazda-cx-30-side.jpg`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Mazda CX-50',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/japan-mazda-cx-50-side.jpg`,
          frontImage: `/vehicles/japan-mazda-cx-50-side.jpg`,
          specs: { engine: '2.5 л Turbo', power: '256 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.1 л/100км' },
        },
      ],
    },
    {
      brand: 'Mitsubishi',
      variants: [
        {
          model: 'Mitsubishi Outlander',
          bodyType: 'Внедорожник',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-outlander-side.jpg`,
          frontImage: `/vehicles/japan-mitsubishi-outlander-front.jpg`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Mitsubishi ASX',
          bodyType: 'Кроссовер',
          price: 'от 1 800 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-asx-side.jpg`,
          frontImage: `/vehicles/japan-mitsubishi-asx-front.jpg`,
          specs: { engine: '2.0 л', power: '146 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '7.4 л/100км' },
        },
        {
          model: 'Mitsubishi Eclipse Cross',
          bodyType: 'Кроссовер',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-eclipse-cross-side.jpg`,
          frontImage: `/vehicles/japan-mitsubishi-eclipse-cross-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '163 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Mitsubishi Delica D:5',
          bodyType: 'Минивэн',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-delica-d5-side.jpg`,
          frontImage: `/vehicles/japan-mitsubishi-delica-d5-side.jpg`,
          specs: { engine: '2.2 л Дизель', power: '150 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2022', consumption: '8.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Subaru',
      variants: [
        {
          model: 'Subaru Forester',
          bodyType: 'Внедорожник',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/japan-subaru-forester-side.jpg`,
          frontImage: `/vehicles/japan-subaru-forester-side.jpg`,
          specs: { engine: '2.5 л', power: '182 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.4 л/100км' },
        },
      ],
    },
    {
      brand: 'Suzuki',
      variants: [
        {
          model: 'Suzuki Jimny',
          bodyType: 'Внедорожник',
          price: 'от 2 300 000 ₽',
          sideImage: `/vehicles/japan-suzuki-jimny-side.jpg`,
          frontImage: `/vehicles/japan-suzuki-jimny-side.jpg`,
          specs: { engine: '1.5 л', power: '102 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '6.9 л/100км' },
        },
      ],
    },
  ],
  korea: [
    {
      brand: 'Kia',
      variants: [
        {
          model: 'Kia K5',
          bodyType: 'Седан',
          price: 'от 1 800 000 ₽',
          sideImage: `/vehicles/korea-kia-k5-side.jpg`,
          frontImage: `/vehicles/korea-kia-k5-front.jpg`,
          specs: { engine: '1.6 л Turbo', power: '180 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Kia Sportage',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/korea-kia-sportage-side.jpg`,
          frontImage: `/vehicles/korea-kia-sportage-front.jpg`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Kia Seltos',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/korea-kia-seltos-side.jpg`,
          frontImage: `/vehicles/korea-kia-seltos-side.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Kia K3',
          bodyType: 'Седан',
          price: 'от 1 700 000 ₽',
          sideImage: `/vehicles/korea-kia-k3-side.jpg`,
          frontImage: `/vehicles/korea-kia-k3-side.jpg`,
          specs: { engine: '1.6 л', power: '128 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.5 л/100км' },
        },
        {
          model: 'Kia KX1',
          bodyType: 'Кроссовер',
          price: 'от 1 650 000 ₽',
          sideImage: `/vehicles/korea-kia-kx1-side.jpg`,
          frontImage: `/vehicles/korea-kia-kx1-side.jpg`,
          specs: { engine: '1.5 л', power: '115 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.3 л/100км' },
        },
      ],
    },
    {
      brand: 'Hyundai',
      variants: [
        {
          model: 'Hyundai Sonata',
          bodyType: 'Седан',
          price: 'от 1 700 000 ₽',
          sideImage: `/vehicles/korea-hyundai-sonata-side.jpg`,
          frontImage: `/vehicles/korea-hyundai-sonata-front.jpg`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Hyundai Tucson',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/korea-hyundai-tucson-side.jpg`,
          frontImage: `/vehicles/korea-hyundai-tucson-front.jpg`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.2 л/100км' },
        },
        {
          model: 'Hyundai Elantra',
          bodyType: 'Седан',
          price: 'от 1 750 000 ₽',
          sideImage: `/vehicles/korea-hyundai-elantra-side.jpg`,
          frontImage: `/vehicles/korea-hyundai-elantra-side.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Hyundai ix35',
          bodyType: 'Кроссовер',
          price: 'от 1 950 000 ₽',
          sideImage: `/vehicles/korea-hyundai-ix35-side.jpg`,
          frontImage: `/vehicles/korea-hyundai-ix35-side.jpg`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.0 л/100км' },
        },
      ],
    },
    {
      brand: 'Genesis',
      variants: [
        {
          model: 'Genesis G80',
          bodyType: 'Седан',
          price: 'от 4 200 000 ₽',
          sideImage: `/vehicles/korea-genesis-g80-side.jpg`,
          frontImage: `/vehicles/korea-genesis-g80-front.jpg`,
          specs: { engine: '2.5 л Turbo', power: '304 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.5 л/100км' },
        },
        {
          model: 'Genesis GV80',
          bodyType: 'Внедорожник',
          price: 'от 4 800 000 ₽',
          sideImage: `/vehicles/korea-genesis-gv80-side.jpg`,
          frontImage: `/vehicles/korea-genesis-gv80-front.jpg`,
          specs: { engine: '3.5 л Turbo', power: '375 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.2 л/100км' },
        },
      ],
    },
    {
      brand: 'SsangYong',
      variants: [
        {
          model: 'SsangYong Rexton',
          bodyType: 'Внедорожник',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/korea-ssangyong-rexton-side.jpg`,
          frontImage: `/vehicles/korea-ssangyong-rexton-front.jpg`,
          specs: { engine: '2.2 л Дизель', power: '202 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2022', consumption: '9.0 л/100км' },
        },
      ],
    },
    {
      brand: 'Kia Sorento',
      variants: [
        {
          model: 'Kia Sorento',
          bodyType: 'Внедорожник',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/korea-kia-sorento-side.jpg`,
          frontImage: `/vehicles/korea-kia-sorento-front.jpg`,
          specs: { engine: '2.5 л', power: '191 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.3 л/100км' },
        },
      ],
    },
    {
      brand: 'Hyundai Palisade',
      variants: [
        {
          model: 'Hyundai Palisade',
          bodyType: 'Внедорожник',
          price: 'от 3 400 000 ₽',
          sideImage: `/vehicles/korea-hyundai-palisade-side.jpg`,
          frontImage: `/vehicles/korea-hyundai-palisade-front.jpg`,
          specs: { engine: '3.8 л', power: '295 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '11.5 л/100км' },
        },
      ],
    },
  ],
  europe: [
    {
      brand: 'BMW',
      variants: [
        {
          model: 'BMW 5 Series',
          bodyType: 'Седан',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-bmw-5-series-side.jpg`,
          frontImage: `/vehicles/europe-bmw-5-series-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 5 Series Touring',
          bodyType: 'Универсал',
          price: 'от 3 400 000 ₽',
          sideImage: `/vehicles/europe-bmw-5-series-touring-side.jpg`,
          frontImage: `/vehicles/europe-bmw-5-series-touring-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'BMW X3',
          bodyType: 'Кроссовер',
          price: 'от 3 600 000 ₽',
          sideImage: `/vehicles/europe-bmw-x3-side.jpg`,
          frontImage: `/vehicles/europe-bmw-x3-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '252 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'BMW 3 серии',
          bodyType: 'Седан',
          price: 'от 3 100 000 ₽',
          sideImage: `/vehicles/europe-bmw-3--side.jpg`,
          frontImage: `/vehicles/europe-bmw-3--side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '184 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.0 л/100км' },
        },
        {
          model: 'BMW X1',
          bodyType: 'Кроссовер',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-bmw-x1-side.jpg`,
          frontImage: `/vehicles/europe-bmw-x1-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '170 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 1 серии',
          bodyType: 'Хэтчбек',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/europe-bmw-1--side.jpg`,
          frontImage: `/vehicles/europe-bmw-1--side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '136 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.3 л/100км' },
        },
        {
          model: 'BMW X5',
          bodyType: 'Внедорожник',
          price: 'от 5 900 000 ₽',
          sideImage: `/vehicles/europe-bmw-x5-side.jpg`,
          frontImage: `/vehicles/europe-bmw-x5-side.jpg`,
          specs: { engine: '3.0 л Turbo', power: '340 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.8 л/100км' },
        },
      ],
    },
    {
      brand: 'Mercedes-Benz',
      variants: [
        {
          model: 'Mercedes-Benz E-Class',
          bodyType: 'Седан',
          price: 'от 3 600 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-e-class-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-e-class-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.0 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLE Coupe',
          bodyType: 'Купе',
          price: 'от 4 200 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-cle-coupe-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-cle-coupe-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLE',
          bodyType: 'Внедорожник',
          price: 'от 5 200 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-gle-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-gle-front.jpg`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz A-Класс',
          bodyType: 'Хэтчбек',
          price: 'от 2 800 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-a--side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-a--side.jpg`,
          specs: { engine: '1.3 л Turbo', power: '163 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLB',
          bodyType: 'Кроссовер',
          price: 'от 3 800 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-glb-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-glb-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '224 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz G-Класс AMG',
          bodyType: 'Внедорожник',
          price: 'от 9 800 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-g-amg-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-g-amg-side.jpg`,
          specs: { engine: '4.0 л Turbo V8', power: '585 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '13.9 л/100км' },
        },
        {
          model: 'Mercedes-Benz G-Класс',
          bodyType: 'Внедорожник',
          price: 'от 8 200 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-g--side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-g--side.jpg`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '12.3 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLA',
          bodyType: 'Купе',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-cla-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-cla-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '224 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.1 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLC Coupe',
          bodyType: 'Купе',
          price: 'от 4 700 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-glc-coupe-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-glc-coupe-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLS',
          bodyType: 'Внедорожник',
          price: 'от 7 500 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-gls-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-gls-side.jpg`,
          specs: { engine: '3.0 л Turbo', power: '381 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.6 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLC',
          bodyType: 'Кроссовер',
          price: 'от 4 400 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-glc-side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-glc-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Mercedes-Benz C-Класс',
          bodyType: 'Седан',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-c--side.jpg`,
          frontImage: `/vehicles/europe-mercedes-benz-c--side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '204 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.3 л/100км' },
        },
      ],
    },
    {
      brand: 'Audi',
      variants: [
        {
          model: 'Audi A6',
          bodyType: 'Седан',
          price: 'от 3 000 000 ₽',
          sideImage: `/vehicles/europe-audi-a6-side.jpg`,
          frontImage: `/vehicles/europe-audi-a6-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.9 л/100км' },
        },
        {
          model: 'Audi A6 Avant',
          bodyType: 'Универсал',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-audi-a6-avant-side.jpg`,
          frontImage: `/vehicles/europe-audi-a6-avant-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Audi Q5',
          bodyType: 'Кроссовер',
          price: 'от 3 500 000 ₽',
          sideImage: `/vehicles/europe-audi-q5-side.jpg`,
          frontImage: `/vehicles/europe-audi-q5-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '249 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.6 л/100км' },
        },
        {
          model: 'Audi A3',
          bodyType: 'Хэтчбек',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/europe-audi-a3-side.jpg`,
          frontImage: `/vehicles/europe-audi-a3-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.1 л/100км' },
        },
        {
          model: 'Audi Q3',
          bodyType: 'Кроссовер',
          price: 'от 3 100 000 ₽',
          sideImage: `/vehicles/europe-audi-q3-side.jpg`,
          frontImage: `/vehicles/europe-audi-q3-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Audi Q2',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/europe-audi-q2-side.jpg`,
          frontImage: `/vehicles/europe-audi-q2-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.4 л/100км' },
        },
        {
          model: 'Audi A5',
          bodyType: 'Купе',
          price: 'от 3 600 000 ₽',
          sideImage: `/vehicles/europe-audi-a5-side.jpg`,
          frontImage: `/vehicles/europe-audi-a5-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '204 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.6 л/100км' },
        },
      ],
    },
    {
      brand: 'Volkswagen',
      variants: [
        {
          model: 'Volkswagen Golf',
          bodyType: 'Хэтчбек',
          price: 'от 2 300 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-golf-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-golf-front.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.2 л/100км' },
        },
        {
          model: 'Volkswagen Tiguan',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-tiguan-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-tiguan-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
        },
        {
          model: 'Volkswagen Tayron',
          bodyType: 'Кроссовер',
          price: 'от 3 000 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-tayron-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-tayron-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'Volkswagen Multivan',
          bodyType: 'Минивэн',
          price: 'от 4 500 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-multivan-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-multivan-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '204 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Volkswagen T-Roc',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-t-roc-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-t-roc-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Volkswagen Lamando',
          bodyType: 'Лифтбек',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-lamando-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-lamando-side.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.6 л/100км' },
        },
        {
          model: 'Volkswagen Teramont',
          bodyType: 'Внедорожник',
          price: 'от 3 800 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-teramont-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-teramont-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '220 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.8 л/100км' },
        },
        {
          model: 'Volkswagen Tharu',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-tharu-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-tharu-side.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Volkswagen Passat',
          bodyType: 'Седан',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-passat-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-passat-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Volkswagen Sagitar',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-sagitar-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-sagitar-side.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.3 л/100км' },
        },
        {
          model: 'Volkswagen T-Cross',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-t-cross-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-t-cross-side.jpg`,
          specs: { engine: '1.0 л Turbo', power: '116 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '5.8 л/100км' },
        },
        {
          model: 'Volkswagen Touran',
          bodyType: 'Минивэн',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-touran-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-touran-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Volkswagen Transporter',
          bodyType: 'Фургон',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-transporter-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-transporter-side.jpg`,
          specs: { engine: '2.0 л Turbo Дизель', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.5 л/100км' },
        },
        {
          model: 'Volkswagen Polo',
          bodyType: 'Седан',
          price: 'от 1 600 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-polo-side.jpg`,
          frontImage: `/vehicles/europe-volkswagen-polo-side.jpg`,
          specs: { engine: '1.6 л', power: '110 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Skoda',
      variants: [
        {
          model: 'Skoda Octavia',
          bodyType: 'Лифтбек',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/europe-skoda-octavia-side.jpg`,
          frontImage: `/vehicles/europe-skoda-octavia-side.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.4 л/100км' },
        },
        {
          model: 'Skoda Superb',
          bodyType: 'Лифтбек',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/europe-skoda-superb-side.jpg`,
          frontImage: `/vehicles/europe-skoda-superb-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.9 л/100км' },
        },
        {
          model: 'Skoda Kodiaq',
          bodyType: 'Внедорожник',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-skoda-kodiaq-side.jpg`,
          frontImage: `/vehicles/europe-skoda-kodiaq-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Skoda Karoq',
          bodyType: 'Кроссовер',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/europe-skoda-karoq-side.jpg`,
          frontImage: `/vehicles/europe-skoda-karoq-side.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.4 л/100км' },
        },
      ],
    },
    {
      brand: 'Mini',
      variants: [
        {
          model: 'Mini Countryman',
          bodyType: 'Кроссовер',
          price: 'от 3 400 000 ₽',
          sideImage: `/vehicles/europe-mini-countryman-side.jpg`,
          frontImage: `/vehicles/europe-mini-countryman-side.jpg`,
          specs: { engine: '2.0 л Turbo', power: '204 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.6 л/100км' },
        },
      ],
    },
    {
      brand: 'Porsche',
      variants: [
        {
          model: 'Porsche 911',
          bodyType: 'Купе',
          price: 'от 6 500 000 ₽',
          sideImage: `/vehicles/europe-porsche-911-side.jpg`,
          frontImage: `/vehicles/europe-porsche-911-front.jpg`,
          specs: { engine: '3.0 л Turbo', power: '385 л.с.', drive: 'Задний', transmission: 'Робот', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Porsche Cayenne',
          bodyType: 'Внедорожник',
          price: 'от 7 200 000 ₽',
          sideImage: `/vehicles/europe-porsche-cayenne-side.jpg`,
          frontImage: `/vehicles/europe-porsche-cayenne-front.jpg`,
          specs: { engine: '3.0 л Turbo', power: '340 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.0 л/100км' },
        },
      ],
    },
    {
      brand: 'Range Rover',
      variants: [
        {
          model: 'Range Rover Vogue',
          bodyType: 'Внедорожник',
          price: 'от 5 800 000 ₽',
          sideImage: `/vehicles/europe-range-rover-vogue-side.jpg`,
          frontImage: `/vehicles/europe-range-rover-vogue-front.jpg`,
          specs: { engine: '3.0 л Turbo', power: '400 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.8 л/100км' },
        },
      ],
    },
  ],
  usa: [
    {
      brand: 'Tesla',
      variants: [
        {
          model: 'Tesla Model S',
          bodyType: 'Седан',
          price: 'от 4 000 000 ₽',
          sideImage: `/vehicles/usa-tesla-model-s-side.jpg`,
          frontImage: `/vehicles/usa-tesla-model-s-front.jpg`,
          specs: { engine: 'Электро', power: '670 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.0 кВт·ч/100км' },
        },
        {
          model: 'Tesla Model Y',
          bodyType: 'Кроссовер',
          price: 'от 3 700 000 ₽',
          sideImage: `/vehicles/usa-tesla-model-y-side.jpg`,
          frontImage: `/vehicles/usa-tesla-model-y-front.jpg`,
          specs: { engine: 'Электро', power: '384 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '15.5 кВт·ч/100км' },
        },
      ],
    },
    {
      brand: 'Jeep',
      variants: [
        {
          model: 'Jeep Grand Cherokee',
          bodyType: 'Внедорожник',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/usa-jeep-grand-cherokee-side.jpg`,
          frontImage: `/vehicles/usa-jeep-grand-cherokee-front.jpg`,
          specs: { engine: '3.6 л', power: '290 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '11.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Ford',
      variants: [
        {
          model: 'Ford F-150',
          bodyType: 'Пикап',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/usa-ford-f-150-side.jpg`,
          frontImage: `/vehicles/usa-ford-f-150-front.jpg`,
          specs: { engine: '3.5 л Turbo', power: '400 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '12.5 л/100км' },
        },
        {
          model: 'Ford Explorer',
          bodyType: 'Внедорожник',
          price: 'от 3 100 000 ₽',
          sideImage: `/vehicles/usa-ford-explorer-side.jpg`,
          frontImage: `/vehicles/usa-ford-explorer-front.jpg`,
          specs: { engine: '2.3 л Turbo', power: '300 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '10.8 л/100км' },
        },
      ],
    },
    {
      brand: 'Cadillac',
      variants: [
        {
          model: 'Cadillac CT5',
          bodyType: 'Седан',
          price: 'от 5 500 000 ₽',
          sideImage: `/vehicles/usa-cadillac-ct5-side.jpg`,
          frontImage: `/vehicles/usa-cadillac-ct5-front.jpg`,
          specs: { engine: '2.0 л Turbo', power: '237 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '9.0 л/100км' },
        },
        {
          model: 'Cadillac Escalade',
          bodyType: 'Внедорожник',
          price: 'от 8 500 000 ₽',
          sideImage: `/vehicles/usa-cadillac-escalade-side.jpg`,
          frontImage: `/vehicles/usa-cadillac-escalade-front.jpg`,
          specs: { engine: '6.2 л', power: '426 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '14.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Chevrolet',
      variants: [
        {
          model: 'Chevrolet Silverado',
          bodyType: 'Пикап',
          price: 'от 4 300 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-silverado-side.jpg`,
          frontImage: `/vehicles/usa-chevrolet-silverado-front.jpg`,
          specs: { engine: '5.3 л', power: '355 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '13.2 л/100км' },
        },
        {
          model: 'Chevrolet Tahoe',
          bodyType: 'Внедорожник',
          price: 'от 5 900 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-tahoe-side.jpg`,
          frontImage: `/vehicles/usa-chevrolet-tahoe-front.jpg`,
          specs: { engine: '5.3 л', power: '355 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '13.8 л/100км' },
        },
        {
          model: 'Chevrolet TrailBlazer',
          bodyType: 'Внедорожник',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-trailblazer-side.jpg`,
          frontImage: `/vehicles/usa-chevrolet-trailblazer-side.jpg`,
          specs: { engine: '2.0 л Turbo Дизель', power: '184 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.5 л/100км' },
        },
        {
          model: 'Chevrolet Orlando',
          bodyType: 'Минивэн',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-orlando-side.jpg`,
          frontImage: `/vehicles/usa-chevrolet-orlando-side.jpg`,
          specs: { engine: '1.8 л', power: '141 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.2 л/100км' },
        },
        {
          model: 'Chevrolet Trax',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-trax-side.jpg`,
          frontImage: `/vehicles/usa-chevrolet-trax-side.jpg`,
          specs: { engine: '1.2 л Turbo', power: '137 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.0 л/100км' },
        },
      ],
    },
    {
      brand: 'Ram',
      variants: [
        {
          model: 'Ram 1500',
          bodyType: 'Пикап',
          price: 'от 5 200 000 ₽',
          sideImage: `/vehicles/usa-ram-1500-side.jpg`,
          frontImage: `/vehicles/usa-ram-1500-side.jpg`,
          specs: { engine: '5.7 л V8', power: '395 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '14.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Dodge',
      variants: [
        {
          model: 'Dodge Charger',
          bodyType: 'Седан',
          price: 'от 3 600 000 ₽',
          sideImage: `/vehicles/usa-dodge-charger-side.jpg`,
          frontImage: `/vehicles/usa-dodge-charger-front.jpg`,
          specs: { engine: '3.6 л V6', power: '292 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2022', consumption: '11.0 л/100км' },
        },
        {
          model: 'Dodge Challenger',
          bodyType: 'Купе',
          price: 'от 3 900 000 ₽',
          sideImage: `/vehicles/usa-dodge-challenger-side.jpg`,
          frontImage: `/vehicles/usa-dodge-challenger-front.jpg`,
          specs: { engine: '5.7 л V8', power: '375 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2022', consumption: '13.5 л/100км' },
        },
      ],
    },
  ],
  uae: [
    {
      brand: 'Rolls-Royce',
      variants: [
        {
          model: 'Rolls-Royce Cullinan',
          bodyType: 'Внедорожник',
          price: 'от 42 000 000 ₽',
          sideImage: `/vehicles/uae-rolls-royce-cullinan-side.jpg`,
          frontImage: `/vehicles/uae-rolls-royce-cullinan-front.jpg`,
          specs: { engine: '6.75 л V12 Twin-Turbo', power: '571 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '17.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Bentley',
      variants: [
        {
          model: 'Bentley Bentayga',
          bodyType: 'Внедорожник',
          price: 'от 22 000 000 ₽',
          sideImage: `/vehicles/uae-bentley-bentayga-side.jpg`,
          frontImage: `/vehicles/uae-bentley-bentayga-front.jpg`,
          specs: { engine: '4.0 л V8 Twin-Turbo', power: '550 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '13.1 л/100км' },
        },
      ],
    },
    {
      brand: 'Ferrari',
      variants: [
        {
          model: 'Ferrari Roma',
          bodyType: 'Купе',
          price: 'от 28 000 000 ₽',
          sideImage: `/vehicles/uae-ferrari-roma-side.jpg`,
          frontImage: `/vehicles/uae-ferrari-roma-front.jpg`,
          specs: { engine: '3.9 л V8 Twin-Turbo', power: '620 л.с.', drive: 'Задний', transmission: 'Робот', year: '2024', consumption: '11.2 л/100км' },
        },
      ],
    },
    {
      brand: 'Lamborghini',
      variants: [
        {
          model: 'Lamborghini Urus',
          bodyType: 'Внедорожник',
          price: 'от 31 000 000 ₽',
          sideImage: `/vehicles/uae-lamborghini-urus-side.jpg`,
          frontImage: `/vehicles/uae-lamborghini-urus-front.jpg`,
          specs: { engine: '4.0 л V8 Twin-Turbo', power: '666 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '14.7 л/100км' },
        },
      ],
    },
    {
      brand: 'Mercedes-Maybach',
      variants: [
        {
          model: 'Mercedes-Maybach S-Class',
          bodyType: 'Седан',
          price: 'от 19 500 000 ₽',
          sideImage: `/vehicles/uae-mercedes-maybach-s-class-side.jpg`,
          frontImage: `/vehicles/uae-mercedes-maybach-s-class-front.jpg`,
          specs: { engine: '4.0 л V8 Twin-Turbo', power: '496 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.5 л/100км' },
        },
      ],
    },
    {
      brand: 'Nissan',
      variants: [
        {
          model: 'Nissan Patrol Nismo',
          bodyType: 'Внедорожник',
          price: 'от 9 800 000 ₽',
          sideImage: `/vehicles/uae-nissan-patrol-nismo-side.jpg`,
          frontImage: `/vehicles/uae-nissan-patrol-nismo-front.jpg`,
          specs: { engine: '5.6 л V8', power: '428 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '17.0 л/100км' },
        },
      ],
    },
    {
      brand: 'Toyota',
      variants: [
        {
          model: 'Toyota Land Cruiser 300 VXR',
          bodyType: 'Внедорожник',
          price: 'от 11 500 000 ₽',
          sideImage: `/vehicles/uae-toyota-land-cruiser-300-vxr-side.jpg`,
          frontImage: `/vehicles/uae-toyota-land-cruiser-300-vxr-front.jpg`,
          specs: { engine: '3.5 л V6 Twin-Turbo', power: '415 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '12.4 л/100км' },
        },
      ],
    },
    {
      brand: 'Cadillac',
      variants: [
        {
          model: 'Cadillac Escalade',
          bodyType: 'Внедорожник',
          price: 'от 13 200 000 ₽',
          sideImage: `/vehicles/uae-cadillac-escalade-side.jpg`,
          frontImage: `/vehicles/uae-cadillac-escalade-front.jpg`,
          specs: { engine: '6.2 л V8', power: '426 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '15.8 л/100км' },
        },
      ],
    },
    {
      brand: 'BMW',
      variants: [
        {
          model: 'BMW 7 Series',
          bodyType: 'Седан',
          price: 'от 14 800 000 ₽',
          sideImage: `/vehicles/uae-bmw-7-series-side.jpg`,
          frontImage: `/vehicles/uae-bmw-7-series-front.jpg`,
          specs: { engine: '3.0 л Turbo', power: '381 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '9.0 л/100км' },
        },
      ],
    },
    {
      brand: 'Porsche',
      variants: [
        {
          model: 'Porsche Cayenne Turbo GT',
          bodyType: 'Внедорожник',
          price: 'от 17 900 000 ₽',
          sideImage: `/vehicles/uae-porsche-cayenne-turbo-gt-side.jpg`,
          frontImage: `/vehicles/uae-porsche-cayenne-turbo-gt-front.jpg`,
          specs: { engine: '4.0 л V8 Twin-Turbo', power: '640 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '13.4 л/100км' },
        },
      ],
    },
  ],
};

export const countryNames: Record<CountryKey, string> = {
  china: 'Китай',
  japan: 'Япония',
  korea: 'Корея',
  europe: 'Европа',
  usa: 'США',
  uae: 'ОАЭ',
};

export interface CatalogEntry {
  country: CountryKey;
  countryName: string;
  slug: string;
  model: CarModel;
  variant: CarVariant;
}

const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const catalogEntries: CatalogEntry[] = (Object.keys(carsByCountry) as CountryKey[]).flatMap((country) =>
  carsByCountry[country].flatMap((model) =>
    model.variants.map((variant) => ({
      country,
      countryName: countryNames[country],
      slug: toSlug(variant.model),
      model,
      variant,
    }))
  )
);

export const findCatalogEntry = (country: string, slug: string): CatalogEntry | undefined =>
  catalogEntries.find((e) => e.country === country && e.slug === slug);

export const catalogEntriesByCountry = (country: CountryKey): CatalogEntry[] =>
  catalogEntries.filter((e) => e.country === country);