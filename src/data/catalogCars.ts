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
          sideImage: `/vehicles/china-zeekr-007-side.webp`,
          frontImage: `/vehicles/china-zeekr-007-front.webp`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '18.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 001',
          bodyType: 'Лифтбек',
          price: 'от 3 400 000 ₽',
          sideImage: `/vehicles/china-zeekr-001-side.webp`,
          frontImage: `/vehicles/china-zeekr-001-front.webp`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '19.2 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 8X',
          bodyType: 'Кроссовер',
          price: 'от 4 200 000 ₽',
          sideImage: `/vehicles/china-zeekr-8x-side.webp`,
          frontImage: `/vehicles/china-zeekr-8x-front.webp`,
          specs: { engine: 'Электро', power: '490 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '17.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 9X',
          bodyType: 'Внедорожник',
          price: 'от 5 500 000 ₽',
          sideImage: `/vehicles/china-zeekr-9x-side.webp`,
          frontImage: `/vehicles/china-zeekr-9x-front.webp`,
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
          sideImage: `/vehicles/china-li-auto-l9-side.webp`,
          frontImage: `/vehicles/china-li-auto-l9-front.webp`,
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
          sideImage: `/vehicles/china-chery-arrizo-8-side.webp`,
          frontImage: `/vehicles/china-chery-arrizo-8-front.webp`,
          specs: { engine: '1.6 л Turbo', power: '197 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Chery Tiggo 7 Pro',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `/vehicles/china-chery-tiggo-7-pro-side.webp`,
          frontImage: `/vehicles/china-chery-tiggo-7-pro-front.webp`,
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
          sideImage: `/vehicles/china-byd-han-side.webp`,
          frontImage: `/vehicles/china-byd-han-front.webp`,
          specs: { engine: 'Электро', power: '517 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.9 кВт·ч/100км' },
        },
        {
          model: 'BYD Song Plus',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/china-byd-song-plus-side.webp`,
          frontImage: `/vehicles/china-byd-song-plus-front.webp`,
          specs: { engine: 'Гибрид', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '5.3 л/100км' },
        },
        {
          model: 'BYD Qin Wagon',
          bodyType: 'Универсал',
          price: 'от 2 300 000 ₽',
          sideImage: `/vehicles/china-byd-qin-wagon-side.webp`,
          frontImage: `/vehicles/china-byd-qin-wagon-front.webp`,
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
          sideImage: `/vehicles/china-geely-preface-side.webp`,
          frontImage: `/vehicles/china-geely-preface-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Geely Coolray',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/china-geely-coolray-side.webp`,
          frontImage: `/vehicles/china-geely-coolray-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.3 л/100км' },
        },
        {
          model: 'Geely Monjaro',
          bodyType: 'Внедорожник',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/china-geely-monjaro-side.webp`,
          frontImage: `/vehicles/china-geely-monjaro-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '238 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.5 л/100км' },
        },
        {
          model: 'Geely Galaxy Starship 7',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/china-geely-galaxy-starship-7-side.webp`,
          frontImage: `/vehicles/china-geely-galaxy-starship-7-front.webp`,
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
          sideImage: `/vehicles/china-haval-h6-side.webp`,
          frontImage: `/vehicles/china-haval-h6-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Полный', transmission: 'Робот', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Haval Jolion',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/china-haval-jolion-side.webp`,
          frontImage: `/vehicles/china-haval-jolion-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Haval M6',
          bodyType: 'Кроссовер',
          price: 'от 1 750 000 ₽',
          sideImage: `/vehicles/china-haval-m6-side.webp`,
          frontImage: `/vehicles/china-haval-m6-front.webp`,
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
          sideImage: `/vehicles/china-gac-trumpchi-m6-pro-side.webp`,
          frontImage: `/vehicles/china-gac-trumpchi-m6-pro-front.webp`,
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
          sideImage: `/vehicles/china-gac-s7-side.webp`,
          frontImage: `/vehicles/china-gac-s7-front.webp`,
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
          sideImage: `/vehicles/china-changan-qiyuan-a06-side.webp`,
          frontImage: `/vehicles/china-changan-qiyuan-a06-front.webp`,
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
          sideImage: `/vehicles/china-jetta-vs5-side.webp`,
          frontImage: `/vehicles/china-jetta-vs5-front.webp`,
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
          sideImage: `/vehicles/china-lynk-co-900-side.webp`,
          frontImage: `/vehicles/china-lynk-co-900-front.webp`,
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
          sideImage: `/vehicles/china-voyah-taishan-side.webp`,
          frontImage: `/vehicles/china-voyah-taishan-front.webp`,
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
          sideImage: `/vehicles/china-volkswagen-passat-nms-side.webp`,
          frontImage: `/vehicles/china-volkswagen-passat-nms-front.webp`,
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
          sideImage: `/vehicles/japan-toyota-camry-side.webp`,
          frontImage: `/vehicles/japan-toyota-camry-front.webp`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Toyota RAV4',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/japan-toyota-rav4-side.webp`,
          frontImage: `/vehicles/japan-toyota-rav4-front.webp`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Toyota Corolla Touring',
          bodyType: 'Универсал',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/japan-toyota-corolla-touring-side.webp`,
          frontImage: `/vehicles/japan-toyota-corolla-touring-front.webp`,
          specs: { engine: '1.8 л Гибрид', power: '122 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.5 л/100км' },
        },
        {
          model: 'Toyota Corolla',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/japan-toyota-corolla-side.webp`,
          frontImage: `/vehicles/japan-toyota-corolla-front.webp`,
          specs: { engine: '1.8 л', power: '140 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.9 л/100км' },
        },
        {
          model: 'Toyota Yaris',
          bodyType: 'Хэтчбек',
          price: 'от 1 700 000 ₽',
          sideImage: `/vehicles/japan-toyota-yaris-side.webp`,
          frontImage: `/vehicles/japan-toyota-yaris-front.webp`,
          specs: { engine: '1.5 л', power: '120 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.0 л/100км' },
        },
        {
          model: 'Toyota Highlander',
          bodyType: 'Внедорожник',
          price: 'от 3 500 000 ₽',
          sideImage: `/vehicles/japan-toyota-highlander-side.webp`,
          frontImage: `/vehicles/japan-toyota-highlander-front.webp`,
          specs: { engine: '2.4 л Turbo', power: '265 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.3 л/100км' },
        },
        {
          model: 'Toyota Probox',
          bodyType: 'Универсал',
          price: 'от 1 400 000 ₽',
          sideImage: `/vehicles/japan-toyota-probox-side.webp`,
          frontImage: `/vehicles/japan-toyota-probox-front.webp`,
          specs: { engine: '1.5 л', power: '99 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '6.2 л/100км' },
        },
        {
          model: 'Toyota Land Cruiser Prado',
          bodyType: 'Внедорожник',
          price: 'от 5 800 000 ₽',
          sideImage: `/vehicles/japan-toyota-land-cruiser-prado-side.webp`,
          frontImage: `/vehicles/japan-toyota-land-cruiser-prado-front.webp`,
          specs: { engine: '2.7 л', power: '163 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Toyota bZ3X',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/japan-toyota-bz3x-side.webp`,
          frontImage: `/vehicles/japan-toyota-bz3x-front.webp`,
          specs: { engine: 'Электро', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '15.0 кВт·ч/100км' },
        },
        {
          model: 'Toyota Levin',
          bodyType: 'Седан',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/japan-toyota-levin-side.webp`,
          frontImage: `/vehicles/japan-toyota-levin-front.webp`,
          specs: { engine: '1.2 л Turbo', power: '116 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.8 л/100км' },
        },
        {
          model: 'Toyota Hilux',
          bodyType: 'Пикап',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/japan-toyota-hilux-side.webp`,
          frontImage: `/vehicles/japan-toyota-hilux-front.webp`,
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
          sideImage: `/vehicles/japan-lexus-es-side.webp`,
          frontImage: `/vehicles/japan-lexus-es-front.webp`,
          specs: { engine: '2.5 л', power: '203 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Lexus RX',
          bodyType: 'Внедорожник',
          price: 'от 4 100 000 ₽',
          sideImage: `/vehicles/japan-lexus-rx-side.webp`,
          frontImage: `/vehicles/japan-lexus-rx-front.webp`,
          specs: { engine: '2.4 л Turbo', power: '275 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Lexus NX',
          bodyType: 'Кроссовер',
          price: 'от 3 800 000 ₽',
          sideImage: `/vehicles/japan-lexus-nx-side.webp`,
          frontImage: `/vehicles/japan-lexus-nx-front.webp`,
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
          sideImage: `/vehicles/japan-honda-civic-side.webp`,
          frontImage: `/vehicles/japan-honda-civic-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '182 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Honda CR-V',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/japan-honda-cr-v-side.webp`,
          frontImage: `/vehicles/japan-honda-cr-v-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '193 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Honda Stepwgn',
          bodyType: 'Минивэн',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/japan-honda-stepwgn-side.webp`,
          frontImage: `/vehicles/japan-honda-stepwgn-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Honda Vezel',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/japan-honda-vezel-side.webp`,
          frontImage: `/vehicles/japan-honda-vezel-front.webp`,
          specs: { engine: '1.5 л Гибрид', power: '107 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.8 л/100км' },
        },
        {
          model: 'Honda Freed',
          bodyType: 'Минивэн',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/japan-honda-freed-side.webp`,
          frontImage: `/vehicles/japan-honda-freed-front.webp`,
          specs: { engine: '1.5 л Гибрид', power: '106 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.4 л/100км' },
        },
        {
          model: 'Honda Fit',
          bodyType: 'Хэтчбек',
          price: 'от 1 500 000 ₽',
          sideImage: `/vehicles/japan-honda-fit-side.webp`,
          frontImage: `/vehicles/japan-honda-fit-front.webp`,
          specs: { engine: '1.3 л', power: '98 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.0 л/100км' },
        },
        {
          model: 'Honda XR-V',
          bodyType: 'Кроссовер',
          price: 'от 1 950 000 ₽',
          sideImage: `/vehicles/japan-honda-xr-v-side.webp`,
          frontImage: `/vehicles/japan-honda-xr-v-front.webp`,
          specs: { engine: '1.5 л', power: '119 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.1 л/100км' },
        },
        {
          model: 'Honda Crider',
          bodyType: 'Седан',
          price: 'от 1 850 000 ₽',
          sideImage: `/vehicles/japan-honda-crider-side.webp`,
          frontImage: `/vehicles/japan-honda-crider-front.webp`,
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
          sideImage: `/vehicles/japan-nissan-altima-side.webp`,
          frontImage: `/vehicles/japan-nissan-altima-front.webp`,
          specs: { engine: '2.5 л', power: '188 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Nissan Qashqai',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `/vehicles/japan-nissan-qashqai-side.webp`,
          frontImage: `/vehicles/japan-nissan-qashqai-front.webp`,
          specs: { engine: '1.3 л Turbo', power: '158 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Nissan X-Trail',
          bodyType: 'Внедорожник',
          price: 'от 2 800 000 ₽',
          sideImage: `/vehicles/japan-nissan-x-trail-side.webp`,
          frontImage: `/vehicles/japan-nissan-x-trail-front.webp`,
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
          sideImage: `/vehicles/japan-mazda-6-side.webp`,
          frontImage: `/vehicles/japan-mazda-6-front.webp`,
          specs: { engine: '2.5 л', power: '192 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.1 л/100км' },
        },
        {
          model: 'Mazda 3',
          bodyType: 'Хэтчбек',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/japan-mazda-3-side.webp`,
          frontImage: `/vehicles/japan-mazda-3-front.webp`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Mazda CX-5',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/japan-mazda-cx-5-side.webp`,
          frontImage: `/vehicles/japan-mazda-cx-5-front.webp`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
        },
        {
          model: 'Mazda CX-30',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/japan-mazda-cx-30-side.webp`,
          frontImage: `/vehicles/japan-mazda-cx-30-front.webp`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Mazda CX-50',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/japan-mazda-cx-50-side.webp`,
          frontImage: `/vehicles/japan-mazda-cx-50-front.webp`,
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
          sideImage: `/vehicles/japan-mitsubishi-outlander-side.webp`,
          frontImage: `/vehicles/japan-mitsubishi-outlander-front.webp`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Mitsubishi ASX',
          bodyType: 'Кроссовер',
          price: 'от 1 800 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-asx-side.webp`,
          frontImage: `/vehicles/japan-mitsubishi-asx-front.webp`,
          specs: { engine: '2.0 л', power: '146 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '7.4 л/100км' },
        },
        {
          model: 'Mitsubishi Eclipse Cross',
          bodyType: 'Кроссовер',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-eclipse-cross-side.webp`,
          frontImage: `/vehicles/japan-mitsubishi-eclipse-cross-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '163 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Mitsubishi Delica D:5',
          bodyType: 'Минивэн',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/japan-mitsubishi-delica-d5-side.webp`,
          frontImage: `/vehicles/japan-mitsubishi-delica-d5-front.webp`,
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
          sideImage: `/vehicles/japan-subaru-forester-side.webp`,
          frontImage: `/vehicles/japan-subaru-forester-front.webp`,
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
          sideImage: `/vehicles/japan-suzuki-jimny-side.webp`,
          frontImage: `/vehicles/japan-suzuki-jimny-front.webp`,
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
          sideImage: `/vehicles/korea-kia-k5-side.webp`,
          frontImage: `/vehicles/korea-kia-k5-front.webp`,
          specs: { engine: '1.6 л Turbo', power: '180 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Kia Sportage',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/korea-kia-sportage-side.webp`,
          frontImage: `/vehicles/korea-kia-sportage-front.webp`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Kia Seltos',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/korea-kia-seltos-side.webp`,
          frontImage: `/vehicles/korea-kia-seltos-front.webp`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Kia K3',
          bodyType: 'Седан',
          price: 'от 1 700 000 ₽',
          sideImage: `/vehicles/korea-kia-k3-side.webp`,
          frontImage: `/vehicles/korea-kia-k3-front.webp`,
          specs: { engine: '1.6 л', power: '128 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.5 л/100км' },
        },
        {
          model: 'Kia KX1',
          bodyType: 'Кроссовер',
          price: 'от 1 650 000 ₽',
          sideImage: `/vehicles/korea-kia-kx1-side.webp`,
          frontImage: `/vehicles/korea-kia-kx1-front.webp`,
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
          sideImage: `/vehicles/korea-hyundai-sonata-side.webp`,
          frontImage: `/vehicles/korea-hyundai-sonata-front.webp`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Hyundai Tucson',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/korea-hyundai-tucson-side.webp`,
          frontImage: `/vehicles/korea-hyundai-tucson-front.webp`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.2 л/100км' },
        },
        {
          model: 'Hyundai Elantra',
          bodyType: 'Седан',
          price: 'от 1 750 000 ₽',
          sideImage: `/vehicles/korea-hyundai-elantra-side.webp`,
          frontImage: `/vehicles/korea-hyundai-elantra-front.webp`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Hyundai ix35',
          bodyType: 'Кроссовер',
          price: 'от 1 950 000 ₽',
          sideImage: `/vehicles/korea-hyundai-ix35-side.webp`,
          frontImage: `/vehicles/korea-hyundai-ix35-front.webp`,
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
          sideImage: `/vehicles/korea-genesis-g80-side.webp`,
          frontImage: `/vehicles/korea-genesis-g80-front.webp`,
          specs: { engine: '2.5 л Turbo', power: '304 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.5 л/100км' },
        },
        {
          model: 'Genesis GV80',
          bodyType: 'Внедорожник',
          price: 'от 4 800 000 ₽',
          sideImage: `/vehicles/korea-genesis-gv80-side.webp`,
          frontImage: `/vehicles/korea-genesis-gv80-front.webp`,
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
          sideImage: `/vehicles/korea-ssangyong-rexton-side.webp`,
          frontImage: `/vehicles/korea-ssangyong-rexton-front.webp`,
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
          sideImage: `/vehicles/korea-kia-sorento-side.webp`,
          frontImage: `/vehicles/korea-kia-sorento-front.webp`,
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
          sideImage: `/vehicles/korea-hyundai-palisade-side.webp`,
          frontImage: `/vehicles/korea-hyundai-palisade-front.webp`,
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
          sideImage: `/vehicles/europe-bmw-5-series-side.webp`,
          frontImage: `/vehicles/europe-bmw-5-series-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 5 Series Touring',
          bodyType: 'Универсал',
          price: 'от 3 400 000 ₽',
          sideImage: `/vehicles/europe-bmw-5-series-touring-side.webp`,
          frontImage: `/vehicles/europe-bmw-5-series-touring-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'BMW X3',
          bodyType: 'Кроссовер',
          price: 'от 3 600 000 ₽',
          sideImage: `/vehicles/europe-bmw-x3-side.webp`,
          frontImage: `/vehicles/europe-bmw-x3-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '252 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'BMW 3 серии',
          bodyType: 'Седан',
          price: 'от 3 100 000 ₽',
          sideImage: `/vehicles/europe-bmw-3--side.webp`,
          frontImage: `/vehicles/europe-bmw-3--front.webp`,
          specs: { engine: '2.0 л Turbo', power: '184 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.0 л/100км' },
        },
        {
          model: 'BMW X1',
          bodyType: 'Кроссовер',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-bmw-x1-side.webp`,
          frontImage: `/vehicles/europe-bmw-x1-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '170 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 1 серии',
          bodyType: 'Хэтчбек',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/europe-bmw-1--side.webp`,
          frontImage: `/vehicles/europe-bmw-1--front.webp`,
          specs: { engine: '1.5 л Turbo', power: '136 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.3 л/100км' },
        },
        {
          model: 'BMW X5',
          bodyType: 'Внедорожник',
          price: 'от 5 900 000 ₽',
          sideImage: `/vehicles/europe-bmw-x5-side.webp`,
          frontImage: `/vehicles/europe-bmw-x5-front.webp`,
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
          sideImage: `/vehicles/europe-mercedes-benz-e-class-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-e-class-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.0 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLE Coupe',
          bodyType: 'Купе',
          price: 'от 4 200 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-cle-coupe-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-cle-coupe-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLE',
          bodyType: 'Внедорожник',
          price: 'от 5 200 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-gle-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-gle-front.webp`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz A-Класс',
          bodyType: 'Хэтчбек',
          price: 'от 2 800 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-a--side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-a--front.webp`,
          specs: { engine: '1.3 л Turbo', power: '163 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLB',
          bodyType: 'Кроссовер',
          price: 'от 3 800 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-glb-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-glb-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '224 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz G-Класс AMG',
          bodyType: 'Внедорожник',
          price: 'от 9 800 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-g-amg-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-g-amg-front.webp`,
          specs: { engine: '4.0 л Turbo V8', power: '585 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '13.9 л/100км' },
        },
        {
          model: 'Mercedes-Benz G-Класс',
          bodyType: 'Внедорожник',
          price: 'от 8 200 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-g--side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-g--front.webp`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '12.3 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLA',
          bodyType: 'Купе',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-cla-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-cla-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '224 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.1 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLC Coupe',
          bodyType: 'Купе',
          price: 'от 4 700 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-glc-coupe-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-glc-coupe-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLS',
          bodyType: 'Внедорожник',
          price: 'от 7 500 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-gls-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-gls-front.webp`,
          specs: { engine: '3.0 л Turbo', power: '381 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.6 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLC',
          bodyType: 'Кроссовер',
          price: 'от 4 400 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-glc-side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-glc-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Mercedes-Benz C-Класс',
          bodyType: 'Седан',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/europe-mercedes-benz-c--side.webp`,
          frontImage: `/vehicles/europe-mercedes-benz-c--front.webp`,
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
          sideImage: `/vehicles/europe-audi-a6-side.webp`,
          frontImage: `/vehicles/europe-audi-a6-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.9 л/100км' },
        },
        {
          model: 'Audi A6 Avant',
          bodyType: 'Универсал',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-audi-a6-avant-side.webp`,
          frontImage: `/vehicles/europe-audi-a6-avant-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Audi Q5',
          bodyType: 'Кроссовер',
          price: 'от 3 500 000 ₽',
          sideImage: `/vehicles/europe-audi-q5-side.webp`,
          frontImage: `/vehicles/europe-audi-q5-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '249 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.6 л/100км' },
        },
        {
          model: 'Audi A3',
          bodyType: 'Хэтчбек',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/europe-audi-a3-side.webp`,
          frontImage: `/vehicles/europe-audi-a3-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.1 л/100км' },
        },
        {
          model: 'Audi Q3',
          bodyType: 'Кроссовер',
          price: 'от 3 100 000 ₽',
          sideImage: `/vehicles/europe-audi-q3-side.webp`,
          frontImage: `/vehicles/europe-audi-q3-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Audi Q2',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/europe-audi-q2-side.webp`,
          frontImage: `/vehicles/europe-audi-q2-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.4 л/100км' },
        },
        {
          model: 'Audi A5',
          bodyType: 'Купе',
          price: 'от 3 600 000 ₽',
          sideImage: `/vehicles/europe-audi-a5-side.webp`,
          frontImage: `/vehicles/europe-audi-a5-front.webp`,
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
          sideImage: `/vehicles/europe-volkswagen-golf-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-golf-front.webp`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.2 л/100км' },
        },
        {
          model: 'Volkswagen Tiguan',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-tiguan-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-tiguan-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
        },
        {
          model: 'Volkswagen Tayron',
          bodyType: 'Кроссовер',
          price: 'от 3 000 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-tayron-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-tayron-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'Volkswagen Multivan',
          bodyType: 'Минивэн',
          price: 'от 4 500 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-multivan-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-multivan-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '204 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Volkswagen T-Roc',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-t-roc-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-t-roc-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Volkswagen Lamando',
          bodyType: 'Лифтбек',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-lamando-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-lamando-front.webp`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.6 л/100км' },
        },
        {
          model: 'Volkswagen Teramont',
          bodyType: 'Внедорожник',
          price: 'от 3 800 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-teramont-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-teramont-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '220 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.8 л/100км' },
        },
        {
          model: 'Volkswagen Tharu',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-tharu-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-tharu-front.webp`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Volkswagen Passat',
          bodyType: 'Седан',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-passat-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-passat-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Volkswagen Sagitar',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-sagitar-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-sagitar-front.webp`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.3 л/100км' },
        },
        {
          model: 'Volkswagen T-Cross',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-t-cross-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-t-cross-front.webp`,
          specs: { engine: '1.0 л Turbo', power: '116 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '5.8 л/100км' },
        },
        {
          model: 'Volkswagen Touran',
          bodyType: 'Минивэн',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-touran-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-touran-front.webp`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Volkswagen Transporter',
          bodyType: 'Фургон',
          price: 'от 3 300 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-transporter-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-transporter-front.webp`,
          specs: { engine: '2.0 л Turbo Дизель', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.5 л/100км' },
        },
        {
          model: 'Volkswagen Polo',
          bodyType: 'Седан',
          price: 'от 1 600 000 ₽',
          sideImage: `/vehicles/europe-volkswagen-polo-side.webp`,
          frontImage: `/vehicles/europe-volkswagen-polo-front.webp`,
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
          sideImage: `/vehicles/europe-skoda-octavia-side.webp`,
          frontImage: `/vehicles/europe-skoda-octavia-front.webp`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.4 л/100км' },
        },
        {
          model: 'Skoda Superb',
          bodyType: 'Лифтбек',
          price: 'от 2 900 000 ₽',
          sideImage: `/vehicles/europe-skoda-superb-side.webp`,
          frontImage: `/vehicles/europe-skoda-superb-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.9 л/100км' },
        },
        {
          model: 'Skoda Kodiaq',
          bodyType: 'Внедорожник',
          price: 'от 3 200 000 ₽',
          sideImage: `/vehicles/europe-skoda-kodiaq-side.webp`,
          frontImage: `/vehicles/europe-skoda-kodiaq-front.webp`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Skoda Karoq',
          bodyType: 'Кроссовер',
          price: 'от 2 600 000 ₽',
          sideImage: `/vehicles/europe-skoda-karoq-side.webp`,
          frontImage: `/vehicles/europe-skoda-karoq-front.webp`,
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
          sideImage: `/vehicles/europe-mini-countryman-side.webp`,
          frontImage: `/vehicles/europe-mini-countryman-front.webp`,
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
          sideImage: `/vehicles/europe-porsche-911-side.webp`,
          frontImage: `/vehicles/europe-porsche-911-front.webp`,
          specs: { engine: '3.0 л Turbo', power: '385 л.с.', drive: 'Задний', transmission: 'Робот', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Porsche Cayenne',
          bodyType: 'Внедорожник',
          price: 'от 7 200 000 ₽',
          sideImage: `/vehicles/europe-porsche-cayenne-side.webp`,
          frontImage: `/vehicles/europe-porsche-cayenne-front.webp`,
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
          sideImage: `/vehicles/europe-range-rover-vogue-side.webp`,
          frontImage: `/vehicles/europe-range-rover-vogue-front.webp`,
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
          sideImage: `/vehicles/usa-tesla-model-s-side.webp`,
          frontImage: `/vehicles/usa-tesla-model-s-front.webp`,
          specs: { engine: 'Электро', power: '670 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.0 кВт·ч/100км' },
        },
        {
          model: 'Tesla Model Y',
          bodyType: 'Кроссовер',
          price: 'от 3 700 000 ₽',
          sideImage: `/vehicles/usa-tesla-model-y-side.webp`,
          frontImage: `/vehicles/usa-tesla-model-y-front.webp`,
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
          sideImage: `${CDN}/56e22742-54d8-4d2f-95c2-2e3a2edd053b.jpg`,
          frontImage: `${CDN}/8a26d46f-f78b-4d41-bca3-aea68386269b.jpg`,
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
          sideImage: `${CDN}/ae1260ac-f687-4d6a-9b82-48f8f1b93bff.jpg`,
          frontImage: `${CDN}/76338c05-1acb-4764-bc0f-e74f1c317320.jpg`,
          specs: { engine: '3.5 л Turbo', power: '400 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '12.5 л/100км' },
        },
        {
          model: 'Ford Explorer',
          bodyType: 'Внедорожник',
          price: 'от 3 100 000 ₽',
          sideImage: `${CDN}/d7bd27c9-ed1c-469c-bd9a-8e8cc1d9aabf.jpg`,
          frontImage: `${CDN}/03035abc-3c93-475a-af14-64e21896d85a.jpg`,
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
          sideImage: `${CDN}/6021278a-3f23-4851-adc7-e6075228f769.jpg`,
          frontImage: `${CDN}/435815b0-0740-4ec1-8685-92e1c3476a0e.jpg`,
          specs: { engine: '2.0 л Turbo', power: '237 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '9.0 л/100км' },
        },
        {
          model: 'Cadillac Escalade',
          bodyType: 'Внедорожник',
          price: 'от 8 500 000 ₽',
          sideImage: `${CDN}/99ccd943-e79c-4597-9207-04f7eb86bef6.jpg`,
          frontImage: `${CDN}/15e5b230-5169-466a-9c26-0f3dc3c6f0fa.jpg`,
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
          sideImage: `${CDN}/3613ae43-c88d-46cd-8127-549179e811cb.jpg`,
          frontImage: `${CDN}/0f1d2b2e-c6d5-4c72-a7fb-c2be5bbf6ff1.jpg`,
          specs: { engine: '5.3 л', power: '355 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '13.2 л/100км' },
        },
        {
          model: 'Chevrolet Tahoe',
          bodyType: 'Внедорожник',
          price: 'от 5 900 000 ₽',
          sideImage: `${CDN}/b064fa1c-cec4-4154-a1c9-95917a5acf2f.jpg`,
          frontImage: `${CDN}/8c4b55b7-1706-46a1-ab99-2f988b18b5ad.jpg`,
          specs: { engine: '5.3 л', power: '355 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '13.8 л/100км' },
        },
        {
          model: 'Chevrolet TrailBlazer',
          bodyType: 'Внедорожник',
          price: 'от 2 700 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-trailblazer-side.webp`,
          frontImage: `/vehicles/usa-chevrolet-trailblazer-front.webp`,
          specs: { engine: '2.0 л Turbo Дизель', power: '184 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.5 л/100км' },
        },
        {
          model: 'Chevrolet Orlando',
          bodyType: 'Минивэн',
          price: 'от 1 900 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-orlando-side.webp`,
          frontImage: `/vehicles/usa-chevrolet-orlando-front.webp`,
          specs: { engine: '1.8 л', power: '141 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.2 л/100км' },
        },
        {
          model: 'Chevrolet Trax',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `/vehicles/usa-chevrolet-trax-side.webp`,
          frontImage: `/vehicles/usa-chevrolet-trax-front.webp`,
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
          sideImage: `/vehicles/usa-ram-1500-side.webp`,
          frontImage: `/vehicles/usa-ram-1500-front.webp`,
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
          sideImage: `${CDN}/2b12749d-77fc-4589-9418-43824fac902f.jpg`,
          frontImage: `${CDN}/0c89b5e5-ea97-44b6-816d-9e12ddd97f12.jpg`,
          specs: { engine: '3.6 л V6', power: '292 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2022', consumption: '11.0 л/100км' },
        },
        {
          model: 'Dodge Challenger',
          bodyType: 'Купе',
          price: 'от 3 900 000 ₽',
          sideImage: `${CDN}/a2aa8191-887f-4df1-9360-755ade8a060c.jpg`,
          frontImage: `${CDN}/4e03143d-f890-4854-b04f-6d2199843c0a.jpg`,
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
          sideImage: `${CDN}/2a0fbe41-ded3-4853-86d0-74e9a5577c86.jpg`,
          frontImage: `${CDN}/2a0fbe41-ded3-4853-86d0-74e9a5577c86.jpg`,
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
          sideImage: `${CDN}/57098f39-27f8-4db5-93c0-aceea7f71fd2.jpg`,
          frontImage: `${CDN}/57098f39-27f8-4db5-93c0-aceea7f71fd2.jpg`,
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
          sideImage: `${CDN}/73d095e4-86a8-4d73-9189-1154fad688fd.jpg`,
          frontImage: `${CDN}/73d095e4-86a8-4d73-9189-1154fad688fd.jpg`,
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
          sideImage: `${CDN}/7abc5645-d2f4-4e57-9f90-48281777d57d.jpg`,
          frontImage: `${CDN}/7abc5645-d2f4-4e57-9f90-48281777d57d.jpg`,
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
          sideImage: `${CDN}/17c356cd-4892-4ad3-be4a-a6a0ebfe49d0.jpg`,
          frontImage: `${CDN}/17c356cd-4892-4ad3-be4a-a6a0ebfe49d0.jpg`,
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
          sideImage: `${CDN}/5f94b2b3-f50d-4b8b-a7c6-1e9d68c2e72a.jpg`,
          frontImage: `${CDN}/5f94b2b3-f50d-4b8b-a7c6-1e9d68c2e72a.jpg`,
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
          sideImage: `${CDN}/1234f466-1cca-4c72-b1c6-2cd0acc803ac.jpg`,
          frontImage: `${CDN}/1234f466-1cca-4c72-b1c6-2cd0acc803ac.jpg`,
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
          sideImage: `${CDN}/49eb9a77-554f-42ab-a3e4-45033173f396.jpg`,
          frontImage: `${CDN}/49eb9a77-554f-42ab-a3e4-45033173f396.jpg`,
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
          sideImage: `${CDN}/54f5afb8-8327-4793-b8ec-25306d1967ab.jpg`,
          frontImage: `${CDN}/54f5afb8-8327-4793-b8ec-25306d1967ab.jpg`,
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
          sideImage: `${CDN}/c0dd95d9-8452-4cb8-b02e-5a9e4bfa759f.jpg`,
          frontImage: `${CDN}/c0dd95d9-8452-4cb8-b02e-5a9e4bfa759f.jpg`,
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