const cars = [
  { brand: 'BMW', icon: '🚙', price: 'от 3 200 000 ₽' },
  { brand: 'Toyota', icon: '🚗', price: 'от 2 400 000 ₽' },
  { brand: 'Kia', icon: '🚘', price: 'от 1 800 000 ₽' },
  { brand: 'Hyundai', icon: '🚖', price: 'от 1 700 000 ₽' },
  { brand: 'Lexus', icon: '🏎️', price: 'от 3 500 000 ₽' },
  { brand: 'Mercedes-Benz', icon: '🚐', price: 'от 3 600 000 ₽' },
  { brand: 'Audi', icon: '🚙', price: 'от 3 000 000 ₽' },
  { brand: 'Zeekr', icon: '🚗', price: 'от 3 100 000 ₽' },
  { brand: 'Li Auto', icon: '🚘', price: 'от 3 700 000 ₽' },
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
              className="rounded-xl border border-border p-4 text-center hover-lift bg-white cursor-pointer"
            >
              <div className="text-2xl mb-2">{car.icon}</div>
              <div className="font-semibold text-sm truncate">{car.brand}</div>
              <div className="my-3 h-16 rounded-lg bg-secondary flex items-center justify-center text-3xl">🚗</div>
              <div className="text-xs text-muted-foreground">{car.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
