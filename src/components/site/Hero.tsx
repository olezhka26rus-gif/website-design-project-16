import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const countries = [
  { flag: '🇨🇳', name: 'Китай' },
  { flag: '🇯🇵', name: 'Япония' },
  { flag: '🇰🇷', name: 'Корея' },
  { flag: '🇪🇺', name: 'Европа' },
  { flag: '🇺🇸', name: 'США' },
];

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-white">
      <div className="container grid lg:grid-cols-2 gap-8 items-center py-14 lg:py-20">
        <div className="animate-fade-in">
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Автомобили со всего мира
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Автомобиль мечты<br />ближе, чем кажется.
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-md">
            Подберём, проверим и доставим автомобиль из любой страны мира.
            Полностью сопровождаем сделку до передачи ключей.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm font-medium">
                <span className="text-lg">{c.flag}</span>
                {c.name}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-8">
            <Button asChild size="lg" className="rounded-lg font-semibold h-14 px-8 text-base hover-lift">
              <a href="#cta">Получить бесплатный расчёт</a>
            </Button>
            <div className="text-sm text-muted-foreground leading-tight">
              Ответим в течение<br />
              <span className="text-foreground font-semibold">15 минут</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="Star" size={18} className="fill-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Более 500 автомобилей<br />доставлено клиентам
            </p>
          </div>
        </div>

        <div className="relative animate-fade-in-right">
          <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl" />
          <img
            src="https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/f337970c-692d-4553-acd7-14a1fb19fd6e.jpg"
            alt="Премиальный автомобиль"
            className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
