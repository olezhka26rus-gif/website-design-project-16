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
          sideImage: `${CDN}/0eec6eaa-a4b8-44ee-bed3-044189f70f62.jpg`,
          frontImage: `${CDN}/fbd13a75-ee8e-4de4-86ca-d8d6bb5bfa68.jpg`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '18.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 001',
          bodyType: 'Лифтбек',
          price: 'от 3 400 000 ₽',
          sideImage: `${CDN}/a8fb2bb7-d04b-46fd-b96a-439f75067248.jpg`,
          frontImage: `${CDN}/70713718-4be6-4702-a1b8-7a8d84ad195c.jpg`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '19.2 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 8X',
          bodyType: 'Кроссовер',
          price: 'от 4 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: 'Электро', power: '490 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '17.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 9X',
          bodyType: 'Внедорожник',
          price: 'от 5 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/a24ffd31-7222-43eb-8ba2-8a15ff46d9b3.jpg`,
          frontImage: `${CDN}/e03b4289-3614-4359-9ba5-522b265d6181.jpg`,
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
          sideImage: `${CDN}/62d57049-4cc1-4f08-b210-4003c36a9626.jpg`,
          frontImage: `${CDN}/9364ad73-2939-46b2-97dd-684eb5647f41.jpg`,
          specs: { engine: '1.6 л Turbo', power: '197 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Chery Tiggo 7 Pro',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `${CDN}/c6fa7ab7-8073-41ac-8318-2c2fe1b0a910.jpg`,
          frontImage: `${CDN}/7ce84347-01fc-4ad0-a02e-0b1bff48c393.jpg`,
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
          sideImage: `${CDN}/8da0dfd6-3ab0-4089-b78c-5be8680923d8.jpg`,
          frontImage: `${CDN}/3d3c0e42-daac-44d5-bb13-ecd9a7b5a005.jpg`,
          specs: { engine: 'Электро', power: '517 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.9 кВт·ч/100км' },
        },
        {
          model: 'BYD Song Plus',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/da602c90-66a3-407e-8985-11ae7cc4d2c6.jpg`,
          frontImage: `${CDN}/aef1be61-1354-4aab-a127-226d760066e9.jpg`,
          specs: { engine: 'Гибрид', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '5.3 л/100км' },
        },
        {
          model: 'BYD Qin Wagon',
          bodyType: 'Универсал',
          price: 'от 2 300 000 ₽',
          sideImage: `${CDN}/ec569ecf-4e99-4cb7-848c-4ba62db264ad.jpg`,
          frontImage: `${CDN}/bc5d0fda-b22f-4842-b2fb-0703227b046b.jpg`,
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
          sideImage: `${CDN}/a0cd3907-9f95-4b03-83b2-4da7393b9c4e.jpg`,
          frontImage: `${CDN}/1cfaf50b-8fc1-4bac-b2ad-151fab0ddb24.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Geely Coolray',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `${CDN}/5379986b-3b1f-4e34-b898-46ac0bbee4a3.jpg`,
          frontImage: `${CDN}/cb20610c-4698-4993-b093-1b983a6334e2.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.3 л/100км' },
        },
        {
          model: 'Geely Monjaro',
          bodyType: 'Внедорожник',
          price: 'от 3 300 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '238 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.5 л/100км' },
        },
        {
          model: 'Geely Galaxy Starship 7',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/21047395-feaf-4eee-8e6e-05c6db9b3973.jpg`,
          frontImage: `${CDN}/a5c2f957-f5a5-4df9-9369-eeca94675cd6.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Полный', transmission: 'Робот', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Haval Jolion',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/8d328d03-3094-4820-be40-55d88a226e55.jpg`,
          frontImage: `${CDN}/97ea8e9a-a6ba-467f-9541-19828ad72424.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Haval M6',
          bodyType: 'Кроссовер',
          price: 'от 1 750 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/64084934-d7d8-4950-840a-b23938b3930d.jpg`,
          frontImage: `${CDN}/203b0061-7e66-470f-9404-5ea4b85dec34.jpg`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Toyota RAV4',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/4776ac9c-1699-4e49-b2f3-96efd33650d0.jpg`,
          frontImage: `${CDN}/267c7992-188e-4428-beb5-53378cfb606a.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Toyota Corolla Touring',
          bodyType: 'Универсал',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/3dfe499b-aead-4aff-860f-cbbe8d3e82cc.jpg`,
          frontImage: `${CDN}/613ba176-9e94-4649-9747-b061a361db7b.jpg`,
          specs: { engine: '1.8 л Гибрид', power: '122 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.5 л/100км' },
        },
        {
          model: 'Toyota Corolla',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.8 л', power: '140 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.9 л/100км' },
        },
        {
          model: 'Toyota Yaris',
          bodyType: 'Хэтчбек',
          price: 'от 1 700 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л', power: '120 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.0 л/100км' },
        },
        {
          model: 'Toyota Highlander',
          bodyType: 'Внедорожник',
          price: 'от 3 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.4 л Turbo', power: '265 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.3 л/100км' },
        },
        {
          model: 'Toyota Probox',
          bodyType: 'Универсал',
          price: 'от 1 400 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л', power: '99 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '6.2 л/100км' },
        },
        {
          model: 'Toyota Land Cruiser Prado',
          bodyType: 'Внедорожник',
          price: 'от 5 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.7 л', power: '163 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Toyota bZ3X',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: 'Электро', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '15.0 кВт·ч/100км' },
        },
        {
          model: 'Toyota Levin',
          bodyType: 'Седан',
          price: 'от 2 100 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.2 л Turbo', power: '116 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.8 л/100км' },
        },
        {
          model: 'Toyota Hilux',
          bodyType: 'Пикап',
          price: 'от 3 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/f97218c3-a1f4-4b2e-858f-6d2283332475.jpg`,
          frontImage: `${CDN}/49f3cf95-44a2-44ed-817e-0cecf89a32c0.jpg`,
          specs: { engine: '2.5 л', power: '203 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Lexus RX',
          bodyType: 'Внедорожник',
          price: 'от 4 100 000 ₽',
          sideImage: `${CDN}/6c63f0b1-f9df-437e-b54e-0f6905cd1379.jpg`,
          frontImage: `${CDN}/746cea3b-7383-4582-a07b-63fa40191d27.jpg`,
          specs: { engine: '2.4 л Turbo', power: '275 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Lexus NX',
          bodyType: 'Кроссовер',
          price: 'от 3 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/a27aa67e-9eaf-4918-824b-c0428ba69547.jpg`,
          frontImage: `${CDN}/a27fa8a4-3cb8-40ec-ab2f-5f8b980b8c37.jpg`,
          specs: { engine: '1.5 л Turbo', power: '182 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Honda CR-V',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/3f4d20cb-f979-4606-bc5a-ca440cfb207e.jpg`,
          frontImage: `${CDN}/9e78d598-c318-4d75-83fc-011ef5cc771c.jpg`,
          specs: { engine: '1.5 л Turbo', power: '193 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Honda Stepwgn',
          bodyType: 'Минивэн',
          price: 'от 2 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Honda Vezel',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Гибрид', power: '107 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.8 л/100км' },
        },
        {
          model: 'Honda Freed',
          bodyType: 'Минивэн',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Гибрид', power: '106 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.4 л/100км' },
        },
        {
          model: 'Honda Fit',
          bodyType: 'Хэтчбек',
          price: 'от 1 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.3 л', power: '98 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '5.0 л/100км' },
        },
        {
          model: 'Honda XR-V',
          bodyType: 'Кроссовер',
          price: 'от 1 950 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л', power: '119 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.1 л/100км' },
        },
        {
          model: 'Honda Crider',
          bodyType: 'Седан',
          price: 'от 1 850 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/8db9e301-54fb-42bb-9694-4b42b375f13c.jpg`,
          frontImage: `${CDN}/c3664d01-41ad-49ff-a5be-c7a3359e7ee4.jpg`,
          specs: { engine: '2.5 л', power: '188 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Nissan Qashqai',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `${CDN}/d3b25269-a91f-4281-9cd0-a07ab0c05d60.jpg`,
          frontImage: `${CDN}/e4bfc342-34ba-42f1-953d-91d20de19c10.jpg`,
          specs: { engine: '1.3 л Turbo', power: '158 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Nissan X-Trail',
          bodyType: 'Внедорожник',
          price: 'от 2 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/75ece7ea-ddf9-45e0-b222-e2a663400bbf.jpg`,
          frontImage: `${CDN}/61638454-f0bf-4dfb-86c7-b8e3f21ddaa7.jpg`,
          specs: { engine: '2.5 л', power: '192 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.1 л/100км' },
        },
        {
          model: 'Mazda 3',
          bodyType: 'Хэтчбек',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/25ff4f99-9df2-47fd-b9a9-3e569cc5c9cd.jpg`,
          frontImage: `${CDN}/bdb8d06a-c865-435d-98aa-87d3bb353dbb.jpg`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Mazda CX-5',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
        },
        {
          model: 'Mazda CX-30',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Mazda CX-50',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/08784d9d-c720-4300-bfb5-9503739c27e7.jpg`,
          frontImage: `${CDN}/50c9c48e-9c82-4288-b6d8-8c6f1a7fb12e.jpg`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Mitsubishi ASX',
          bodyType: 'Кроссовер',
          price: 'от 1 800 000 ₽',
          sideImage: `${CDN}/a3d60cfd-563e-4066-aae8-0f734e96c523.jpg`,
          frontImage: `${CDN}/6a8fcd8e-8be5-4c32-a4c1-c076988aa151.jpg`,
          specs: { engine: '2.0 л', power: '146 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '7.4 л/100км' },
        },
        {
          model: 'Mitsubishi Eclipse Cross',
          bodyType: 'Кроссовер',
          price: 'от 2 000 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '163 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Mitsubishi Delica D:5',
          bodyType: 'Минивэн',
          price: 'от 2 600 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/e6918d21-8471-4149-8b34-4d7f314a0b7d.jpg`,
          frontImage: `${CDN}/781fcf01-fd94-4b52-9d94-bbf6278f716a.jpg`,
          specs: { engine: '1.6 л Turbo', power: '180 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Kia Sportage',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/9c142c37-1175-4342-90e5-2194921d5ed1.jpg`,
          frontImage: `${CDN}/8331cc5c-9eca-43a1-8786-38bd97d31f65.jpg`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Kia Seltos',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Kia K3',
          bodyType: 'Седан',
          price: 'от 1 700 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.6 л', power: '128 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.5 л/100км' },
        },
        {
          model: 'Kia KX1',
          bodyType: 'Кроссовер',
          price: 'от 1 650 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/6d67e8ec-3d62-4dd7-956c-952a24d9f469.jpg`,
          frontImage: `${CDN}/2d05a129-04fb-404e-abde-0f76d15bb0ea.jpg`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Hyundai Tucson',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `${CDN}/e17757e2-a821-4e19-b757-6b51630b1cee.jpg`,
          frontImage: `${CDN}/e22d7722-6759-43a8-b531-6631afcbdd1d.jpg`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.2 л/100км' },
        },
        {
          model: 'Hyundai Elantra',
          bodyType: 'Седан',
          price: 'от 1 750 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Hyundai ix35',
          bodyType: 'Кроссовер',
          price: 'от 1 950 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/fccf17cf-45aa-4338-a943-2738786946dc.jpg`,
          frontImage: `${CDN}/6744fbe6-2b01-4e9b-a02a-3540a1497126.jpg`,
          specs: { engine: '2.5 л Turbo', power: '304 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.5 л/100км' },
        },
        {
          model: 'Genesis GV80',
          bodyType: 'Внедорожник',
          price: 'от 4 800 000 ₽',
          sideImage: `${CDN}/dc0fb90d-c80c-46c6-8cfb-e51fcc62229d.jpg`,
          frontImage: `${CDN}/61bb87e4-4b27-4913-bbaa-fbcd2e923828.jpg`,
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
          sideImage: `${CDN}/83d46fb6-efce-4ac8-9db0-c87e8681383c.jpg`,
          frontImage: `${CDN}/441c30f5-2f9a-4b15-a626-2e193a5eb56b.jpg`,
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
          sideImage: `${CDN}/520035ef-f500-4440-947d-4a88cfa9a5ad.jpg`,
          frontImage: `${CDN}/286e5fb3-36fa-4e4d-8ff7-ada4eed91839.jpg`,
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
          sideImage: `${CDN}/d8e2e250-ffcd-4db6-8212-c91d6dbc2523.jpg`,
          frontImage: `${CDN}/5f3e1b34-7a6c-4568-81fc-0335131b3e4f.jpg`,
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
          sideImage: `${CDN}/8c15d0b3-b5fd-415f-bb50-7919a172b2ed.jpg`,
          frontImage: `${CDN}/f82d549f-5215-4ddf-b988-6930dad58c60.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 5 Series Touring',
          bodyType: 'Универсал',
          price: 'от 3 400 000 ₽',
          sideImage: `${CDN}/8c444f0b-fe34-4153-9172-b424bcff0609.jpg`,
          frontImage: `${CDN}/88307bc4-50b7-400b-9ebd-1fadf8fc820b.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'BMW X3',
          bodyType: 'Кроссовер',
          price: 'от 3 600 000 ₽',
          sideImage: `${CDN}/7effc73a-ccb6-4a00-a4fa-ab798d5d5422.jpg`,
          frontImage: `${CDN}/57185cbb-18df-4609-b52b-5e8422993fbc.jpg`,
          specs: { engine: '2.0 л Turbo', power: '252 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'BMW 3 серии',
          bodyType: 'Седан',
          price: 'от 3 100 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '184 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.0 л/100км' },
        },
        {
          model: 'BMW X1',
          bodyType: 'Кроссовер',
          price: 'от 3 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '170 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 1 серии',
          bodyType: 'Хэтчбек',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '136 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.3 л/100км' },
        },
        {
          model: 'BMW X5',
          bodyType: 'Внедорожник',
          price: 'от 5 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/63c2e280-db5d-430d-af08-f60f3b5890c1.jpg`,
          frontImage: `${CDN}/3fc4fce9-1ea8-4855-b7e0-55ead8c4f929.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.0 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLE Coupe',
          bodyType: 'Купе',
          price: 'от 4 200 000 ₽',
          sideImage: `${CDN}/2a3b32f8-f113-496b-9cbe-b88de6475add.jpg`,
          frontImage: `${CDN}/7638d604-954a-40eb-8734-6e3292c59a3b.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLE',
          bodyType: 'Внедорожник',
          price: 'от 5 200 000 ₽',
          sideImage: `${CDN}/9002d5bd-9834-4069-bcfc-49268febb878.jpg`,
          frontImage: `${CDN}/bd3786ab-323a-4337-a1d3-f09e1a6bc885.jpg`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz A-Класс',
          bodyType: 'Хэтчбек',
          price: 'от 2 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.3 л Turbo', power: '163 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLB',
          bodyType: 'Кроссовер',
          price: 'от 3 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '224 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.5 л/100км' },
        },
        {
          model: 'Mercedes-Benz G-Класс AMG',
          bodyType: 'Внедорожник',
          price: 'от 9 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '4.0 л Turbo V8', power: '585 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '13.9 л/100км' },
        },
        {
          model: 'Mercedes-Benz G-Класс',
          bodyType: 'Внедорожник',
          price: 'от 8 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '12.3 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLA',
          bodyType: 'Купе',
          price: 'от 3 300 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '224 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.1 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLC Coupe',
          bodyType: 'Купе',
          price: 'от 4 700 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLS',
          bodyType: 'Внедорожник',
          price: 'от 7 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '3.0 л Turbo', power: '381 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '11.6 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLC',
          bodyType: 'Кроссовер',
          price: 'от 4 400 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Mercedes-Benz C-Класс',
          bodyType: 'Седан',
          price: 'от 3 300 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/343a15c8-c262-4e94-8bb9-98f4781b2b91.jpg`,
          frontImage: `${CDN}/13e1503f-0ec1-4e6e-8736-251add90f285.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.9 л/100км' },
        },
        {
          model: 'Audi A6 Avant',
          bodyType: 'Универсал',
          price: 'от 3 200 000 ₽',
          sideImage: `${CDN}/f3966d3a-419c-434b-9c79-03a369b0f4a4.jpg`,
          frontImage: `${CDN}/5e812c8f-7d34-413a-8ef4-7aec5736bc35.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Audi Q5',
          bodyType: 'Кроссовер',
          price: 'от 3 500 000 ₽',
          sideImage: `${CDN}/05513c77-a27f-430f-88fe-c8f9d46fb342.jpg`,
          frontImage: `${CDN}/cd5b1f98-3f51-44e5-a7fe-73f69ee349b0.jpg`,
          specs: { engine: '2.0 л Turbo', power: '249 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.6 л/100км' },
        },
        {
          model: 'Audi A3',
          bodyType: 'Хэтчбек',
          price: 'от 2 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.1 л/100км' },
        },
        {
          model: 'Audi Q3',
          bodyType: 'Кроссовер',
          price: 'от 3 100 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Audi Q2',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.4 л/100км' },
        },
        {
          model: 'Audi A5',
          bodyType: 'Купе',
          price: 'от 3 600 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/a16893e2-ee6c-40a4-bfab-3a3f13547a11.jpg`,
          frontImage: `${CDN}/9398b8de-e112-4e1f-97a9-02b65225bee1.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.2 л/100км' },
        },
        {
          model: 'Volkswagen Tiguan',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/ea6a7abb-ddf6-4118-8650-41e4c4806f0e.jpg`,
          frontImage: `${CDN}/a5c5550b-51b4-41a9-bf96-a5da82733fbf.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
        },
        {
          model: 'Volkswagen Tayron',
          bodyType: 'Кроссовер',
          price: 'от 3 000 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'Volkswagen Multivan',
          bodyType: 'Минивэн',
          price: 'от 4 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '204 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Volkswagen T-Roc',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Volkswagen Lamando',
          bodyType: 'Лифтбек',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.6 л/100км' },
        },
        {
          model: 'Volkswagen Teramont',
          bodyType: 'Внедорожник',
          price: 'от 3 800 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '220 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.8 л/100км' },
        },
        {
          model: 'Volkswagen Tharu',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Volkswagen Passat',
          bodyType: 'Седан',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Volkswagen Sagitar',
          bodyType: 'Седан',
          price: 'от 2 000 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.3 л/100км' },
        },
        {
          model: 'Volkswagen T-Cross',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.0 л Turbo', power: '116 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '5.8 л/100км' },
        },
        {
          model: 'Volkswagen Touran',
          bodyType: 'Минивэн',
          price: 'от 2 600 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.9 л/100км' },
        },
        {
          model: 'Volkswagen Transporter',
          bodyType: 'Фургон',
          price: 'от 3 300 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo Дизель', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '8.5 л/100км' },
        },
        {
          model: 'Volkswagen Polo',
          bodyType: 'Седан',
          price: 'от 1 600 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.4 л/100км' },
        },
        {
          model: 'Skoda Superb',
          bodyType: 'Лифтбек',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '7.9 л/100км' },
        },
        {
          model: 'Skoda Kodiaq',
          bodyType: 'Внедорожник',
          price: 'от 3 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
        },
        {
          model: 'Skoda Karoq',
          bodyType: 'Кроссовер',
          price: 'от 2 600 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/276058ac-fbf4-4abc-b5fc-38544948608e.jpg`,
          frontImage: `${CDN}/2f6778d6-56e2-4438-abcd-7ae01483bc1a.jpg`,
          specs: { engine: '3.0 л Turbo', power: '385 л.с.', drive: 'Задний', transmission: 'Робот', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Porsche Cayenne',
          bodyType: 'Внедорожник',
          price: 'от 7 200 000 ₽',
          sideImage: `${CDN}/ab6c5e5b-0067-489a-9717-ca6827f2863d.jpg`,
          frontImage: `${CDN}/75e8add0-8a32-4975-b4d5-4667ad1df760.jpg`,
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
          sideImage: `${CDN}/35515892-a4fe-4508-a178-0b608ff11125.jpg`,
          frontImage: `${CDN}/f0dc8dfa-6f3e-470b-961a-7ee709f0f62d.jpg`,
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
          sideImage: `${CDN}/a712c741-e5cc-4628-b32a-7dfd0a02ccff.jpg`,
          frontImage: `${CDN}/9496ff89-1277-44de-91a4-8753a3fc9335.jpg`,
          specs: { engine: 'Электро', power: '670 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.0 кВт·ч/100км' },
        },
        {
          model: 'Tesla Model Y',
          bodyType: 'Кроссовер',
          price: 'от 3 700 000 ₽',
          sideImage: `${CDN}/22198548-e8c1-4ce8-b814-f16d3a735b68.jpg`,
          frontImage: `${CDN}/6f29cae6-3ea2-4652-ac3c-4a3435f16050.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '2.0 л Turbo Дизель', power: '184 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '9.5 л/100км' },
        },
        {
          model: 'Chevrolet Orlando',
          bodyType: 'Минивэн',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          specs: { engine: '1.8 л', power: '141 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.2 л/100км' },
        },
        {
          model: 'Chevrolet Trax',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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
          sideImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
          frontImage: `${CDN}/eb08fe48-eae5-4870-8220-d7608c29af46.jpg`,
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