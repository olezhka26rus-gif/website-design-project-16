export interface AdminGoal {
  id: string;
  title: string;
  spec: string;
  price: string;
  when: string;
  catalogPath: string;
}

export const adminGoals: AdminGoal[] = [
  {
    id: 'bmw-4-gran-coupe-2022',
    title: 'BMW 4 Series Gran Coupe',
    spec: '2.0 AT, 2022 год',
    price: 'от 2 980 000 ₽',
    when: 'Купить в следующем году',
    catalogPath: '/catalog/europe/bmw-4-series-gran-coupe-2022',
  },
];
