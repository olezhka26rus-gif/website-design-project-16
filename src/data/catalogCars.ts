export type CountryKey = 'china' | 'japan' | 'korea' | 'europe' | 'usa';

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
  interiorImage: string;
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
          interiorImage: `${CDN}/c5faff1e-ac22-427b-b8d6-82fb254872dd.jpg`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '18.5 кВт·ч/100км' },
        },
        {
          model: 'Zeekr 001',
          bodyType: 'Лифтбек',
          price: 'от 3 400 000 ₽',
          sideImage: `${CDN}/a8fb2bb7-d04b-46fd-b96a-439f75067248.jpg`,
          interiorImage: `${CDN}/beba61f4-3335-4823-a586-a11ecefb096e.jpg`,
          specs: { engine: 'Электро', power: '544 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '19.2 кВт·ч/100км' },
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
          interiorImage: `${CDN}/3a4b3c03-3c2e-4655-b254-8905168a404f.jpg`,
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
          interiorImage: `${CDN}/d6ecbaed-9894-43c0-ad71-74343fdb8093.jpg`,
          specs: { engine: '1.6 л Turbo', power: '197 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Chery Tiggo 7 Pro',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `${CDN}/c6fa7ab7-8073-41ac-8318-2c2fe1b0a910.jpg`,
          interiorImage: `${CDN}/22695ca9-04e2-421e-9ecd-2cc6b4097401.jpg`,
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
          interiorImage: `${CDN}/f71cef58-92ea-44fa-88ee-db6908642597.jpg`,
          specs: { engine: 'Электро', power: '517 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.9 кВт·ч/100км' },
        },
        {
          model: 'BYD Song Plus',
          bodyType: 'Кроссовер',
          price: 'от 2 900 000 ₽',
          sideImage: `${CDN}/da602c90-66a3-407e-8985-11ae7cc4d2c6.jpg`,
          interiorImage: `${CDN}/e6fb70b9-c4fc-4bea-a0fd-85654a074efc.jpg`,
          specs: { engine: 'Гибрид', power: '218 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '5.3 л/100км' },
        },
        {
          model: 'BYD Qin Wagon',
          bodyType: 'Универсал',
          price: 'от 2 300 000 ₽',
          sideImage: `${CDN}/ec569ecf-4e99-4cb7-848c-4ba62db264ad.jpg`,
          interiorImage: `${CDN}/d313e77f-f7c0-4baa-9780-e38815bae43a.jpg`,
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
          interiorImage: `${CDN}/d4acd6b7-19e7-433a-8b26-96ab200c3836.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.0 л/100км' },
        },
        {
          model: 'Geely Coolray',
          bodyType: 'Кроссовер',
          price: 'от 2 500 000 ₽',
          sideImage: `${CDN}/5379986b-3b1f-4e34-b898-46ac0bbee4a3.jpg`,
          interiorImage: `${CDN}/bf54aa68-d61a-417a-87c5-b74108230648.jpg`,
          specs: { engine: '1.5 л Turbo', power: '177 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.3 л/100км' },
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
          interiorImage: `${CDN}/a8335cd2-61b9-4778-a950-8bca7f2fe62c.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Полный', transmission: 'Робот', year: '2023', consumption: '8.0 л/100км' },
        },
        {
          model: 'Haval Jolion',
          bodyType: 'Кроссовер',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/8d328d03-3094-4820-be40-55d88a226e55.jpg`,
          interiorImage: `${CDN}/efe0641b-d932-43cc-b443-df0be22cce41.jpg`,
          specs: { engine: '1.5 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '7.5 л/100км' },
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
          interiorImage: `${CDN}/0900fb5c-4446-4615-bcda-0137b4f32c5d.jpg`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.8 л/100км' },
        },
        {
          model: 'Toyota RAV4',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/4776ac9c-1699-4e49-b2f3-96efd33650d0.jpg`,
          interiorImage: `${CDN}/7e780190-6e0f-4bca-a536-c5b3ed1af3a6.jpg`,
          specs: { engine: '2.0 л', power: '149 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Toyota Corolla Touring',
          bodyType: 'Универсал',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/3dfe499b-aead-4aff-860f-cbbe8d3e82cc.jpg`,
          interiorImage: `${CDN}/f4997600-3633-4512-a112-21344f4c8632.jpg`,
          specs: { engine: '1.8 л Гибрид', power: '122 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '4.5 л/100км' },
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
          interiorImage: `${CDN}/4343d83a-325f-4425-85f9-caadb52272de.jpg`,
          specs: { engine: '2.5 л', power: '203 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2024', consumption: '7.5 л/100км' },
        },
        {
          model: 'Lexus RX',
          bodyType: 'Внедорожник',
          price: 'от 4 100 000 ₽',
          sideImage: `${CDN}/6c63f0b1-f9df-437e-b54e-0f6905cd1379.jpg`,
          interiorImage: `${CDN}/0e395248-196a-4893-b243-8bcf6aafac86.jpg`,
          specs: { engine: '2.4 л Turbo', power: '275 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
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
          interiorImage: `${CDN}/6b363555-e7e9-4e82-9e16-c17b8e995fed.jpg`,
          specs: { engine: '1.5 л Turbo', power: '182 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '6.8 л/100км' },
        },
        {
          model: 'Honda CR-V',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/3f4d20cb-f979-4606-bc5a-ca440cfb207e.jpg`,
          interiorImage: `${CDN}/b0b14e41-57a5-4ff0-be39-22344e12c27f.jpg`,
          specs: { engine: '1.5 л Turbo', power: '193 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.1 л/100км' },
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
          interiorImage: `${CDN}/ad6552aa-7c49-41a0-864c-bb028ec09beb.jpg`,
          specs: { engine: '2.5 л', power: '188 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2023', consumption: '7.5 л/100км' },
        },
        {
          model: 'Nissan Qashqai',
          bodyType: 'Кроссовер',
          price: 'от 2 400 000 ₽',
          sideImage: `${CDN}/d3b25269-a91f-4281-9cd0-a07ab0c05d60.jpg`,
          interiorImage: `${CDN}/cb9936fd-4215-4b94-92b4-b72bd432c18e.jpg`,
          specs: { engine: '1.3 л Turbo', power: '158 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '7.0 л/100км' },
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
          interiorImage: `${CDN}/9ec67005-840c-407a-aeda-f81c3f811fee.jpg`,
          specs: { engine: '2.5 л', power: '192 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2022', consumption: '8.1 л/100км' },
        },
        {
          model: 'Mazda 3',
          bodyType: 'Хэтчбек',
          price: 'от 1 900 000 ₽',
          sideImage: `${CDN}/25ff4f99-9df2-47fd-b9a9-3e569cc5c9cd.jpg`,
          interiorImage: `${CDN}/ed0bd867-71f2-4a60-a483-0919a4733079.jpg`,
          specs: { engine: '2.0 л', power: '150 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '6.9 л/100км' },
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
          interiorImage: `${CDN}/e1207f3c-854d-407f-a132-c15965574816.jpg`,
          specs: { engine: '2.5 л', power: '181 л.с.', drive: 'Полный', transmission: 'Вариатор', year: '2023', consumption: '8.7 л/100км' },
        },
        {
          model: 'Mitsubishi ASX',
          bodyType: 'Кроссовер',
          price: 'от 1 800 000 ₽',
          sideImage: `${CDN}/a3d60cfd-563e-4066-aae8-0f734e96c523.jpg`,
          interiorImage: `${CDN}/e06f4720-18f8-4b9e-a677-18e5165bbcc7.jpg`,
          specs: { engine: '2.0 л', power: '146 л.с.', drive: 'Передний', transmission: 'Вариатор', year: '2022', consumption: '7.4 л/100км' },
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
          interiorImage: `${CDN}/be1ce0d4-a87a-4f75-85b5-1f7972079ae0.jpg`,
          specs: { engine: '1.6 л Turbo', power: '180 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.2 л/100км' },
        },
        {
          model: 'Kia Sportage',
          bodyType: 'Кроссовер',
          price: 'от 2 200 000 ₽',
          sideImage: `${CDN}/9c142c37-1175-4342-90e5-2194921d5ed1.jpg`,
          interiorImage: `${CDN}/686875c8-9f0f-4a51-a092-41473343fd8d.jpg`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.0 л/100км' },
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
          interiorImage: `${CDN}/ff9657bc-6b0a-4ca2-8f68-3a127c9e5c31.jpg`,
          specs: { engine: '2.5 л', power: '194 л.с.', drive: 'Передний', transmission: 'Автомат', year: '2023', consumption: '7.6 л/100км' },
        },
        {
          model: 'Hyundai Tucson',
          bodyType: 'Кроссовер',
          price: 'от 2 100 000 ₽',
          sideImage: `${CDN}/e17757e2-a821-4e19-b757-6b51630b1cee.jpg`,
          interiorImage: `${CDN}/c702e4aa-c603-45a9-a205-d8eb515e8bdc.jpg`,
          specs: { engine: '2.0 л', power: '156 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.2 л/100км' },
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
          interiorImage: `${CDN}/5f611e90-cb38-43ba-895d-d981c35ca624.jpg`,
          specs: { engine: '2.5 л Turbo', power: '304 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '9.5 л/100км' },
        },
        {
          model: 'Genesis GV80',
          bodyType: 'Внедорожник',
          price: 'от 4 800 000 ₽',
          sideImage: `${CDN}/dc0fb90d-c80c-46c6-8cfb-e51fcc62229d.jpg`,
          interiorImage: `${CDN}/2813d69f-9340-4abd-9064-520f6837b1b0.jpg`,
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
          interiorImage: `${CDN}/26e3bc69-84dd-42e1-80c4-baa7fdc2a53f.jpg`,
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
          interiorImage: `${CDN}/7de52145-9f15-4417-926a-99af1a8199c0.jpg`,
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
          interiorImage: `${CDN}/d4d263a2-c706-4058-bd34-74c4cfcf0840.jpg`,
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
          interiorImage: `${CDN}/4d8bddcd-7239-4c0a-a8d1-96b6c341a847.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '7.8 л/100км' },
        },
        {
          model: 'BMW 5 Series Touring',
          bodyType: 'Универсал',
          price: 'от 3 400 000 ₽',
          sideImage: `${CDN}/8c444f0b-fe34-4153-9172-b424bcff0609.jpg`,
          interiorImage: `${CDN}/33daf58c-dbc7-4c2b-baf0-cc89569e9721.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.1 л/100км' },
        },
        {
          model: 'BMW X3',
          bodyType: 'Кроссовер',
          price: 'от 3 600 000 ₽',
          sideImage: `${CDN}/7effc73a-ccb6-4a00-a4fa-ab798d5d5422.jpg`,
          interiorImage: `${CDN}/832810a0-ed86-410c-b200-3701d28bad4a.jpg`,
          specs: { engine: '2.0 л Turbo', power: '252 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.9 л/100км' },
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
          interiorImage: `${CDN}/d76f2acf-8c31-4780-9149-f8f6bd13eaa7.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.0 л/100км' },
        },
        {
          model: 'Mercedes-Benz CLE Coupe',
          bodyType: 'Купе',
          price: 'от 4 200 000 ₽',
          sideImage: `${CDN}/2a3b32f8-f113-496b-9cbe-b88de6475add.jpg`,
          interiorImage: `${CDN}/dc5f2ee0-51d0-4945-a929-4fad0ae7caa9.jpg`,
          specs: { engine: '2.0 л Turbo', power: '258 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '8.2 л/100км' },
        },
        {
          model: 'Mercedes-Benz GLE',
          bodyType: 'Внедорожник',
          price: 'от 5 200 000 ₽',
          sideImage: `${CDN}/9002d5bd-9834-4069-bcfc-49268febb878.jpg`,
          interiorImage: `${CDN}/3abc854e-73ea-4694-8557-03516d08feb6.jpg`,
          specs: { engine: '3.0 л Turbo', power: '367 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '10.5 л/100км' },
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
          interiorImage: `${CDN}/4388ef97-c2d1-4bf4-a96a-5c1a4e14de06.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '7.9 л/100км' },
        },
        {
          model: 'Audi A6 Avant',
          bodyType: 'Универсал',
          price: 'от 3 200 000 ₽',
          sideImage: `${CDN}/f3966d3a-419c-434b-9c79-03a369b0f4a4.jpg`,
          interiorImage: `${CDN}/c93b472c-2e5a-4f2e-b0cd-01e69ce21f49.jpg`,
          specs: { engine: '2.0 л Turbo', power: '245 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.1 л/100км' },
        },
        {
          model: 'Audi Q5',
          bodyType: 'Кроссовер',
          price: 'от 3 500 000 ₽',
          sideImage: `${CDN}/05513c77-a27f-430f-88fe-c8f9d46fb342.jpg`,
          interiorImage: `${CDN}/d66bc7d4-8e2a-4ddf-bb6c-aba2a8c04eee.jpg`,
          specs: { engine: '2.0 л Turbo', power: '249 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '8.6 л/100км' },
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
          interiorImage: `${CDN}/98b299f6-a4fb-47cf-8108-36fd496e43a9.jpg`,
          specs: { engine: '1.4 л Turbo', power: '150 л.с.', drive: 'Передний', transmission: 'Робот', year: '2023', consumption: '6.2 л/100км' },
        },
        {
          model: 'Volkswagen Tiguan',
          bodyType: 'Кроссовер',
          price: 'от 2 700 000 ₽',
          sideImage: `${CDN}/ea6a7abb-ddf6-4118-8650-41e4c4806f0e.jpg`,
          interiorImage: `${CDN}/654cd304-f4e8-4c2e-bd2e-84b4c4386c35.jpg`,
          specs: { engine: '2.0 л Turbo', power: '190 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '8.3 л/100км' },
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
          interiorImage: `${CDN}/a949957a-627a-40c2-aefe-73bedef35e1a.jpg`,
          specs: { engine: '3.0 л Turbo', power: '385 л.с.', drive: 'Задний', transmission: 'Робот', year: '2024', consumption: '10.5 л/100км' },
        },
        {
          model: 'Porsche Cayenne',
          bodyType: 'Внедорожник',
          price: 'от 7 200 000 ₽',
          sideImage: `${CDN}/ab6c5e5b-0067-489a-9717-ca6827f2863d.jpg`,
          interiorImage: `${CDN}/f70aa1f4-7da3-49a0-b51c-b3f3c4255293.jpg`,
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
          interiorImage: `${CDN}/59e7de99-d0b0-4ff2-a3c6-b2a61b2efcc5.jpg`,
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
          interiorImage: `${CDN}/9ed49408-33ba-4a4f-b4d3-7f596773ed2c.jpg`,
          specs: { engine: 'Электро', power: '670 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2024', consumption: '16.0 кВт·ч/100км' },
        },
        {
          model: 'Tesla Model Y',
          bodyType: 'Кроссовер',
          price: 'от 3 700 000 ₽',
          sideImage: `${CDN}/22198548-e8c1-4ce8-b814-f16d3a735b68.jpg`,
          interiorImage: `${CDN}/cb36da39-ee61-4754-8d00-efb1e40636d2.jpg`,
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
          interiorImage: `${CDN}/14006c1e-51f4-495d-83d1-5c77e2ecb9b3.jpg`,
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
          interiorImage: `${CDN}/5e3430e3-9efd-4c7e-bf91-1509af0ef33b.jpg`,
          specs: { engine: '3.5 л Turbo', power: '400 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '12.5 л/100км' },
        },
        {
          model: 'Ford Explorer',
          bodyType: 'Внедорожник',
          price: 'от 3 100 000 ₽',
          sideImage: `${CDN}/d7bd27c9-ed1c-469c-bd9a-8e8cc1d9aabf.jpg`,
          interiorImage: `${CDN}/09a785e5-20e9-4cf7-9773-ab0fb69cd5e6.jpg`,
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
          interiorImage: `${CDN}/bc0f3c67-93b1-4152-9fb9-efa8ca6aedd0.jpg`,
          specs: { engine: '2.0 л Turbo', power: '237 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2024', consumption: '9.0 л/100км' },
        },
        {
          model: 'Cadillac Escalade',
          bodyType: 'Внедорожник',
          price: 'от 8 500 000 ₽',
          sideImage: `${CDN}/99ccd943-e79c-4597-9207-04f7eb86bef6.jpg`,
          interiorImage: `${CDN}/1bd6a2d1-5d14-4033-a35d-65229021b9aa.jpg`,
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
          interiorImage: `${CDN}/16b9dbbe-1ef3-40dc-8eda-f76470a85b0a.jpg`,
          specs: { engine: '5.3 л', power: '355 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '13.2 л/100км' },
        },
        {
          model: 'Chevrolet Tahoe',
          bodyType: 'Внедорожник',
          price: 'от 5 900 000 ₽',
          sideImage: `${CDN}/b064fa1c-cec4-4154-a1c9-95917a5acf2f.jpg`,
          interiorImage: `${CDN}/72cd1f23-3625-4ad6-b49f-e6ec2f1fde92.jpg`,
          specs: { engine: '5.3 л', power: '355 л.с.', drive: 'Полный', transmission: 'Автомат', year: '2023', consumption: '13.8 л/100км' },
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
          interiorImage: `${CDN}/4fc05950-dd9f-4700-b536-53ff5459535d.jpg`,
          specs: { engine: '3.6 л V6', power: '292 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2022', consumption: '11.0 л/100км' },
        },
        {
          model: 'Dodge Challenger',
          bodyType: 'Купе',
          price: 'от 3 900 000 ₽',
          sideImage: `${CDN}/a2aa8191-887f-4df1-9360-755ade8a060c.jpg`,
          interiorImage: `${CDN}/78d18dc0-ad82-408b-a4f1-df755f9f53e8.jpg`,
          specs: { engine: '5.7 л V8', power: '375 л.с.', drive: 'Задний', transmission: 'Автомат', year: '2022', consumption: '13.5 л/100км' },
        },
      ],
    },
  ],
};
