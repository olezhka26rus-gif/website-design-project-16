const cars = [
  { brand: 'BMW', price: 'от 3 200 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/3e8c520d-1270-4f3a-9563-eadb0bfb702d.jpg' },
  { brand: 'Toyota', price: 'от 2 400 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/b27ad5aa-3dff-4643-b7cc-981002f1330c.jpg' },
  { brand: 'Kia', price: 'от 1 800 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/2649f099-f695-459c-80bf-83b335aaeb64.jpg' },
  { brand: 'Hyundai', price: 'от 1 700 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ee9d1a81-88f7-4783-bfef-c37a16736161.jpg' },
  { brand: 'Lexus', price: 'от 3 500 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/99f513a9-be1d-46d9-8eee-435c3ad7da04.jpg' },
  { brand: 'Mercedes-Benz', price: 'от 3 600 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/a78b34f6-d658-417e-b5b7-d3a59af6a0c6.jpg' },
  { brand: 'Audi', price: 'от 3 000 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ff120423-e044-4f41-87ea-faa13c46589b.jpg' },
  { brand: 'Zeekr', price: 'от 3 100 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/77a26a5d-d563-4e46-9087-377f55e708e6.jpg' },
  { brand: 'Li Auto', price: 'от 3 700 000 ₽', image: 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/0e95ac3e-1053-41ee-8b20-347a5bbf7076.jpg' },
];

const Catalog = () => {
  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Популярные автомобили</h2>
          <a href="#cta" className="text-primary text-sm font-semibold hover:underline">Смотреть все</a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
          {cars.map((car) => (
            <div
              key={car.brand}
              className="rounded-xl border border-border overflow-hidden text-center hover-lift bg-white cursor-pointer"
            >
              <div className="h-20 bg-secondary overflow-hidden">
                <img
                  src={car.image}
                  alt={car.brand}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm truncate">{car.brand}</div>
                <div className="text-xs text-muted-foreground mt-1">{car.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
